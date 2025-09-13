/* eslint-disable perfectionist/sort-switch-case */
/* eslint-disable perfectionist/sort-modules */

import type { OutgoingHttpHeaders } from 'node:http2';

import fs from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { normalize } from 'node:path';
import { Readable } from 'node:stream';

type ValueOf<T> = T[keyof T];

const BASE_URL = 'https://marketplace.visualstudio.com';
const GALLERY_URL = `${BASE_URL}/_apis/public/gallery`;
const INFO_URL = `${GALLERY_URL}/extensionquery`;

const PLATFORMS = [
  { label: 'Alpine Linux ARM64 (64-bit ARM)', value: 'alpine-arm64' },
  { label: 'Alpine Linux x64 (64-bit x86; x86-64/AMD64)', value: 'alpine-x64' },
  { label: 'Linux ARM32 (32-bit ARM)', value: 'linux-armhf' },
  { label: 'Linux ARM64 (64-bit ARM)', value: 'linux-arm64' },
  { label: 'Linux x64 (64-bit x86; x86-64/AMD64)', value: 'linux-x64' },
  { label: 'macOS ARM64 (64-bit ARM; Apple Silicon)', value: 'darwin-arm64' },
  { label: 'macOS x64 (64-bit x86; Intel)', value: 'darwin-x64' },
  { label: 'Windows ARM64 (64-bit ARM)', value: 'win32-arm64' },
  { label: 'Windows x64 (64-bit x86)', value: 'win32-x64' },
  { label: 'Windows x86 (32-bit x86)', value: 'win32-ia32' },
] as const;

type ExtensionPlatform = '' | (typeof PLATFORMS)[number]['value'];

type SemVerRelease = `${number}.${number}.${number}`;
type SemVerPreRelease = `${number}.${number}.${number}-${string}`;
type SemVer = SemVerPreRelease | SemVerRelease;

interface ExtensionInfo extends Extension {
  marketplaceLink?: URL;
  preReleaseVersion?: Version[] | undefined;
  releaseVersion?: Version[] | undefined;
  specificVersion?: Version[] | undefined;
}
const API_HEADERS = {
  'accept': 'application/json;api-version=3.0-preview.1',
  'accept-encoding': 'gzip',
  'content-type': 'application/json',
  'user-agent': 'vscode/1.102.0',
} as const satisfies OutgoingHttpHeaders;

/** One condition in a QueryFilter. */
export interface FilterCriteria {
  /** The FilterType defines how the filters are to be applied to the extensions. */
  filterType?: number;
  /** The value used in the match based on the filter type. */
  value?: string;
}

/**
 * PagingDirection is used to define which set direction to move the returned
 * result set based on a previous query.
 */
export const PagingDirection = {
  /** Backward will return results from earlier in the resultset. */
  Backward: 1,
  /** Forward will return results from later in the resultset. */
  Forward: 2,
} as const;

/** A filter used to define a set of extensions to return during a query. */
export interface QueryFilter {
  /**
   * The filter values define the set of values in this query. They are applied
   * based on the QueryFilterType.
   */
  criteria?: FilterCriteria[];
  /**
   * The PagingDirection is applied to a paging token if one exists. If not the
   * direction is ignored, and Forward from the start of the resultset is used.
   * Direction should be left out of the request unless a paging token is used
   * to help prevent future issues.
   */
  direction?: (typeof PagingDirection)[keyof typeof PagingDirection];
  /**
   * The page number requested by the user. If not provided `1` is assumed by
   * default.
   */
  pageNumber?: number;
  /**
   * The page size defines the number of results the caller wants for this
   * filter. The count can't exceed the overall query size limits. If not
   * provided `100` is assumed by default.
   */
  pageSize?: number;
  /**
   * The paging token is a distinct type of filter and the other filter fields
   * are ignored. The paging token represents the continuation of a previously
   * executed query. The information about where in the result and what fields
   * are being filtered are embedded in the token.
   */
  pagingToken?: string;
  /**
   * Defines the type of sorting to be applied on the results. The page slice is
   * cut of the sorted results only.
   */
  sortBy?: number;
  /**
   * Defines the order of sorting, `1` for Ascending, `2` for Descending, else
   * default ordering based on the `SortBy` value
   */
  sortOrder?: number;
}

