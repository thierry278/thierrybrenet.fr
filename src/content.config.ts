import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { slugsRubriques } from './data/rubriques';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    accroche: z.string().optional(),
    rubrique: z.enum(slugsRubriques),
    type: z.enum(['article', 'infographie', 'video']).default('article'),
    youtube: z.string().optional(),
    format: z.string().default('Article'),
    date: z.coerce.date(),
    minutes: z.number().optional(),
    une: z.boolean().default(false),
    brouillon: z.boolean().default(false),
    image: z.string().optional(),       // chemin dans /uploads/ (visuel principal)
    image_pano: z.string().optional(),
    vignette: z.string().optional(),
    carte: z.string().optional(),       // visuel de carte au format naturel (infographies : rien n'est coupé)
    serie: z.string().optional(),       // identifiant de série (voir src/data/series.ts)
    rang: z.number().optional(),        // numéro de l'épisode dans la série
    pdf: z.string().optional(),
    ancienne_url: z.string().optional(),
    hashtags: z.array(z.string()).optional(),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: articles.schema,
});

const livres = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/livres' }),
  schema: z.object({
    title: z.string(),
    annee: z.string(),
    image: z.string(),
    ordre: z.number(),
    coauteur: z.string().optional(),
    lien: z.string().optional(),
    accroche: z.string().optional(),
    articles: z.array(z.string()).optional(),
  }),
});

export const collections = { articles, videos, livres };
