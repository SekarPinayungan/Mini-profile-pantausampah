import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getRelatedArticles } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return {
    title: article ? `${article.title} | PantauSampah` : 'Artikel | PantauSampah',
    description: article?.desc ?? 'Baca informasi terbaru seputar pengelolaan sampah.',
    openGraph: {
      title: article?.title,
      description: article?.desc,
      images: article?.img ? [article.img] : [],
    },
  };
}

export default async function ArticleDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.title, slug);

  return (
    <>
      {/* Article Content */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: '800px' }}>

          {/* Breadcrumb */}
          <nav className="mb-4">
            <Link href="/blog" className="text-success text-decoration-none fw-semibold" style={{ fontSize: '0.95rem' }}>
              ← Kembali ke Blog
            </Link>
          </nav>

          {/* Title */}
          <h1 className="fw-bold mb-3" style={{ fontSize: '2.2rem', lineHeight: '1.25', letterSpacing: '-0.01em' }}>
            {article.title}
          </h1>

          {/* Meta */}
          <div className="d-flex align-items-center gap-3 text-muted mb-5 pb-4 border-bottom" style={{ fontSize: '0.85rem' }}>
            <span className="badge bg-success bg-opacity-10 text-success px-3 py-1 rounded-pill">
              {article.source}
            </span>
            <span>{article.time}</span>
          </div>

          {/* Hero Image */}
          <div className="mb-5 rounded-4 overflow-hidden shadow-sm" style={{ aspectRatio: '16/9' }}>
            <img
              src={article.img}
              alt={article.title}
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Description callout */}
          <p className="lead fw-semibold text-muted mb-5" style={{ borderLeft: '4px solid #2e7d32', paddingLeft: '1.25rem', fontStyle: 'italic' }}>
            {article.desc}
          </p>

          {/* Body */}
          <div style={{ fontSize: '1.1rem', lineHeight: '1.85', color: '#2d3436' }}>
            {(article.content ?? []).map((paragraph, i) => (
              <p key={i} className="mb-4" style={{ textAlign: 'justify' }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-5 pt-4 border-top text-center">
            <p className="text-muted mb-4 small">
              Artikel ini bersumber dari <strong>{article.source}</strong>.
              </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              {article.url && article.url !== '#' && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-success rounded-pill px-5 py-2 fw-semibold"
                >
                  Baca Selengkapnya
                </a>
              )}
              <Link href="/contact" className="btn btn-success rounded-pill px-5 py-2 fw-semibold">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-5 bg-light border-top">
          <div className="container">
            <h3 className="fw-bold mb-4">Artikel Terkait</h3>
            <div className="row g-4">
              {relatedArticles.map((item, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card berita-card h-100 shadow-sm border-0 rounded-4">
                    <div className="overflow-hidden rounded-top-4" style={{ height: '180px' }}>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="card-img-top h-100 w-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="card-body p-4">
                      <h5 className="card-title fw-bold mb-2" style={{ fontSize: '1rem', lineHeight: '1.4' }}>
                        {item.title}
                      </h5>
                      <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                        <small className="text-muted">{item.time}</small>
                        <Link href={`/blog/${item.slug}`} className="text-success fw-semibold small text-decoration-none">
                          Baca →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
