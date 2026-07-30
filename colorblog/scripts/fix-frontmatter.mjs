#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const NOTES = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/content/notes');

for (const file of fs.readdirSync(NOTES).filter((f) => f.endsWith('.md'))) {
  const fp = path.join(NOTES, file);
  let raw = fs.readFileSync(fp, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) continue;

  const lines = m[1].split('\n');
  const imageLine = lines.find((l) => l.startsWith('image:'));
  if (!imageLine) continue;

  const imageIdx = lines.indexOf(imageLine);
  const tagsIdx = lines.findIndex((l) => l.startsWith('tags:'));

  if (tagsIdx === -1 || imageIdx <= tagsIdx) continue;

  // Check if image is between tags: and tag items
  const nextAfterTags = lines[tagsIdx + 1];
  if (nextAfterTags !== imageLine.trim() && !lines[tagsIdx + 1]?.startsWith('image:')) continue;
  if (!lines[tagsIdx + 1]?.startsWith('image:')) continue;

  // Collect tag lines
  const tagLines = [];
  let i = tagsIdx + 2;
  while (i < lines.length && lines[i].startsWith('  - ')) {
    tagLines.push(lines[i]);
    i++;
  }

  // Rebuild without misplaced image
  const rebuilt = [
    ...lines.slice(0, tagsIdx + 1),
    ...tagLines,
    imageLine,
    ...lines.slice(i).filter((l) => l !== imageLine),
  ];

  const body = m[2];
  fs.writeFileSync(fp, `---\n${rebuilt.join('\n')}\n---\n${body}`, 'utf8');
  console.log(`fixed ${file}`);
}
