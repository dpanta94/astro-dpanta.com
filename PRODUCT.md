# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Fellow developers**: engineers who arrive through a post, usually on WordPress, PHP, plugin maintenance or code simplicity, and read it to learn from real experience.
- **Potential clients**: businesses deciding whether to hire Dimitris directly or through his agency, Panta Dev. They look at the writing and the About page to judge whether he's credible.

Both audiences reach the same pages. Developers come for the writing. Clients use the writing as evidence.

## Product Purpose

dpanta.com is Dimitris Pantazis's personal site and blog. It hosts his writing and introduces him: background, current role, expertise, how he works. Through his agency, Panta Dev, he builds, fixes and looks after WooCommerce stores (custom plugins, integrations, speed and security work, monthly care), and he also takes on other web projects and code reviews.

Success means **enquiries come in**: visitors, clients especially, get in touch about working together. Readership matters because the writing is what makes someone want to get in touch.

## Positioning

What only this site can offer is first-hand experience at scale. Dimitris is a Staff Engineer at Nexcess and engineering lead for The Events Calendar products, a family of WordPress plugins running on over 800,000 sites. The posts come from that work: backwards compatibility, migrations, bad releases. The writing is plain and opinionated, and it doesn't sell.

## Operating Context

- People mostly arrive at a single post (via search, social or a shared link), then may move on to About or the blog index.
- Readers can subscribe through an RSS feed (`/feed.xml`). Posts can be browsed by tag (`/tags/[tag]`).
- Clients compare him against agencies and other freelancers. They want to see experience, the range of tools he works with, and an easy way to make contact.

## Capabilities and Constraints

- Built with Astro 6 and Tailwind CSS 4, deployed as static output to Cloudflare (`wrangler.jsonc`). Uses `astro-seo`, a sitemap and RSS.
- Pages: home (`/`), about (`/about/`), work with me (`/work/`), blog index (`/blog/`), posts (`/blog/[slug]`), tag archives (`/tags/[tag]`), feed, `llms.txt`.
- Blog posts are Markdown content-collection entries with title, date, optional description, optional image and tags (`src/content.config.ts`).
- Site identity and social links live in `src/data/site.json` (GitHub, LinkedIn; no Twitter).
- **Contact is email only** (`dimi@pantadev.com`); there is no contact form or booking flow. `/work` is the hiring page. The nav and About's "Work with me" section link to it; the home intro and the author box under every post link straight to the email address (`npm run check:seo` requires those email links).
- The site currently has dark and light themes with a toggle, and uses "Dimi" as the site title. These are current choices, **not binding**.

## Brand Commitments

- **Personal and pop-culture touches stay.** The One Piece Straw Hat salute on About, and personal-history details like the origin story (modding DOTA bots in Warcraft 3 at 14), are part of who the site belongs to. Future work keeps that personality.
- The voice is first-person, plain and direct, as in the existing posts and pages. He calls himself Dimitris Pantazis; friends call him "Dimi".

## Evidence on Hand

- Posts: `src/content/blog/maintaining-a-plugin-used-by-almost-a-million.md` (with an image in `src/assets/images/`) and `src/content/blog/on-simplicity.md`.
- Facts stated on the site: Staff Engineer at Nexcess; engineering lead for The Events Calendar products; previously Senior Software Engineer at StellarWP; writing code professionally since 2018; The Events Calendar runs on over 800,000 sites; runs the agency Panta Dev (pantadev.com).
- Tools he lists: Laravel, Symfony, React, Next.js, Vue, Express, NestJS, WordPress, WooCommerce. He also names The Events Calendar, Event Tickets and LearnDash.
- Images: headshot `src/assets/images/dimitris-pantazis.jpg`, `src/assets/images/og-default.jpg`, `public/images/one-piece-salute.jpg`.
- **Absent, and must not be made up:** testimonials, client names or logos, case studies, project portfolio, pricing, availability, response-time promises.

## Product Principles

1. **The writing does the selling.** Credibility comes from real experience in the posts, not marketing claims. Any path to contact should come out of that writing, not sit on top of it.
2. **Make getting in touch obvious without pushing.** Enquiries are the goal, so the way to reach him should be easy to find wherever a client might decide. It shouldn't nag developers who came to read.
3. **Plain and honest.** Use real facts, his own voice and no inflated claims, which is the same standard he sets for code: no surprises.
4. **A person, not a firm.** Personal history and pop-culture touches set the site apart from agency sites. Keep them.
