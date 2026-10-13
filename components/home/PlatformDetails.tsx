import { formatDate } from '@/lib/presentation';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Platform } from '@/domain/types';
import Mark from '@/components/ui/PlatformMark';
import PlatformLink from '@/components/ui/PlatformLink';
import Modal from '@/components/ui/Modal';
export default function PlatformDetails({
  platform,
  onClose,
}: {
  platform: Platform;
  onClose: () => void;
}) {
  return (
    <Modal onClose={onClose} labelledBy="modal-title">
      <Mark p={platform} />
      <h2 id="modal-title">{platform.name}</h2>
      <p>{platform.description}</p>
      <dl>
        {[
          ['Para realizar tarefas', platform.device],
          ['Região', platform.region],
          ['Pagamento', platform.payment],
          ['Experiência', platform.experience],
          ['Disponibilidade', platform.status],
        ].map(([a, b]) => (
          <div key={a}>
            <dt>{a}</dt>
            <dd>{b}</dd>
          </div>
        ))}
      </dl>
      <section className="device-requirements" aria-label="Dispositivos e equipamentos">
        <h3>O que você precisa para começar</h3>
        <h4>Acesso à conta</h4>
        <p>{platform.access}</p>
        <h4>Modelos compatíveis</h4>
        <p>{platform.supportedModels}</p>
        <h4>Equipamentos para as tarefas</h4>
        <p>{platform.equipment}</p>
        <p className="device-clarification">
          Abrir o site no computador não significa que ele pode substituir o celular na gravação.
        </p>
        {platform.deviceSources.map((source) => (
          <a
            key={source.url}
            className="source-link"
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {source.label} <ArrowUpRight size={12} />
          </a>
        ))}
        <small>
          Requisitos consultados em {formatDate(platform.reviewedAt)}. Confirme as condições atuais
          no projeto.
        </small>
      </section>
      <Link className="source-link" href={`/plataformas/${platform.id}/`}>
        Página completa e link para compartilhar →
      </Link>
      <p className="modal-note">
        Confira os termos, os requisitos e as condições de saque antes de enviar dados. Tarefas e
        ganhos não são garantidos.
      </p>
      <PlatformLink className="button" platform={platform}>
        Acessar plataforma <ArrowUpRight size={17} />
      </PlatformLink>
      <a className="source-link" href={platform.url} target="_blank" rel="noopener noreferrer">
        Fonte: site oficial · consultado em {formatDate(platform.reviewedAt)}
      </a>
    </Modal>
  );
}
