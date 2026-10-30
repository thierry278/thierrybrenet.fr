import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    rubrique: z.enum(['rencontres', 'geopolitique', 'cyber', 'sciences', 'cimes', 'coup-doeil', 'ecrire']),
    format: z.string().default('Article'),
    date: z.coerce.date(),
    minutes: z.number().optional(),
    une: z.boolean().default(false),
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { articles };
