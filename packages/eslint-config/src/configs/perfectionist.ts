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
import { pluginPerfectionist } from '../modules';

export async function perfectionist(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE];

  return [
    {
      files: files,
      name: 'perfectionist/plugin',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
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
          { type: 'natural', order: 'asc', newlinesBetween: 1 },
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
                elementNamePattern: '^(?:files)$',
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
