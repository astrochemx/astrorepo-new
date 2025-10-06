import type { FlatConfigItem } from '@astrochemx/eslint-config';

import { defineConfig } from '@astrochemx/eslint-config';

export default [
  ...((await defineConfig({
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
  })) satisfies FlatConfigItem[]),
] as const satisfies FlatConfigItem[];
