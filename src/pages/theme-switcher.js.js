import themeSwitcherSource from "../../theme-switcher.js?raw";

export const prerender = true;

export function GET() {
  const body = themeSwitcherSource;

  return new Response(body, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
