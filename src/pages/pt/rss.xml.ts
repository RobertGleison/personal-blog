import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ id }) => id.startsWith('pt/'));

  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Robert Gleison | robertech.dev',
    description: 'Blog pessoal sobre engenharia de dados, programacao backend, design de sistemas, infraestrutura, cloud e plataformas de dados.',
    site: context.site || 'https://robertech.dev',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/pt/posts/${post.slug.replace('pt/', '')}/`,
    })),
    customData: `<language>pt-br</language>`,
  });
}
