import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { systemPromptFor } from "../src/content/chatPrompts";
import type { ModeId } from "../src/modes/types";

export const config = { runtime: "edge" };

const VALID_MODES: ModeId[] = [
  "engineer", "pm", "designer", "data", "everyday",
  "anime", "retro", "pdf", "signal", "director", "codebase",
];

const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 600;
const MAX_OUTPUT_TOKENS = 400;

// Best-effort per-isolate rate limit (resets on cold start, per-region) — fine
// for deterring casual abuse on a personal site without extra infra.
const RATE_LIMIT = 12;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): number | null {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return null;
  }
  if (entry.count >= RATE_LIMIT) {
    return Math.ceil((entry.resetAt - now) / 1000);
  }
  entry.count += 1;
  return null;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const retryAfter = rateLimited(ip);
  if (retryAfter !== null) {
    return new Response("Too many messages. Try again later.", {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    });
  }

  const { messages, mode } = (await req.json()) as { messages: UIMessage[]; mode?: string };
  const persona = VALID_MODES.includes(mode as ModeId) ? (mode as ModeId) : "engineer";

  const trimmed = messages.slice(-MAX_MESSAGES).map((m) => ({
    ...m,
    parts: m.parts.map((part) =>
      part.type === "text" && part.text.length > MAX_MESSAGE_CHARS
        ? { ...part, text: part.text.slice(0, MAX_MESSAGE_CHARS) }
        : part,
    ),
  })) as UIMessage[];

  const result = streamText({
    model: "google/gemini-2.5-flash-lite",
    system: systemPromptFor(persona),
    messages: await convertToModelMessages(trimmed),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  });

  return result.toUIMessageStreamResponse();
}
