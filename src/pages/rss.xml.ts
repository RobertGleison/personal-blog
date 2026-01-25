import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ id }) => id.startsWith('en/'));

  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Robert Gleison | robertech.dev',
    description: 'Personal blog about data engineering, backend programming, system design, infrastructure, cloud, and data platforms.',
    site: context.site || 'https://robertech.dev',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug.replace('en/', '')}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
