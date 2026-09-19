import Home from '@/components/Home';
import { platforms, site } from '@/lib/site';
import { absoluteUrl, jsonLd, pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(site.seo.title, site.seo.description, '/');
export default function Page() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': absoluteUrl('/#organization'),
        name: site.name,
        url: site.url,
        logo: absoluteUrl(site.logo),
      },
      {
        '@type': 'WebSite',
        '@id': absoluteUrl('/#website'),
        name: site.name,
        url: site.url,
        inLanguage: 'pt-BR',
        publisher: { '@id': absoluteUrl('/#organization') },
      },
      {
        '@type': 'CollectionPage',
        '@id': absoluteUrl('/#page'),
        name: site.seo.title,
        url: absoluteUrl('/'),
        isPartOf: { '@id': absoluteUrl('/#website') },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: platforms.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.name,
            url: absoluteUrl(`/plataformas/${p.id}/`),
          })),
        },
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
      <Home />
    </>
  );
}
