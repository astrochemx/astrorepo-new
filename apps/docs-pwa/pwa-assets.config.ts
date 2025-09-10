import { readFile } from 'node:fs/promises';

import {
  type AssetType,
  createAppleSplashScreens,
  defineConfig,
  minimal2023Preset,
  type Preset,
  type ResolvedAssetSize,
} from '@vite-pwa/assets-generator/config';

export const _minimalPreset: Preset = {
  transparent: {
    favicons: [[48, 'favicon.ico']],
    // padding: 0.05,
    sizes: [64, 192, 512],
  },
  maskable: {
    // padding: 0.3,
    sizes: [512],
  },
  apple: {
    // padding: 0.3,
    sizes: [180],
  },
};

export function _defaultAssetName(type: AssetType, size: ResolvedAssetSize) {
  switch (type) {
    case 'apple':
      return `apple-touch-icon-${size.width}x${size.height}.png`;
    case 'maskable':
      return `maskable-icon-${size.width}x${size.height}.png`;
    case 'transparent':
      return `pwa-${size.width}x${size.height}.png`;
  }
}

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  images: ['public/favicon.svg'],
  logLevel: 'info',
  manifestIconsEntry: true,
  overrideAssets: true,
  preset: {
    ...minimal2023Preset,
    png: {
      compressionLevel: 7,
      quality: 75,
    },
    appleSplashScreens: createAppleSplashScreens(
      {
        async darkImageResolver(imageName) {
          return imageName === 'public/favicon.svg'
            ? await readFile('public/splash-dark.svg')
            : undefined;
        },
        darkResizeOptions: { background: 'black', fit: 'contain' },
        linkMediaOptions: { addMediaScreen: true, basePath: '/', log: true, xhtml: true },
        name: (landscape, size, dark) => {
          return `apple-splash-${landscape ? 'landscape' : 'portrait'}-${typeof dark === 'boolean' ? (dark ? 'dark-' : 'light-') : ''}${size.width}x${size.height}.png`;
        },
        png: {
          compressionLevel: 7,
          quality: 75,
        },
        resizeOptions: { background: 'white', fit: 'contain' },
      },
      [
        'iPad Pro 12.9"',
        'iPad Pro 11"',
        'iPad Pro 10.5"',
        'iPad Pro 9.7"',
        'iPad Air 13"',
        'iPad Air 11"',
        'iPad Air 10.9"',
        'iPad Air 10.5"',
        'iPad Air 9.7"',
        'iPad 11"',
        'iPad 10.2"',
        'iPad 9.7"',
        'iPad mini 8.3"',
        'iPad mini 7.9"',
        'iPhone 16 Pro Max',
        'iPhone 16 Pro',
        'iPhone 16 Plus',
        'iPhone 16',
        'iPhone 16e',
        'iPhone 15 Pro Max',
        'iPhone 15 Pro',
        'iPhone 15 Plus',
        'iPhone 15',
        'iPhone 14 Pro Max',
        'iPhone 14 Pro',
        'iPhone 14 Plus',
        'iPhone 14',
        'iPhone 13 Pro Max',
        'iPhone 13 Pro',
        'iPhone 13',
        'iPhone 13 mini',
        'iPhone 12 Pro Max',
        'iPhone 12 Pro',
        'iPhone 12',
        'iPhone 12 mini',
        'iPhone 11 Pro Max',
        'iPhone 11 Pro',
        'iPhone 11',
        'iPhone XS Max',
        'iPhone XS',
        'iPhone XR',
        'iPhone X',
        'iPhone 8 Plus',
        'iPhone 8',
        'iPhone 7 Plus',
        'iPhone 7',
        'iPhone 6s Plus',
        'iPhone 6s',
        'iPhone 6 Plus',
        'iPhone 6',
        'iPhone SE 4.7"',
        'iPhone SE 4"',
        'iPod touch 5th generation and later',
      ],
    ),
  },
});
