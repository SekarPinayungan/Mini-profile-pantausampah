import Link from 'next/link';
import { getArticles } from '../lib/api';

const IconifyIcon = 'iconify-icon' as any;

export default async function Home() {
  const articles = await getArticles();

  return (
    <>
      {/* Banner */}
      <section id="Beranda" className="banner">
        <div className="container">
          {/* TEXT */}
          <h1>
            <span className="pantau">Pantau</span><span className="sampah">Sampah</span>
          </h1>
          <h2>di daerahmu!</h2>

          {/* SLOGAN */}
          <div className="slogan">
            <span>Pantau</span>
            <span className="dot"></span>
            <span>Kelola</span>
            <span className="dot"></span>
            <span>Jaga Bumi</span>
          </div>

          {/* CARD HIJAU */}
          <div className="banner-card">
            <p className="text-center mb-4">
              Mari ikut jaga bumi dengan pantau & kelola sampah <br />
              di daerahmu di <b>PantauSampah</b>
            </p>

            <div className="row text-center">
              <div className="col">
                <div className="stat-box">
                  <IconifyIcon icon="material-symbols:person" width="30"></IconifyIcon>
                  <h5>7896</h5>
                  <p>Bergabung</p>
                </div>
              </div>

              <div className="col">
                <div className="stat-box">
                  <IconifyIcon icon="material-symbols:person" width="30"></IconifyIcon>
                  <h5>3876</h5>
                  <p>Berlangganan DLH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Daftar Akun */}
      <section id="DaftarAkun" className="daftar-akun py-5">
        <div className="container d-flex justify-content-center">
          <div className="cta-dlh p-5">
            <div className="row align-items-center">
              {/* ILUSTRASI */}
              <div className="col-md-5 text-center mb-4 mb-md-0">
                <img src="/assets/img/SignUp.png" 
                     alt="Ilustrasi Pantau Sampah"
                     className="img-fluid img-dlh" />
              </div>

              {/* TEXT */}
              <div className="col-md-7">
                <h2 className="fw-bold mb-3">
                  Kelola Sampah Lebih Mudah & Praktis
                </h2>

                <p className="mb-4 text-muted">
                  Daftar sekarang untuk menikmati layanan pengangkutan resmi DLH, 
                  pembayaran iuran yang praktis, serta notifikasi jadwal secara real-time.
                </p>

                {/* highlight fitur */}
                <div className="fitur-highlight mb-4">
                  <span>🚛 DLH Resmi</span>
                  <span>💳 Bayar Iuran</span>
                  <span>🔔 Notifikasi</span>
                </div>

                <Link href="/about" className="btn btn-success px-4 me-2">Daftar</Link>
                <Link href="#" className="btn btn-outline-success px-4">Masuk</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Berita */}
      <section id="Berita" className="berita py-5">
        <div className="container">
           <h2 className="fw-bold mb-2">Artikel Terkait</h2>
          <p className="text-muted mb-5">
            Temukan informasi dan edukasi seputar pengelolaan sampah
          </p>

          <div className="row g-4">
            {articles.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card berita-card h-100 shadow-sm border-0 transition-hover">
                  <div className="overflow-hidden" style={{ height: "180px" }}>
                    <img 
                      src={item.img} 
                      className="card-img-top h-100 w-100" 
                      alt={item.title} 
                      style={{ objectFit: "cover" }} 
                    />
                  </div>
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold mb-3" style={{ fontSize: "1.1rem", lineHeight: "1.4" }}>
                      {item.title}
                    </h5>
                    <p className="card-text text-muted mb-4" style={{ fontSize: "0.85rem" }}>
                      {item.desc}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                      <small className="text-muted" style={{ fontSize: "0.8rem" }}>{item.time}</small>
                      <Link href={`/blog/${item.slug}`} className="btn btn-sm btn-success px-3 rounded-pill">
                        Baca
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
