import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
export const loadContent = () =>
  Object.fromEntries(
    [
      ['brand', 'config/brand.json'],
      ['theme', 'config/theme.json'],
      ['experience', 'config/experience.json'],
      ['platforms', 'content/platforms.json'],
      ['guides', 'content/guides.json'],
      ['copy', 'content/copy.json'],
    ].map(([name, file]) => [name, JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))]),
  );
export function validateContent(
  data,
  assetExists = (src) => fs.existsSync(path.join(root, 'public', src)),
) {
  const { brand, theme, experience, platforms, guides, copy } = data;
  const errors = [];
  const require = (condition, message) => {
    if (!condition) errors.push(message);
  };
  const text = (value, label) =>
    require(typeof value === 'string' && value.trim().length > 0, `${label}: texto obrigatório`);
  const https = (value) => {
    try {
      return new URL(value).protocol === 'https:';
    } catch {
      return false;
    }
  };
  const date = (value) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString().startsWith(value);
  const asset = (src, label) =>
    require(typeof src === 'string' &&
      /^\/(?!\/)[^?#]+$/.test(src) &&
      !src.includes('..') &&
      assetExists(src), `${label}: arquivo local ausente/inválido`);
  const media = (value, label) => {
    if (value === null) return;
    require(value && typeof value === 'object', `${label}: imagem inválida`);
    if (!value) return;
    asset(value.src, label);
    text(value.alt, `${label}.alt`);
    require(Number.isInteger(value.width) &&
      value.width > 0 &&
      Number.isInteger(value.height) &&
      value.height > 0, `${label}: dimensões positivas obrigatórias`);
  };
  text(brand.name, 'brand.name');
  text(brand.description, 'brand.description');
  text(brand.affiliateDisclosure, 'brand.affiliateDisclosure');
  require(https(brand.url) &&
    new URL(brand.url).origin === brand.url, 'brand.url: use uma origem HTTPS sem barra final');
  require(brand.locale === 'pt-BR', 'Este conteúdo editorial usa pt-BR');
  require(date(brand.updatedAt), 'brand.updatedAt: data inválida');
  asset(brand.logo, 'brand.logo');
  asset(brand.favicon, 'brand.favicon');
  require(brand.logoWidth > 0 && brand.logoHeight > 0, 'Logo: dimensões obrigatórias');
  text(brand.seo.title, 'brand.seo.title');
  text(brand.seo.description, 'brand.seo.description');
  require(platforms.length > 0, 'Catálogo deve conter pelo menos uma plataforma');
  for (const [records, key, label] of [
    [platforms, 'id', 'plataforma'],
    [guides, 'slug', 'guia'],
  ]) {
    require(new Set(records.map((x) => x[key])).size ===
      records.length, `${label}: identificadores duplicados`);
    for (const record of records)
      require(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record[key]), `${label}: slug inválido`);
  }
  for (const p of platforms) {
    for (const key of [
      'name',
      'description',
      'tagline',
      'status',
      'device',
      'access',
      'supportedModels',
      'equipment',
      'region',
      'payment',
      'experience',
      'highlight',
    ])
      text(p[key], `${p.id}.${key}`);
    require(https(p.url), `${p.id}: URL oficial deve usar HTTPS`);
    require(typeof p.affiliateUrl === 'string' &&
      (!p.affiliateUrl || https(p.affiliateUrl)), `${p.id}: indicação deve usar HTTPS`);
    require(['confirmed', 'unconfirmed'].includes(p.verification), `${p.id}: verificação inválida`);
    require(date(p.reviewedAt), `${p.id}: data de revisão inválida`);
    require(Array.isArray(p.tasks) &&
      p.tasks.every((x) =>
        ['Vídeo', 'Áudio', 'Fotos', 'Robótica', 'Tarefas no computador'].includes(x),
      ), `${p.id}: tarefa inválida`);
    require(Array.isArray(p.taskDevices) &&
      p.taskDevices.every((x) =>
        ['Celular', 'Computador'].includes(x),
      ), `${p.id}: dispositivo inválido`);
    require(p.verification !== 'unconfirmed' ||
      p.taskDevices.length ===
        0, `${p.id}: compatibilidade não confirmada não pode recomendar dispositivos`);
    require(Array.isArray(p.deviceSources) &&
      p.deviceSources.length > 0 &&
      p.deviceSources.every(
        (x) => x.label && https(x.url),
      ), `${p.id}: fontes oficiais obrigatórias`);
    require(['violet', 'orange', 'blue'].includes(p.color), `${p.id}: cor de plataforma inválida`);
    require(['asterisk', 'audio', 'initials'].includes(p.mark), `${p.id}: símbolo inválido`);
    text(p.initials, `${p.id}.initials`);
    media(p.image, `${p.id}.image`);
  }
  for (const g of guides) {
    for (const key of ['title', 'text', 'type']) text(g[key], `${g.slug}.${key}`);
    require(date(g.updatedAt), `${g.slug}: data inválida`);
    require(['book', 'video', 'shield'].includes(g.icon), `${g.slug}: ícone inválido`);
    media(g.image, `${g.slug}.image`);
  }
  const sectionIds = [
    'hero',
    'trust',
    'catalog',
    'quiz',
    'comparison',
    'how',
    'about',
    'guides',
    'transparency',
    'faq',
  ];
  require(experience.sections.length === sectionIds.length &&
    new Set(experience.sections).size === sectionIds.length &&
    experience.sections.every((x) =>
      sectionIds.includes(x),
    ), 'experience.sections: ordenar todas as seções, sem omitir ou duplicar');
  require(experience.sections[0] === 'hero', 'Hero deve manter o título principal no início');
  const anchors = ['plataformas', 'comparar', 'como-funciona', 'guias', 'sobre'];
  require(experience.navigation.every(
    (x) => x[0] && anchors.includes(x[1]),
  ), 'Navegação aponta para uma seção inexistente');
  const motion = experience.motion;
  require(typeof motion.enabled === 'boolean' &&
    typeof motion.entrance === 'boolean', 'Motion: flags inválidas');
  require(motion.durationMs >= 0 &&
    motion.durationMs <= 1000 &&
    motion.hoverLiftPx >= 0 &&
    motion.hoverLiftPx <= 12 &&
    motion.cardLiftPx >= 0 &&
    motion.cardLiftPx <= 12, 'Motion: valores fora dos limites');
  require(Number.isFinite(motion.heroSway.durationMs) &&
    motion.heroSway.durationMs >= 3000 &&
    motion.heroSway.durationMs <= 20000 &&
    Number.isFinite(motion.heroSway.distancePx) &&
    motion.heroSway.distancePx >= 0 &&
    motion.heroSway.distancePx <= 12 &&
    Number.isFinite(motion.heroSway.rotationDeg) &&
    motion.heroSway.rotationDeg >= 0 &&
    motion.heroSway.rotationDeg <= 3, 'Motion: balanço do hero fora dos limites');
  require(typeof experience.features.assistantTools ===
    'boolean', 'assistantTools deve ser booleano');
  media(experience.images.hero, 'hero');
  for (const [name, color] of Object.entries(theme.colors))
    require(/^[a-z0-9-]+$/.test(name) &&
      /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(
        color,
      ), `theme.colors.${name}: inválida`);
  for (const name of [
    'background',
    'text',
    'primary',
    'muted',
    'border',
    'accent',
    'surface',
    'focus',
  ])
    require(name in theme.colors, `Token obrigatório: ${name}`);
  require(theme.layout.maxWidthPx >= 800 &&
    theme.layout.maxWidthPx <= 1600, 'Largura de layout fora dos limites');
  require(Object.values(theme.shape).every(
    (x) => Number.isFinite(x) && x >= 0 && x <= 40,
  ), 'Raios de borda inválidos');
  require(copy.how.steps.length > 0 &&
    copy.how.steps.every((s) =>
      ['MousePointer2', 'Link2', 'Video', 'CircleDollarSign'].includes(s.icon),
    ), 'Passos: ícone inválido');
  const visit = (obj, where) => {
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'object' && v !== null) visit(v, where + '.' + k);
      else text(v, where + '.' + k);
    }
  };
  visit(copy, 'copy');
  if (errors.length) throw new Error(errors.join('\n'));
  return true;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    validateContent(loadContent());
    console.log('Conteúdo, marca, imagens e regras editoriais OK');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
