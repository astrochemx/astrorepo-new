/** biome-ignore-all assist/source/organizeImports: organizeImports */

export { default as pluginJS } from '@eslint/js';
export { default as parserAstro } from 'astro-eslint-parser';
export { default as gitignoreFlatConfig } from 'eslint-config-flat-gitignore';
export { default as pluginAstro } from 'eslint-plugin-astro';
export { default as pluginCommand } from 'eslint-plugin-command';
export { default as pluginCommandConfig } from 'eslint-plugin-command/config';
export { default as pluginJsxAlly } from 'eslint-plugin-jsx-a11y';
export { default as pluginPerfectionist } from 'eslint-plugin-perfectionist';
export { default as globals } from 'globals';

export {
  parser as parserTS,
  plugin as pluginTS,
  type ConfigArray as TSConfig,
  default as tsESLint,
} from 'typescript-eslint';
