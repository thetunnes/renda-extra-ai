import brand from '@/config/brand.json';
import records from '@/content/platforms.json';
import type { Platform } from '@/domain/types';
// Compatibility facade: pages, metadata and feeds consume the same records.
export const site = brand;
export const platforms = records as Platform[];
export type { Platform } from '@/domain/types';
