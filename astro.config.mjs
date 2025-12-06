import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    mode: "directory"
  }),
  server: {
    host: true,
    port: 4321
  }
});
