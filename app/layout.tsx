import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'PantauSampah | Solusi Cerdas Pengelolaan Sampah Modern',
  description: 'Pantau, lapor, dan kelola sampah di daerah Anda dengan lebih mudah dan transparan bersama PantauSampah.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Bootstrap */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        {/* Custom CSS */}
        <link rel="stylesheet" href="/assets/css/style.css" />
        {/* Font Niramit */}
        <link href="https://fonts.googleapis.com/css2?family=Niramit:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        
        {/* Scripts */}
        <Script src="/assets/js/popper.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/font/iconify-icon.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
