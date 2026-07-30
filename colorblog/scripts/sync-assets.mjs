#!/usr/bin/env node
/**
 * Copy note images and downloads from archived root site into colorblog public/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO = path.resolve(ROOT, '..');
const SRC = path.join(REPO, 'archive/root-site/public/assets');
const DEST = path.join(ROOT, 'public/assets');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

if (!fs.existsSync(SRC)) {
  console.error(`Asset source missing: ${SRC}`);
  process.exit(1);
}

copyDir(SRC, DEST);
console.log(`Synced assets → ${path.relative(REPO, DEST)}`);
