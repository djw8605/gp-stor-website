import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.date(),
		tags: z.array(z.string()).optional().default([]),
		draft: z.boolean().optional().default(false),
	}),
});

const eventsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		date: z.date(),
		location: z.string(),
		tags: z.array(z.string()).optional().default([]),
		description: z.string(),
	}),
});

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	blog: blogCollection,
	events: eventsCollection,
};
