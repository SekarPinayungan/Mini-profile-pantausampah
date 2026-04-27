import Link from 'next/link';
import Section from '../../components/Section';

const IconifyIcon = 'iconify-icon' as any;

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="banner bg-light py-5" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center' }}>
        <div className="container text-center py-5">
          <h1 className="fw-bold mb-3">
            Tentang <span className="pantau">Pantau</span><span className="sampah">Sampah</span>
          </h1>
          <p className="text-muted mx-auto fs-5" style={{ maxWidth: '700px' }}>
            Berkomitmen untuk menciptakan masa depan yang lebih hijau melalui teknologi dan kolaborasi masyarakat dalam pengelolaan sampah.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <Section 
        title="Visi & Misi Kami" 
        subtitle="PantauSampah hadir untuk menjembatani celah antara masyarakat dan pengelola kebersihan demi terciptanya lingkungan yang sehat."
      >
        <div className="row justify-content-center g-4 mt-2">
          <div className="col-md-4">
            <div className="card h-100 p-4 border-0 shadow-sm text-center rounded-4 transition-hover">
              <div className="mb-3 text-success bg-success bg-opacity-10 d-inline-flex p-3 rounded-circle mx-auto">
                <IconifyIcon icon="material-symbols:target" width="35" height="35"></IconifyIcon>
              </div>
              <h5 className="fw-bold mb-2">Transparansi</h5>
              <p className="text-muted small">Menjamin akuntabilitas dalam setiap proses pengangkutan dan pengelolaan sampah.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 p-4 border-0 shadow-sm text-center rounded-4 transition-hover">
              <div className="mb-3 text-success bg-success bg-opacity-10 d-inline-flex p-3 rounded-circle mx-auto">
                <IconifyIcon icon="material-symbols:lightbulb-circle" width="35" height="35"></IconifyIcon>
              </div>
              <h5 className="fw-bold mb-2">Inovasi</h5>
              <p className="text-muted small">Memanfaatkan teknologi terkini untuk menyederhanakan pelaporan dan pemantauan.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 p-4 border-0 shadow-sm text-center rounded-4 transition-hover">
              <div className="mb-3 text-success bg-success bg-opacity-10 d-inline-flex p-3 rounded-circle mx-auto">
                <IconifyIcon icon="material-symbols:volunteer-activism" width="35" height="35"></IconifyIcon>
              </div>
              <h5 className="fw-bold mb-2">Kepedulian</h5>
              <p className="text-muted small">Mendorong kesadaran masyarakat akan pentingnya memilah sampah sejak dari rumah.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Us Section */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <img src="/assets/img/SignUp.png" alt="Why PantauSampah" className="img-fluid rounded-4 shadow-sm" style={{ transform: 'scaleX(-1)' }} />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-4">Mengapa Memilih PantauSampah?</h2>
              <div className="d-flex mb-4">
                <div className="me-3 text-success"><IconifyIcon icon="material-symbols:check-circle" width="24"></IconifyIcon></div>
                <div>
                  <h6 className="fw-bold mb-1">Terintegrasi dengan DLH</h6>
                  <p className="text-muted small mb-0">Layanan kami terhubung langsung dengan Dinas Lingkungan Hidup resmi di kota Anda.</p>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3 text-success"><IconifyIcon icon="material-symbols:check-circle" width="24"></IconifyIcon></div>
                <div>
                  <h6 className="fw-bold mb-1">Mudah & Cepat</h6>
                  <p className="text-muted small mb-0">Akses semua fitur mulai dari jadwal hingga pembayaran hanya dalam satu platform.</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="me-3 text-success"><IconifyIcon icon="material-symbols:check-circle" width="24"></IconifyIcon></div>
                <div>
                  <h6 className="fw-bold mb-1">Berbasis Komunitas</h6>
                  <p className="text-muted small mb-0">Kami percaya perubahan besar dimulai dari kolaborasi aktif antar warga.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-5 bg-white text-center">
        <div className="container py-4">
          <h2 className="fw-bold mb-3">Siap Berkontribusi Bersama Kami?</h2>
          <p className="text-muted mb-4">Mari bergabung dalam misi menciptakan lingkungan yang lebih bersih dan berkelanjutan.</p>
          <Link href="/contact" className="btn btn-success btn-lg px-5 rounded-pill fw-bold">
            Hubungi Tim Kami
          </Link>
        </div>
      </section>
    </>
  );
}
