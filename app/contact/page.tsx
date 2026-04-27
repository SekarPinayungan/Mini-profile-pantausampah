import Section from '../../components/Section';

export default function Contact() {
  return (
    <Section 
      title="Hubungi Kami" 
      subtitle="Kami siap membantu Anda dengan segala pertanyaan seputar layanan PantauSampah."
    >
      <div className="row justify-content-center text-start mt-4">
        <div className="col-md-5 mb-4 mb-md-0">
          <div className="card border-0 shadow-sm p-4 h-100 bg-light">
            <h5 className="fw-semibold mb-4">Informasi Kontak</h5>
            <p className="mb-3">
              <strong className="d-block text-muted">Alamat</strong>
              Jl. in aja dulu, Jakarta, Indonesia
            </p>
            <p className="mb-3">
              <strong className="d-block text-muted">Email</strong>
              <a href="mailto:pantausampah@gmail.com" className="text-success text-decoration-none">pantausampah@gmail.com</a>
            </p>
            <p className="mb-0">
              <strong className="d-block text-muted">Telepon</strong>
              <a href="tel:02134532" className="text-success text-decoration-none">021-345-32</a>
            </p>
          </div>
        </div>
        <div className="col-md-7">
          <div className="card border-0 shadow-sm p-4 h-100">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">Nama Lengkap</label>
                <input type="text" className="form-control" id="name" placeholder="Masukkan nama Anda" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Alamat Email</label>
                <input type="email" className="form-control" id="email" placeholder="nama@email.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-semibold">Pesan</label>
                <textarea className="form-control" id="message" rows={5} placeholder="Tuliskan pesan Anda..."></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100 py-2 fw-semibold">Kirim Pesan</button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
