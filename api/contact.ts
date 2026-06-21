const MAX_BODY_BYTES = 8_192;
const PER_IP_LIMIT = 5;
const PER_IP_WINDOW_SECONDS = 60 * 60;
const GLOBAL_LIMIT = 60;
const GLOBAL_WINDOW_SECONDS = 60;

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
  startedAt?: number;
};

type Env = Record<string, string | undefined>;

function env(): Env {
  return (globalThis as typeof globalThis & { process?: { env?: Env } }).process?.env ?? {};
}

function json(status: number, body: Record<string, unknown>, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}

function normalize(value: unknown): string {
  return typeof value === "string" ? value.normalize("NFKC").replace(/\r\n?/g, "\n").trim() : "";
}

function validate(raw: unknown): { data?: ContactPayload; errors?: Record<string, string> } {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { errors: { form: "Check the form and try again." } };
  const value = raw as Record<string, unknown>;
  const data: ContactPayload = {
    name: normalize(value.name),
    email: normalize(value.email).toLowerCase(),
    subject: normalize(value.subject),
    message: normalize(value.message),
    website: normalize(value.website),
    startedAt: typeof value.startedAt === "number" ? value.startedAt : undefined,
  };
  const errors: Record<string, string> = {};
  if (data.name.length < 2 || data.name.length > 100) errors.name = "Use 2–100 characters.";
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.subject.length < 3 || data.subject.length > 120) errors.subject = "Use 3–120 characters.";
  if (data.message.length < 20 || data.message.length > 4_000) errors.message = "Use 20–4,000 characters.";
  if (data.website) errors.form = "Check the form and try again.";
  if (!data.startedAt || Date.now() - data.startedAt < 900) errors.form = "Please wait a moment, then try again.";
  return Object.keys(errors).length ? { errors } : { data };
}

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const forwardedHost = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!forwardedHost) return false;
  try {
    return new URL(origin).host === forwardedHost;
  } catch {
    return false;
  }
}

async function ipHash(req: Request, secret: string): Promise<string> {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip")
    ?? "unknown";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(signature)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function durableRateLimit(config: Env, hash: string): Promise<{ limited: boolean; retryAfter: number }> {
  const url = config.UPSTASH_REDIS_REST_URL;
  const token = config.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("durable-rate-limit-unconfigured");
  const minute = Math.floor(Date.now() / (GLOBAL_WINDOW_SECONDS * 1000));
  const hour = Math.floor(Date.now() / (PER_IP_WINDOW_SECONDS * 1000));
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", `contact:global:${minute}`],
      ["EXPIRE", `contact:global:${minute}`, String(GLOBAL_WINDOW_SECONDS + 5), "NX"],
      ["INCR", `contact:ip:${hash}:${hour}`],
      ["EXPIRE", `contact:ip:${hash}:${hour}`, String(PER_IP_WINDOW_SECONDS + 5), "NX"],
    ]),
  });
  if (!response.ok) throw new Error("durable-rate-limit-unavailable");
  const results = await response.json() as Array<{ result?: number; error?: string }>;
  if (results.some((result) => result.error)) throw new Error("durable-rate-limit-failed");
  return {
    limited: Number(results[0]?.result) > GLOBAL_LIMIT || Number(results[2]?.result) > PER_IP_LIMIT,
    retryAfter: Number(results[2]?.result) > PER_IP_LIMIT ? PER_IP_WINDOW_SECONDS : GLOBAL_WINDOW_SECONDS,
  };
}

async function deliver(config: Env, data: ContactPayload, requestId: string): Promise<boolean> {
  if (!config.RESEND_API_KEY || !config.CONTACT_TO_EMAIL || !config.CONTACT_FROM_EMAIL) {
    throw new Error("email-provider-unconfigured");
  }
  const safeSubject = data.subject.replace(/[\r\n]/g, " ").slice(0, 120);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.CONTACT_FROM_EMAIL,
      to: [config.CONTACT_TO_EMAIL],
      reply_to: data.email,
      subject: `[Portfolio] ${safeSubject}`,
      text: `Name: ${data.name}\nReply-to: ${data.email}\nRequest: ${requestId}\n\n${data.message}`,
    }),
  });
  if (!response.ok) return false;
  const result = await response.json() as { id?: string };
  return Boolean(result.id);
}

export default async function handler(req: Request): Promise<Response> {
  const started = Date.now();
  const requestId = crypto.randomUUID();
  const config = env();
  if (req.method !== "POST") return json(405, { error: "Method not allowed." }, { Allow: "POST" });
  if (!sameOrigin(req)) return json(403, { error: "Request not accepted." });
  if (!req.headers.get("content-type")?.toLowerCase().includes("application/json")) return json(415, { error: "Request not accepted." });
  const declaredLength = Number(req.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return json(413, { error: "Message is too large." });

  try {
    const text = await req.text();
    if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) return json(413, { error: "Message is too large." });
    let raw: unknown;
    try { raw = JSON.parse(text); } catch { return json(400, { error: "Check the form and try again." }); }
    const result = validate(raw);
    if (!result.data) return json(422, { error: "Check the highlighted fields.", fields: result.errors });

    if (config.NODE_ENV !== "production" && config.CONTACT_TEST_OUTCOME) {
      if (config.CONTACT_TEST_OUTCOME === "rate-limit") return json(429, { error: "Too many messages. Try again later." }, { "Retry-After": "60" });
      if (config.CONTACT_TEST_OUTCOME === "failure") return json(502, { error: "The message could not be delivered. Please try again." });
      if (config.CONTACT_TEST_OUTCOME === "success") return json(200, { ok: true, requestId });
    }

    if (!config.CONTACT_IP_HASH_SECRET) throw new Error("ip-hash-secret-unconfigured");
    const hash = await ipHash(req, config.CONTACT_IP_HASH_SECRET);
    const limit = await durableRateLimit(config, hash);
    if (limit.limited) return json(429, { error: "Too many messages. Try again later." }, { "Retry-After": String(limit.retryAfter) });
    const accepted = await deliver(config, result.data, requestId);
    if (!accepted) throw new Error("provider-rejected");
    console.info("contact.accepted", { requestId, ip: hash.slice(0, 12), ms: Date.now() - started });
    return json(200, { ok: true, requestId });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown";
    console.error("contact.failed", { requestId, reason, ms: Date.now() - started });
    return json(503, { error: "The message could not be delivered. Please try again later." });
  }
}
