import type { FlatConfigItem } from '../types';

import { GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE } from '../globs';
import { pluginPerfectionist } from '../modules';

export async function perfectionist(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE];

  return [
    {
      ...pluginPerfectionist.configs['recommended-natural'],
      files: files,
      name: 'perfectionist/plugin',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-array-includes': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-classes': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-decorators': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-enums': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-exports': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-heritage-clauses': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-imports': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-interfaces': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-intersection-types': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-jsx-props': ['off', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-maps': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-modules': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-named-exports': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-named-imports': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-object-types': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-objects': ['off', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-sets': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-switch-case': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-union-types': ['off', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-variable-declarations': ['warn', { type: 'natural', order: 'asc' }],
      },
    },
  ] satisfies FlatConfigItem[];
}
