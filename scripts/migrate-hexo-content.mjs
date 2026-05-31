#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const matter = require(path.join(process.cwd(), '_deps/node_modules/gray-matter/index.js'));

const HEXO_SOURCE = process.env.HEXO_SOURCE || '/Users/zero/myblog/source';
const OUT_ROOT = path.resolve(process.cwd());
const NOTES_DIR = path.join(OUT_ROOT, 'src/content/notes');
const PAGES_DIR = path.join(OUT_ROOT, 'src/content/pages');
const PUBLIC_ASSETS = path.join(OUT_ROOT, 'public/assets');

const ASSET_DIRS = [
  {
    src: path.join(HEXO_SOURCE, '汕头！7.1-7.3\n.assets'),
    dest: 'shantou',
    patterns: [
      /%E6%B1%95%E5%A4%B4%EF%BC%817\.1-7\.3%0A\.assets/gi,
      /汕头！7\.1-7\.3\s*\.assets/g,
    ],
  },
  {
    src: path.join(HEXO_SOURCE, 'MBC 9.28-10.9.assets'),
    dest: 'mbc',
    patterns: [/MBC%209\.28-10\.9\.assets/gi, /MBC 9\.28-10\.9\.assets/g],
  },
];

const SLUG_OVERRIDES = {
  'Mu-Opioid-Receptor-Preference-and-Selectivity.md': 'mu-opioid-receptor',
  'Riboflavin-Synthase-Structure-and-Mechanism.md': 'riboflavin-synthase',
  'Viewing Sino–U.S. Offensive and Defensive Dynamics in Computing Power and Network Structural Power through the Framework of “Weaponized Interdependence”.md':
    'weaponized-interdependence-en',
  '以“相互依赖武器化”为框架，看中美在算力与网络结构性权力的攻防.md': 'weaponized-interdependence-zh',
  'Hello-World.md': 'hello-world',
  'test-HK.md': 'test-hk',
  '汕头：吃吃吃.md': 'shantou-chi-chi-chi',
  '尼泊尔：加都和MBC.md': 'nepal-kathmandu-mbc',
  '比亚迪：开罗街头的豪华车.md': 'byd-cairo',
  '汕尾：那么近那么美.md': 'shanwei',
  '泡泡玛特：工业基底与文化溢价.md': 'popmart-industrial-culture',
};

function slugFromTitle(title) {
  return (
    title
      .trim()
      .toLowerCase()
      .replace(/[？?！!，,。.\s'"“”‘’：:]+/g, '-')
      .replace(/[^\w\u4e00-\u9fff-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80) || 'note'
  );
}

function cleanBody(content) {
  return content.replace(/^\s*---\s*(?:\r?\n|$)/, '').trim();
}

function parsePostFile(raw) {
  let parsed = matter(raw);
  let content = parsed.content;
  let guard = 0;

  while (content.trimStart().startsWith('---') && guard < 3) {
    guard += 1;
    try {
      const inner = matter(content);
      if (Object.keys(inner.data).length > 0) {
        parsed = { data: { ...inner.data, ...parsed.data }, content: inner.content };
      }
      content = inner.content;
    } catch {
      content = cleanBody(content);
      break;
    }
    if (!content.trimStart().startsWith('---')) break;
  }

  return { data: parsed.data, content: cleanBody(content) };
}

function toFrontmatter(data, { includeTags = false } = {}) {
  const lines = ['---', `title: ${JSON.stringify(data.title)}`];
  if (data.date) lines.push(`date: ${JSON.stringify(data.date)}`);
  if (data.slug) lines.push(`slug: ${JSON.stringify(data.slug)}`);
  if (includeTags) {
    const tags = data.tags ?? [];
    if (tags.length === 0) lines.push('tags: []');
    else {
      lines.push('tags:');
      for (const t of tags) lines.push(`  - ${JSON.stringify(t)}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

function normalizeTags(data) {
  let tags = data.tags;
  if (!tags) return [];
  if (typeof tags === 'string') tags = [tags];
  return tags.filter(Boolean);
}

function rewriteAssets(content) {
  let out = content;
  for (const dir of ASSET_DIRS) {
    for (const pattern of dir.patterns) {
      out = out.replace(pattern, `/assets/${dir.dest}`);
    }
  }
  out = out.replace(/\{%\s*raw\s*%\}/g, '').replace(/\{%\s*endraw\s*%\}/g, '');
  return out;
}

function copyAssets() {
  fs.mkdirSync(PUBLIC_ASSETS, { recursive: true });
  for (const dir of ASSET_DIRS) {
    if (!fs.existsSync(dir.src)) {
      console.warn(`WARN asset dir missing: ${dir.src}`);
      continue;
    }
    const dest = path.join(PUBLIC_ASSETS, dir.dest);
    if (fs.existsSync(dest)) {
      console.log(`Skip assets (exists): public/assets/${dir.dest}`);
      continue;
    }
    fs.cpSync(dir.src, dest, { recursive: true });
    console.log(`Copied assets -> public/assets/${dir.dest}`);
  }
}

function migratePosts() {
  fs.mkdirSync(NOTES_DIR, { recursive: true });
  for (const existing of fs.readdirSync(NOTES_DIR)) {
    if (existing.endsWith('.md')) fs.unlinkSync(path.join(NOTES_DIR, existing));
  }
  const postsDir = path.join(HEXO_SOURCE, '_posts');
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  let count = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const parsed = parsePostFile(raw);
    const { title, date } = parsed.data;
    if (!title || !date) {
      console.warn(`SKIP ${file}: missing title or date`);
      continue;
    }

    const slug = SLUG_OVERRIDES[file] || slugFromTitle(title) || slugFromTitle(path.basename(file, '.md'));
    const tags = normalizeTags(parsed.data);
    const body = rewriteAssets(parsed.content.trim());
    const d = new Date(date);
    const datePrefix = d.toISOString().slice(0, 10);
    const outName = `${datePrefix}-${slug}.md`;
    const frontmatter = { title, date: datePrefix, tags, slug };
    const output = `${toFrontmatter({ title, date: datePrefix, tags, slug }, { includeTags: true })}\n${body}\n`;
    fs.writeFileSync(path.join(NOTES_DIR, outName), output, 'utf8');
    console.log(`NOTE ${file} -> notes/${outName}`);
    count += 1;
  }
  return count;
}

function migratePage(name) {
  const srcFile = path.join(HEXO_SOURCE, name, 'index.md');
  if (!fs.existsSync(srcFile)) {
    console.warn(`WARN missing page: ${srcFile}`);
    return;
  }
  fs.mkdirSync(PAGES_DIR, { recursive: true });
  let raw = fs.readFileSync(srcFile, 'utf8');
  const parsed = matter(raw);
  let body = parsed.content.trim();

  if (name === 'contact') {
    body = body.replace(/<style>[\s\S]*?<\/style>\s*/i, '');
    body = rewriteAssets(body);
  }

  const frontmatter = {
    title: name === 'about' ? 'About' : 'Contact',
    ...(parsed.data.date ? { date: new Date(parsed.data.date).toISOString().slice(0, 10) } : {}),
  };
  fs.writeFileSync(
    path.join(PAGES_DIR, `${name}.md`),
    `${toFrontmatter(frontmatter)}\n${body}\n`,
    'utf8',
  );
  console.log(`PAGE ${name}.md`);
}

function main() {
  console.log(`Source: ${HEXO_SOURCE}`);
  copyAssets();
  const n = migratePosts();
  migratePage('about');
  migratePage('contact');
  console.log(`Done. Migrated ${n} notes.`);
}

main();
