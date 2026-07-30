#!/usr/bin/env node
/**
 * Static redirects for legacy root-site note slugs and /contact/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const SITE = 'https://zerong-sun.github.io';

/** @type {Record<string, string>} */
const NOTE_REDIRECTS = {
  'byd-cairo': '/notes/2025-05-23-byd-cairo/',
  'hello-world': '/notes/2025-05-23-hello-world/',
  'nepal-kathmandu-mbc': '/notes/2025-05-23-nepal-kathmandu-mbc/',
  'popmart-industrial-culture': '/notes/2025-05-23-popmart-industrial-culture/',
  'shantou-chi-chi-chi': '/notes/2025-05-23-shantou-chi-chi-chi/',
  'shanwei': '/notes/2025-05-23-shanwei/',
  'test-hk': '/notes/2025-05-23-test-hk/',
  'uzbekistan-tandir-kebab': '/notes/2025-10-07-uzbekistan-tandir-kebab/',
  'riboflavin-synthase': '/notes/2025-10-10-riboflavin-synthase/',
  'mu-opioid-receptor': '/notes/2025-11-27-mu-opioid-receptor/',
  'weaponized-interdependence-zh': '/notes/2025-12-11-weaponized-interdependence-zh/',
  'weaponized-interdependence-en': '/notes/2025-12-13-weaponized-interdependence-en/',
  'sham-tseng-yue-kee-roast-goose': '/notes/2026-01-10-sham-tseng-yue-kee-roast-goose/',
  'tanzania-kilimanjaro': '/notes/2026-03-06-tanzania-kilimanjaro/',
  'eu-china-trade-war': '/notes/2026-05-31-eu-china-trade-war/',
  'altitude-sickness-medication-memo': '/notes/2026-06-02-altitude-sickness-medication-memo/',
};

/** @type {Record<string, string>} */
const PAGE_REDIRECTS = {
  contact: '/about/',
};

function writeRedirect(relativeDir, target) {
  const dir = path.join(PUBLIC, relativeDir);
  fs.mkdirSync(dir, { recursive: true });
  const canonical = `${SITE}${target}`;
  const html = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=${target}">
  <link rel="canonical" href="${canonical}">
  <title>Redirecting…</title>
</head>
<body>
  <p>页面已迁移，正在跳转到 <a href="${target}">${target}</a>。</p>
</body>
</html>
`;
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}

for (const [slug, target] of Object.entries(NOTE_REDIRECTS)) {
  writeRedirect(path.join('notes', slug), target);
}

for (const [slug, target] of Object.entries(PAGE_REDIRECTS)) {
  writeRedirect(slug, target);
}

console.log(
  `Generated ${Object.keys(NOTE_REDIRECTS).length} note redirects and ${Object.keys(PAGE_REDIRECTS).length} page redirects.`,
);
