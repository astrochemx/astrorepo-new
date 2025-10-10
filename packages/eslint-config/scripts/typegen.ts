import type { Linter } from 'eslint';

import { writeFile } from 'node:fs/promises';
import { styleText } from 'node:util';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';

import {
  astro,
  command,
  comments,
  compat,
  cspell,
  css,
  deMorgan,
  html,
  imports,
  javascript,
  jsdoc,
  json,
  jsonSchemaValidator,
  jsxA11y,
  markdown,
  math,
  mdx,
  node,
  packageJSON,
  perfectionist,
  pnpm,
  prettier,
  promise,
  react,
  regexp,
  security,
  sonar,
  tailwind,
  toml,
  typescript,
  unicorn,
  unocss,
  unusedImports,
  vue,
  yaml,
} from '../src/configs';
import { combine } from '../src/utils';

const configs = await combine(
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  astro(),
  command(),
  comments(),
  compat(),
  cspell(),
  css(),
  deMorgan(),
  html(),
  imports(),
  javascript(),
  jsdoc(),
  json(),
  jsonSchemaValidator(),
  jsxA11y(),
  markdown(),
  math(),
  mdx(),
  node(),
  packageJSON(),
  perfectionist(),
  pnpm(),
  prettier(),
  promise(),
  react(),
  regexp(),
  security(),
  sonar(),
  tailwind(),
  toml(),
  typescript(),
  unicorn(),
  unocss(),
  unusedImports(),
  vue(),
  yaml(),
);

const configNames = configs.map((i) => i.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs as Linter.Config[], {
  exportTypeName: 'RuleOptions',
  filterPlugin(name: string) {
    return !['module-interop', 'svelte', 'sxzz', 'vue'].includes(name);
  },
  includeAugmentation: false,
});

dts += `\n
// Names of all the Configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(' | ')}
`;

await writeFile('gen/typegen.d.ts', dts);

console.log(styleText('green', 'Type definitions are generated!'));
