import { useEffect, useId, useRef, useState } from "react";
import type { ModeId } from "../modes/types";
import { contactSurface } from "../content/contactCopy";

type Status = "idle" | "submitting" | "success" | "validation" | "rate-limit" | "failure";
type Fields = { name: string; email: string; subject: string; message: string; website: string };

const EMPTY: Fields = { name: "", email: "", subject: "", message: "", website: "" };

export function localErrors(fields: Fields) {
  const errors: Record<string, string> = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const subject = fields.subject.trim();
  const message = fields.message.trim();
  if (name.length < 2 || name.length > 100) errors.name = "Use 2–100 characters.";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (subject.length < 3 || subject.length > 120) errors.subject = "Use 3–120 characters.";
  if (message.length < 20 || message.length > 4_000) errors.message = "Use 20–4,000 characters.";
  return errors;
}

export default function ContactWidget({ mode }: { mode: ModeId }) {
  const copy = contactSurface[mode];
  const titleId = useId();
  const statusId = useId();
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt, setStartedAt] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const openFromEmailLink = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="mailto:"]') : null;
      if (!target) return;
      event.preventDefault();
      setOpen(true);
    };
    document.addEventListener("click", openFromEmailLink);
    return () => document.removeEventListener("click", openFromEmailLink);
  }, []);

  useEffect(() => {
    if (!open) return;
    setStartedAt(Date.now());
    firstFieldRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), textarea:not([disabled])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      triggerRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [open]);

  function update(name: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
    if (status !== "idle") setStatus("idle");
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = localErrors(fields);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("validation");
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, startedAt }),
      });
      const result = await response.json().catch(() => ({})) as { error?: string; fields?: Record<string, string> };
      if (response.ok) {
        setFields(EMPTY);
        setStatus("success");
      } else if (response.status === 422) {
        setErrors(result.fields ?? {});
        setStatus("validation");
      } else if (response.status === 429) {
        setStatus("rate-limit");
      } else {
        setStatus("failure");
      }
    } catch {
      setStatus("failure");
    }
  }

  const message = {
    idle: "",
    submitting: "Delivering your message…",
    success: "Message delivered. Ayush will be able to reply to the address you provided.",
    validation: errors.form || "Please check the highlighted fields.",
    "rate-limit": "This line has received several messages. Please try again later.",
    failure: "Delivery failed. Your message was not reported as sent; please retry later.",
  }[status];

  return (
    <div className={`contact contact--${mode} contact--${copy.presentation}${open ? " contact--open" : ""}`}>
      <button ref={triggerRef} type="button" className="contact__trigger" onClick={() => setOpen(true)} aria-haspopup="dialog">
        {copy.trigger}
      </button>
      {open ? (
        <div className="contact__backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <div ref={dialogRef} className="contact__surface" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={statusId}>
            <header className="contact__head">
              <div><p>{copy.kicker}</p><h2 id={titleId}>{copy.title}</h2><span>{copy.note}</span></div>
              <button type="button" className="contact__close" onClick={() => setOpen(false)} aria-label="Close contact form">×</button>
            </header>
            {status === "success" ? (
              <div className="contact__success">
                <strong>Delivered.</strong>
                <p>{message}</p>
                <button type="button" onClick={() => { setStatus("idle"); setStartedAt(Date.now()); firstFieldRef.current?.focus(); }}>Send another</button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={submit} noValidate>
                <div className="contact__grid">
                  <label>Name<input ref={firstFieldRef} name="name" autoComplete="name" maxLength={100} value={fields.name} onChange={(e) => update("name", e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${titleId}-name-error` : undefined} />{errors.name ? <small id={`${titleId}-name-error`}>{errors.name}</small> : null}</label>
                  <label>Reply-to email<input name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} value={fields.email} onChange={(e) => update("email", e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${titleId}-email-error` : undefined} />{errors.email ? <small id={`${titleId}-email-error`}>{errors.email}</small> : null}</label>
                </div>
                <label>Subject / topic<input name="subject" maxLength={120} value={fields.subject} onChange={(e) => update("subject", e.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? `${titleId}-subject-error` : undefined} />{errors.subject ? <small id={`${titleId}-subject-error`}>{errors.subject}</small> : null}</label>
                <label>Message<textarea name="message" rows={6} maxLength={4000} value={fields.message} onChange={(e) => update("message", e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${titleId}-message-error` : undefined} />{errors.message ? <small id={`${titleId}-message-error`}>{errors.message}</small> : null}<span className="contact__count">{fields.message.length}/4000</span></label>
                <label className="contact__hp" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={(e) => update("website", e.target.value)} /></label>
                <footer className="contact__actions">
                  <p id={statusId} className={`contact__status contact__status--${status}`} role="status" aria-live="polite">{message}</p>
                  <button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Send message"}</button>
                </footer>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
