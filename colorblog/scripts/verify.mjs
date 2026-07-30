#!/usr/bin/env node
/**
 * Post-build / pre-commit verification for colorblog.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const NOTES = path.join(ROOT, 'src/content/notes');
const COVERS = path.join(ROOT, 'public/images/covers');
const DIST = path.join(ROOT, 'dist');

let failed = 0;

function fail(msg) {
  console.error(`✗ ${msg}`);
  failed++;
}

function ok(msg) {
  console.log(`✓ ${msg}`);
}

const noteFiles = fs.readdirSync(NOTES).filter((f) => f.endsWith('.md'));
const publishedNoteFiles = noteFiles.filter((f) => !/^draft:\s*true/m.test(fs.readFileSync(path.join(NOTES, f), 'utf8')));
if (publishedNoteFiles.length < 25) fail(`Expected at least 25 published notes, got ${publishedNoteFiles.length}`);
else ok(`${publishedNoteFiles.length} published notes (${noteFiles.length - publishedNoteFiles.length} draft)`);

let withImage = 0;
let brokenFm = 0;
const categories = { food: 0, travel: 0, cooking: 0, essay: 0, none: 0 };

for (const file of noteFiles) {
  const raw = fs.readFileSync(path.join(NOTES, file), 'utf8');
  if (/tags:\nimage:/m.test(raw)) {
    fail(`Broken frontmatter (image inside tags): ${file}`);
    brokenFm++;
  }
  if (/^image:/m.test(raw)) {
    withImage++;
    const m = raw.match(/^image: "(.*)"/m);
    if (m) {
      const fp = path.join(ROOT, 'public', m[1]);
      if (!fs.existsSync(fp)) fail(`Missing cover file: ${m[1]}`);
    }
  }
  const cat = raw.match(/^category: "(.*)"/m)?.[1];
  if (cat && categories[cat] !== undefined) categories[cat]++;
  else categories.none++;
}

if (withImage !== 26) fail(`Expected 26 notes with image frontmatter, got ${withImage}`);
else ok('All notes have image frontmatter');

if (brokenFm === 0) ok('No broken tag/image frontmatter');

const coverCount = fs.existsSync(COVERS)
  ? fs.readdirSync(COVERS).filter((f) => f.endsWith('.jpg')).length
  : 0;
if (coverCount !== 26) fail(`Expected 26 cover JPGs, got ${coverCount}`);
else ok('26 cover images on disk');

ok(`Categories: food=${categories.food} travel=${categories.travel} cooking=${categories.cooking} essay=${categories.essay} uncategorized=${categories.none}`);

const requiredDist = [
  'index.html',
  'en/index.html',
  'about/index.html',
  'en/about/index.html',
  'notes/index.html',
  'notes/category/food/index.html',
  'notes/2026-07-30-world-spice-cooking-handbook/index.html',
  'notes/byd-cairo/index.html',
  'contact/index.html',
  '404.html',
];

for (const p of requiredDist) {
  if (!fs.existsSync(path.join(DIST, p))) fail(`Missing dist/${p}`);
}

if (failed === 0) ok('Dist smoke paths exist');

// Every built note page must expose article body without assemble hiding.
for (const file of noteFiles) {
  const raw = fs.readFileSync(path.join(NOTES, file), 'utf8');
  if (/^draft:\s*true/m.test(raw)) continue;

  const slug = file.replace(/\.md$/, '');
  for (const prefix of ['notes', 'en/notes']) {
    const htmlPath = path.join(DIST, prefix, slug, 'index.html');
    if (!fs.existsSync(htmlPath)) continue;

    const html = fs.readFileSync(htmlPath, 'utf8');
    if (/class="article-body prose[^"]*"[^>]*data-assemble/.test(html)) {
      fail(`Article body still uses data-assemble: ${prefix}/${slug}`);
    }

    const start = html.indexOf('class="article-body prose');
    const openEnd = html.indexOf('>', start);
    const close = html.indexOf('</div> <aside class="hidden lg:block pt-2"', openEnd);
    const bodyHtml = openEnd >= 0 && close > openEnd ? html.slice(openEnd + 1, close) : '';
    const bodyText = bodyHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    if (bodyText.length < 20) {
      fail(`Article body too short (${bodyText.length} chars): ${prefix}/${slug}`);
    }
  }
}
if (failed === 0) ok('All published note pages have visible article bodies');

// Template word scan
const badWords = ['拼贴笔记', 'Roadside Assemblage', 'hello@example.com', 'Shaun'];
for (const dir of [path.join(ROOT, 'src'), path.join(ROOT, 'site.config.ts')]) {
  const walk = (p) => {
    if (fs.statSync(p).isFile()) {
      if (!/\.(astro|ts|tsx|md|mjs|css)$/.test(p)) return;
      const text = fs.readFileSync(p, 'utf8');
      for (const w of badWords) {
        if (text.includes(w)) fail(`Template word "${w}" in ${p}`);
      }
    } else {
      for (const e of fs.readdirSync(p)) walk(path.join(p, e));
    }
  };
  if (fs.existsSync(dir)) {
    if (fs.statSync(dir).isFile()) walk(dir);
    else walk(dir);
  }
}
ok('No template placeholder words in source');

if (failed > 0) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll verification checks passed.');
