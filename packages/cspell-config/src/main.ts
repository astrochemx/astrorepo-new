/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: noTemplateCurly */

import type { CSpellSettings } from 'cspell';

import { createRequire } from 'node:module';
import path from 'node:path';
import { defineConfig } from 'cspell';

import { ignores } from './ignores';

const require = createRequire(import.meta.dirname);

export const cspellConfig: CSpellSettings = defineConfig({
  dictionaries: [
    'en-gb',
    'medical terms',
    'prebuilt-words',
    'scientific-terms-gb',
    'scientific-terms-us',
    'spelling',
    'uk-ua',
  ],
  dictionaryDefinitions: [
    {
      name: 'prebuilt-words',
      addWords: false,
      path: path.resolve(import.meta.dirname, '..', 'words.txt'),
    },
    {
      name: 'spelling',
      addWords: true,
      path: '${cwd}/spelling.txt',
    },
  ],
  enabledFileTypes: {
    '*': true,
  },
  enabledLanguageIds: ['*'],
  ignorePaths: [...ignores, '${cwd}/spelling.txt'],
  import: [
    require.resolve('@cspell/dict-en-gb/cspell-ext.json'),
    require.resolve('@cspell/dict-medicalterms/cspell-ext.json'),
    require.resolve('@cspell/dict-scientific-terms-gb/cspell-ext.json'),
    require.resolve('@cspell/dict-scientific-terms-us/cspell-ext.json'),
    require.resolve('@cspell/dict-uk-ua/cspell-ext.json'),
  ],
  language: 'en, en-US, en-GB, uk',
  version: '0.2',
} as const satisfies CSpellSettings);
