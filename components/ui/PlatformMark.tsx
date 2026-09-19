import { AudioLines } from 'lucide-react';
import type { Platform } from '@/domain/types';
import Media from './Media';
export default function PlatformMark({ p }: { p: Platform }) {
  return (
    <span className={`platform-logo ${p.color}`}>
      {p.image ? (
        <Media asset={p.image} />
      ) : p.mark === 'asterisk' ? (
        <span className="hub-mark">✳</span>
      ) : p.mark === 'audio' ? (
        <AudioLines size={29} />
      ) : (
        <span className="invent-mark">{p.initials}</span>
      )}
    </span>
  );
}
