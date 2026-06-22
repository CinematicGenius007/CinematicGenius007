import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler, { normalize, sameOrigin, validate } from "../api/contact";

const ORIGIN = "https://cinematicgenius007.com";
const HOST = "cinematicgenius007.com";

function makeRequest(overrides: {
  method?: string;
  origin?: string | null;
  host?: string;
  contentType?: string | null;
  body?: unknown;
  rawBody?: string;
  contentLength?: number;
} = {}): Request {
  const headers = new Headers();
  if (overrides.contentType !== null) headers.set("content-type", overrides.contentType ?? "application/json");
  if (overrides.origin !== null) headers.set("origin", overrides.origin ?? ORIGIN);
  headers.set("host", overrides.host ?? HOST);
  const body = overrides.rawBody ?? (overrides.body === undefined ? undefined : JSON.stringify(overrides.body));
  if (body !== undefined) headers.set("content-length", String(overrides.contentLength ?? new TextEncoder().encode(body).byteLength));
  return new Request("https://cinematicgenius007.com/api/contact", {
    method: overrides.method ?? "POST",
    headers,
    body,
  });
}

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: "QA Tester",
    email: "qa@example.com",
    subject: "Functional test subject",
    message: "This message is definitely over twenty characters long.",
    website: "",
    startedAt: Date.now() - 5_000,
    ...overrides,
  };
}

describe("normalize", () => {
  it("trims and normalizes line endings", () => {
    expect(normalize("  hello\r\nworld  ")).toBe("hello\nworld");
  });

  it("returns empty string for non-strings", () => {
    expect(normalize(undefined)).toBe("");
    expect(normalize(42)).toBe("");
  });
});

describe("validate", () => {
  it("rejects a too-short name", () => {
    const result = validate(validPayload({ name: "A" }));
    expect(result.errors?.name).toBeDefined();
  });

  it("rejects an invalid email", () => {
    const result = validate(validPayload({ email: "not-an-email" }));
    expect(result.errors?.email).toBeDefined();
  });

  it("rejects a too-short message", () => {
    const result = validate(validPayload({ message: "short" }));
    expect(result.errors?.message).toBeDefined();
  });

  it("rejects the honeypot field being filled", () => {
    const result = validate(validPayload({ website: "spam" }));
    expect(result.errors?.form).toBeDefined();
  });

  it("rejects submissions faster than the timing gate", () => {
    const result = validate(validPayload({ startedAt: Date.now() }));
    expect(result.errors?.form).toBe("Please wait a moment, then try again.");
  });

  it("accepts a well-formed payload", () => {
    const result = validate(validPayload());
    expect(result.errors).toBeUndefined();
    expect(result.data?.email).toBe("qa@example.com");
  });
});

describe("sameOrigin", () => {
  it("rejects a request with no Origin header", () => {
    expect(sameOrigin(makeRequest({ origin: null }))).toBe(false);
  });

  it("rejects a mismatched Origin", () => {
    expect(sameOrigin(makeRequest({ origin: "https://evil.example" }))).toBe(false);
  });

  it("accepts a matching Origin", () => {
    expect(sameOrigin(makeRequest({ origin: ORIGIN }))).toBe(true);
  });
});

