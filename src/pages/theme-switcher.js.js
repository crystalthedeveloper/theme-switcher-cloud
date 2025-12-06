import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const prerender = true;

const scriptPath = fileURLToPath(new URL("../../theme-switcher.js", import.meta.url));

function loadScript() {
  return readFileSync(scriptPath, "utf-8");
}

export function GET() {
  const body = loadScript();

  return new Response(body, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
