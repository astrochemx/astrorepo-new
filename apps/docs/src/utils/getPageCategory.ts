// https://github.com/withastro/docs/blob/main/src/util/getPageCategory.ts

/**
 * Order is important here. Pages are tested to see if they _start_ with one of
 * these paths and will return early when one matches. This means more specific
 * paths need to be earlier in the array, e.g. `reference/errors/` before
 * `reference/`.
 */
const categories = [['section-1/', 'Section 1']] as const;

const defaultCategory = 'Section 1';

/**
 * @param url URL for the current page.
 * @returns The category for the current page as used by Algolia DocSearch to
 *   group search results.
 */
export function getPageCategory(url: { pathname: string }) {
  const langAgnosticPath = url.pathname.replace(/\/\w\w(-\w\w)?\//, '');
  for (const [path, label] of categories) {
    if (langAgnosticPath.startsWith(path)) return label;
  }
  return defaultCategory;
}
