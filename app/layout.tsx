import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/lib/site';
export const metadata: Metadata = { title: `${site.name} — Sua contribuição, a próxima geração de IA`, description: 'Descubra e compare plataformas para contribuir com vídeos, voz e fotos no treinamento de inteligência artificial. Curadoria independente e transparente.', icons: { icon: '/favicon.svg' } };
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) { return <html lang="pt-BR"><body>{children}</body></html>; }
