import { site } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';
import { feedEntries } from '@/lib/feeds';
export const dynamic = 'force-static';
export function GET() {
  return Response.json(
    {
      version: 'https://jsonfeed.org/version/1.1',
      title: site.name,
      home_page_url: absoluteUrl('/'),
      feed_url: absoluteUrl('/feed.json'),
      language: 'pt-BR',
      description: site.description,
      items: feedEntries.map((e) => ({
        id: e.id,
        url: e.id,
        title: e.title,
        content_text: e.text,
        date_modified: e.updatedAt + 'T00:00:00-03:00',
      })),
    },
    { headers: { 'Content-Type': 'application/feed+json; charset=utf-8' } },
  );
}
