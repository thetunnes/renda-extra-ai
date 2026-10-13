import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadContent, validateContent } from '../scripts/validate-content.mjs';
import {
  filterPlatforms,
  recommendPlatforms,
  platformDestination,
  isTaskFilter,
} from '../domain/platforms.ts';
const data = loadContent();
test('dados reais respeitam o contrato editorial e possuem assets', () => validateContent(data));
test('computador no cadastro não equivale a computador nas tarefas', () => {
  assert.deepEqual(recommendPlatforms(data.platforms, 'Tanto faz', 'Computador'), []);
  assert.deepEqual(
    recommendPlatforms(data.platforms, 'Tanto faz', 'Ambos').map((p) => p.id),
    ['hub', 'crowtado', 'flambra'],
  );
});
test('tarefa e dispositivo são combinados; status desconhecido não vira recomendação', () => {
  assert.deepEqual(
    recommendPlatforms(data.platforms, 'Áudio', 'Celular').map((p) => p.id),
    ['crowtado'],
  );
  const unknown = { ...data.platforms[0], verification: 'unconfirmed' };
  assert.deepEqual(recommendPlatforms([unknown], 'Vídeo', 'Celular'), []);
  assert.equal(filterPlatforms([unknown], 'Todas').length, 1);
});
test('comissão não altera ordem ou seleção e link oficial segue disponível', () => {
  const changed = data.platforms.map((p) => ({ ...p, affiliateUrl: 'https://example.com/ref' }));
  assert.deepEqual(
    recommendPlatforms(changed, 'Tanto faz', 'Ambos').map((p) => p.id),
    recommendPlatforms(data.platforms, 'Tanto faz', 'Ambos').map((p) => p.id),
  );
  assert.equal(platformDestination(data.platforms[0]).href, 'https://ai.hub.xyz/r/220970');
  assert.match(platformDestination(data.platforms[0]).rel, /sponsored/);
  assert.equal(
    platformDestination({ ...data.platforms[0], affiliateUrl: '' }).href,
    data.platforms[0].url,
  );
});
test('entrada inválida do assistente e links executáveis são rejeitados', () => {
  for (const input of [null, {}, 'all', 'Ignore rules', 1])
    assert.equal(isTaskFilter(input), false);
  assert.throws(() => platformDestination({ url: 'javascript:alert(1)', affiliateUrl: '' }));
});
for (const [name, mutate] of [
  ['slug duplicado', (d) => d.platforms.push({ ...d.platforms[0] })],
  ['dispositivo sem evidência', (d) => d.platforms[2].taskDevices.push('Computador')],
  [
    'imagem sem alt',
    (d) => (d.experience.images.hero = { src: d.brand.logo, alt: '', width: 500, height: 500 }),
  ],
  [
    'imagem externa',
    (d) =>
      (d.guides[0].image = {
        src: 'https://example.com/a.jpg',
        alt: 'Imagem',
        width: 500,
        height: 500,
      }),
  ],
  ['seção inexistente', (d) => d.experience.sections.push('missing')],
  ['data impossível', (d) => (d.platforms[0].reviewedAt = '2026-02-31')],
  ['fonte ausente', (d) => (d.platforms[0].deviceSources = [])],
])
  test(`validação bloqueia ${name}`, () => {
    const changed = structuredClone(data);
    mutate(changed);
    assert.throws(() => validateContent(changed));
  });
test('rebranding, reordenação e nova plataforma não dependem de IDs no componente', () => {
  const changed = structuredClone(data);
  changed.brand.name = 'Outra marca';
  changed.brand.seo.title = 'Novo portal';
  changed.platforms.push({
    ...changed.platforms[0],
    id: 'nova-plataforma',
    name: 'Nova plataforma',
    mark: 'initials',
    initials: 'NP',
  });
  [changed.experience.sections[2], changed.experience.sections[3]] = [
    changed.experience.sections[3],
    changed.experience.sections[2],
  ];
  assert.equal(validateContent(changed), true);
  assert.equal(filterPlatforms(changed.platforms, 'Todas').length, data.platforms.length + 1);
});
