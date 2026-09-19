import {
  ArrowUpRight,
  ArrowRight,
  AudioLines,
  Camera,
  Video,
  ShieldCheck,
  Link2,
} from 'lucide-react';
import { site } from '@/lib/site';
import Media from '@/components/ui/Media';
import copy from '@/content/copy.json';
import experience from '@/config/experience.json';
export default function Hero() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="green-dot" />
            {copy.hero.eyebrow}
          </div>
          <h1>
            {copy.hero.title}
            <br />
            {copy.hero.titleLine2}
            <br />
            <em>{copy.hero.titleEmphasis}</em>
          </h1>
          <p className="hero-description">
            {copy.hero.description}
            <br className="desktop" /> {copy.hero.descriptionLine2}
            <br className="desktop" /> {copy.hero.descriptionLine3}
          </p>
          <div className="hero-actions">
            <a className="button" href="#plataformas">
              {copy.hero.primaryAction}
              <ArrowUpRight size={18} />
            </a>
            <a className="text-link" href="#como-funciona">
              {copy.hero.secondaryAction}
              <ArrowRight size={16} />
            </a>
          </div>
          <p className="disclosure">
            <ShieldCheck size={15} />
            {site.affiliateDisclosure}
          </p>
        </div>
        {experience.images.hero ? (
          <Media className="hero-image" asset={experience.images.hero} priority />
        ) : (
          <div
            className="hero-art"
            aria-label="Vídeos, voz e fotos conectam pessoas ao desenvolvimento da inteligência artificial"
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-cross cross-one">{copy.hero.decoration}</div>
            <div className="art-cross cross-two">{copy.hero.decoration}</div>
            <div className="art-label">{copy.hero.artLabel}</div>
            <div className="art-center">
              <Link2 size={68} strokeWidth={1.6} />
              <span>
                {copy.hero.artCaption}
                <br />
                <strong>{copy.hero.artCaptionEmphasis}</strong>
              </span>
            </div>
            <div className="floating task-voice">
              <span className="art-icon">
                <AudioLines size={22} />
              </span>
              <div>
                <b>{copy.hero.voiceTitle}</b>
                <div className="wave">
                  {Array.from({ length: 30 }, (_, i) => (
                    <i key={i} style={{ height: 8 + ((i * 13) % 24) }} />
                  ))}
                </div>
              </div>
              <span className="record-dot" />
            </div>
            <div className="floating task-video">
              <span className="art-icon peach">
                <Video size={21} />
              </span>
              <div>
                <b>{copy.hero.videoTitle}</b>
                <small>{copy.hero.videoSubtitle}</small>
              </div>
              <ArrowUpRight size={17} />
            </div>
            <div className="floating task-photo">
              <span className="art-icon yellow">
                <Camera size={21} />
              </span>
              <div>
                <b>{copy.hero.photoTitle}</b>
                <small>{copy.hero.photoSubtitle}</small>
              </div>
            </div>
            <span className="art-footer">
              <span className="green-dot" />
              {copy.hero.artFooter}
            </span>
          </div>
        )}
      </section>
    </>
  );
}
