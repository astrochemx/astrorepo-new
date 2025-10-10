import type { FlatConfigItem } from '../types';

import { hasPrettier } from '../env';
import { GLOB_HTML_ALL, GLOB_SRC_JTS, GLOB_XML_ALL } from '../globs';
import { loadPlugin } from '../utils';

const [parserHTML, pluginHTML, pluginHTMLScripts] = await Promise.all([
  loadPlugin<typeof import('@html-eslint/parser')>('@html-eslint/parser'),
  loadPlugin<typeof import('@html-eslint/eslint-plugin')>('@html-eslint/eslint-plugin'),
  loadPlugin<typeof import('eslint-plugin-html')>('eslint-plugin-html'),
] as const);

export async function html(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_HTML_ALL, GLOB_SRC_JTS];
  const filesHTML = [...GLOB_HTML_ALL];
  const filesScripts = [...GLOB_HTML_ALL, ...GLOB_XML_ALL];

  const usePrettier = hasPrettier();

  return [
    {
      name: 'html/plugin',
      files: files,
      plugins: {
        '@html-eslint': pluginHTML,
      },
    },
    {
      name: 'html/parser',
      files: filesHTML,
      language: '@html-eslint/html',
      languageOptions: {
        frontmatter: false,
        parser: parserHTML,
        parserOptions: {
          frontmatter: false,
          rawContentTags: ['markdown'],
          templateEngineSyntax: parserHTML.TEMPLATE_ENGINE_SYNTAX.HANDLEBAR,
        },
        rawContentTags: ['markdown'],
        templateEngineSyntax: parserHTML.TEMPLATE_ENGINE_SYNTAX.HANDLEBAR,
      },
    },
    {
      name: 'html/config',
      files: files,
      rules: {
        ...pluginHTML.configs['flat/recommended'].rules,
      },
    },
    {
      name: 'html/overrides',
      files: files,
      rules: {
        ...(usePrettier ? prettierRules : {}),
      },
    },
    {
      name: 'html-scripts/plugin',
      files: filesScripts,
      plugins: { 'html-scripts': pluginHTMLScripts },
      settings: {
        'html/html-extensions': [
          '.erb',
          '.handlebars',
          '.hbs',
          '.htm',
          '.html',
          '.mustache',
          '.nunjucks',
          '.php',
          '.tag',
          '.twig',
          '.we',
        ],
        'html/xml-extensions': ['.xhtm', '.xhtml', '.xml'],
      },
    },
  ] satisfies FlatConfigItem[];
}

const prettierRules = {
  '@html-eslint/attrs-newline': 'off',
  '@html-eslint/element-newline': 'off',
  '@html-eslint/id-naming-convention': 'off',
  '@html-eslint/indent': 'off',
  '@html-eslint/lowercase': 'off',
  '@html-eslint/max-element-depth': 'off',
  '@html-eslint/no-extra-spacing-attrs': 'off',
  '@html-eslint/no-multiple-empty-lines': 'off',
  '@html-eslint/no-trailing-spaces': 'off',
  '@html-eslint/quotes': 'off',
  '@html-eslint/sort-attrs': 'off',
} as const satisfies FlatConfigItem['rules'];
