import { getRssString } from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const GET = async () => {
  const blogPosts = await getCollection('blog');

  const rss = await getRssString({
    title: 'GP-STOR Blog',
    description: 'Latest news, updates, and insights from the GP-STOR team',
    site: 'https://djw8605.github.io/gp-stor-website/',

    items: blogPosts.map((post) => ({
      link: `/blog/${post.id}/`,
      title: post.data.title,
      description: post.data.description || post.data.summary || '',
      pubDate: post.data.pubDate,
    })),

    trailingSlash: false,
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
