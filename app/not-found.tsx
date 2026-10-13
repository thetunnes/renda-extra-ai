import Link from 'next/link';
import ArticleShell from '@/components/ArticleShell';
import copy from '@/content/copy.json';
export default function NotFound() {
  return (
    <ArticleShell>
      <p className="article-date">404</p>
      <h1>{copy.notFound.title}</h1>
      <p className="article-lead">{copy.notFound.description}</p>
      <Link className="button" href="/#plataformas">
        {copy.notFound.action}
      </Link>
    </ArticleShell>
  );
}
