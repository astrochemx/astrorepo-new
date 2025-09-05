// @ts-check
import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';
import { defineConfig } from 'astro/config';

const usePwaPrompt = true;
const usePwaAssetsGenerator = false;
const usePwaAssetsSsr = false;

if (usePwaPrompt) {
  if (usePwaAssetsGenerator) {
    console.warn("You can't define `usePwaAssetsGenerator` together with `usePwaPrompt`!");
    console.warn('`usePwaPrompt` will take precedence over `usePwaAssetsGenerator`!');
  }
  if (usePwaAssetsSsr) {
    console.warn("You can't define `usePwaAssetsSsr` together with `usePwaPrompt`!");
    console.warn('`usePwaPrompt` will take precedence over `usePwaAssetsSsr`!');
  }
}

// https://astro.build/config
export default defineConfig({
  ...(usePwaAssetsSsr && !usePwaPrompt
    ? {
        // Specifies the build adapter to deploy with.
        adapter: node({
          // Specifies the mode that the adapter builds to.
          mode: 'standalone',
        }),
        // Specifies the output target for builds.
        output: 'server',
      }
    : {}),
  integrations: [
    AstroPWA({
      base: '/',
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/],
      },
      includeAssets: ['favicon.svg'],
      injectRegister: 'auto',
      manifest: {
        ...(!usePwaAssetsGenerator && !usePwaAssetsSsr
          ? {
              icons: [
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
                  src: 'pwa-512x512.png',
                  type: 'image/png',
                },
              ],
            }
          : {}),
        name: 'Astro Starlight PWA',
        short_name: 'Astro Starlight PWA',
        theme_color: '#ffffff',
      },
      mode: 'development',
      // Mode for the virtual register.
      // Does NOT available for `injectRegister` set to `inline` or `script`.
      registerType: usePwaPrompt ? 'prompt' : 'autoUpdate',
      scope: '/',
      workbox: {
        globPatterns: ['**/*.{css,html,ico,js,png,svg,txt}'],
        navigateFallback: '/',
        ...(usePwaAssetsSsr && !usePwaPrompt
          ? {
              // An optional array of regular expressions that restricts which
              // URLs the configured `navigateFallback` behavior applies to.
              navigateFallbackAllowlist: [/^\/$/],
              // Fix `workbox-build` error when using v7.3.0: missing `;` errors
              // when building the service worker from the template.
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
                    // Check the options in the `workbox-build` docs.
                    matchOptions: {
                      ignoreVary: true,
                      ignoreSearch: true,
                    },
                    plugins: [
                      {
                        cachedResponseWillBeUsed: async (params) => {
                          // When `handlerDidError` is invoked, then we can prevent
                          // redirecting if there is an entry in the cache.
                          // To check the behavior, navigate to a product page,
                          // then disable the network and refresh the page.
                          params.state ??= {};
                          params.state.dontRedirect = params.cachedResponse;
                          console.log(
                            `[SW] cachedResponseWillBeUsed ${params.request.url}, ` +
                              `${params.state ? JSON.stringify(params.state) : ''}`,
                          );
                        },
                        // This callback will be called when the fetch call fails.
                        // Beware of the logic.
                        // Will be also invoked if the server is down.
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
      ...((usePwaAssetsGenerator || usePwaAssetsSsr) && !usePwaPrompt
        ? {
            pwaAssets: {
              // PWA assets generation and injection.
              config: true,
            },
          }
        : {}),
      ...(!usePwaPrompt
        ? {
            experimental: {
              // When using `generateSW` strategy,
              // include custom directory and trailing slash handler.
              directoryAndTrailingSlashHandler: true,
            },
          }
        : {}),
    }),
    db(),
    mdx(),
    react(),
    sitemap(),
    starlight({
      customCss: ['./src/styles/global.css'],
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
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/withastro/starlight',
        },
      ],
      title: 'Astro Starlight PWA with Tailwind',
    }),
  ],
  vite: {
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
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
