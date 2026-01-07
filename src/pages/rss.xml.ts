import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await import.meta.glob('./posts/*.md', { eager: true });

  const items = Object.values(posts).map((post: any) => ({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    pubDate: new Date(post.frontmatter.pubDate),
    link: post.url,
  })).sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'My Blog',
    description: 'A simple blog built with Astro',
    site: context.site || 'https://example.com',
    items: items,
    customData: `<language>en-us</language>`,
  });
}
