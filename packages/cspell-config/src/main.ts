/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: noTemplateCurly */

import { createRequire } from 'node:module';
import path from 'node:path';
import { type CSpellSettings, defineConfig } from 'cspell';
import { ignores } from './ignores';

const require = createRequire(import.meta.dirname);

export const cspellConfig: CSpellSettings = defineConfig({
  version: '0.2',
  dictionaryDefinitions: [
    {
      name: 'prebuilt-words',
      path: path.resolve(import.meta.dirname, '..', 'words.txt'),
      addWords: false,
    },
    {
      name: 'spelling',
      path: '${cwd}/spelling.txt',
      addWords: true,
    },
  ],
  dictionaries: [
    'en-gb',
    'medical terms',
    'prebuilt-words',
    'scientific-terms-gb',
    'scientific-terms-us',
    'spelling',
    'uk-ua',
  ],
  enabledFileTypes: {
    '*': true,
  },
  enabledLanguageIds: ['*'],
  import: [
    require.resolve('@cspell/dict-en-gb/cspell-ext.json'),
    require.resolve('@cspell/dict-medicalterms/cspell-ext.json'),
    require.resolve('@cspell/dict-scientific-terms-gb/cspell-ext.json'),
    require.resolve('@cspell/dict-scientific-terms-us/cspell-ext.json'),
    require.resolve('@cspell/dict-uk-ua/cspell-ext.json'),
  ],
  language: 'en, en-US, en-GB, uk',
  ignorePaths: [...ignores, '${cwd}/spelling.txt'],
} as const satisfies CSpellSettings);
