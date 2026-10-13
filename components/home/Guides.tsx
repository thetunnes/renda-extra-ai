import Link from 'next/link';
import { ArrowUpRight, Video, ShieldCheck, BookOpen } from 'lucide-react';
import { guides } from '@/lib/content';
import Media from '@/components/ui/Media';
import copy from '@/content/copy.json';
function GuideIcon({ name }: { name: string }) {
  const Icon =
    ({ book: BookOpen, video: Video, shield: ShieldCheck } as const)[
      name as 'book' | 'video' | 'shield'
    ] || BookOpen;
  return <Icon size={52} strokeWidth={1.15} />;
}
export default function Guides() {
  return (
    <>
      <section id="guias" className="section guides wrap">
        <div className="section-heading">
          <div>
            <h2>{copy.guides.title}</h2>
          </div>
          <span className="muted">{copy.guides.description}</span>
        </div>
        <div className="guide-grid">
          {guides.map((g, i) => (
            <Link className="guide-card" href={`/guias/${g.slug}/`} key={g.title}>
              <div className={`guide-art guide-${i}`}>
                {g.image ? <Media asset={g.image} /> : <GuideIcon name={g.icon} />}
              </div>
              <div className="guide-content">
                <small>{g.type}</small>
                <h3>{g.title}</h3>
                <span>
                  {copy.guides.action}
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
