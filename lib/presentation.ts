import { site } from './site';
export function formatDate(value: string) {
  return new Intl.DateTimeFormat(site.locale, { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${value}T12:00:00Z`),
  );
}
export function brandText(value: string) {
  return value.replaceAll('{brand}', site.name);
}
