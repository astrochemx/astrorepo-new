import { writeFile } from 'node:fs/promises';
import { green } from 'ansis';
import type { Linter } from 'eslint';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { astro, command, javascript, typescript } from '../src/configs';
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
  javascript(),
  typescript(),
);

const configNames = configs.map((i) => i.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs as Linter.Config[], {
  includeAugmentation: false,
  exportTypeName: 'RuleOptions',
  filterPlugin(name: string) {
    return !['module-interop', 'sxzz', 'svelte', 'vue'].includes(name);
  },
});

dts += `\n
// Names of all the Configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(' | ')}
`;

await writeFile('src/typegen.d.ts', dts);

console.log(green('Type definitions are generated!'));
