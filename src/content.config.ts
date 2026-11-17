import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '*/{en,ms}.md' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(10).max(70),
        description: z.string().min(50).max(160),
        primaryKeyword: z.string().min(2),
        date: z.coerce.date(),
        updated: z.coerce.date(),
        tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1).max(5),
        type: z.enum(['comparison', 'guide', 'pillar', 'news']),
        heroImage: image(),
        heroAlt: z.string().min(5),
        sources: z
          .array(z.object({ url: z.string().url(), title: z.string().min(2), accessed: z.coerce.date() }))
          .default([]),
        faq: z.array(z.object({ q: z.string().min(5), a: z.string().min(5) })).default([]),
        draft: z.boolean().default(false),
      })
      .refine((d) => d.type !== 'comparison' || d.sources.length > 0, {
        message: 'comparison posts need at least one source',
        path: ['sources'],
      }),
});

export const collections = { posts };
