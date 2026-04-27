import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg shadow-sm">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <img 
              src="/assets/img/logo.png" 
              alt="Logo" 
              width="70" 
              height="60" 
              className="d-inline-block align-text-center" 
            />
            <span className="pantau">Pantau</span><span className="sampah">Sampah</span>
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" href="/">Beranda</Link>
              <Link className="nav-link" href="/services">Layanan</Link>
              <Link className="nav-link" href="/about">Tentang Kami</Link>
              <Link className="nav-link" href="/blog">Berita</Link>
              <Link className="nav-link" href="/contact">Kontak Kami</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
