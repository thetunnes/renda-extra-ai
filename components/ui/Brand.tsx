import { site } from '@/lib/site';
export default function Brand({ href = '/' }: { href?: string }) {
  return (
    <a className="brand" href={href} aria-label={`${site.name} — início`}>
      <img src={site.logo} alt={site.name} width={site.logoWidth} height={site.logoHeight} />
    </a>
  );
}
