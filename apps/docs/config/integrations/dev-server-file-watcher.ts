// https://github.com/withastro/docs/blob/main/config/integrations/dev-server-file-watcher.ts

import type { AstroIntegration } from 'astro';
import glob from 'fast-glob';

/**
 * Astro integration that registers the passed paths so that saving them
 * triggers a dev server restart. It also supports passing glob patterns to
 * watch a set of files matching a specific pattern.
 *
 * @example
 *   // astro.config.mjs
 *   export default {
 *     integrations: [devServerFileWatcher(['./src/content/*.mdx'])],
 *   };
 *
 * @param paths Array of file paths relative to the project root.
 */
export const devServerFileWatcher = (paths: string[]) =>
  ({
    name: 'dev-server-file-watcher',
    hooks: {
      async 'astro:config:setup'({ addWatchFile, config }) {
        for (const path of paths) {
          const files = await glob(path);
          files.forEach((file: string | URL) => {
            addWatchFile(new URL(file, config.root));
          });
        }
      },
    },
  }) satisfies AstroIntegration;
