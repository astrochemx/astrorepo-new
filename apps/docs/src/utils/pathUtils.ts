// https://github.com/withastro/starlight/blob/main/packages/starlight/utils/path.ts
// https://github.com/withastro/docs/blob/main/src/util/path-utils.ts

/** Ensure the passed path starts with a leading slash. */
function ensureLeadingSlash(href: string): string {
  if (!href.startsWith('/')) href = `/${href}`;
  return href;
}

/** Ensure the passed path ends with a trailing slash. */
function ensureTrailingSlash(href: string): string {
  if (!href.endsWith('/')) href += '/';
  return href;
}

/** Ensure the passed path starts and ends with slashes. */
function ensureLeadingAndTrailingSlashes(href: string): string {
  href = ensureLeadingSlash(href);
  href = ensureTrailingSlash(href);
  return href;
}

/** Ensure the passed path does not start with a leading slash. */
function stripLeadingSlash(href: string) {
  if (href.startsWith('/')) href = href.slice(1);
  return href;
}

/** Ensure the passed path does not end with a trailing slash. */
function stripTrailingSlash(href: string) {
  if (href.endsWith('/')) href = href.slice(0, -1);
  return href;
}

/** Ensure the passed path does not start and end with slashes. */
export function stripLeadingAndTrailingSlashes(href: string): string {
  href = stripLeadingSlash(href);
  href = stripTrailingSlash(href);
  return href;
}

/** Remove the extension from a path. */
function stripHtmlExtension(path: string) {
  const pathWithoutTrailingSlash = stripTrailingSlash(path);
  return pathWithoutTrailingSlash.endsWith('.html') ? pathWithoutTrailingSlash.slice(0, -5) : path;
}

/** Add '.html' extension to a path. */
function ensureHtmlExtension(path: string) {
  path = stripLeadingAndTrailingSlashes(path);
  if (!path.endsWith('.html')) {
    path = path ? `${path}.html` : '/index.html';
  }
  return ensureLeadingSlash(path);
}

/** Remove the extension from a path. */
function stripExtension(path: string) {
  const periodIndex = path.lastIndexOf('.');
  return path.slice(0, periodIndex > -1 ? periodIndex : undefined);
}

function getLanguageFromURL(pathname: string) {
  const langCodeMatch = /\/([a-z]{2}-?[a-z]{0,2})\//.exec(pathname);
  return langCodeMatch ? langCodeMatch[1] : 'en';
}

/** Remove \ and / from beginning of string */
function removeLeadingSlash(path: string) {
  return path.replace(/^[/\\]+/, '');
}

/** Remove \ and / from end of string */
function removeTrailingSlash(path: string) {
  return path.replace(/[/\\]+$/, '');
}

/**
 * Get a page's slug, without the language prefix (e.g. `'en/migrate'` =>
 * `'migrate'`).
 */
export const stripLangFromSlug = (slug: string) => slug.split('/').slice(1).join('/');

/** Get a page's lang tag from its slug (e.g. `'en/migrate'` => `'en'`). */
const getLangFromSlug = (slug: string) => slug.split('/')[0];
