import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/lib/site';
export const metadata: Metadata = {
 metadataBase: new URL(site.url), title: {default: site.name, template: `%s | ${site.name}`},
 description: 'Descubra plataformas de renda extra com IA. Compare tarefas, dispositivos, requisitos e pagamentos com curadoria independente.',
 icons: { icon: '/favicon.svg' }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) { return <html lang="pt-BR"><body>{children}</body></html>; }
