import { getCollection } from "astro:content";
import site from "../data/site.json";

const SOCIAL_LABELS: Record<string, string> = { github: "GitHub", linkedin: "LinkedIn", twitter: "X" };

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI systems.
export async function GET() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  const { author } = site;

  const body = [
    `# ${site.name}`,
    "",
    `> ${author.name} (${author.alternateName}) is a ${author.jobTitle} at ${author.worksFor.name} and the engineering lead for The Events Calendar WordPress products. This site is a blog about software development, WordPress, and maintaining code at scale.`,
    "",
    "## Pages",
    "",
    `- [About](${site.url}/about/): Background, expertise, and how to work with ${author.name}`,
    `- [Blog](${site.url}/blog/): All posts`,
    `- [Work with me](${site.url}/work/): What ${author.name} takes on, common client questions, and how to get in touch`,
    "",
    "## Work with me",
    "",
    "- [Panta Dev](https://pantadev.com/): Dimitris Pantazis's agency. It builds, fixes and looks after WooCommerce stores: custom plugins, integrations, speed and security work, and monthly care. Contact: dimi@pantadev.com",
    "",
    "## Posts",
    "",
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${site.url}/blog/${post.id}/)${post.data.description ? `: ${post.data.description}` : ""}`
    ),
    "",
    "## Elsewhere",
    "",
    ...Object.entries(site.social)
      .filter(([, url]) => url)
      .map(([name, url]) => `- [${SOCIAL_LABELS[name] ?? name}](${url})`),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
