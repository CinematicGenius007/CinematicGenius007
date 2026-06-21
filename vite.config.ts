import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import contactHandler from "./api/contact";

const contactDevApi = {
  name: "contact-dev-api",
  configureServer(server: { middlewares: { use: (fn: (req: any, res: any, next: () => void) => void) => void } }) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith("/api/contact")) return next();
      const chunks: Uint8Array[] = [];
      for await (const chunk of req) chunks.push(typeof chunk === "string" ? new TextEncoder().encode(chunk) : chunk);
      const headers = new Headers();
      for (const [name, value] of Object.entries(req.headers as Record<string, string | string[] | undefined>)) {
        if (value) headers.set(name, Array.isArray(value) ? value.join(",") : value);
      }
      const origin = `http://${req.headers.host ?? "127.0.0.1"}`;
      const decoder = new TextDecoder();
      const body = chunks.map((chunk) => decoder.decode(chunk, { stream: true })).join("") + decoder.decode();
      const request = new Request(new URL(req.url, origin), {
        method: req.method,
        headers,
        body: chunks.length ? body : undefined,
      });
      const response = await contactHandler(request);
      res.statusCode = response.status;
      response.headers.forEach((value, name) => res.setHeader(name, value));
      res.end(new Uint8Array(await response.arrayBuffer()));
    });
  },
};

export default defineConfig({
  plugins: [react(), contactDevApi],
});
