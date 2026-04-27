export default function Loading() {
  return (
    <section className="py-5 d-flex align-items-center" style={{ minHeight: "60vh" }}>
      <div className="container text-center">
        <div className="spinner-border text-success mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted fw-medium">Sedang memuat data...</p>
      </div>
    </section>
  );
}
