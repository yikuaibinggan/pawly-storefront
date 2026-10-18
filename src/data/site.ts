/// <reference types="astro/client" />

export type Lang = 'en' | 'zh';

export type LocalizedString = Record<Lang, string>;
export type LocalizedList = Record<Lang, string[]>;

export const languages = ['en', 'zh'] as const;

export const site = {
  name: 'PAWLY',
  legalName: 'PAWLY Pet Goods',
  domain: 'https://pawly.example.com',
  email: 'hello@pawly.example',
  whatsappDisplay: '+1 (555) 010-2030',
  whatsappHref: 'https://wa.me/15550102030',
  address: {
    en: 'Portland, Oregon, USA',
    zh: '美国俄勒冈州波特兰'
  },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/pawly.pets' },
    { label: 'TikTok', href: 'https://tiktok.com/@pawly.pets' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/pawly' }
  ]
} as const;

const rawBase = import.meta.env.BASE_URL || '/';
export const basePath = rawBase === '/' ? '' : rawBase.replace(/\/+$/, '');

export function asset(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (!basePath || clean === basePath || clean.startsWith(`${basePath}/`)) return clean;
  return `${basePath}${clean}`;
}

function stripBase(path: string): string {
  if (!basePath) return path;
  if (path === basePath) return '/';
  if (path.startsWith(`${basePath}/`)) return path.slice(basePath.length);
  return path;
}

export function withLang(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const relative = stripBase(clean);
  const isNotFound = /^\/zh\/404\/?$/.test(relative) || /^\/404(?:\.html|\/)?$/.test(relative);
  const withoutZh = isNotFound ? '/' : relative.replace(/^\/zh(?=\/|$)/, '') || '/';
  const localized = lang === 'en' ? withoutZh : `/zh${withoutZh === '/' ? '/' : withoutZh}`;

  return asset(localized);
}

export function productPath(lang: Lang, slug: string): string {
  return withLang(lang, `/products/${slug}/`);
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'zh' : 'en';
}

export function formatDate(lang: Lang, value: Date): string {
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(value);
}
