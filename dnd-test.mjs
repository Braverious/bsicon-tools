import { JSDOM, VirtualConsole } from 'jsdom';

const file = process.argv[2];
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => console.log('JSDOM ERROR:', e.message));
vc.on('error', (...a) => console.log('console.error:', ...a));

const dom = await JSDOM.fromFile(file, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  virtualConsole: vc
});
const { window } = dom;
await new Promise((r) => (window.document.readyState === 'complete' ? r() : window.addEventListener('load', r)));
await new Promise((r) => setTimeout(r, 1500));

const d = window.document;
const out = [];
out.push('md5=' + typeof window.md5 + ' bootstrap=' + typeof window.bootstrap);
const item = d.querySelector('.icon-item');
const cell = d.querySelector('.canvas-cell');
out.push('items=' + d.querySelectorAll('.icon-item').length + ' cells=' + d.querySelectorAll('.canvas-cell').length);
out.push('draggable=' + (item && item.draggable));

const store = {};
const dt = { setData: (k, v) => (store[k] = v), getData: (k) => store[k] || '', dropEffect: '', effectAllowed: '' };
const mk = (type) => { const e = new window.Event(type, { bubbles: true, cancelable: true }); e.dataTransfer = dt; return e; };
try {
  item.dispatchEvent(mk('dragstart'));
  out.push('data after dragstart=' + store['text/plain']);
  cell.dispatchEvent(mk('dragover'));
  cell.dispatchEvent(mk('drop'));
  out.push('dropped=' + cell.querySelectorAll('.dropped-icon').length);
} catch (e) {
  out.push('ERROR ' + e.stack);
}
console.log(out.join('\n'));
window.close();
process.exit(0);
