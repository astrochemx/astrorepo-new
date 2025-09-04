import { defineConfig, type FlatConfigItem } from '@astrochemx/eslint-config';

export default [
  ...((await defineConfig({
    astro: true,
    command: true,
    typescript: true,
  })) satisfies FlatConfigItem[]),
] as const satisfies FlatConfigItem[];
