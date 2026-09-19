import { site } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';
import { feedEntries, xml } from '@/lib/feeds';
export const dynamic = 'force-static';
export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(site.name)}</title><link>${xml(absoluteUrl('/'))}</link><description>Plataformas e guias para contribuir com inteligência artificial.</description><language>pt-BR</language><atom:link href="${xml(absoluteUrl('/feed.xml'))}" rel="self" type="application/rss+xml"/>${feedEntries.map((e) => `<item><title>${xml(e.title)}</title><link>${xml(e.id)}</link><guid isPermaLink="true">${xml(e.id)}</guid><description>${xml(e.text)}</description></item>`).join('')}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
}
