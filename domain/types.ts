/** Domain records are independent of React, Next.js and hosting. */
export type Task = 'Vídeo' | 'Áudio' | 'Fotos' | 'Robótica' | 'Tarefas no computador';
export type Device = 'Celular' | 'Computador';
export type MediaAsset = { src: string; alt: string; width: number; height: number };
export type Platform = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tasks: Task[];
  status: string;
  verification: 'confirmed' | 'unconfirmed';
  reviewedAt: string;
  device: string;
  taskDevices: Device[];
  access: string;
  supportedModels: string;
  equipment: string;
  deviceSources: { label: string; url: string }[];
  region: string;
  payment: string;
  experience: string;
  url: string;
  affiliateUrl: string;
  color: string;
  highlight: string;
  mark: 'asterisk' | 'audio' | 'initials';
  initials: string;
  image: MediaAsset | null;
};
export type Guide = {
  slug: string;
  title: string;
  text: string;
  type: string;
  updatedAt: string;
  icon: 'book' | 'video' | 'shield';
  image: MediaAsset | null;
};
