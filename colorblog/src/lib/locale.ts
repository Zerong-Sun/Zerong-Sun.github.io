import { ui as zh } from '../i18n/zh';
import { ui as en } from '../i18n/en';
import type { UiDict } from '../i18n/zh';

export type Locale = 'zh' | 'en';

const dicts: Record<Locale, UiDict> = { zh, en };

export function getLocaleFromUrl(url: URL): Locale {
  const seg = url.pathname.split('/').filter(Boolean)[0];
  return seg === 'en' ? 'en' : 'zh';
}

export function t(locale: Locale): UiDict {
  return dicts[locale];
}

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'en') {
    if (normalized === '/') return '/en/';
    return `/en${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
  }
  if (normalized.startsWith('/en/')) {
    const stripped = normalized.replace(/^\/en/, '') || '/';
    return stripped.endsWith('/') ? stripped : `${stripped}/`;
  }
  return normalized.endsWith('/') ? normalized : `${normalized}/`;
}

export function switchLocalePath(currentPath: string, target: Locale): string {
  const current = getLocaleFromUrl(new URL(currentPath, 'http://local'));
  if (current === target) return currentPath;
  if (target === 'en') {
    if (currentPath === '/' || currentPath === '') return '/en/';
    if (currentPath.startsWith('/en/')) return currentPath;
    return `/en${currentPath.endsWith('/') ? currentPath : `${currentPath}/`}`;
  }
  // target zh
  if (!currentPath.startsWith('/en')) return currentPath;
  const stripped = currentPath.replace(/^\/en/, '') || '/';
  return stripped.endsWith('/') ? stripped : `${stripped}/`;
}

export const categoryKeys = ['food', 'travel', 'cooking', 'essay'] as const;
export type CategoryKey = (typeof categoryKeys)[number];

export function isCategoryKey(key: string): key is CategoryKey {
  return (categoryKeys as readonly string[]).includes(key);
}
