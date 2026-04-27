import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return {
    title: article ? `${article.title} | PantauSampah` : 'Detail | PantauSampah',
    description: article?.desc ?? 'Informasi seputar pengelolaan sampah.',
  };
}

export default async function DynamicPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="py-5 bg-light">
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="mb-4">
          <Link href="/" className="text-success text-decoration-none small">← Kembali</Link>
        </nav>

        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm">
          <h1 className="fw-bold mb-4">{article?.title}</h1>

          <div className="mb-4 rounded-4 overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <img
              src={article?.img ?? '/assets/img/berita1.jpg'}
              alt={article?.title}
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="article-meta mb-4 d-flex gap-3 text-muted small border-bottom pb-3">
            <span>By {article?.source}</span>
            <span>•</span>
            <span>{article?.time}</span>
          </div>

          <div className="article-body" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
            {(article?.content ?? []).map((p: string, i: number) => (
              <p key={i} className="mb-3">{p}</p>
            ))}
          </div>

          <div className="mt-5 pt-4 border-top">
            {article?.url && article.url !== '#' && (
              <a href={article.url} target="_blank" rel="noopener noreferrer"
                className="btn btn-outline-success rounded-pill px-4">
                Baca Sumber Asli
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
