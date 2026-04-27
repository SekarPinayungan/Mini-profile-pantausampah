import { Metadata } from 'next';
import Link from "next/link";
import { getArticles } from "../../../lib/api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((a: any) => a.slug === slug);
  
  return {
    title: article ? `${article.title} | PantauSampah` : 'Artikel Tidak Ditemukan',
    description: article?.desc || 'Baca informasi terbaru seputar pengelolaan sampah di PantauSampah.',
    openGraph: {
      title: article?.title,
      description: article?.desc,
      images: article ? [article.img] : [],
    },
  };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const articles = await getArticles();
  
  const article = articles.find((a: any) => a.slug === slug);

  if (!article) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h2 className="fw-bold mt-5">Artikel Tidak Ditemukan</h2>
        <p className="text-muted mb-4">Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link href="/" className="btn btn-success px-4 rounded-pill">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <section className="py-5 bg-white">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="mb-4">
          <Link href="/" className="text-success text-decoration-none fw-semibold d-inline-flex align-items-center mb-4 transition" style={{ fontSize: "0.95rem" }}>
            <span className="me-2">←</span> Kembali ke Beranda
          </Link>
          
          <h1 className="fw-bold mb-3" style={{ fontSize: "2.8rem", lineHeight: "1.2", letterSpacing: "-0.02em" }}>
            {article.title}
          </h1>
          
          <div className="d-flex align-items-center text-muted mb-4 pb-3 border-bottom">
            <span className="d-flex align-items-center bg-light px-3 py-1 rounded-pill" style={{ fontSize: "0.85rem" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-calendar3 me-2" viewBox="0 0 16 16">
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
              </svg>
              Dipublikasikan {article.time}
            </span>
          </div>
        </div>
        
        <div className="mb-5 rounded-4 overflow-hidden shadow-sm" style={{ aspectRatio: "16/9" }}>
          <img 
            src={article.img} 
            className="img-fluid w-100 h-100" 
            alt={article.title} 
            style={{ objectFit: "cover" }} 
          />
        </div>
        
        <div className="article-content text-dark" style={{ fontSize: "1.15rem", lineHeight: "1.85", color: "#2d3436" }}>
          <p className="fw-semibold text-muted mb-5 fs-5" style={{ borderLeft: "4px solid #2e7d32", paddingLeft: "1.5rem", fontStyle: "italic" }}>
            {article.desc}
          </p>
          
          {article.content?.map((paragraph, index) => (
            <p key={index} className="mb-4" style={{ textAlign: "justify" }}>
              {paragraph}
            </p>
          ))}
        </div>
        
        <div className="mt-5 pt-5 border-top text-center">
          <p className="text-muted mb-4">Ingin tahu lebih banyak tentang pengelolaan sampah?</p>
          <Link href="/contact" className="btn btn-success px-5 py-2 rounded-pill fw-bold shadow-sm">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
}

