import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import { bookmarkletsLoader } from './loaders/bookmarklets';

const sections = defineCollection({
  loader: file("src/index.json"),
  schema: z.object({
    name: z.string(),
    id: z.string(),
    content: z.array(z.object({
      id: z.string(),
      name: z.string(),
      text: z.string(),
      code: z.string().optional(),
    })),
  })
});

const bookmarklets = defineCollection({
  loader: bookmarkletsLoader(),
  schema: z.object({
    id: z.string(),
    code: z.string(),
  })
})

export const collections = { sections, bookmarklets };
