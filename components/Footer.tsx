import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="Footer" className="footer">
      <div className="container py-5">
        <div className="row justify-content-center">
          {/* LOGO */}
          <div className="col-md-4 mb-3">
            <Link href="/" className="navbar-brand">
              <img src="/assets/img/logo.png" width="40" alt="Logo" />
            </Link>
            <p>Di Bumi bagian Indonesia,</p>
            <p>Jl. in aja dulu, Jakarta</p>
          </div>

          {/* MENU */}
          <div className="col-md-3 mb-3">
            <h5>Menu</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><Link href="/" className="nav-link p-0">Beranda</Link></li>
              <li className="nav-item mb-2"><Link href="/services" className="nav-link p-0">Layanan</Link></li>
              <li className="nav-item mb-2"><Link href="/about" className="nav-link p-0">Tentang Kami</Link></li>
              <li className="nav-item mb-2"><Link href="/blog" className="nav-link p-0">Berita</Link></li>
            </ul>
          </div>

          {/* KONTAK */}
          <div className="col-md-3 mb-3">
            <h5>Kontak Kami</h5>
            <ul className="nav flex-column kontak-list">
              <li className="mb-2">
                <a href="mailto:pantausampah@gmail.com">pantausampah@gmail.com</a>
              </li>
              <li className="mb-2">
                <a href="tel:02134532">021-345-32</a>
              </li>
              <li className="mb-2">
                <a href="#">Instagram</a>
              </li>
              <li className="mb-2">
                <a href="#">Facebook</a>
              </li>
              <li className="mb-2">
                <a href="#">Twitter</a>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center mt-4 pt-3 border-top">
          <p className="mb-0">&copy; {new Date().getFullYear()} PantauSampah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
