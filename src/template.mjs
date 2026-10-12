import { projectUrl, paperUrl, paperDoi, contactEmail } from './content.mjs';

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const lines = (values) => values.map((line) => `<span>${escapeHtml(line)}</span>`).join('');
const arrow = '<svg class="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg>';
const externalArrow = '<svg class="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.5"/></svg>';

function diagram(t) {
  return `<figure class="verification-figure">
    <img class="verification-image" src="/assets/dependency-verification.webp" width="1254" height="1254" alt="${escapeHtml(t.figureAlt)}">
  </figure>`;
}

const cards = (items, titleTag) => items.map((item) => `<article class="card"><p class="card-label">${escapeHtml(item.label)}</p><${titleTag} class="card-title">${escapeHtml(item.title)}</${titleTag}><p>${escapeHtml(item.body)}</p></article>`).join('');

function comparison(t) {
  const [, provides, remains] = t.compareHead;
  return `<div class="table-scroll"><table class="compare">
        <thead><tr>${t.compareHead.map((label) => `<th scope="col">${escapeHtml(label)}</th>`).join('')}</tr></thead>
        <tbody>${t.compareRows.map(([method, gives, open]) => `<tr><th scope="row">${escapeHtml(method)}</th><td data-label="${escapeHtml(provides)}">${escapeHtml(gives)}</td><td data-label="${escapeHtml(remains)}">${escapeHtml(open)}</td></tr>`).join('')}</tbody>
      </table></div>`;
}

function members(t) {
  return `<ul class="members">${t.team.map((member) => `<li class="member"><h3>${escapeHtml(member.name)}</h3><p class="member-role">${escapeHtml(member.role)}${member.note ? `<span>${escapeHtml(member.note)}</span>` : ''}</p><a class="text-link" href="https://github.com/${member.github}">GitHub: @${escapeHtml(member.github)}${externalArrow}</a></li>`).join('')}</ul>`;
}

function projectInformation(t) {
  return `<table class="project-information-table" aria-labelledby="project-information-label project-information-title"><tbody>${t.projectInformationRows.map(({ label, value, href }) => `<tr><th scope="row">${escapeHtml(label)}</th><td>${href ? `<a href="${escapeHtml(href)}">${escapeHtml(value)}</a>` : escapeHtml(value)}</td></tr>`).join('')}</tbody></table>`;
}

function head(t, lang, origin, cssFile, jsFile) {
  return `<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f8f9f5">
    <title>${escapeHtml(t.title)}</title>
    <meta name="description" content="${escapeHtml(t.description)}">
    <link rel="canonical" href="${origin}${t.path}">
    <link rel="alternate" hreflang="ja" href="${origin}/">
    <link rel="alternate" hreflang="en" href="${origin}/en/">
    <link rel="alternate" hreflang="x-default" href="${origin}/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="MobS">
    <meta property="og:locale" content="${lang === 'ja' ? 'ja_JP' : 'en_US'}">
    <meta property="og:locale:alternate" content="${lang === 'ja' ? 'en_US' : 'ja_JP'}">
    <meta property="og:title" content="${escapeHtml(t.title)}">
    <meta property="og:description" content="${escapeHtml(t.description)}">
    <meta property="og:url" content="${origin}${t.path}">
    <meta property="og:image" content="${origin}/assets/social-${lang}.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${escapeHtml(t.title)}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" href="/assets/${cssFile}">
    <script type="module" src="/assets/${jsFile}"></script>
  </head>`;
}

