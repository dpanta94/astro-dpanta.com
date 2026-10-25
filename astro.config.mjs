import { readFileSync, readdirSync } from "node:fs";
import { defineConfig } from "astro/config";
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

  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
