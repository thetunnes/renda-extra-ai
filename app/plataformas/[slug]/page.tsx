import PlatformLink from '@/components/ui/PlatformLink';
import { formatDate } from '@/lib/presentation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { platforms, site } from '@/lib/site';
import { absoluteUrl, breadcrumbs, jsonLd, pageMetadata } from '@/lib/seo';
import ArticleShell from '@/components/ArticleShell';
import Share from '@/components/Share';
import copy from '@/content/copy.json';
export const dynamicParams = false;
export function generateStaticParams() {
  return platforms.map((p) => ({ slug: p.id }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = platforms.find((p) => p.id === slug);
  if (!p) notFound();
  return pageMetadata(
    `${p.name}: como funciona, dispositivos e requisitos`,
    p.description,
    `/plataformas/${p.id}/`,
  );
}
export default async function PlatformPage({ params }: Props) {
  const { slug } = await params;
  const p = platforms.find((p) => p.id === slug);
  if (!p) notFound();
  const path = `/plataformas/${p.id}/`;
  return (
    <ArticleShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs(p.name, path)) }}
      />
      <nav aria-label="Caminho da página">
        <Link href="/">Início</Link> / {p.name}
      </nav>
      <h1>{p.name}</h1>
      <p className="article-lead">{p.description}</p>
      <p className="article-date">
        Informações consultadas em <time dateTime={p.reviewedAt}>{formatDate(p.reviewedAt)}</time> ·
        Curadoria {site.name}
      </p>
      <div className="article-actions">
        <PlatformLink className="button" platform={p}>
          Acessar {p.name} ↗
        </PlatformLink>
        <a className="text-link" href="#requisitos">
          {copy.catalog.details} ↓
        </a>
      </div>
      <Share title={`${p.name} — ${site.name}`} url={absoluteUrl(path)} />
      <section>
        <h2>Tarefas e condições</h2>
        <dl>
          {[
            ['Tarefas', p.tasks.join(', ') || 'Não informado'],
            ['Disponibilidade', p.status],
            ['Região', p.region],
            ['Forma de pagamento', p.payment],
            ['Experiência', p.experience],
          ].map(([a, b]) => (
            <div key={a}>
              <dt>{a}</dt>
              <dd>{b}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section id="requisitos">
        <h2>Dispositivos e equipamentos</h2>
        <h3>Acesso à conta</h3>
        <p>{p.access}</p>
        <h3>Celulares compatíveis</h3>
        <p>{p.supportedModels}</p>
        <h3>O que usar nas tarefas</h3>
        <p>{p.equipment}</p>
        <p>
          Acesso pelo navegador não confirma que um computador pode substituir o celular nas
          gravações.
        </p>
      </section>
      <section>
        <h2>Antes de participar</h2>
        <p>
          Ganhos e tarefas não são garantidos. Consulte os requisitos do projeto, os critérios de
          aprovação e as regras de saque. Leia como a plataforma utiliza os dados enviados.
        </p>
        <p>{site.affiliateDisclosure}</p>
        <PlatformLink className="button" platform={p}>
          Acessar {p.name} ↗
        </PlatformLink>
      </section>
      <section>
        <h2>Fontes e verificação</h2>
        <ul>
          {p.deviceSources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label} ↗
              </a>
            </li>
          ))}
          <li>
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              Site oficial da {p.name} ↗
            </a>
          </li>
        </ul>
        <p>
          Informações não localizadas nas fontes públicas estão sinalizadas. A inclusão na curadoria
          não representa garantia de vagas ou pagamentos.
        </p>
      </section>
      <section>
        <h2>Compare outras plataformas</h2>
        <div className="related-links">
          {platforms
            .filter((v) => v.id !== p.id)
            .map((v) => (
              <Link key={v.id} href={`/plataformas/${v.id}/`}>
                {v.name} →
              </Link>
            ))}
        </div>
      </section>
    </ArticleShell>
  );
}