describe("handler", () => {
  const baseEnv = {
    NODE_ENV: "test",
    CONTACT_IP_HASH_SECRET: "test-secret",
    UPSTASH_REDIS_REST_URL: "https://upstash.example",
    UPSTASH_REDIS_REST_TOKEN: "upstash-token",
    RESEND_API_KEY: "resend-key",
    CONTACT_TO_EMAIL: "ayush@example.com",
    CONTACT_FROM_EMAIL: "noreply@example.com",
  };

  beforeEach(() => {
    for (const [key, value] of Object.entries(baseEnv)) process.env[key] = value;
    delete process.env.ENABLE_CONTACT_TEST_HOOKS;
    delete process.env.CONTACT_TEST_OUTCOME;
  });

  afterEach(() => {
    for (const key of Object.keys(baseEnv)) delete process.env[key];
    delete process.env.ENABLE_CONTACT_TEST_HOOKS;
    delete process.env.CONTACT_TEST_OUTCOME;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  function mockUpstash({ global = 1, perIp = 1, daily = 1 }: { global?: number; perIp?: number; daily?: number } = {}) {
    return vi.fn(async (url: string) => {
      if (url.includes("upstash.example")) {
        return new Response(
          JSON.stringify([{ result: global }, { result: 1 }, { result: perIp }, { result: 1 }, { result: daily }, { result: 1 }]),
          { status: 200 },
        );
      }
      if (url.includes("api.resend.com")) {
        return new Response(JSON.stringify({ id: "email_123" }), { status: 200 });
      }
      throw new Error(`unexpected fetch to ${url}`);
    });
  }

  it("rejects non-POST methods", async () => {
    const response = await handler(makeRequest({ method: "GET" }));
    expect(response.status).toBe(405);
  });

  it("rejects requests with no Origin header", async () => {
    const response = await handler(makeRequest({ origin: null, body: validPayload() }));
    expect(response.status).toBe(403);
  });

  it("rejects a mismatched Origin", async () => {
    const response = await handler(makeRequest({ origin: "https://evil.example", body: validPayload() }));
    expect(response.status).toBe(403);
  });

  it("rejects a non-JSON content-type", async () => {
    const response = await handler(makeRequest({ contentType: "text/plain", rawBody: "hello" }));
    expect(response.status).toBe(415);
  });

  it("rejects a body over the declared size cap", async () => {
    const response = await handler(makeRequest({ body: validPayload(), contentLength: 999_999 }));
    expect(response.status).toBe(413);
  });

  it("rejects malformed JSON", async () => {
    const response = await handler(makeRequest({ rawBody: "{not json" }));
    expect(response.status).toBe(400);
  });

  it("returns field errors for invalid input", async () => {
    const response = await handler(makeRequest({ body: validPayload({ email: "bad" }) }));
    expect(response.status).toBe(422);
    const json = await response.json();
    expect(json.fields.email).toBeDefined();
  });

  it("returns a 503 when the IP hash secret is unconfigured", async () => {
    delete process.env.CONTACT_IP_HASH_SECRET;
    const response = await handler(makeRequest({ body: validPayload() }));
    expect(response.status).toBe(503);
  });

  it("delivers successfully when validation, rate limiting, and the provider all succeed", async () => {
    vi.stubGlobal("fetch", mockUpstash());
    const response = await handler(makeRequest({ body: validPayload() }));
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.ok).toBe(true);
  });

  it("rate-limits when the per-IP window is exceeded", async () => {
    vi.stubGlobal("fetch", mockUpstash({ perIp: 999 }));
    const response = await handler(makeRequest({ body: validPayload() }));
    expect(response.status).toBe(429);
  });

  it("rate-limits when the daily cap is exceeded", async () => {
    vi.stubGlobal("fetch", mockUpstash({ daily: 999 }));
    const response = await handler(makeRequest({ body: validPayload() }));
    expect(response.status).toBe(429);
  });

  it("fails closed when the rate-limit response is malformed", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify([{ result: "not-a-number" }]), { status: 200 })));
    const response = await handler(makeRequest({ body: validPayload() }));
    expect(response.status).toBe(503);
  });

  it("returns a 503 when the email provider rejects the message", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => {
      if (url.includes("upstash.example")) {
        return new Response(JSON.stringify([{ result: 1 }, { result: 1 }, { result: 1 }, { result: 1 }, { result: 1 }, { result: 1 }]), { status: 200 });
      }
      return new Response(JSON.stringify({}), { status: 200 });
    }));
    const response = await handler(makeRequest({ body: validPayload() }));
    expect(response.status).toBe(503);
  });

  it("ignores CONTACT_TEST_OUTCOME unless ENABLE_CONTACT_TEST_HOOKS is set", async () => {
    process.env.CONTACT_TEST_OUTCOME = "success";
    vi.stubGlobal("fetch", mockUpstash());
    const response = await handler(makeRequest({ body: validPayload() }));
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.requestId).toBeDefined();
  });

  it("honors CONTACT_TEST_OUTCOME when explicitly enabled", async () => {
    process.env.ENABLE_CONTACT_TEST_HOOKS = "1";
    process.env.CONTACT_TEST_OUTCOME = "rate-limit";
    const response = await handler(makeRequest({ body: validPayload() }));
    expect(response.status).toBe(429);
  });
});
