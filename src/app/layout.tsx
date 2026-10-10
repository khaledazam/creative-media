import type { Metadata } from 'next';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import { Alexandria, DM_Mono } from 'next/font/google';
import { siteConfig } from '@/site-config';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { GlobalProviders } from './providers';

const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-alexandria',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Creative Media | تنفيذ واجهات الكلادينج والتشطيبات المعمارية',
  description:
    'Creative Media — رواد تصميم وتنفيذ واجهات الكلادينج (ACP)، واجهات المحلات التجارية، والتشطيبات والديكور الداخلي في مصر بأعلى معايير الإتقان الهندسي.',
  keywords: [
    'كلادينج',
    'واجهات معمارية',
    'تشطيبات داخلية',
    'ACP facades',
    'واجهات محلات',
    'ديكور تجاري',
    'السنبلاوين',
    'Creative Media',
  ],
  authors: [{ name: 'Creative Media' }],
  creator: 'Creative Media',
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: 'https://creativemedia.com',
    siteName: 'Creative Media',
    title: 'Creative Media | تنفيذ واجهات الكلادينج والتشطيبات المعمارية',
    description:
      'نصنع واجهات تلفت الأنظار، ومساحات تعكس هويتك. حلول متكاملة في الكلادينج والتشطيبات والديكور في مصر.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Media | تنفيذ واجهات الكلادينج والتشطيبات المعمارية',
    description:
      'نصنع واجهات تلفت الأنظار، ومساحات تعكس هويتك. حلول متكاملة في الكلادينج والتشطيبات والديكور في مصر.',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
};

// Runs before paint: applies the saved theme (or the OS preference on first visit)
// to <html> so there's no flash of the wrong theme. Kept tiny and dependency-free.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased bg-surface font-sans">
        <GlobalProviders>
          <ThemeProvider>{children}</ThemeProvider>
        </GlobalProviders>
      </body>
    </html>
  );
}
