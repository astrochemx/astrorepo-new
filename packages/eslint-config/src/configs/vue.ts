import type { FlatConfigItem } from '../types';

import { GLOB_VUE } from '../globs';
import { pluginVue, pluginVueAlly, pluginVueI18n, pluginVueScopedCSS } from '../modules';

export async function vue(): Promise<FlatConfigItem[]> {
  const files = [GLOB_VUE];

  return [
    {
      name: 'vue/plugin',
      files: files,
      plugins: { vue: pluginVue },
    },
    {
      ...pluginVue.configs['flat/recommended'],
      name: 'vue/config',
      files: files,
    },
    {
      name: 'vue-a11y/plugin',
      files: files,
      plugins: { 'vuejs-accessibility': pluginVueAlly },
    },
    {
      ...pluginVueAlly.configs['flat/recommended'],
      name: 'vue-a11y/config',
      files: files,
    },
    {
      name: 'vue-scoped-css/plugin',
      files: files,
      plugins: { 'vue-scoped-css': pluginVueScopedCSS },
    },
    {
      ...pluginVueScopedCSS.configs['flat/recommended'],
      name: 'vue-scoped-css/config',
      files: files,
    },
    {
      name: 'vue-i18n/plugin',
      files: files,
      plugins: { '@intlify/vue-i18n': pluginVueI18n },
    },
    {
      ...pluginVueI18n.configs['flat/recommended'],
      name: 'vue-i18n/config',
      files: files,
    },
  ] satisfies FlatConfigItem[];
}
