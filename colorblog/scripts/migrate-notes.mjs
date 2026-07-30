#!/usr/bin/env node
/**
 * Migrate notes from root blog to colorblog with category assignment.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'archive/root-site/src/content/notes');
const DEST = path.resolve(__dirname, '../src/content/notes');

const FOOD_SLUGS = new Set([
  '2025-10-07-uzbekistan-tandir-kebab',
  '2026-01-10-sham-tseng-yue-kee-roast-goose',
  '2025-05-23-shantou-chi-chi-chi',
  '2025-05-23-shanwei',
  '2025-05-23-popmart-industrial-culture',
]);

const TRAVEL_SLUGS = new Set([
  '2025-05-23-nepal-kathmandu-mbc',
  '2025-05-23-byd-cairo',
  '2025-05-23-test-hk',
  '2026-03-06-tanzania-kilimanjaro',
]);

const COOKING_SLUGS = new Set(['2026-07-30-world-spice-cooking-handbook']);

const ESSAY_TAG_SET = new Set(['essay', 'note']);

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { fm: {}, body: raw };
  const fmText = match[1];
  const body = match[2];
  const fm = {};
  let currentKey = null;
  let listItems = [];

  for (const line of fmText.split('\n')) {
    if (/^\s+-\s+/.test(line) && currentKey) {
      listItems.push(line.replace(/^\s+-\s+/, '').replace(/^["']|["']$/g, ''));
      continue;
    }
    if (currentKey && listItems.length) {
      fm[currentKey] = listItems;
      listItems = [];
      currentKey = null;
    }
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, val] = kv;
    if (val === '' || val === undefined) {
      currentKey = key;
      listItems = [];
    } else if (val === '[]') {
      fm[key] = [];
    } else {
      fm[key] = val.replace(/^["']|["']$/g, '');
      currentKey = null;
    }
  }
  if (currentKey && listItems.length) fm[currentKey] = listItems;

  return { fm, body };
}

function inferCategory(slug, fm) {
  const tags = Array.isArray(fm.tags) ? fm.tags : [];
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  if (COOKING_SLUGS.has(slug) || tagSet.has('香料') || tagSet.has('备餐')) return 'cooking';
  if (FOOD_SLUGS.has(slug) || tagSet.has('美食')) return 'food';
  if (TRAVEL_SLUGS.has(slug) || tagSet.has('travel')) return 'travel';
  if (tags.some((t) => ESSAY_TAG_SET.has(t.toLowerCase()))) return 'essay';

  // Travel-ish location tags
  if (
    tagSet.has('坦桑尼亚') ||
    tagSet.has('非洲') ||
    tagSet.has('乞力马扎罗') ||
    tagSet.has('中亚') ||
    tagSet.has('乌兹别克斯坦')
  ) {
    if (FOOD_SLUGS.has(slug)) return 'food';
    return 'travel';
  }

  // 潮汕/广东 travel food — classify as food if food-focused slug
  if ((tagSet.has('潮汕') || tagSet.has('广东')) && FOOD_SLUGS.has(slug)) return 'food';
  if (tagSet.has('潮汕') || tagSet.has('广东')) return 'travel';

  if (tagSet.has('note')) return 'essay';

  // research, finalreport, history, etc. → no category
  return undefined;
}

function serializeFrontmatter(fm) {
  const lines = ['---'];
  for (const [key, val] of Object.entries(fm)) {
    if (key === 'tags') {
      const tags = Array.isArray(val) ? val : [];
      if (tags.length === 0) {
        lines.push('tags: []');
      } else {
        lines.push('tags:');
        for (const item of tags) lines.push(`  - "${item}"`);
      }
      continue;
    }
    if (Array.isArray(val)) {
      lines.push(`${key}:`);
      for (const item of val) lines.push(`  - "${item}"`);
    } else if (val === undefined || val === null) {
      continue;
    } else if (typeof val === 'string' && (val.includes(':') || val.includes('#'))) {
      lines.push(`${key}: "${val.replace(/"/g, '\\"')}"`);
    } else {
      lines.push(`${key}: ${typeof val === 'string' ? `"${val}"` : val}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

function migrate() {
  // Remove demos
  for (const f of fs.readdirSync(DEST)) {
    if (f.startsWith('demo-post')) fs.unlinkSync(path.join(DEST, f));
  }

  const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.md'));
  let migrated = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(SRC, file), 'utf8');
    const { fm, body } = parseFrontmatter(raw);

    const destPath = path.join(DEST, file);
    let existingImage;
    if (fs.existsSync(destPath)) {
      const existing = parseFrontmatter(fs.readFileSync(destPath, 'utf8'));
      existingImage = existing.fm?.image;
    }

    const out = {
      title: fm.title ?? slug,
      date: fm.date ?? '2025-01-01',
      tags: fm.tags ?? [],
      ...(fm.description ? { description: fm.description } : {}),
      ...(existingImage ? { image: existingImage } : {}),
    };

    const category = inferCategory(slug, fm);
    if (category) out.category = category;

    const content = `${serializeFrontmatter(out)}\n${body}`;
    fs.writeFileSync(path.join(DEST, file), content, 'utf8');
    migrated++;
    console.log(`✓ ${file} → category: ${category ?? '(none)'}`);
  }

  console.log(`\nMigrated ${migrated} notes.`);
}

migrate();
