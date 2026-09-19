import type { Metadata } from 'next';
import './globals.css';
import experience from '@/config/experience.json';
import { site } from '@/lib/site';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.seo.description,
  icons: { icon: site.favicon },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={site.locale}
      data-motion={experience.motion.enabled ? 'on' : 'off'}
      data-entrance={experience.motion.entrance}
    >
      <body>{children}</body>
    </html>
  );
}
