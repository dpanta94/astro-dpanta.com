// Checks the SEO and structured-data invariants of the built site, or of a deployed one.
//
//   npm run build && npm run check:seo           # against dist/
//   npm run check:seo -- https://dpanta.com      # against a live URL
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname;
const site = JSON.parse(readFileSync(join(root, "src/data/site.json"), "utf8"));
const target = process.argv[2]?.replace(/\/$/, "");
const live = /^https?:\/\//.test(target ?? "");
const dist = join(root, "dist");

const distFile = (path) => join(dist, path.endsWith("/") ? `${path}index.html` : path);
const load = async (path) => {
  if (live) {
    const res = await fetch(target + path, { redirect: "manual" });
    return { status: res.status, type: res.headers.get("content-type") ?? "", body: await res.text() };
  }
  const file = distFile(path);
  return existsSync(file) ? { status: 200, type: "", body: readFileSync(file, "utf8") } : { status: 404, type: "", body: "" };
};
const imageSize = async (url) => {
  const { pathname } = new URL(url, site.url);
  const buf = live
    ? Buffer.from(await (await fetch(new URL(pathname, target))).arrayBuffer())
    : readFileSync(join(dist, pathname));
  const { width, height } = await sharp(buf).metadata();
  return { width, height, bytes: buf.length };
};

const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
const title = (html) => html.match(/<title>(.*?)<\/title>/)?.[1];
const meta = (html, attr, key) => html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1];

const failures = [];
const check = async (label, test) => {
  let ok = false;
  try { ok = Boolean(await test()); } catch {}
  if (!ok) failures.push(label);
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
};

const [home, about, sitemap, robots, llms, favicon] = await Promise.all(
  ["/", "/about/", "/sitemap-0.xml", "/robots.txt", "/llms.txt", "/favicon.svg"].map(load)
);
const sitemapUrls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const postPaths = sitemapUrls.filter((u) => /\/blog\/[^/]+\/$/.test(u)).map((u) => new URL(u).pathname);
const posts = await Promise.all(postPaths.map(async (path) => ({ path, ...(await load(path)) })));
const tagPaths = [...new Set(posts.flatMap((p) => [...p.body.matchAll(/href="(\/tags\/[^"]+\/)"/g)].map((m) => m[1])))];
const sameAs = Object.values(site.social).filter(Boolean);

console.log(`Checking ${live ? target : "dist/"} (${posts.length} posts, ${tagPaths.length} tags)\n`);

// Head metadata
await check("home title names the site owner", () => title(home.body) !== "Home" && title(home.body).includes(site.name));
await check("home og:title is not 'Home'", () => meta(home.body, "property", "og:title") !== "Home");
await check("home meta description matches site.json", () => meta(home.body, "name", "description") === site.description);
await check("meta author is the author's full name", () => meta(home.body, "name", "author") === site.author.name);
await check("og:locale matches site.json", () => meta(home.body, "property", "og:locale") === site.locale);
await check("favicon is served and linked", () => favicon.status === 200 && home.body.includes('rel="icon"'));

// Fonts
await check("no render-blocking Google Fonts requests", () => !/fonts\.(googleapis|gstatic)\.com/.test(home.body));
await check("self-hosted fonts are preloaded", () => /<link rel="preload" href="\/[^"]+" as="font"/.test(home.body));

// Structured data
await check("home has WebSite JSON-LD naming the site", () => {
  const website = jsonLd(home.body).find((d) => d["@type"] === "WebSite");
  return website.name === site.name && website.url === `${site.url}/` && website.alternateName.includes(site.author.alternateName);
});
const person = jsonLd(about.body).find((d) => d["@type"] === "ProfilePage")?.mainEntity;
await check("About has ProfilePage JSON-LD wrapping the Person", () => person["@type"] === "Person" && person.name === site.author.name);
await check("Person url, description and sameAs match site.json", () =>
  person.url === site.author.url && person.description === site.author.description && JSON.stringify(person.sameAs) === JSON.stringify(sameAs));
await check("Person image is a square headshot of at least 400px", async () => {
  const { width, height } = await imageSize(person.image);
  return width === height && width >= 400;
});

for (const post of posts) {
  const article = jsonLd(post.body).find((d) => d["@type"] === "BlogPosting");
  await check(`${post.path} has BlogPosting JSON-LD with author and dates`, () =>
    article.author.url === site.author.url && article.datePublished && article.dateModified);
  await check(`${post.path} offers 16:9, 4:3 and 1:1 images over 50K pixels`, async () => {
    const sizes = await Promise.all(article.image.map(imageSize));
    const ratios = sizes.filter((s) => s.width * s.height >= 50_000).map((s) => (s.width / s.height).toFixed(2));
    return ["1.78", "1.33", "1.00"].every((r) => ratios.includes(r));
  });
  await check(`${post.path} has a byline and an author box`, () =>
    post.body.includes(`rel="author" class="post-author">${site.author.name}</a>`) &&
    /class="author-box"[\s\S]*href="\/about\/"[\s\S]*href="mailto:/.test(post.body));
  if (post.body.includes('class="post-hero"')) {
    await check(`${post.path} hero image loads eagerly with high priority`, () =>
      /<img[^>]*fetchpriority="high"[^>]*class="post-hero"/.test(post.body) && !/<img[^>]*loading="lazy"[^>]*class="post-hero"/.test(post.body));
  }
}

// Calls to action
await check("home and About link to an email address", () => home.body.includes('href="mailto:') && about.body.includes('href="mailto:'));
await check("served headshot images are each under 100KB", async () => {
  const srcs = [...about.body.matchAll(/<img[^>]*alt="Dimitris Pantazis"[^>]*>/g)].map((m) => m[0].match(/src="([^"]+)"/)[1]);
  const sizes = await Promise.all([...srcs, person.image].map(imageSize));
  return srcs.length > 0 && sizes.every((s) => s.bytes < 100_000);
});

// Crawling and indexing
await check("tag pages are noindex", async () =>
  tagPaths.length > 0 && (await Promise.all(tagPaths.map(load))).every((t) => t.body.includes('<meta name="robots" content="noindex, follow"')));
await check("sitemap lists every post and no tag pages", () => postPaths.length > 0 && !sitemap.body.includes("/tags/"));
await check("every post in the sitemap has a lastmod date", () =>
  postPaths.every((p) => new RegExp(`<loc>${site.url}${p}</loc><lastmod>\\d{4}-\\d{2}-\\d{2}`).test(sitemap.body)));
await check("robots.txt points to the sitemap", () => robots.body.includes(`Sitemap: ${site.url}/sitemap-index.xml`));
await check("llms.txt names the author and links every post", () =>
  llms.body.includes(site.author.name) && postPaths.every((p) => llms.body.includes(`${site.url}${p}`)));
await check("missing pages return the 404 page", async () => {
  if (!live) {
    const wrangler = JSON.parse(readFileSync(join(root, "wrangler.jsonc"), "utf8"));
    return existsSync(join(dist, "404.html")) && wrangler.assets.not_found_handling === "404-page";
  }
  const missing = await load("/this-page-does-not-exist/");
  return missing.status === 404 && missing.body.includes("Page not found");
});

if (failures.length) {
  console.log(`\n${failures.length} failing`);
  process.exit(1);
}
console.log("\nall passing");
