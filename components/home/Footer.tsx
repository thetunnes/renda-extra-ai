import { ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/site';
import Brand from '@/components/ui/Brand';
import copy from '@/content/copy.json';
export default function Footer() {
  return (
    <>
      <footer>
        <div className="wrap footer-top">
          <div>
            <Brand />
            <p>{site.description}</p>
          </div>
          <a href="#plataformas">
            {copy.footer.explore}
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="wrap footer-bottom">
          <span>
            © {site.copyrightYear} {site.name} · Curadoria independente.
          </span>
          <span className="footer-feeds">
            <a href="/feed.xml">{copy.footer.rss}</a>
            <a href="/feed.json">{copy.footer.json}</a>
            <a href="/llms.txt">{copy.footer.ai}</a>
          </span>
        </div>
      </footer>
    </>
  );
}
