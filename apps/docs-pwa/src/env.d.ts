/// <reference types="@astrojs/starlight/schema" />
/// <reference types="@astrojs/starlight/types" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/pwa-assets" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/vanillajs" />

import type {} from '../.astro/types.d.ts';
import type {} from '@astrojs/starlight/virtual.d.ts';

declare namespace App {
  type StarlightLocals = import('@astrojs/starlight').StarlightLocals;
  // Define the `locals.t` object in the context of a plugin.
  type Locals = StarlightLocals;
}

declare namespace StarlightApp {
  type UIStrings = typeof import('./content/i18n/en.json');
  type I18n = UIStrings;
}
