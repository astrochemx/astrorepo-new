/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/pwa-assets" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/vanillajs" />
/// <reference types="../.astro/types.d.ts" />

declare namespace App {
  type StarlightLocals = import('@astrojs/starlight').StarlightLocals;
  // Define the `locals.t` object in the context of a plugin.
  type Locals = StarlightLocals;
}

declare namespace StarlightApp {
  type UIStrings = typeof import('./content/i18n/en.json');
  type I18n = UIStrings;
}

declare module 'virtual:pwa-register/react' {
  import type { Dispatch, SetStateAction } from 'react';
  import type { RegisterSWOptions } from 'vite-plugin-pwa/types';

  export type { RegisterSWOptions };

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: [boolean, Dispatch<SetStateAction<boolean>>];
    offlineReady: [boolean, Dispatch<SetStateAction<boolean>>];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}
