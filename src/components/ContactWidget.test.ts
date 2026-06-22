import { describe, expect, it } from "vitest";
import { localErrors } from "./ContactWidget";

const VALID = { name: "QA Tester", email: "qa@example.com", subject: "Subject line", message: "This message is over twenty characters.", website: "" };

describe("localErrors", () => {
  it("accepts a valid set of fields", () => {
    expect(localErrors(VALID)).toEqual({});
  });

  it("rejects a too-short name", () => {
    expect(localErrors({ ...VALID, name: "A" }).name).toBeDefined();
  });

  it("rejects a name over the server's cap", () => {
    expect(localErrors({ ...VALID, name: "A".repeat(101) }).name).toBeDefined();
  });

  it("rejects an invalid email", () => {
    expect(localErrors({ ...VALID, email: "not-an-email" }).email).toBeDefined();
  });

  it("rejects a too-short subject", () => {
    expect(localErrors({ ...VALID, subject: "Hi" }).subject).toBeDefined();
  });

  it("rejects a too-short message", () => {
    expect(localErrors({ ...VALID, message: "short" }).message).toBeDefined();
  });

  it("rejects a message over the server's cap", () => {
    expect(localErrors({ ...VALID, message: "a".repeat(4_001) }).message).toBeDefined();
  });
});
