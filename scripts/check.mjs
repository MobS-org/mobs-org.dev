import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const pages = [['index.html', 'ja'], ['en/index.html', 'en'], ['404.html', 'ja']];
for (const [name, lang] of pages) {
  const html = await readFile(resolve(root, name), 'utf8');
  assert(html.includes(`<html lang="${lang}">`), `${name}: missing page language`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${name}: expected one main heading`);
  assert(!/github2sbom/i.test(html), `${name}: excluded project must not appear`);
  assert(!/MobS-CLI|Mobs-Core|class="project-list"|brand-mark|brand-period|favicon\.svg/.test(html), `${name}: excluded component descriptions or unapproved branding`);
  assert(!/undefined|\[object Object\]/.test(html), `${name}: invalid generated content`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${name}: duplicate element IDs`);
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^https?:/.test(href)) { assert(href.startsWith('https://'), `${name}: insecure external URL ${href}`); continue; }
    if (href.startsWith('mailto:')) { assert.equal(href, 'mailto:contact@mobs-org.dev', `${name}: unexpected mail address ${href}`); continue; }
    if (href.startsWith('#')) { assert(ids.includes(href.slice(1)), `${name}: missing anchor ${href}`); continue; }
    let target = href.startsWith('/') ? resolve(root, `.${href}`) : resolve(dirname(resolve(root, name)), href);
    if (href.endsWith('/')) target = resolve(target, 'index.html');
    assert((await stat(target)).isFile(), `${name}: missing asset or page ${href}`);
  }
  if (name !== '404.html') {
    assert(html.includes(`/assets/social-${lang}.png"`), `${name}: social image does not match page language`);
    assert(html.includes('10.14923/transinfj.2025PDP0011'), `${name}: missing research citation`);
    for (const section of ['project', 'approach', 'research', 'support', 'team']) assert(ids.includes(section), `${name}: missing ${section}`);
    assert(html.includes('href="mailto:contact@mobs-org.dev"'), `${name}: missing contact address`);
    for (const handle of ['ikepe', 'Huyu2239']) assert(html.includes(`href="https://github.com/${handle}"`), `${name}: missing GitHub profile ${handle}`);
    assert(/<link rel="canonical"/.test(html), `${name}: missing canonical URL`);
    assert(/hreflang="ja"/.test(html) && /hreflang="en"/.test(html), `${name}: missing alternate languages`);
  }
}
for (const lang of ['ja', 'en']) await stat(resolve(root, `assets/social-${lang}.png`));
for (const name of ['_headers', 'robots.txt', 'sitemap.xml']) assert((await readFile(resolve(root, name), 'utf8')).length > 0);
console.log('Passed: bilingual pages, local links/assets, section navigation, research citation, team profiles and contact address, excluded content, and SEO files.');
