#!/usr/bin/env node
/**
 * Transform public/assets spice handbook → src/content/notes blog post.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'public/assets/60种世界地区香料与烹饪方法搭配手册_详细版.md');
const out = path.join(root, 'src/content/notes/2026-07-30-world-spice-cooking-handbook.md');

const SECTION_MARKERS = [
  { at: /^## 1\./, html: '<a id="section-1-11"></a>\n', heading: '## 中国及东亚、东南亚（1–11）\n\n' },
  { at: /^## 12\./, html: '<a id="section-12-20"></a>\n', heading: '## 南亚、中东、非洲与中欧（12–20）\n\n' },
  { at: /^## 21\./, html: '<a id="section-21-30"></a>\n', heading: '## 地中海、美洲及欧洲（21–30）\n\n' },
  { at: /^## 31\./, html: '<a id="section-31-38"></a>\n', heading: '## 广东（31–38）\n\n' },
  { at: /^## 39\./, html: '<a id="section-39-44"></a>\n', heading: '## 云南（39–44）\n\n' },
  { at: /^## 45\./, html: '<a id="section-45-50"></a>\n', heading: '## 印度（45–50）\n\n' },
  { at: /^## 51\./, html: '<a id="section-51-55"></a>\n', heading: '## 意大利（51–55）\n\n' },
  { at: /^## 56\./, html: '<a id="section-56-60"></a>\n', heading: '## 法国（56–60）\n\n' },
];

const frontmatter = `---
title: "60种世界地区香料与烹饪方法搭配手册"
date: "2026-07-30"
tags:
  - "美食"
  - "香料"
  - "备餐"
  - "烹饪"
description: "60种世界风味的低盐家庭试做框架：香料搭配、烹调逻辑与500克食材参考配比，附通用火候、盐量换算与资料索引。"
---

<a id="top"></a>

`;

const tocBlock = `<a id="toc"></a>

## 目录

- [使用说明](#使用说明)
- [中国及东亚、东南亚（1–11）](#section-1-11)
- [南亚、中东、非洲与中欧（12–20）](#section-12-20)
- [地中海、美洲及欧洲（21–30）](#section-21-30)
- [广东（31–38）](#section-31-38)
- [云南（39–44）](#section-39-44)
- [印度（45–50）](#section-45-50)
- [意大利（51–55）](#section-51-55)
- [法国（56–60）](#section-56-60)
- [通用火候与备餐规则](#通用火候与备餐规则)
- [盐量与总盐当量](#盐量与总盐当量)
- [资料索引](#资料索引)

源文件 [Markdown 下载](/assets/60种世界地区香料与烹饪方法搭配手册_详细版.md)。

`;

const raw = fs.readFileSync(src, 'utf8').split('\n');
const outLines = [];
let skipUntilContent = true;
let inIntro = true;
let replacedToc = false;

for (let i = 0; i < raw.length; i++) {
  let line = raw[i];

  if (skipUntilContent) {
    if (line.startsWith('# ')) continue;
    if (line.startsWith('> **文件定位**')) {
      outLines.push('<a id="使用说明"></a>\n', '\n', '## 使用说明\n', '\n');
      inIntro = true;
      skipUntilContent = false;
    } else {
      continue;
    }
  }

  if (line === '## 目录' && !replacedToc) {
    outLines.push(tocBlock);
    replacedToc = true;
    while (i + 1 < raw.length && !raw[i + 1].startsWith('---')) i++;
    continue;
  }

  if (line.startsWith('# 新增30种')) continue;

  if (line === '# 通用火候与备餐规则') {
    outLines.push('<a id="通用火候与备餐规则"></a>\n', '\n', '## 通用火候与备餐规则\n');
    continue;
  }

  if (line === '# 资料索引') {
    outLines.push('<a id="资料索引"></a>\n', '\n', '## 资料索引\n');
    continue;
  }

  if (line === '## 盐量与总盐当量') {
    outLines.push('<a id="盐量与总盐当量"></a>\n', '\n', line, '\n');
    continue;
  }

  const section = SECTION_MARKERS.find((m) => m.at.test(line));
  if (section) {
    outLines.push('\n', section.html, section.heading);
  }

  if (/^## \d+\./.test(line)) {
    const m = line.match(/^## (\d+)\.\s*(.+)$/);
    if (m) {
      outLines.push(`<h3 class="recipe-entry" id="recipe-${m[1]}">${m[1]}. ${m[2]}</h3>\n`);
      continue;
    }
    line = line.replace(/^## /, '### ');
  }

  if (/^## (广东|云南|印度|意大利|法国)$/.test(line) && outLines.some((l) => l.includes('id="资料索引"'))) {
    line = line.replace(/^## /, '### ');
  }

  if (line === '### 可靠程度参考') {
    outLines.push(line, '\n');
    continue;
  }

  if (line.startsWith('**版本说明**')) {
    outLines.push('\n', line, '\n');
    continue;
  }

  outLines.push(line, '\n');
}

const body = outLines.join('').replace(/\n{4,}/g, '\n\n\n');
fs.writeFileSync(out, frontmatter + body.trim() + '\n', 'utf8');
console.log(`Wrote ${out} (${fs.statSync(out).size} bytes)`);
