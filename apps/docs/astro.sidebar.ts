// https://github.com/withastro/docs/blob/main/astro.sidebar.ts

import type { StarlightUserConfig } from '@astrojs/starlight/types';
import { group } from './config/sidebar';

/**
 * Starlight sidebar configuration object for the global site sidebar.
 *
 * - Top-level groups become tabs.
 * - Use the `group()` utility function to define groups. This uses labels from
 *   our `src/content/nav/*.ts` files instead of defining labels and
 *   translations inline.
 */
export const sidebar = [
  group('section-1', {
    autogenerate: {
      directory: 'section-1',
    },
  }),
] satisfies StarlightUserConfig['sidebar'];
