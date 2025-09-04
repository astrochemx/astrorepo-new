import { type CollectionEntry, defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
// import { blogSchema } from 'starlight-blog/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      // extend: (context) =>
      //   blogSchema(context).extend({
      //     giscus: z.boolean().default(false),
      //     renderBlocking: z.string().optional(),
      //   }),
      extend: z.object({
        renderBlocking: z.string().optional(),
      }),
    }),
  }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};

export function createIsLangEntry(lang: string) {
  return (entry: CollectionEntry<'docs'>): boolean => entry.id.startsWith(`${lang}/`);
}

export const isEnglishEntry = createIsLangEntry('en');
