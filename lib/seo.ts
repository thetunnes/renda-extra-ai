import type { Metadata } from 'next';
import { site } from './site';
export const absoluteUrl = (path = '/') => new URL(path, site.url).href;
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: absoluteUrl(path), types: { 'application/rss+xml': absoluteUrl('/feed.xml'), 'application/feed+json': absoluteUrl('/feed.json') } }, openGraph: { title, description, url: absoluteUrl(path), siteName: site.name, locale: 'pt_BR', type: 'website' }, twitter: { card: 'summary', title, description } };
}
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
export function breadcrumbs(name: string, path: string) {
 return { '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement:[{'@type':'ListItem',position:1,name:site.name,item:absoluteUrl('/')},{'@type':'ListItem',position:2,name,item:absoluteUrl(path)}] };
}