export interface MarketRequestBody {
  assetTypes?: [] | null;
  filters?: {
    criteria?: {
      /** Default: `7` */
      filterType: ValueOf<typeof ExtensionQueryFilterType>;
      /** Default: `${publisher}.${name}` */
      value: string;
    }[];
    /** Default: `2` */
    direction?: number;
    /** Default: `1` */
    pageNumber?: number;
    /** Default: `100` */
    pageSize?: number;
    /** Default: `null` */
    pagingToken?: unknown;
    /** Default: `0` */
    sortBy?: number;
    /** Default: `0` */
    sortOrder?: number;
  }[];
  /**
   * @see https://github.com/microsoft/vscode-docs/issues/6006
   * @see https://github.com/microsoft/vsmarketplace/issues/238
   * @see https://gist.github.com/jossef/8d7681ac0c7fd28e93147aa5044bc129
   * @see https://www.reddit.com/r/vscode/comments/am1k1t/is_there_an_api_for_getting_list_of_all
   * @see https://github.com/microsoft/azure-devops-node-api/blob/master/api/interfaces/GalleryInterfaces.ts
   * @see https://github.com/microsoft/vscode/blob/main/src/vs/platform/extensionManagement/common/extensionGalleryService.ts
   */
  flags?: number;
}

export interface MarketResponseBody {
  results: Result[];
}

export interface Result {
  extensions: Extension[];
  pagingToken: unknown;
  resultMetadata: ResultMetadata[];
}

export interface Extension {
  categories?: string[];
  deploymentType?: number;
  displayName?: string;
  extensionId?: string;
  extensionName?: string;
  flags?: string;
  installationTargets?: InstallationTarget[];
  lastUpdated?: Date;
  publishedDate?: Date;
  publisher?: Publisher;
  releaseDate?: Date;
  shortDescription?: string;
  statistics?: Statistic[];
  tags?: string[];
  versions?: Version[];
}

export interface InstallationTarget {
  extensionVersion?: string;
  productArchitecture?: string;
  target?: string;
  targetPlatform?: string;
  targetVersion?: string;
}

export interface Publisher {
  displayName: string;
  domain: string;
  flags: string;
  isDomainVerified: boolean;
  publisherId: string;
  publisherName: string;
}

export interface Statistic {
  statisticName: string;
  value: number;
}

export interface Version {
  assetUri: string;
  fallbackAssetUri: string;
  files: File[];
  flags: Flags;
  lastUpdated: Date;
  properties: Property[];
  targetPlatform?: ExtensionPlatform;
  version: SemVer;
}

export type Flags = '' | 'none' | 'validated';

export interface File {
  assetType: ValueOf<typeof AssetType>;
  source: string;
}

const AssetType = {
  Changelog: 'Microsoft.VisualStudio.Services.Content.Changelog',
  CodeManifest: 'Microsoft.VisualStudio.Code.Manifest',
  Details: 'Microsoft.VisualStudio.Services.Content.Details',
  IconDefault: 'Microsoft.VisualStudio.Services.Icons.Default',
  IconSmall: 'Microsoft.VisualStudio.Services.Icons.Small',
  License: 'Microsoft.VisualStudio.Services.Content.License',
  Source: 'Microsoft.VisualStudio.Services.Links.Source',
  VsixManifest: 'Microsoft.VisualStudio.Services.VsixManifest',
  VSIXPackage: 'Microsoft.VisualStudio.Services.VSIXPackage',
  VsixSignature: 'Microsoft.VisualStudio.Services.VsixSignature',
} as const;

export interface Property {
  key: ValueOf<typeof PropertyType>;
  value: string;
}

