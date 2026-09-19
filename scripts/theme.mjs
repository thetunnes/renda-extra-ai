import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const read = (path) => JSON.parse(fs.readFileSync(new URL(path, root), 'utf8'));
const theme = read('config/theme.json');
const { motion } = read('config/experience.json');
const vars = Object.entries(theme.colors).map(([name, value]) => {
  if (!/^[a-z0-9-]+$/.test(name) || !/^#[0-9a-f]{3,8}$/i.test(value))
    throw new Error(`Invalid color ${name}`);
  return `  --color-${name}: ${value};`;
});
for (const [name, value] of Object.entries(theme.typography)) {
  if (!/^[\w ,'-]+$/.test(value)) throw new Error(`Invalid font ${name}`);
  vars.push(`  --font-${name}: ${value};`);
}
for (const [name, value, unit] of [
  ['motion-duration', motion.durationMs, 'ms'],
  ['hover-lift', -motion.hoverLiftPx, 'px'],
  ['card-lift', -motion.cardLiftPx, 'px'],
  ['card-radius', theme.shape.cardRadiusPx, 'px'],
  ['button-radius', theme.shape.buttonRadiusPx, 'px'],
  ['layout-width', theme.layout.maxWidthPx, 'px'],
]) {
  if (!Number.isFinite(value)) throw new Error(`Invalid token ${name}`);
  vars.push(`  --${name}: ${value}${unit};`);
}
const output = `/* Generated from config/theme.json and config/experience.json. Run npm run theme. */\n:root {\n${vars.join('\n')}\n}\n`;
const path = new URL('styles/tokens.css', root);
if (process.argv.includes('--check')) {
  if (fs.readFileSync(path, 'utf8') !== output)
    throw new Error('Theme is stale: run npm run theme');
} else fs.writeFileSync(path, output);
console.log('Theme tokens OK');
