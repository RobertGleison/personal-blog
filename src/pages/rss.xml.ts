import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const postImportResult = import.meta.glob('../pages/posts/*.md', { eager: true });
  const posts = Object.values(postImportResult);

  return rss({
    title: 'Robert Gleison | robertech.dev',
    description: 'Personal blog about data engineering, backend programming, system design, and cloud topics',
    site: context.site || 'https://robertech.dev',
    items: posts
      .filter((post: any) => post.frontmatter?.pubDate)
      .sort((a: any, b: any) => new Date(b.frontmatter.pubDate).valueOf() - new Date(a.frontmatter.pubDate).valueOf())
      .map((post: any) => ({
        title: post.frontmatter.title,
        pubDate: new Date(post.frontmatter.pubDate),
        description: post.frontmatter.description,
        author: post.frontmatter.author,
        link: post.url,
      })),
    customData: `<language>en-us</language>`,
  });
}