const PropertyType = {
  EnabledApiProposals: 'Microsoft.VisualStudio.Code.EnabledApiProposals',
  EnableMarketplaceQnA: 'Microsoft.VisualStudio.Services.EnableMarketplaceQnA',
  Engine: 'Microsoft.VisualStudio.Code.Engine',
  ExecutesCode: 'Microsoft.VisualStudio.Code.ExecutesCode',
  ExtensionDependencies: 'Microsoft.VisualStudio.Code.ExtensionDependencies',
  ExtensionKind: 'Microsoft.VisualStudio.Code.ExtensionKind',
  ExtensionPack: 'Microsoft.VisualStudio.Code.ExtensionPack',
  Getstarted: 'Microsoft.VisualStudio.Services.Links.Getstarted',
  GitHub: 'Microsoft.VisualStudio.Services.Links.GitHub',
  GitHubFlavoredMarkdown: 'Microsoft.VisualStudio.Services.GitHubFlavoredMarkdown',
  Learn: 'Microsoft.VisualStudio.Services.Links.Learn',
  LocalizedLanguages: 'Microsoft.VisualStudio.Code.LocalizedLanguages',
  PreRelease: 'Microsoft.VisualStudio.Code.PreRelease',
  Pricing: 'Microsoft.VisualStudio.Services.Content.Pricing',
  Private: 'PrivateMarketplace',
  Source: 'Microsoft.VisualStudio.Services.Links.Source',
  SponsorLink: 'Microsoft.VisualStudio.Code.SponsorLink',
  Support: 'Microsoft.VisualStudio.Services.Links.Support',
  WebExtension: 'Microsoft.VisualStudio.Code.WebExtension',
} as const;

export interface ResultMetadata {
  metadataItems: MetadataItem[];
  metadataType: string;
}

export interface MetadataItem {
  count: number;
  name: string;
}

/* eslint-disable perfectionist/sort-objects */
const ExtensionQueryFilterType = {
  tag: 1,
  displayName: 2,
  private: 3,
  id: 4,
  category: 5,
  contributionType: 6,
  name: 7,
  installationTarget: 8,
  featured: 9,
  searchText: 10,
  featuredInCategory: 11,
  excludeWithFlags: 12,
  includeWithFlags: 13,
  lcid: 14,
  installationTargetVersion: 15,
  installationTargetVersionRange: 16,
  vsixMetadata: 17,
  publisherName: 18,
  publisherDisplayName: 19,
  includeWithPublisherFlags: 20,
  organizationSharedWith: 21,
  productArchitecture: 22,
  targetPlatform: 23,
  extensionName: 24,
} as const;
/* eslint-enable perfectionist/sort-objects */

/* eslint-disable perfectionist/sort-objects */
const ExtensionQueryFlags = {
  none: 0,
  includeVersions: 1,
  includeFiles: 2,
  includeCategoryAndTags: 4,
  includeSharedAccounts: 8,
  includeVersionProperties: 16,
  excludeNonValidated: 32,
  includeInstallationTargets: 64,
  includeAssetUri: 128,
  includeStatistics: 256,
  includeLatestVersionOnly: 512,
  useFallbackAssetUri: 1024,
  includeMetadata: 2048,
  includeMinimalPayloadForVsIde: 4096,
  includeLcids: 8192,
  includeSharedOrganizations: 16_384,
  includeNameConflictInfo: 32_768,
  allAttributes: 16_863,
} as const;
/* eslint-enable perfectionist/sort-objects */

const getExtensionInfo = async (
  id: string,
  version?: 'prerelease' | 'release' | SemVer,
): Promise<ExtensionInfo | undefined> => {
  const [publisher, name] = id.trim().split('.');
  const marketplaceLink = new URL(`https://marketplace.visualstudio.com/items?itemName=${id}`);

  const body: BodyInit = JSON.stringify({
    assetTypes: [],
    filters: [
      {
        criteria: [
          { filterType: 7, value: `${publisher}.${name}` },
          // { filterType: 8, value: "Microsoft.VisualStudio.Code" },
          // { filterType: 10, value: '' },
        ],
        pageNumber: 1,
        pageSize: 100,
      },
    ],
    flags:
      ExtensionQueryFlags.includeAssetUri |
      ExtensionQueryFlags.includeFiles |
      ExtensionQueryFlags.includeInstallationTargets |
      // ExtensionQueryFlags.includeLatestVersionOnly |
      ExtensionQueryFlags.includeVersionProperties,
  } satisfies MarketRequestBody);

  const request = new Request(INFO_URL, {
    body: body,
    headers: { ...API_HEADERS, 'content-length': String(body.length) },
    method: 'POST',
  });

  const response = await fetch(request);
  const responseBody = (await response.json()) as MarketResponseBody;
  const extensionInfoBase = responseBody.results[0]?.extensions[0];

  if (!extensionInfoBase) {
    return;
  }

  const specificVersion = getVersion(extensionInfoBase, version);
  const releaseVersion = getVersion(extensionInfoBase, 'release');
  const preReleaseVersion = getVersion(extensionInfoBase, 'prerelease');

  return {
    ...extensionInfoBase,
    marketplaceLink,
    preReleaseVersion,
    releaseVersion,
    specificVersion,
  } satisfies ExtensionInfo;
};

