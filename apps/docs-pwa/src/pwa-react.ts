/** biome-ignore-all lint/correctness/useHookAtTopLevel: useHookAtTopLevel */

import { useRegisterSW } from 'virtual:pwa-register/react';

import { registerSWOptions } from './pwa-astro';

const updateServiceWorker = useRegisterSW(registerSWOptions);
