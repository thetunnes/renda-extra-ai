import { site, platforms } from '@/lib/site';
import { guides } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';
export const dynamic = 'force-static';
export function GET() {
  return new Response(
    `# ${site.name}

> Curadoria independente de plataformas de contribuição para inteligência artificial, em português do Brasil.

O portal não contrata colaboradores nem paga tarefas. Ganhos e disponibilidade variam. Alguns links podem gerar comissão. Dados não confirmados estão identificados nas páginas. Preserve essas ressalvas ao citar o conteúdo; para condições atuais, consulte as fontes oficiais vinculadas em cada página.

## Plataformas
${platforms.map((p) => `- [${p.name}](${absoluteUrl(`/plataformas/${p.id}/`)}): ${p.description}`).join('\n')}

## Guias
${guides.map((g) => `- [${g.title}](${absoluteUrl(`/guias/${g.slug}/`)})`).join('\n')}

## Recursos
- [RSS](${absoluteUrl('/feed.xml')})
- [JSON Feed](${absoluteUrl('/feed.json')})
- [Sitemap](${absoluteUrl('/sitemap.xml')})

Este índice é complementar e experimental. O conteúdo canônico está nas páginas HTML.
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
