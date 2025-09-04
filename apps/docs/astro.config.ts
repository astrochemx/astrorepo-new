// @ts-check

import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';
import lunaria from '@lunariajs/starlight';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import vtbot from 'astro-vtbot';
import { viewTransitions } from 'astro-vtbot/starlight-view-transitions';
// import starlightBlog from 'starlight-blog';
// import starlightGiscus from 'starlight-giscus';
import starlightImageZoom from 'starlight-image-zoom';
import starlightLinksValidator from 'starlight-links-validator';
import starlightScrollToTop from 'starlight-scroll-to-top';
import starlightThemeRapide from 'starlight-theme-rapide';
// import { loadEnv } from 'vite';
import type { ManifestOptions } from 'vite-plugin-pwa';
import { sidebar } from './astro.sidebar';
import { devServerFileWatcher } from './config/integrations/dev-server-file-watcher';
import { rehypePlugins, remarkPlugins } from './src/plugins';
import manifest from './webmanifest.json';

// const { GISCUS_REPO_ID, GISCUS_CATEGORY_ID } = loadEnv(
//   process.env['NODE_ENV'] ?? 'development',
//   process.cwd(),
//   'GISCUS_',
// );

// if (!GISCUS_REPO_ID || !GISCUS_CATEGORY_ID) {
//   console.warn(
//     '[giscus] Skipping Giscus integration: `GISCUS_REPO_ID` or `GISCUS_CATEGORY_ID` not set.',
//   );
// }

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  compressHTML: true,
  devToolbar: { enabled: true },
  experimental: {
    chromeDevtoolsWorkspace: true,
    contentIntellisense: true,
    headingIdCompat: true,
    preserveScriptOrder: true,
  },
  // i18n: {
  //   defaultLocale: 'uk',
  //   locales: ['en', 'uk'],
  //   routing: {
  //     prefixDefaultLocale: true,
  //     redirectToDefaultLocale: true,
  //   },
  // },
  image: { remotePatterns: [{ protocol: 'https' }] },
  integrations: [
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
      mode: 'production',
      registerType: 'autoUpdate',
      manifest: manifest as Partial<ManifestOptions>,
    }),
    db(),
    devServerFileWatcher([
      './**/*',
      // './config/**/*',
      // './astro.config.mjs',
      // './astro.sidebar.ts',
      // './src/assets/**/*',
      // './src/content/*.mdx',
      // './src/content/nav/*.ts',
    ]),
    expressiveCode(),
    mdx(),
    react(),
    sitemap(),
    starlight({
      components: {
        Head: './src/components/starlight/Head.astro',
        Header: './src/components/starlight/Header.astro',
        Sidebar: './src/components/starlight/Sidebar.astro',
      },
      customCss: ['./src/styles/global.css'],
      defaultLocale: 'uk',
      editLink: {
        baseUrl: 'https://github.com/astrochemx/astrorepo/edit/main/apps/docs/',
      },
      lastUpdated: true,
      locales: {
        en: {
          label: 'English',
          lang: 'en',
        },
        uk: {
          label: 'Українська',
          lang: 'uk',
        },
      },
      markdown: {
        headingLinks: true,
      },
      pagination: true,
      plugins: [
        lunaria({
          configPath: './lunaria.config.json',
          route: '/lunaria',
          sync: true,
        }),
        // starlightBlog({
        //   title: 'Thoughts',
        //   postCount: 10,
        //   recentPostCount: 5,
        //   prevNextLinksOrder: 'chronological',
        //   navigation: 'header-end',
        //   metrics: {
        //     readingTime: true,
        //     words: 'rounded',
        //   },
        //   authors: {
        //     astrochemx: {
        //       name: 'AstroChemX',
        //       title: 'astrochemx',
        //       picture: 'https://avatars.githubusercontent.com/u/105541001',
        //       url: 'https://github.com/astrochemx',
        //     },
        //     ai: {
        //       name: 'Artificial Intelligence',
        //       title: 'Written with the help of AI',
        //     },
        //   },
        // }),
        // ...(GISCUS_REPO_ID && GISCUS_CATEGORY_ID
        //   ? [
        //       starlightGiscus({
        //         repo: 'astrochemx/astrorepo',
        //         repoId: GISCUS_REPO_ID,
        //         category: 'Comments',
        //         categoryId: GISCUS_CATEGORY_ID,
        //         lazy: true,
        //       }),
        //     ]
        //   : []),
        starlightImageZoom(),
        starlightLinksValidator({
          exclude: ['/*/tags/*', '/*/authors/*'],
          errorOnRelativeLinks: false,
          errorOnInvalidHashes: false,
        }),
        starlightScrollToTop({
          borderRadius: '50',
          position: 'right',
          progressRingColor: 'yellow',
          showProgressRing: true,
          showTooltip: true,
          smoothScroll: true,
          svgPath: 'M12 4L6 10H9V16H15V10H18L12 4M9 16L12 20L15 16',
          svgStrokeWidth: 1,
          threshold: 25,
          tooltipText: 'Back to top',
        }),
        starlightThemeRapide(),
        viewTransitions(),
      ],
      routeMiddleware: ['./src/routeData.ts'],
      sidebar: sidebar,
      // social: [
      //   {
      //     icon: 'github',
      //     label: 'GitHub',
      //     href: 'https://github.com/astrochemx/astrorepo/tree/main/apps/docs',
      //   },
      // ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      title: {
        en: 'AstroRepo – Documentation',
        uk: 'AstroRepo – Документація',
      },
    }),
    vtbot(),
  ],
  markdown: {
    rehypePlugins: rehypePlugins,
    remarkPlugins: remarkPlugins,
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
    syntaxHighlight: false,
  },
  redirects: {
    '/': '/uk',
  },
  server: {
    host: true,
    open: false,
    port: 4321,
  },
  site: 'https://astrorepo-docs.vercel.app',
  trailingSlash: 'ignore',
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild',
    },
    // @ts-expect-error: types
    plugins: [tailwindcss()],
  },
});
