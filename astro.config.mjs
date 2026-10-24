import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://dpanta.com",
  // Tag pages are thin listings, kept out of the index (noindex in [tag].astro).
  integrations: [sitemap({ filter: (page) => !page.includes("/tags/") })],

  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});