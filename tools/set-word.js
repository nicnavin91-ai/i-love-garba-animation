#!/usr/bin/env node
// Rewrites the letters in index.html to read "I LOVE <WORD>".
// Usage: node tools/set-word.js GARBA
//
// Letters are drawn as SVG paths from Montserrat Bold (the typeface of the original
// design), so the page itself needs no font. The animation in index.html measures the
// letters at runtime, so no other code has to change.

const fs = require('fs');
const path = require('path');
const opentype = require('opentype.js');

const word = (process.argv[2] || '').trim().toUpperCase();
if (!/^[A-Z0-9][A-Z0-9 ]*$/.test(word)) {
  console.error('Usage: node tools/set-word.js <WORD>   (letters A-Z, digits and spaces only)');
  process.exit(1);
}

const FONT = require.resolve('@fontsource/montserrat/files/montserrat-latin-700-normal.woff');
const HTML = path.join(__dirname, '..', 'index.html');

const MAX_WIDTH = 400;   // stage is 500 wide; the white bars sit at x=10 and x=490
const MAX_CAP = 52;      // cap height of the original "I LOVE YOU" design
const STAGE_MID_X = 250;
const STAGE_MID_Y = 100;

const font = opentype.loadSync(FONT);
const text = `I LOVE ${word}`;
// Which part of the animation each character belongs to (spaces are skipped)
const parts = [...text].map((ch, k) => (ch === ' ' ? null : k === 0 ? 'i' : k < 6 ? 'love' : 'word'));

// Lay the phrase out at font units, with kerning
const glyphs = font.stringToGlyphs(text);
const xs = [];
let x = 0;
glyphs.forEach((g, k) => {
  xs.push(x);
  x += g.advanceWidth + (glyphs[k + 1] ? font.getKerningValue(g, glyphs[k + 1]) : 0);
});
const boxes = glyphs.map((g, k) => g.getPath(xs[k], 0, font.unitsPerEm).getBoundingBox());
const visible = boxes.filter((_, k) => parts[k]);
const left = Math.min(...visible.map(b => b.x1));
const right = Math.max(...visible.map(b => b.x2));

const capUnits = font.tables.os2.sCapHeight;
const scale = Math.min(MAX_WIDTH / (right - left), MAX_CAP / capUnits);
const cap = capUnits * scale;
const originX = STAGE_MID_X - ((left + right) / 2) * scale;
const baseline = STAGE_MID_Y + cap / 2;

const paths = glyphs
  .map((g, k) => {
    if (!parts[k]) return null;
    const d = g.getPath(originX + xs[k] * scale, baseline, font.unitsPerEm * scale).toPathData(1);
    return `          <path class="lttr" data-part="${parts[k]}" data-char="${text[k]}" d="${d}"></path>`;
  })
  .filter(Boolean)
  .join('\n');

let html = fs.readFileSync(HTML, 'utf8');
const start = html.indexOf('<g class="letters">');
const end = html.indexOf('</g>', start);
if (start < 0 || end < 0) {
  console.error('Could not find <g class="letters"> in index.html');
  process.exit(1);
}
html = `${html.slice(0, start)}<g class="letters">\n${paths}\n        ${html.slice(end)}`;

const title = `I Love ${word.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}`;
html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

fs.writeFileSync(HTML, html);
console.log(`index.html now reads "${text}" (cap height ${cap.toFixed(1)}px)`);
