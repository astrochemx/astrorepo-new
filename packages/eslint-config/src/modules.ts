/** biome-ignore-all assist/source/organizeImports: organizeImports */

export * as parserAstro from 'astro-eslint-parser';

export { default as globals } from 'globals';
export { default as gitignoreFlatConfig } from 'eslint-config-flat-gitignore';
export { default as pluginCommandConfig } from 'eslint-plugin-command/config';

export { default as pluginJS } from '@eslint/js';
export { default as pluginAstro } from 'eslint-plugin-astro';
export { default as pluginCommand } from 'eslint-plugin-command';
export { default as pluginJSxAlly } from 'eslint-plugin-jsx-a11y';

export {
  type ConfigArray as TSConfig,
  default as tsESLint,
  parser as parserTS,
  plugin as pluginTS,
} from 'typescript-eslint';
