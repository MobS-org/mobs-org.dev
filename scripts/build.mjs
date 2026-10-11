import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { content } from '../src/content.mjs';
import { renderPage, renderNotFound } from '../src/template.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = new URL('../dist/', import.meta.url);
const siteUrl = new URL(process.env.SITE_URL || 'https://mobs-org-dev.pages.dev');
if (siteUrl.protocol !== 'https:' && siteUrl.protocol !== 'http:') throw new Error('SITE_URL must be an HTTP(S) URL.');
if (siteUrl.username || siteUrl.password || siteUrl.search || siteUrl.hash || siteUrl.pathname !== '/') throw new Error('SITE_URL must be an origin without a path, credentials, query or fragment.');
const origin = siteUrl.origin;

await rm(dist, { recursive: true, force: true });
await mkdir(new URL('assets/', dist), { recursive: true });
await cp(new URL('../src/assets/', import.meta.url), new URL('assets/', dist), { recursive: true });
const assetNames = {};
for (const extension of ['css', 'js']) {
  const source = await readFile(new URL(`../src/assets/site.${extension}`, import.meta.url));
  const hash = createHash('sha256').update(source).digest('hex').slice(0, 12);
  assetNames[extension] = `site.${hash}.${extension}`;
  await writeFile(new URL(`assets/${assetNames[extension]}`, dist), source);
}
for (const [lang, t] of Object.entries(content)) {
  const directory = new URL(`.${t.path}`, dist);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), renderPage(t, lang, origin, assetNames.css, assetNames.js));
}
await writeFile(new URL('404.html', dist), renderNotFound(content.ja, content.en, assetNames.css));
await cp(new URL('../src/_headers', import.meta.url), new URL('_headers', dist));
await writeFile(new URL('robots.txt', dist), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${Object.values(content).map((t) => `\n  <url><loc>${origin}${t.path}</loc><xhtml:link rel="alternate" hreflang="ja" href="${origin}/"/><xhtml:link rel="alternate" hreflang="en" href="${origin}/en/"/></url>`).join('')}\n</urlset>\n`);
console.log(`Built Japanese and English pages in ${root}dist for ${origin}`);
