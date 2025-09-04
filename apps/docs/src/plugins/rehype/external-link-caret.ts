// https://github.com/trueberryless-org/blog/blob/main/starlight/src/plugins/rehype/external-link-caret.ts

import { visit } from 'unist-util-visit';
import astroConfig from '../../../astro.config'

/** Rehype plugin to append "^" to all external links */
export function rehypeExternalLinkCaret() {
  const domain = ['localhost', astroConfig.site];

  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
        const href = node.properties.href;

        const isExternal =
          href.startsWith('http') &&
          !domain.some((d) => href.includes(d)) &&
          !href.startsWith('/') &&
          !href.startsWith('#');

        const isGitHubProfile = /^https:\/\/github\.com\/[\w-]+\/?$/.test(href);

        if (isExternal && !isGitHubProfile && Array.isArray(node.children)) {
          node.children.push({
            type: 'element',
            tagName: 'span',
            properties: { className: ['external-link-tiny-caret'] },
            children: [{ type: 'text', value: '^' }],
          });
        }
      }
    });
  };
}

export default rehypeExternalLinkCaret;
