import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://dpanta.com",
  integrations: [sitemap()],

  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});