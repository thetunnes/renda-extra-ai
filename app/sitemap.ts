import type { MetadataRoute } from 'next';
import { site,platforms } from '@/lib/site';
import { guides } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return [{url:absoluteUrl('/'),lastModified:site.updatedAt},...platforms.map(p=>({url:absoluteUrl(`/plataformas/${p.id}/`),lastModified:site.updatedAt})),...guides.map(g=>({url:absoluteUrl(`/guias/${g.slug}/`),lastModified:g.updatedAt}))];}
