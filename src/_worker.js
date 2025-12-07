export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/theme-switcher.js") {
      const file = await env.R2.get("theme-switcher.js");
      if (!file) return new Response("Not found", { status: 404 });

      return new Response(file.body, {
        headers: {
          "Content-Type": "application/javascript",
          "Cache-Control": "public, max-age=31536000, immutable"
        }
      });
    }

    return new Response("OK");
  }
};
