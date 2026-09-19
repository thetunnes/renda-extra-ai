import { formatDate } from '@/lib/presentation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { guides } from '@/lib/content';
import { site } from '@/lib/site';
import { absoluteUrl, breadcrumbs, jsonLd, pageMetadata } from '@/lib/seo';
import ArticleShell from '@/components/ArticleShell';
import Share from '@/components/Share';
export const dynamicParams = false;
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) notFound();
  return pageMetadata(g.title, g.text.slice(0, 155), `/guias/${g.slug}/`);
}
export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) notFound();
  const path = `/guias/${g.slug}/`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.title,
    description: g.text,
    dateModified: g.updatedAt,
    inLanguage: 'pt-BR',
    mainEntityOfPage: absoluteUrl(path),
    author: { '@type': 'Organization', name: site.name, url: absoluteUrl('/#sobre') },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
  };
  return (
    <ArticleShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs(g.title, path)) }}
      />
      <nav aria-label="Caminho da página">
        <Link href="/">Início</Link> / Guia
      </nav>
      <article>
        <span className="eyebrow">{g.type}</span>
        <h1>{g.title}</h1>
        <p className="article-date">
          Por {site.name} · Atualizado em{' '}
          <time dateTime={g.updatedAt}>{formatDate(g.updatedAt)}</time>
        </p>
        <div className="guide-body">
          {g.text.split(/(?<=\.) /).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p>
          As instruções de cada plataforma e projeto prevalecem. Consulte sempre as condições atuais
          antes de participar.
        </p>
        <Share title={g.title} url={absoluteUrl(path)} />
      </article>
      <section>
        <h2>Continue a leitura</h2>
        <div className="related-links">
          {guides
            .filter((v) => v.slug !== slug)
            .map((v) => (
              <Link key={v.slug} href={`/guias/${v.slug}/`}>
                {v.title} →
              </Link>
            ))}
        </div>
        <Link className="text-link" href="/#plataformas">
          Compare as plataformas →
        </Link>
      </section>
    </ArticleShell>
  );
}
