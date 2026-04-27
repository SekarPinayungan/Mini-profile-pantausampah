'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/api';

export default function SearchArticles({ initialArticles }: { initialArticles: Article[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = initialArticles.filter((article) => {
    const q = searchTerm.toLowerCase();
    return (
      article.title?.toLowerCase().includes(q) ||
      article.desc?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Search bar */}
      <div className="mb-5">
        <div className="input-group shadow-sm rounded-pill overflow-hidden border">
          <span className="input-group-text bg-white border-0 ps-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
              className="bi bi-search text-muted" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </span>
          <input
            type="text"
            className="form-control border-0 py-3"
            placeholder="Cari artikel edukasi lingkungan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="btn btn-link text-muted border-0 pe-4"
              onClick={() => setSearchTerm('')}
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>
        <p className="text-muted small ps-2 mt-2">
          Menampilkan {filtered.length} dari {initialArticles.length} artikel
        </p>
      </div>

      {/* Article grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">
            {searchTerm
              ? `Tidak ada artikel yang cocok dengan "${searchTerm}"`
              : 'Artikel tidak tersedia saat ini'}
          </p>
          {searchTerm && (
            <button className="btn btn-outline-success rounded-pill px-4 mt-2" onClick={() => setSearchTerm('')}>
              Tampilkan Semua
            </button>
          )}
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card berita-card h-100 shadow-sm border-0 transition-hover">
                <div className="overflow-hidden" style={{ height: '200px' }}>
                  <img
                    src={item.img ?? '/assets/img/berita1.jpg'}
                    className="card-img-top h-100 w-100"
                    alt={item.title}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="card-title fw-bold mb-3" style={{ lineHeight: '1.4' }}>
                    {item.title}
                  </h5>
                  <p className="card-text text-muted mb-4 flex-grow-1" style={{ fontSize: '0.9rem' }}>
                    {item.desc}
                  </p>
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                    <small className="text-muted">{item.time}</small>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="btn btn-sm btn-success px-3 rounded-pill"
                    >
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
  );
}
