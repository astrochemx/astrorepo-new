// https://github.com/withastro/docs/blob/main/src/util/isSubPage.ts

import { getPageCategory } from './getPageCategory';

/**
 * Map of category names to the parent page for the category. Pages in these
 * categories are not visible in the sidebar, so we highlight the parent
 * instead.
 *
 * @example
 *   const categoryParents: Partial<
 *     Record<ReturnType<typeof getPageCategory>, string>
 *   > = {
 *     'Error Reference': 'reference/error-reference',
 *   };
 */
const categoryParents: Partial<Record<ReturnType<typeof getPageCategory>, string>> = {};

/**
 * Test if `currentPage` is considered a sub-page of `parentSlug`.
 *
 * @param currentPage The full slug for the current page, e.g. `'en/guides/rss'`
 * @param parentSlug The language-less slug for the parent to test against, e.g.
 *   `'guides/content-collections'`
 */
export function isSubPage(currentPage: string, parentSlug: string): boolean {
  const category = getPageCategory({ pathname: `/${currentPage}/` });
  return categoryParents[category] === parentSlug;
}
