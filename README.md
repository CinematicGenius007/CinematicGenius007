# Ayush Saini, but on GitHub

Software engineer. Debugger. Builder of things that usually behave in production because I have already argued with them in staging.

[Portfolio](https://www.cinematicgenius007.com) • [LinkedIn](https://www.linkedin.com/in/ayush-saini-858357200/) • [Email](mailto:ayushdotsaini@gmail.com)

## What I usually do here

- Make backend-heavy systems less mysterious.
- Build product features end-to-end without acting surprised when edge cases exist.
- Move between React, TypeScript, C#, Python, Go, Java, C/C++, and cloud systems without needing a dramatic transition period.
- Debug issues that begin with "this should not be possible" and end with "okay, now it makes sense."
- Help teams ship reliably, review sanely, and panic less.

## My operating system

```ts
const ayush = {
  mode: "shipping and investigating",
  strongestMove: "debugging complex systems",
  enjoys: [
    "production mysteries",
    "backend architecture",
    "feature ownership",
    "mentoring people",
    "turning vague bugs into boring fixes",
  ],
  frontendEnergy: "calm and intentional",
  backendEnergy: "let me see the logs",
  codeReviewStyle: "kind, direct, and allergic to avoidable nonsense",
};
```

## Toolbox

```txt
Languages: TypeScript, JavaScript, Python, Go, C#, SQL, Java, C/C++
Frameworks: React, Next.js 14, Vite, Tailwind CSS, Node.js, .NET, Express.js
Passive Buffs: ownership, reliability, debugging patience, production empathy
```

## Things I am disproportionately useful for

- Untangling messy bugs in large codebases.
- Owning critical features without making them everyone else's long-term problem.
- Translating product ambiguity into technical decisions.
- Supporting junior engineers without turning mentorship into theatre.
- Keeping systems maintainable after the exciting part of shipping is over.

## Current side quest

Building software, helping build teams, and trying to keep my GitHub profile at the exact intersection of competent and unserious.

## Contact spell

```js
function summonAyush(topic) {
  if (topic.includes("debugging") || topic.includes("systems")) {
    return "I am already interested.";
  }

  if (topic.includes("building") || topic.includes("product")) {
    return "Let's talk.";
  }

  return "Still probably let's talk.";
}
```

If you want to collaborate, hire, build, fix, or just compare notes on engineering pain that became engineering taste:

- [Mail me](mailto:ayushdotsaini@gmail.com)
- [Find me on LinkedIn](https://www.linkedin.com/in/ayush-saini-858357200/)
- [Read the portfolio](https://www.cinematicgenius007.com)

## Contact delivery configuration

The portfolio contact form posts to `/api/contact`. Delivery and abuse protection are server-side and intentionally fail closed when infrastructure is missing.

```txt
RESEND_API_KEY=                  # server-only email provider credential
CONTACT_FROM_EMAIL=             # verified sender, e.g. Portfolio <contact@example.com>
CONTACT_TO_EMAIL=               # private delivery destination
CONTACT_IP_HASH_SECRET=         # long random HMAC secret; never expose to Vite
UPSTASH_REDIS_REST_URL=         # durable fixed-window rate-limit store
UPSTASH_REDIS_REST_TOKEN=       # server-only Redis credential
```

Limits: 5 accepted attempts per hashed IP per hour and 60 globally per minute. Message bodies are sent to the configured inbox but are not written to application logs; logs contain only a request ID, a short irreversible IP-hash prefix, outcome, and timing. Do not prefix any of these variables with `VITE_`.
