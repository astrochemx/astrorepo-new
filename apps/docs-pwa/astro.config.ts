// @ts-check

import path from 'node:path';
import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';
import { defineConfig } from 'astro/config';
import vtbot from 'astro-vtbot';
import { remarkEndOfMarkdown, viewTransitions } from 'astro-vtbot/starlight-view-transitions';
import rehypePrettyCode from 'rehype-pretty-code';
import starlightImageZoom from 'starlight-image-zoom';
import starlightLinksValidator from 'starlight-links-validator';
import starlightScrollToTop from 'starlight-scroll-to-top';
import type { ManifestOptions } from 'vite-plugin-pwa';
import { sidebar } from './astro.sidebar';
import manifest from './webmanifest.json' with { type: 'json' };

export const usePwaPrompt = true;
export const usePwaAssetsGenerator = true;
export const usePwaAssetsSsr = false;

// https://astro.build/config
export default defineConfig({
  ...(usePwaAssetsSsr
    ? {
        adapter: node({
          mode: 'standalone',
        }),
        output: 'server',
      }
    : {}),
  integrations: [
    AstroPWA({
      base: '/',
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/],
        resolveTempFolder: () => path.resolve(process.cwd(), 'dev-dist'),
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
      filename: 'sw.js',
      includeAssets: ['favicon.svg'],
      injectRegister: 'auto',
      manifest: {
        ...(manifest as Partial<ManifestOptions>),
        ...(!usePwaAssetsGenerator
          ? {
              icons: [
                {
                  src: 'pwa-64x64.png',
                  sizes: '64x64',
                  type: 'image/png',
                },
                {
                  sizes: '192x192',
                  src: 'pwa-192x192.png',
                  type: 'image/png',
                },
                {
                  sizes: '512x512',
                  src: 'pwa-512x512.png',
                  type: 'image/png',
                },
                {
                  purpose: 'any maskable',
                  sizes: '512x512',
                  src: 'maskable-icon-512x512.png',
                  type: 'image/png',
                },
              ],
            }
          : {}),
      },
      manifestFilename: 'webmanifest.json',
      minify: true,
      mode: 'development',
      outDir: 'dist',
      registerType: usePwaPrompt ? 'prompt' : 'autoUpdate',
      scope: '/',
      srcDir: 'public',
      strategies: 'generateSW',
      workbox: {
        clientsClaim: false,
        globPatterns: [
          '**/*.{css,html,ico,js,json,less,otf,pagefind,pf_fragment,pf_index,pf_meta,png,scss,svg,ttf,txt,wasm,woff,woff2}',
        ],
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
        navigateFallback: '/',
        skipWaiting: false,
        ...(usePwaAssetsSsr
          ? {
              navigateFallbackAllowlist: [/^\/$/],
              runtimeCaching: [
                {
                  handler: 'NetworkFirst',
                  options: {
                    cacheableResponse: {
                      statuses: [200],
                    },
                    cacheName: 'offline-ssr-pages-cache',
                    expiration: {
                      maxEntries: 100,
                    },
                    matchOptions: {
                      ignoreSearch: true,
                      ignoreVary: true,
                    },
                    plugins: [
                      {
                        cachedResponseWillBeUsed: async (params) => {
                          params.state ??= {};
                          params.state.dontRedirect = params.cachedResponse;
                          console.log(
                            `[SW] cachedResponseWillBeUsed ${params.request.url}, ` +
                              `${params.state ? JSON.stringify(params.state) : ''}`,
                          );
                        },
                        handlerDidError: async ({ request, state, error }) => {
                          if (state?.dontRedirect) {
                            return state.dontRedirect;
                          }
                          console.log(
                            `[SW] handlerDidError ${request.url}, ` +
                              `${state ? JSON.stringify(state) : ''}`,
                          );
                          return error && 'name' in error && error.name === 'no-response'
                            ? Response.redirect(state?.dontRedirect.url, 404)
                            : undefined;
                        },
                      },
                    ],
                  },
                  urlPattern: ({ url, sameOrigin, request }) =>
                    sameOrigin && request.mode === 'navigate' && !/^\/$/.exec(url.pathname),
                },
              ],
            }
          : {}),
      },
      ...(usePwaAssetsGenerator
        ? {
            pwaAssets: {
              config: true,
              htmlPreset: '2023',
              preset: 'minimal-2023',
            },
          }
        : {}),
    }),
    starlight({
      components: {
        Head: './src/components/starlight/Head.astro',
        Header: './src/components/starlight/Header.astro',
        PageFrame: './src/components/starlight/PageFrame.astro',
      },
      customCss: ['./src/styles/global.css'],
      defaultLocale: 'root',
      editLink: {
        baseUrl: 'https://github.com/astrochemx/astrorepo/edit/main/apps/docs/',
      },
      lastUpdated: true,
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
      },
      markdown: {
        headingLinks: true,
      },
      pagination: true,
      plugins: [
        starlightImageZoom(),
        starlightLinksValidator(),
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
        viewTransitions(),
      ],
      routeMiddleware: [],
      sidebar: sidebar,
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/withastro/starlight',
        },
      ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      title: {
        en: 'Astro Starlight with Tailwind CSS and Vite PWA',
      },
    }),
    db(),
    mdx(),
    react(),
    sitemap(),
    vtbot(),
  ],
  markdown: {
    rehypePlugins: [rehypePrettyCode],
    remarkPlugins: [remarkEndOfMarkdown],
  },
  redirects: {},
  server: {
    host: false,
    open: false,
    port: 4321,
  },
  trailingSlash: 'ignore',
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild',
    },
    logLevel: 'info',
    // @ts-expect-error: types
    plugins: [tailwindcss()],
    server: {
      fs: {
        // Allow serving files from hoisted root node_modules.
        allow: ['../..'],
      },
    },
  },
});
