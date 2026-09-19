'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  AudioLines,
  Camera,
  Video,
  Smartphone,
  Monitor,
  CircleDollarSign,
  ScanLine,
  Clock3,
} from 'lucide-react';
import { platforms } from '@/lib/site';
import Mark from '@/components/ui/PlatformMark';
import PlatformLink from '@/components/ui/PlatformLink';
import { filterPlatforms, taskFilters, type TaskFilter } from '@/domain/platforms';
import copy from '@/content/copy.json';
import { usePlatformTools } from '@/hooks/usePlatformTools';
const taskIcons: Record<string, typeof Video> = {
  Vídeo: Video,
  Áudio: AudioLines,
  Fotos: Camera,
  Robótica: ScanLine,
  'Tarefas no computador': Monitor,
};
export default function Catalog() {
  const [filter, setFilter] = useState<TaskFilter>('Todas');
  const filtered = filterPlatforms(platforms, filter);
  usePlatformTools(setFilter);
  return (
    <>
      <section id="plataformas" className="section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{copy.catalog.eyebrow}</span>
            <h2>{copy.catalog.title}</h2>
            <p>{copy.catalog.description}</p>
          </div>
          <span className="count">
            {String(platforms.length).padStart(2, '0')} {copy.catalog.countSuffix}
          </span>
        </div>
        <div className="filters" aria-label="Filtrar por tipo de tarefa">
          {taskFilters.map((f) => {
            const Icon = taskIcons[f];
            return (
              <button
                key={f}
                className={filter === f ? 'active' : ''}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {Icon && <Icon size={15} />} {f === 'Todas' ? 'Todas as plataformas' : f}
              </button>
            );
          })}
        </div>
        <div className="platform-grid">
          {filtered.map((p) => (
            <article className="platform-card" key={p.id}>
              <div className="card-top">
                <Mark p={p} />
                <span className={`status ${p.verification === 'unconfirmed' ? 'unconfirmed' : ''}`}>
                  <span />
                  {p.status}
                </span>
              </div>
              <h3>
                {p.name}
                <ArrowUpRight size={20} />
              </h3>
              <p className="card-description">{p.description}</p>
              <div className="tags">
                {p.tasks.length ? (
                  p.tasks.map((t) => {
                    const Icon = taskIcons[t];
                    return (
                      <span key={t}>
                        <Icon size={13} />
                        {t}
                      </span>
                    );
                  })
                ) : (
                  <span>{copy.catalog.unknownTask}</span>
                )}
              </div>
              <div className="card-facts">
                <span>
                  <Smartphone size={15} />
                  {p.device}
                </span>
                <span>
                  <CircleDollarSign size={15} />
                  {p.highlight}
                </span>
              </div>
              <div className="card-actions">
                <Link href={`/plataformas/${p.id}/`}>
                  {copy.catalog.details}
                  <ArrowRight size={15} />
                </Link>
                <PlatformLink platform={p} aria-label={`Acessar ${p.name}`}>
                  <ArrowUpRight size={19} />
                </PlatformLink>
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && <p role="status">{copy.catalog.empty}</p>}
        <p className="footnote">
          <Clock3 size={13} />
          {copy.catalog.reviewNote}
        </p>
      </section>
    </>
  );
}
