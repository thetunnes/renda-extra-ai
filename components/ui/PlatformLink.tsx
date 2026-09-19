import type { ComponentProps } from 'react';
import type { Platform } from '@/domain/types';
import { platformDestination } from '@/domain/platforms';
export default function PlatformLink({
  platform,
  ...props
}: Omit<ComponentProps<'a'>, 'href' | 'rel' | 'target'> & { platform: Platform }) {
  return <a {...props} {...platformDestination(platform)} target="_blank" />;
}
