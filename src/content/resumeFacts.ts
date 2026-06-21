/**
 * Canonical biographical facts from Ayush_Saini_Resume.pdf (22 June 2026).
 * Persona modules may change tone and hierarchy, but factual values should
 * originate here so dates, titles, education, and contact details cannot drift.
 */
export const resumeFacts = {
  name: "Ayush Saini",
  headline: "Software Engineer | Full-Stack | AI & Systems",
  location: "Panipat, Haryana, India",
  email: "ayushdotsaini@gmail.com",
  website: "https://cinematicgenius007.com",
  linkedin: "https://www.linkedin.com/in/ayush-saini-858357200/",
  github: "https://github.com/CinematicGenius007",
  experience: {
    zariya: {
      company: "Zariya AI (Oddmind Innovations)",
      role: "Technical Co-Founder & CTO",
      period: "Aug 2024 – Present",
      concurrentSessions: 70,
      awsOwnership: "80%",
    },
    optmyzr: {
      company: "Optmyzr",
      role: "Software Development Engineer",
      period: "2022 – Present",
      internshipRole: "Software Development Engineer — Intern",
      internshipPeriod: "2021 – 2022",
    },
  },
  education: {
    university: {
      school: "Chitkara University, Punjab",
      degree: "Bachelor of Technology — Computer Science & Engineering",
      period: "2018 – 2022",
      result: "CGPA 9.98 / 10",
    },
    school: {
      school: "Sacred Hearts Public School, Panipat",
      degree: "Higher Secondary Certificate (Class XII) — PCM",
      period: "2017 – 2018",
      result: "Aggregate 96.4%",
    },
  },
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "Go", "C#", "SQL"],
    frontend: ["React", "Next.js 14", "Tailwind CSS", "HTML/CSS"],
    backend: ["Node.js", ".NET (C#)", "REST APIs"],
    cloud: ["AWS (SQS, EC2, S3, ECS Fargate, ASG)", "Vercel", "Docker"],
    databases: ["Supabase (PostgreSQL)", "SQLite", "Redis", "MongoDB"],
    aiRealtime: ["WebRTC", "OpenAI Whisper", "Claude API", "Gemini", "LLM orchestration"],
  },
} as const;
