import { readFileSync, writeFileSync } from 'node:fs';
import { minify } from 'terser';

const SOURCE = 'src/index.html';
const OUTPUT = 'index.html';

const html = readFileSync(SOURCE, 'utf8');
const inlineScript = /<script>([\s\S]*?)<\/script>/g;

const matches = [...html.matchAll(inlineScript)];
if (matches.length !== 1) {
    throw new Error(`Expected exactly 1 inline <script>, found ${matches.length}`);
}

const [fullMatch, code] = matches[0];
const result = await minify(code, {
    compress: { passes: 2 },
    mangle: true,
    format: { comments: false, ascii_only: false }
});

if (!result.code) {
    throw new Error('Terser returned empty output');
}

const output = html.replace(fullMatch, () => `<script>${result.code}</script>`);
writeFileSync(OUTPUT, output, 'utf8');

const kb = (n) => (Buffer.byteLength(n, 'utf8') / 1024).toFixed(1);
console.log(`JS   : ${kb(code)} KB -> ${kb(result.code)} KB`);
console.log(`HTML : ${kb(html)} KB -> ${kb(output)} KB  (${OUTPUT})`);
