/* eslint perfectionist/sort-objects: [
          'warn',
          {
            customGroups: [
              {
                elementNamePattern: '^(?:type)$',
                groupName: 'top1',
                selector: 'property',
              },
              {
                elementNamePattern: '^(?:order)$',
                groupName: 'top2',
                selector: 'property',
              },
            ],
            groups: ['top1', 'top2', 'unknown'],
            newlinesBetween: 'ignore',
            order: 'asc',
            type: 'natural',
          },
        ] */

import type { FlatConfigItem } from '../types';

import { GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE } from '../globs';
import { loadPlugin } from '../utils';

const pluginPerfectionist = await loadPlugin<typeof import('eslint-plugin-perfectionist')>(
  'eslint-plugin-perfectionist',
);

/** @see https://perfectionist.dev */
export async function perfectionist(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE];

  return [
    {
      files: files,
      name: 'perfectionist/plugin',
      plugins: { perfectionist: pluginPerfectionist },
    },
    {
      files: files,
      name: 'perfectionist/config',
      rules: {
        'perfectionist/sort-array-includes': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
        'perfectionist/sort-classes': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
        'perfectionist/sort-decorators': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-enums': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
        'perfectionist/sort-exports': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
        'perfectionist/sort-heritage-clauses': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-imports': [
          'warn',
          {
            type: 'natural',
            order: 'asc',
            groups: [
              'type-builtin',
              { newlinesBetween: 0 },
              ['type-external', 'type-import'],
              'value-builtin',
              { newlinesBetween: 0 },
              ['value-external', 'value-import'],
              'type-internal',
              'value-internal',
              ['type-parent', 'type-sibling', 'type-index'],
              ['value-parent', 'value-sibling', 'value-index'],
              'ts-equals-import',
              'unknown',
            ],
            newlinesBetween: 1,
            sortSideEffects: true,
          },
        ],
        'perfectionist/sort-interfaces': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
        'perfectionist/sort-intersection-types': [
          'warn',
          {
            type: 'natural',
            order: 'asc',
            groups: [
              'conditional',
              'function',
              'import',
              'intersection',
              'keyword',
              'literal',
              'named',
              'object',
              'operator',
              'tuple',
              'union',
              'nullish',
            ],
            newlinesBetween: 'ignore',
          },
        ],
        'perfectionist/sort-jsx-props': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
        'perfectionist/sort-maps': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
        'perfectionist/sort-modules': [
          'warn',
          {
            type: 'natural',
            order: 'asc',
            groups: [
              'unknown',
              'declare-enum',
              'export-enum',
              'enum',
              'declare-type',
              'export-type',
              'type',
              'declare-interface',
              'export-interface',
              'interface',
              'declare-class',
              'export-default-class',
              'export-class',
              'class',
              'declare-function',
              'export-default-function',
              'export-function',
              'function',
            ],
            newlinesBetween: 'ignore',
          },
        ],
        'perfectionist/sort-named-exports': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
        'perfectionist/sort-named-imports': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
        'perfectionist/sort-object-types': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
        'perfectionist/sort-objects': [
          'warn',
          {
            type: 'natural',
            order: 'asc',
            customGroups: [
              {
                elementNamePattern: '^(?:id|name|title)$',
                groupName: 'top1',
                selector: 'property',
              },
              {
                elementNamePattern: '^(?:files|ignores)$',
                groupName: 'top2',
                selector: 'property',
              },
            ],
            groups: ['top1', 'top2', 'unknown'],
            newlinesBetween: 'ignore',
          },
        ],
        'perfectionist/sort-sets': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
        'perfectionist/sort-switch-case': ['warn', { type: 'natural', order: 'asc' }],
        'perfectionist/sort-union-types': [
          'warn',
          {
            type: 'natural',
            order: 'asc',
            groups: [
              'conditional',
              'function',
              'import',
              'intersection',
              'keyword',
              'literal',
              'named',
              'object',
              'operator',
              'tuple',
              'union',
              'nullish',
            ],
            newlinesBetween: 'ignore',
          },
        ],
        'perfectionist/sort-variable-declarations': [
          'warn',
          { type: 'natural', order: 'asc', newlinesBetween: 'ignore' },
        ],
      },
    },
  ] satisfies FlatConfigItem[];
}
