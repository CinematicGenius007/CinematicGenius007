import { resumeFacts } from "./resumeFacts";

export const contacts = {
  email: resumeFacts.email,
  emailHref: `mailto:${resumeFacts.email}`,
  linkedin: resumeFacts.linkedin,
  github: resumeFacts.github,
  website: resumeFacts.website,
} as const;
