import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { site, platforms } from '@/lib/site';
import Media from '@/components/ui/Media';
import Mark from '@/components/ui/PlatformMark';
import copy from '@/content/copy.json';
import experience from '@/config/experience.json';
export default function Hero() {
  return (
    <section className="hero-field">
      <div className="hero wrap">
        <div className="hero-copy">
          <h1>
            {copy.hero.title}
            <br />
            {copy.hero.titleLine2}
          </h1>
          <p className="hero-description">
            {copy.hero.description} {copy.hero.descriptionLine2}
          </p>
          <div className="hero-actions">
            <a className="button" href="#plataformas">
              {copy.hero.primaryAction}
              <ArrowUpRight size={20} />
            </a>
            <a className="text-link" href="#encontrar">
              {copy.hero.secondaryAction}
              <ArrowRight size={18} />
            </a>
          </div>
          <p className="hero-condition">{copy.hero.descriptionLine3}</p>
          <p className="disclosure">{site.affiliateDisclosure}</p>
        </div>
        {experience.images.hero ? (
          <Media className="hero-image" asset={experience.images.hero} priority />
        ) : (
          <aside className="hero-directory" aria-label={copy.hero.artLabel} data-ui>
            <h2>
              {copy.hero.artCaption}
              <br />
              {copy.hero.artCaptionEmphasis}
            </h2>
            <div className="directory-list">
              {platforms.map((p) => (
                <Link className="directory-row" key={p.id} href={`/plataformas/${p.id}/`}>
                  <Mark p={p} />
                  <span>
                    <strong>{p.name}</strong>
                    <small>{p.tasks.join(' · ') || copy.catalog.unknownTask}</small>
                  </span>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className="directory-note">{copy.hero.artFooter}</p>
          </aside>
        )}
      </div>
    </section>
  );
}
