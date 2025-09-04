// https://github.com/trueberryless-org/blog/blob/main/starlight/src/plugins/rehype/autolink-headings.ts

import { h } from 'hastscript';
import rehypeAutolinkHeadingsPlugin, { type Options } from 'rehype-autolink-headings';
import type { CreateProperties } from 'rehype-external-links';
import { visit } from 'unist-util-visit';

const rehypeAutolinkHeadingsOptions = {
  behavior: 'after',
  group: ({ tagName }: { tagName: string }) =>
    h('div', {
      tabIndex: -1,
      class: `heading-wrapper level-${tagName}`,
    }),
  properties: (el: Parameters<CreateProperties>[0]) => {
    let content = '';
    visit(el, 'text', (textNode) => {
      content += textNode.value;
    });
    return {
      'class': 'anchor-link',
      'tab-index': 0,
      'aria-hidden': 'false',
      'aria-label': content ? `Link to ${content}` : undefined,
      'data-pagefind-ignore': true,
    };
  },
  content: () => [AnchorLinkIcon],
} as const satisfies Options;

const AnchorLinkIcon = h(
  'span',
  {
    ariaHidden: 'true',
    class: 'anchor-icon',
  },
  h(
    'svg',
    {
      width: 16,
      height: 16,
      viewBox: '0 0 24 24',
    },
    h('path', {
      fill: 'currentColor',
      d: 'M11.02.02c.55.1.9.62.8 1.16l-.95 5.19h4.91L16.81.82a1 1 0 1 1 1.96.36l-.95 5.19H23a1 1 0 1 1 0 2h-5.55l-1.34 7.26h5.15a1 1 0 1 1 0 2h-5.52l-1.02 5.55a1 1 0 0 1-1.97-.36l.96-5.19H8.8l-1.03 5.55a1 1 0 1 1-1.96-.36l.95-5.19H1a1 1 0 0 1 0-2h6.13l1.34-7.26H3.32a1 1 0 0 1 0-2h5.52L9.86.82a1 1 0 0 1 1.16-.8Zm-.52 8.35-1.34 7.26h4.92l1.33-7.26h-4.9Z',
    }),
  ),
);

export function rehypeAutolinkHeadings() {
  return rehypeAutolinkHeadingsPlugin(rehypeAutolinkHeadingsOptions);
}
