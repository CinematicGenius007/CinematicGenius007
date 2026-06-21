import type { ModeId } from "../modes/types";

type ContactSurfaceCopy = { trigger: string; kicker: string; title: string; note: string; presentation: string };

export const contactSurface: Record<ModeId, ContactSurfaceCopy> = {
  engineer: { trigger: "contact", kicker: "$ contact --open", title: "Open a diagnostic line", note: "A structured message, delivered server-side.", presentation: "console" },
  pm: { trigger: "New request", kicker: "INTAKE / 01", title: "Start a conversation", note: "Scope, context, and a useful next step.", presentation: "brief" },
  designer: { trigger: "Contact sheet", kicker: "EDITORIAL / CONTACT", title: "Send the considered version", note: "A clean surface for a thoughtful note.", presentation: "sheet" },
  data: { trigger: "message()", kicker: "In [contact]", title: "Submit a message cell", note: "Validated input. Observable delivery state.", presentation: "notebook" },
  everyday: { trigger: "Write to me", kicker: "A SMALL LETTER", title: "Hello, Ayush", note: "No special format. Just tell me what’s on your mind.", presentation: "letter" },
  anime: { trigger: "Transmit", kicker: "通信 / TRANSMISSION", title: "Send the next chapter", note: "Your message enters the queue.", presentation: "transmission" },
  retro: { trigger: "MAIL", kicker: "New Message - MAIL", title: "Compose", note: "Plain text still works beautifully.", presentation: "popup" },
  signal: { trigger: "Open line", kicker: "SECURE COMMS / READY", title: "Establish contact", note: "Metadata minimized. Message encrypted in transit.", presentation: "secure" },
  director: { trigger: "Production note", kicker: "CALL SHEET / MESSAGE", title: "Send a production note", note: "Scene, context, desired next take.", presentation: "callsheet" },
  codebase: { trigger: "commit message", kicker: "contact/message.md", title: "Create message", note: "Validated, rate-limited, server-delivered.", presentation: "commit" },
  pdf: { trigger: "Reply slip", kicker: "TECHNICAL REPLY / FORM 01", title: "Contact Ayush", note: "A concise reply attached to the résumé.", presentation: "reply" },
};