export function renderPage(t, lang, origin, cssFile, jsFile) {
  const ids = ['project', 'approach', 'research', 'support', 'team'];
  return `<!doctype html>
<html lang="${lang}">
${head(t, lang, origin, cssFile, jsFile)}
<body id="top">
  <a class="skip-link" href="#main">${escapeHtml(t.skip)}</a>
  <header class="site-header wrap">
    <a class="site-name" href="${t.path}">MobS</a>
    <nav class="main-nav" aria-label="${escapeHtml(t.navLabel)}">${t.nav.map((label, index) => `<a href="#${ids[index]}">${escapeHtml(label)}</a>`).join('')}</nav>
    <nav class="languages" aria-label="${escapeHtml(t.languageLabel)}"><a href="/" lang="ja" hreflang="ja" data-language${lang === 'ja' ? ' aria-current="page"' : ''}>JA</a><span aria-hidden="true">/</span><a href="/en/" lang="en" hreflang="en" data-language${lang === 'en' ? ' aria-current="page"' : ''}>EN</a></nav>
  </header>
  <main id="main">
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="status"><span class="status-dot" aria-hidden="true"></span>${escapeHtml(t.status)}</p>
        <p class="eyebrow">${t.eyebrow}</p>
        <h1 id="hero-title">${lines(t.heroLines)}</h1>
        <p class="hero-lead">${escapeHtml(t.heroLead)}</p>
        <div class="hero-actions"><a class="button button-dark" href="#project">${escapeHtml(t.primary)}${arrow}</a><a class="text-link" href="${paperUrl}">${escapeHtml(t.secondary)}${externalArrow}</a></div>
      </div>
      ${diagram(t)}
      <div class="hero-bottom"><span>${escapeHtml(t.scroll)}<span aria-hidden="true"> ↓</span></span><span class="mono">SBOM <i>+</i> BLOCKCHAIN <i>+</i> ZERO-KNOWLEDGE</span></div>
    </section>
    <section id="project" class="overview wrap section-space" aria-labelledby="project-title">
      <p class="section-kicker">${t.overviewKicker}</p>
      <div class="overview-intro"><h2 id="project-title">${lines(t.overviewTitle)}</h2><div class="overview-copy"><p class="section-lead">${escapeHtml(t.overviewLead)}</p><p>${escapeHtml(t.overviewBody)}</p><p class="why-now"><strong>${escapeHtml(t.whyNowLabel)}</strong>${escapeHtml(t.whyNow)}</p><p class="sources">${escapeHtml(t.sourcesLabel)}: ${t.sources.map((source) => `<a href="${source.url}">${escapeHtml(source.label)}</a>`).join(' / ')}</p></div></div>
      <h3 class="block-title">${escapeHtml(t.stakeholdersTitle)}</h3>
      <div class="cards">${cards(t.stakeholders, 'h4')}</div>
      <div class="verification-goal"><h3>${escapeHtml(t.goalTitle)}</h3><p>${escapeHtml(t.goalBody)}</p><p class="scope-note">${escapeHtml(t.scopeNote)}</p></div>
    </section>
    <section id="approach" class="approach-section wrap section-space" aria-labelledby="approach-title">
      <p class="section-kicker">${t.approachKicker}</p>
      <div class="overview-intro"><h2 id="approach-title">${lines(t.approachTitle)}</h2><div class="overview-copy"><p class="section-lead">${escapeHtml(t.approachLead)}</p></div></div>
      <div class="cards cards-two">${cards(t.approachItems, 'h3')}</div>
      <h3 class="block-title">${escapeHtml(t.compareTitle)}</h3>
      ${comparison(t)}
      <p class="compare-note">${escapeHtml(t.compareNote)}</p>
    </section>
    <section id="research" class="research wrap" aria-labelledby="research-title">
      <div class="research-copy"><p class="section-kicker">${t.researchKicker}</p><h2 id="research-title">${lines(t.researchTitle)}</h2><p class="section-lead">${escapeHtml(t.researchLead)}</p><p>${escapeHtml(t.researchSummary)}</p><p class="research-note">${escapeHtml(t.researchNote)}</p></div>
      <article class="paper"><p class="paper-label mono">${t.paperLabel}</p><h3><cite>${escapeHtml(t.paperTitle)}</cite></h3><p class="paper-authors">${escapeHtml(t.paperAuthors)}</p><p class="paper-journal">${escapeHtml(t.paperJournal)}</p><a class="paper-doi mono" href="${paperUrl}">DOI: ${paperDoi}</a><a class="text-link" href="${paperUrl}">${escapeHtml(t.paperLink)}${externalArrow}</a></article>
    </section>
    <section id="support" class="support wrap" aria-labelledby="support-title">
      <p class="section-kicker">${t.supportKicker}</p>
      <div class="overview-intro"><h2 id="support-title">${lines(t.supportTitle)}</h2><div class="support-copy"><p class="section-lead">${escapeHtml(t.supportLead)}</p><p>${escapeHtml(t.supportBody)}</p><div class="support-links"><a class="text-link" href="#team">${escapeHtml(t.teamCta)}${arrow}</a><a class="text-link" href="${projectUrl}">${escapeHtml(t.githubCta)}${externalArrow}</a></div></div></div>
    </section>
    <section id="team" class="team wrap" aria-labelledby="team-title">
      <p class="section-kicker">${t.teamKicker}</p>
      <div class="overview-intro"><h2 id="team-title">${lines(t.teamTitle)}</h2><div class="support-copy"><p class="section-lead">${escapeHtml(t.teamLead)}</p><p>${escapeHtml(t.contactLead)}</p><a class="contact-email" href="mailto:${contactEmail}">${contactEmail}</a></div></div>
      ${members(t)}
    </section>
    <section id="project-information" class="project-information wrap" aria-labelledby="project-information-label project-information-title">
      <p id="project-information-label" class="section-kicker">${escapeHtml(t.projectInformationKicker)}</p>
      <div class="overview-intro"><h2 id="project-information-title">MobS</h2>${projectInformation(t)}</div>
    </section>
  </main>
  <footer class="site-footer wrap"><div><a class="site-name" href="${t.path}">MobS</a><p>${escapeHtml(t.footerTagline)}</p><p class="name-origin">${escapeHtml(t.nameOrigin)}</p></div><div class="footer-links"><a href="mailto:${contactEmail}">${contactEmail}</a><a href="${projectUrl}">GitHub ${externalArrow}</a><a href="#top">${escapeHtml(t.backToTop)}<span aria-hidden="true"> ↑</span></a></div><div class="footer-bottom"><span>© ${new Date().getUTCFullYear()} MobS Project</span></div></footer>
</body>
</html>
`;
}

export function renderNotFound(ja, en, cssFile) {
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>404 — MobS</title><link rel="stylesheet" href="/assets/${cssFile}"></head><body><main class="not-found wrap"><a class="site-name" href="/">MobS</a><p class="section-kicker">404 / PAGE NOT FOUND</p><h1>${escapeHtml(ja.notFound)}</h1><p lang="en">${escapeHtml(en.notFound)}</p><div class="hero-actions"><a class="button button-dark" href="/">${escapeHtml(ja.home)}${arrow}</a><a class="text-link" href="/en/" lang="en">${escapeHtml(en.home)}${arrow}</a></div></main></body></html>`;
}
