import type { StarlightUserConfig } from '@astrojs/starlight/types';

export const sidebar = [
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
] satisfies StarlightUserConfig['sidebar'];
