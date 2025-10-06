import type { FlatConfigItem } from './src/types';

import { defineConfig } from './src';

const config: ReturnType<typeof defineConfig> = defineConfig({
  astro: true,
  command: true,
  comments: true,
  compat: true,
  cspell: true,
  css: true,
  deMorgan: true,
  imports: true,
  jsdoc: true,
  json: true,
  jsonSchemaValidator: true,
  markdown: true,
  math: true,
  mdx: true,
  node: true,
  packageJSON: true,
  perfectionist: true,
  prettier: true,
  promise: true,
  react: true,
  regexp: true,
  security: true,
  toml: true,
  typescript: true,
  unicorn: true,
  unocss: true,
  vue: true,
  warnings: true,
  yaml: true,
}) satisfies Promise<FlatConfigItem[]>;

export default config;
