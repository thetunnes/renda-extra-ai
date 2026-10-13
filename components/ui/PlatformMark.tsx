import { AudioLines, Asterisk } from 'lucide-react';
import type { Platform } from '@/domain/types';
import Media from './Media';
export default function PlatformMark({ p }: { p: Platform }) {
  return (
    <span className={`platform-logo ${p.color}`}>
      {p.image ? (
        <Media asset={p.image} />
      ) : p.mark === 'asterisk' ? (
        <Asterisk size={29} aria-hidden="true" />
      ) : p.mark === 'audio' ? (
        <AudioLines size={29} />
      ) : (
        <span className="invent-mark">{p.initials}</span>
      )}
    </span>
  );
}
