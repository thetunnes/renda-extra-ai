import Brand from '@/components/ui/Brand';
import Link from 'next/link';
import { site } from '@/lib/site';
export default function ArticleShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <div className="wrap nav">
          <Brand />
          <Link className="text-link" href="/#plataformas">
            ← Ver plataformas
          </Link>
        </div>
      </header>
      <main className="wrap article-page">{children}</main>
      <footer>
        <div className="wrap footer-bottom">
          <span>
            © {site.copyrightYear} {site.name} · Curadoria independente.
          </span>
          <span className="footer-feeds">
            <a href="/feed.xml">RSS</a>
            <a href="/feed.json">JSON Feed</a>
            <Link href="/#sobre">Sobre a curadoria</Link>
          </span>
        </div>
      </footer>
    </>
  );
}
