import type {} from '@astrojs/starlight/schema';
import type {} from '@astrojs/starlight/types';
import type {} from '@astrojs/starlight/virtual.d.ts';
import type {} from 'astro/client';
import type {} from 'vite-plugin-pwa/info';
import type {} from 'vite-plugin-pwa/vanillajs';
import type {} from '../.astro/types.d.ts';

declare namespace App {
  type StarlightLocals = import('@astrojs/starlight').StarlightLocals;
  // Define the `locals.t` object in the context of a plugin.
  type Locals = StarlightLocals;
}

declare namespace StarlightApp {
  type UIStrings = typeof import('./content/i18n/en.json');
  type I18n = UIStrings;
}
