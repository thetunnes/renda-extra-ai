import Brand from '@/components/ui/Brand';
import Link from 'next/link';
import { site } from '@/lib/site';
import copy from '@/content/copy.json';
export default function ArticleShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#conteudo">
        {copy.article.skip}
      </a>
      <header>
        <div className="wrap nav">
          <Brand />
          <Link className="text-link" href="/#plataformas">
            {copy.article.back}
          </Link>
        </div>
      </header>
      <main id="conteudo" className="wrap article-page">
        {children}
      </main>
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
