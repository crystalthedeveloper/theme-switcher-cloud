export default {
  async fetch(request, env) {
    const object = await env.R2.get("theme-switcher.js");
    if (!object) return new Response("Not found", { status: 404 });

    return new Response(object.body, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=31536000"
      }
    });
  }
};
