import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { locales } from '../../i18n/config';

const rssConfig: Record<string, { description: string; language: string }> = {
  en: {
    description: 'Personal blog about data engineering, backend programming, system design, infrastructure, cloud, and data platforms.',
    language: 'en-us',
  },
  pt: {
    description: 'Blog pessoal sobre engenharia de dados, programacao backend, design de sistemas, infraestrutura, cloud e plataformas de dados.',
    language: 'pt-br',
  },
};

export function getStaticPaths() {
  return locales.map((l) => ({ params: { locale: l } }));
}

export async function GET(context: APIContext) {
  const locale = context.params.locale as string;
  const posts = await getCollection('posts', ({ id }) => id.startsWith(`${locale}/`));

  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const config = rssConfig[locale];

  return rss({
    title: 'Robert Gleison | robertech.dev',
    description: config.description,
    site: context.site || 'https://robertech.dev',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${locale}/posts/${post.slug.replace(`${locale}/`, '')}/`,
    })),
    customData: `<language>${config.language}</language>`,
  });
}
