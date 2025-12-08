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

let _events: Post[];

/** */
export const fetchEvents = async (): Promise<Post[]> => {
  if (!_events) {
    _events = await load();
  }

  return _events;
};

/** */
export const findLatestEvents = async ({ count }: { count?: number }): Promise<Post[]> => {
  const _count = count || 4;
  const events = await fetchEvents();

  return events ? events.sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf()).slice(0, _count) : [];
};
