import rehypeExternalLinksPlugin, {
  type CreateProperties,
  type Options,
} from 'rehype-external-links';
import { visit } from 'unist-util-visit';

const rehypeExternalLinksOptions = {
  rel: ['nofollow', 'noreferrer', 'noopener'],
  content: (el: Parameters<CreateProperties>[0]) => {
    let hasImage = false;
    // @ts-expect-error: return
    visit(el, 'element', (childNode) => {
      if (childNode.tagName === 'img') {
        hasImage = true;
        return false;
      }
    });
    if (hasImage) return null;
    return {
      type: 'text',
      value: '↗',
    };
  },
  contentProperties: (el: Parameters<CreateProperties>[0]) => {
    let hasImage = false;
    // @ts-expect-error: return
    visit(el, 'element', (childNode) => {
      if (childNode.tagName === 'img') {
        hasImage = true;
        return false;
      }
    });
    if (hasImage) return null;
    return {
      'u-i-carbon-arrow-up-right': true,
      'className': ['new-tab-icon'],
      'aria-hidden': 'true',
    };
  },
  properties: (el: Parameters<CreateProperties>[0]) => {
    const props: ReturnType<CreateProperties> = {};
    const href = el.properties['href'];
    if (!href || typeof href !== 'string') return props;
    props['target'] = '_blank';
    props['ariaLabel'] = 'Open in new tab';
    return props;
  },
} as const satisfies Options;

export function rehypeExternalLinks() {
  return rehypeExternalLinksPlugin(rehypeExternalLinksOptions);
}
