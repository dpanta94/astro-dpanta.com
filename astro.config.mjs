import { readFileSync, readdirSync } from "node:fs";
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// Post URL -> last modified date (`updated`, else `date`), for the sitemap's lastmod.
// shortcut: reads frontmatter with a regex because the content layer isn't available here, and assumes flat
// src/content/blog/*.md files; the content schema still validates both fields. Revisit if posts move to folders.
const blogDir = new URL("./src/content/blog/", import.meta.url);
const postLastmod = Object.fromEntries(
  readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const frontmatter = readFileSync(new URL(file, blogDir), "utf8").split("---")[1];
      const field = (name) => frontmatter.match(new RegExp(`^${name}:\\s*(\\S+)`, "m"))?.[1];
      return [`https://dpanta.com/blog/${file.replace(/\.md$/, "")}/`, field("updated") ?? field("date")];
    })
);

export default defineConfig({
  site: "https://dpanta.com",
  integrations: [
    sitemap({
      // Tag pages are thin listings, kept out of the index (noindex in [tag].astro).
      filter: (page) => !page.includes("/tags/"),
      serialize: (item) => (postLastmod[item.url] ? { ...item, lastmod: postLastmod[item.url] } : item),
    }),
  ],

  // Self-hosted at build time so no third-party stylesheet blocks the first paint.
  // Only the weights the CSS uses; italics stay browser-synthesized as before.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Playfair Display",
      cssVariable: "--font-playfair",
      weights: [400, 700],
      styles: ["normal"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 600],
      styles: ["normal"],
      fallbacks: ["Helvetica Neue", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: [400],
      styles: ["normal"],
      fallbacks: ["Menlo", "monospace"],
    },
  ],

  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