const getVersion = (
  extension: Extension,
  version: 'prerelease' | 'release' | SemVer = 'release',
): Version[] | undefined => {
  if (!extension?.versions) {
    return;
  }

  if (version !== 'release' && version !== 'prerelease') {
    return extension.versions.filter((v) => v.version === version);
  }

  const versionInfo = extension.versions.find((v) => {
    switch (version) {
      case 'prerelease':
        return v.properties.some(
          (p) => p.key === 'Microsoft.VisualStudio.Code.PreRelease' && p.value === 'true',
        );
      default:
        return !v.properties.some(
          (p) => p.key === 'Microsoft.VisualStudio.Code.PreRelease' && p.value === 'true',
        );
    }
  }) satisfies Version | undefined;

  if (!versionInfo) {
    return;
  }

  return versionInfo.targetPlatform
    ? extension.versions.filter((v) => v.version === versionInfo?.version)
    : [versionInfo];
};

const downloadExtensions = async (
  id: string,
  platform?: ExtensionPlatform | ExtensionPlatform[],
  version: 'prerelease' | 'release' | SemVer = 'release',
) => {
  const extensionInfo = await getExtensionInfo(id, version);

  if (!extensionInfo) {
    return;
  }

  const extPublisher = extensionInfo.publisher?.publisherName;
  const extName = extensionInfo.extensionName;
  const extVersion = (() => {
    switch (version) {
      case 'release':
        return extensionInfo.releaseVersion ?? extensionInfo.preReleaseVersion ?? undefined;
      case 'prerelease':
        return extensionInfo.preReleaseVersion ?? extensionInfo.releaseVersion ?? undefined;
      default:
        return extensionInfo.specificVersion;
    }
  })();

  let downloadUrls = [
    `${GALLERY_URL}/publishers/${extPublisher}/vsextensions/${extName}/${extVersion?.[0]?.version}/vspackage`,
  ];

  if (extVersion?.[0]?.targetPlatform || (extVersion?.[0]?.targetPlatform && platform)) {
    downloadUrls = platform
      ? typeof platform === 'string'
        ? [`${downloadUrls[0]}?targetPlatform=${platform}`]
        : platform.map((p) => `${downloadUrls[0]}?targetPlatform=${p}`)
      : extVersion.map((v) => `${downloadUrls[0]}?targetPlatform=${v.targetPlatform}`);
  }

  console.dir(`Download Urls:\n${downloadUrls.join('\n')}`);

  const dir = normalize(`${import.meta.dirname}/vsix/`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const url of downloadUrls) {
    const response = await fetch(url, { headers: API_HEADERS, method: 'GET' });

    if (!response.ok) {
      console.log('ERROR');
      return;
    }

    if (response.ok && response.body) {
      const fileName = response.headers
        ?.get('content-disposition')
        ?.split(';')[1]
        ?.trim()
        .replace('filename=', '')
        .replaceAll("'", '')
        .replaceAll('"', '');

      console.dir(`File Name: ${fileName}`);

      if (!fileName) {
        console.log('ERROR');
        return;
      }

      // @ts-expect-error: types
      const stream = Readable.fromWeb(response.body);
      await writeFile(`${dir}/${fileName}`, stream);
    }
  }
};

await downloadExtensions('oxc.oxc-vscode', undefined, '1.3.0');
