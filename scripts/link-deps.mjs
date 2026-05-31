import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const src = path.join(root, '_deps/node_modules');
const dest = path.join(root, 'node_modules');

if (!fs.existsSync(src)) process.exit(0);

fs.mkdirSync(dest, { recursive: true });
for (const name of fs.readdirSync(src)) {
  const link = path.join(dest, name);
  const target = path.join(src, name);
  if (fs.existsSync(link)) continue;
  try {
    fs.symlinkSync(path.relative(dest, target), link);
  } catch {
    /* ignore existing root-owned entries */
  }
}
