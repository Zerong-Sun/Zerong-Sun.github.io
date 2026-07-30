#!/usr/bin/env node
/**
 * Download, process, and attach cover images for notes without images.
 * Uses Unsplash (free license) + sharp for crop & warm-life preset.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const NOTES_DIR = path.join(ROOT, 'src/content/notes');
const OUT_DIR = path.join(ROOT, 'public/images/covers');

/** slug → Unsplash photo URL (1200px wide, crop) */
const COVER_SOURCES = {
  '2023-10-27-invitation-letter-zhu-qingshi-quantum-consciousness': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1400&h=933&fit=crop&q=85',
  '2023-11-01-sincerity-robert-iger-leadership-creativity': 'https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2023-11-15-bci-depression-treatment-ethics': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1400&h=933&fit=crop&q=85',
  '2024-06-04-ion-memristor-reservoir-computing-notes': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=933&fit=crop&q=85',
  '2024-06-04-ionic-memristor-reservoir-computing-review': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=933&fit=crop&q=85',
  '2024-11-19-dual-blood-input-function-dynamic-pet': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=933&fit=crop&q=85',
  '2024-12-04-fall-of-france-1940': 'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2025-05-23-byd-cairo': 'https://images.pexels.com/photos/3583338/pexels-photo-3583338.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2025-05-23-hello-world': 'https://images.pexels.com/photos/149618/pexels-photo-149618.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2025-05-23-nepal-kathmandu-mbc': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&h=933&fit=crop&q=85',
  '2025-05-23-popmart-industrial-culture': 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2025-05-23-shantou-chi-chi-chi': 'https://images.pexels.com/photos/2343466/pexels-photo-2343466.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2025-05-23-shanwei': 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1400&h=933&fit=crop&q=85',
  '2025-05-23-test-hk': 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2025-06-01-crizotinib-precision-targeted-drug-development': 'https://images.pexels.com/photos/208969/pexels-photo-208969.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2025-06-01-group13-esports-wrist-biomechanics-proposal': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&h=933&fit=crop&q=85',
  '2025-10-07-uzbekistan-tandir-kebab': 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2025-10-10-riboflavin-synthase': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1400&h=933&fit=crop&q=85',
  '2025-11-27-mu-opioid-receptor': 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2025-12-11-weaponized-interdependence-zh': 'https://images.pexels.com/photos/1131457/pexels-photo-1131457.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2025-12-13-weaponized-interdependence-en': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=933&fit=crop&q=85',
  '2026-01-10-sham-tseng-yue-kee-roast-goose': 'https://images.pexels.com/photos/267089/pexels-photo-267089.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2026-03-06-tanzania-kilimanjaro': 'https://images.pexels.com/photos/3224119/pexels-photo-3224119.jpeg?auto=compress&cs=tinysrgb&w=1400&h=933&fit=crop',
  '2026-05-31-eu-china-trade-war': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1400&h=933&fit=crop&q=85',
  '2026-06-02-altitude-sickness-medication-memo': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&h=933&fit=crop&q=85',
  '2026-07-30-world-spice-cooking-handbook': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1400&h=933&fit=crop&q=85',
};

const WIDTH = 1200;
const HEIGHT = 800; // 3:2

async function applyLifePreset(inputBuffer) {
  const base = sharp(inputBuffer)
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 1.03, saturation: 0.94 })
    .linear(0.92, 8);

  const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });

  // Warm tint + subtle grain
  for (let i = 0; i < data.length; i += info.channels) {
    data[i] = Math.min(255, data[i] * 1.04 + 4);     // R
    data[i + 1] = Math.min(255, data[i + 1] * 1.01); // G
    data[i + 2] = Math.max(0, data[i + 2] * 0.97);     // B
    if (Math.random() < 0.35) {
      const n = (Math.random() - 0.5) * 6;
      data[i] = Math.min(255, Math.max(0, data[i] + n));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + n));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + n));
    }
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}

async function download(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'colorblog-cover-fetch/1.0' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  return { fm: m[1], body: m[2] };
}

function addImageToFrontmatter(fmText, imagePath) {
  if (/^image:/m.test(fmText)) {
    return fmText.replace(/^image:.*$/m, `image: "${imagePath}"`);
  }
  const lines = fmText.split('\n');
  let insertAt = lines.length;
  const tagsIdx = lines.findIndex((l) => l.startsWith('tags:'));
  if (tagsIdx >= 0) {
    insertAt = tagsIdx + 1;
    if (lines[tagsIdx].trim() === 'tags:[]') {
      insertAt = tagsIdx + 1;
    } else {
      while (insertAt < lines.length && lines[insertAt].startsWith('  - ')) insertAt++;
    }
  }
  lines.splice(insertAt, 0, `image: "${imagePath}"`);
  return lines.join('\n');
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const onlyMissing = process.argv.includes('--missing');

  for (const [slug, url] of Object.entries(COVER_SOURCES)) {
    const outFile = path.join(OUT_DIR, `${slug}.jpg`);
    const publicPath = `/images/covers/${slug}.jpg`;
    const noteFile = path.join(NOTES_DIR, `${slug}.md`);

    if (!fs.existsSync(noteFile)) {
      console.warn(`⚠ skip missing note: ${slug}`);
      continue;
    }

    if (onlyMissing && fs.existsSync(outFile)) continue;

    try {
      console.log(`↓ ${slug}`);
      const buf = await download(url);
      const processed = await applyLifePreset(buf);
      fs.writeFileSync(outFile, processed);

      const raw = fs.readFileSync(noteFile, 'utf8');
      const parsed = parseFrontmatter(raw);
      if (!parsed) {
        console.warn(`⚠ bad frontmatter: ${slug}`);
        continue;
      }
      const newFm = addImageToFrontmatter(parsed.fm, publicPath);
      fs.writeFileSync(noteFile, `---\n${newFm}\n---\n${parsed.body}`, 'utf8');
      console.log(`✓ ${slug} → ${publicPath}`);
    } catch (err) {
      console.error(`✗ ${slug}:`, err.message);
    }
  }

  console.log('\nDone.');
}

main();
