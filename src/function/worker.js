export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/_cloud/r2/")) {
      const key = url.pathname.replace("/_cloud/r2/", "");
      const file = await env.R2.get(key);
      if (!file) return new Response("Not found", { status: 404 });

      return new Response(file.body, {
        headers: {
          "content-type": "text/javascript",
          "cache-control": "public, max-age=31536000, immutable"
        }
      });
    }

    return new Response("OK");
  }
};
