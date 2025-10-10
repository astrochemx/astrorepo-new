import { existsSync } from 'node:fs';
import path from 'node:path';
import { findUp } from 'find-up';

import type { FlatConfigItem } from '../types';

import { GLOB_SRC_ALL } from '../globs';
import { loadPlugin } from '../utils';

const cspellConfigPath = existsSync(
  path.normalize(path.resolve(process.cwd(), './cspell.config.mjs')),
)
  ? path.normalize(path.resolve(process.cwd(), './cspell.config.mjs'))
  : await findUp('cspell.config.mjs');

const cspellSpellingPath = existsSync(path.normalize(path.resolve(process.cwd(), './spelling.txt')))
  ? path.normalize(path.resolve(process.cwd(), './spelling.txt'))
  : await findUp('spelling.txt');

const [pluginCSpell, pluginCSpellConfigs] = await Promise.all([
  loadPlugin<typeof import('@cspell/eslint-plugin')>('@cspell/eslint-plugin'),
  loadPlugin<typeof import('@cspell/eslint-plugin/configs')>('@cspell/eslint-plugin/configs'),
] as const);

export async function cspell(): Promise<FlatConfigItem[]> {
  const files = GLOB_SRC_ALL.flat();

  return [
    {
      name: 'cspell/plugin',
      files: files,
      plugins: { ...pluginCSpellConfigs.recommended.plugins, '@cspell': pluginCSpell },
    },
    {
      ...pluginCSpellConfigs.recommended,
      name: 'cspell/config',
      files: files,
      plugins: {},
      rules: {
        ...pluginCSpellConfigs.recommended.rules,
        '@cspell/spellchecker': [
          'warn',
          {
            autoFix: false,
            checkComments: true,
            checkIdentifiers: true,
            checkJSXText: true,
            checkStrings: true,
            checkStringTemplates: true,
            cspellOptionsRoot: import.meta.url,
            generateSuggestions: true,
            ignoreImportProperties: true,
            ignoreImports: true,
            numSuggestions: 3,
            ...(cspellConfigPath
              ? {
                  // `configFile` property doesn't support `cspell.config.mjs` config,
                  // so we use `cspell` property and import `cspell.config.mjs` config.
                  // configFile: new URL("cspell.config.yaml", import.meta.url).toString(),
                  cspell: {
                    import: [cspellConfigPath],
                  },
                }
              : {}),
            ...(cspellSpellingPath
              ? {
                  customWordListFile: cspellSpellingPath,
                }
              : {}),
          },
        ],
      },
    },
  ] satisfies FlatConfigItem[];
}
