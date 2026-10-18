import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = 'dist';
const siteBase = process.env.PUBLIC_SITE_URL || 'https://pawly.example.com';
const siteOrigin = new URL(siteBase).origin;
const basePath = (process.env.PUBLIC_BASE_PATH || '/').replace(/^\/+|\/+$/g, '');
const errors = [];
const warnings = [];
const pages = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    else if (entry.name.endsWith('.html')) pages.push(fullPath);
  }
}

await walk(root);

function resolveLocal(urlValue) {
  if (!urlValue) return null;
  if (
    urlValue.startsWith('mailto:') ||
    urlValue.startsWith('tel:') ||
    urlValue.startsWith('#') ||
    urlValue.startsWith('data:')
  ) {
    return null;
  }
  const url = new URL(urlValue, siteBase);
  if (url.origin !== siteOrigin) return null;

  let pathname = decodeURIComponent(url.pathname);
  if (basePath) {
    const prefix = `/${basePath}`;
    if (pathname === prefix) pathname = '/';
    else if (pathname.startsWith(`${prefix}/`)) pathname = pathname.slice(prefix.length);
  }

  if (pathname === '/') return join(root, 'index.html');
  if (pathname.endsWith('/')) return join(root, pathname.slice(1), 'index.html');
  const last = pathname.split('/').pop() ?? '';
  if (!last.includes('.')) return join(root, pathname.slice(1), 'index.html');
  return join(root, pathname.slice(1));
}

for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const pageName = relative(root, page).replaceAll('\\', '/');
  const langMatch = html.match(/<html[^>]*lang="([^"]+)"/);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((match) => match[1]);

  if (!langMatch) errors.push(`${pageName}: missing html lang`);
  if (!title) errors.push(`${pageName}: missing title`);
  if (!description) errors.push(`${pageName}: missing meta description`);
  if (!canonical) errors.push(`${pageName}: missing canonical`);
  for (const required of ['en', 'zh-CN', 'x-default']) {
    if (!hreflangs.includes(required)) errors.push(`${pageName}: missing hreflang ${required}`);
  }

  for (const match of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const target = resolveLocal(match[1]);
    if (!target) continue;
    try {
      await stat(target);
    } catch {
      errors.push(`${pageName}: broken link ${match[1]}`);
    }
  }

  for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const target = resolveLocal(match[1]);
    if (!target) continue;
    try {
      await stat(target);
    } catch {
      errors.push(`${pageName}: missing image ${match[1]}`);
    }
  }

  const images = [...html.matchAll(/<img\b[^>]*>/g)];
  for (const image of images) {
    if (!image[0].includes('alt=')) warnings.push(`${pageName}: image without alt attribute`);
  }
}

const sitemap = await readFile(join(root, 'sitemap-index.xml'), 'utf8').catch(() => '');
if (!sitemap) errors.push('missing sitemap-index.xml');

const robots = await readFile(join(root, 'robots.txt'), 'utf8').catch(() => '');
if (!robots) errors.push('missing robots.txt');

console.log(`PAGES=${pages.length}`);
console.log(`ERRORS=${errors.length}`);
console.log(`WARNINGS=${warnings.length}`);
for (const error of errors) console.log(`ERROR ${error}`);
for (const warning of warnings.slice(0, 20)) console.log(`WARN ${warning}`);
