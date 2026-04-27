import Link from "next/link";
import { getArticles } from "@/lib/api";

// Penting untuk mencegah error prerender di Vercel saat menggunakan API eksternal
export const dynamic = "force-dynamic";

export default async function Blog() {
  let articles = [];
  
  try {
    articles = await getArticles();
  } catch (error) {
    console.error("Error loading articles:", error);
    articles = [];
  }

  return (
    <section id="Berita" className="berita py-5">
      <div className="container">
        <h2 className="fw-bold mb-2">Artikel Terkait</h2>
        <p className="text-muted mb-5">
          Temukan informasi dan edukasi seputar pengelolaan sampah
        </p>

        {articles.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">Artikel tidak tersedia saat ini</p>
          </div>
        ) : (
          <div className="row g-4">
            {articles.map((item: any, index: number) => (
              <div className="col-md-4" key={index}>
                <div className="card berita-card h-100 shadow-sm border-0 transition-hover">
                  <div className="overflow-hidden" style={{ height: "200px" }}>
                    <img 
                      src={item.img} 
                      className="card-img-top h-100 w-100" 
                      alt={item.title} 
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold mb-3" style={{ lineHeight: "1.4" }}>
                      {item.title}
                    </h5>
                    <p className="card-text text-muted mb-4" style={{ fontSize: "0.9rem" }}>
                      {item.desc}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                      <small className="text-muted">{item.time}</small>
                      <Link href={`/blog/${item.slug}`} className="btn btn-sm btn-success px-3 rounded-pill">
                        Baca
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}