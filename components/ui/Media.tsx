import type { MediaAsset } from '@/domain/types';
/** Explicit dimensions prevent layout shifts. Local assets keep exports portable. */
export default function Media({
  asset,
  priority = false,
  className,
}: {
  asset: MediaAsset;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      className={className}
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
