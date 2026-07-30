import { defineCollection, z } from 'astro:content';

const categories = ['food', 'travel', 'cooking', 'essay'] as const;

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    category: z.enum(categories).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { notes };
export { categories };
