import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { cleanSlug, trimSlash } from './permalinks';

const getNormalizedEvent = async (event: CollectionEntry<'events'>): Promise<Post> => {
  const { id, slug: rawSlug = '', data } = event;
  const { Content } = await event.render();

  const {
    date: rawDate,
    title,
    description,
    location,
    tags: rawTags = [],
  } = data;

  const slug = cleanSlug(rawSlug || id);
  const publishDate = new Date(rawDate);

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  return {
    id: id,
    slug: slug,
    permalink: `/events/${slug.replace(/\.md$/, '')}`,
    publishDate: publishDate,
    title: title,
    excerpt: description,
    location: location,
    tags: tags,
    Content: Content,
    metadata: {
        title: title,
        description: description,
    }
  };
};

const load = async function (): Promise<CollectionEntry<'events'>[]> {
  const events = await getCollection('events');
  const normalizedEvents = events.map(async (event) => await getNormalizedEvent(event));
  return Promise.all(normalizedEvents);
};

/** */
export const fetchEvents = async (): Promise<Post[]> => {
  // Always reload events to reflect latest content changes
  return await load();
};

/** */
export const findLatestEvents = async ({ count }: { count?: number }): Promise<Post[]> => {
  const _count = count || 4;
  const events = await fetchEvents();

  if (!events) return [];

  const now = new Date();
  // Only upcoming events (today or future), sorted soonest first
  const upcoming = events
    .filter((e) => e.publishDate.valueOf() >= new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf())
    .sort((a, b) => a.publishDate.valueOf() - b.publishDate.valueOf())
    .slice(0, _count);

  return upcoming;
};
