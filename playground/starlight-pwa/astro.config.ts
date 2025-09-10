// @ts-check

import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';
import { defineConfig } from 'astro/config';
import type { ManifestOptions } from 'vite-plugin-pwa';
import manifest from './manifest.webmanifest' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Docs with Tailwind',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
      customCss: ['./src/styles/global.css'],
      components: {
        Head: './src/components/Head.astro',
      },
    }),
    db(),
    mdx(),
    react(),
    sitemap(),
    AstroPWA({
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        navigateFallback: '/404',
        ignoreURLParametersMatching: [/./],
        globPatterns: [
          '**/*.{html,js,css,png,svg,json,ttf,pf_fragment,pf_index,pf_meta,pagefind,wasm}',
        ],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
      mode:
        process.env.NODE_ENV === 'production'
          ? 'production'
          : process.env.NODE_ENV === 'development'
            ? 'development'
            : 'production',
      registerType: 'autoUpdate',
      manifest: manifest as Partial<ManifestOptions>,
    }),
  ],

  vite: {
    // @ts-expect-error: types
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});
