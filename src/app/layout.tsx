import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageContext';

export const metadata: Metadata = {
  title: {
    default: 'Shradhanjali Msg — ભાવપૂર્ણ શ્રદ્ધાંજલિ સંદેશ | Gujarati Memorial Messages & Punyatithi Tributes',
    template: '%s | Shradhanjali Msg',
  },
  description:
    'ગુજરાતી શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ શ્રદ્ધાંજલિ, શોક સંદેશ, બેસણું અને શાયરીનો સંગ્રહ. Shradhanjali Msg provides respectful condolences, punyatithi tributes, and heartfelt memorial messages in Gujarati.',
  keywords: [
    'શ્રદ્ધાંજલિ સંદેશ',
    'શ્રદ્ધાંજલિ',
    'પુણ્યતિથિ સંદેશ',
    'ગુજરાતી શ્રદ્ધાંજલિ સંદેશ',
    'બેસણું સંદેશ',
    'શોક સંદેશ',
    'ભાવપૂર્ણ શ્રદ્ધાંજલિ',
    'Shradhanjali Msg',
    'Shradhanjali Messages in Gujarati',
    'Punyatithi Tributes',
    'Condolence Messages Gujarati',
    'Shradhanjali Status Gujarati',
    'Rip Messages in Gujarati',
    'shradhanjalimsg.com',
  ],
  metadataBase: new URL('https://shradhanjalimsg.com'),
  applicationName: 'Shradhanjali Msg',
  authors: [{ name: 'Shradhanjali Msg Team', url: 'https://shradhanjalimsg.com' }],
  creator: 'Shradhanjali Msg',
  publisher: 'Shradhanjali Msg',
  category: 'Memorial & Condolence',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Shradhanjali Msg — ભાવપૂર્ણ શ્રદ્ધાંજલિ સંદેશ | Memorial Messages & Tributes',
    description: 'ગુજરાતી શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ શ્રદ્ધાંજલિ, શોક સંદેશ અને સ્મરણ પંક્તિઓ.',
    url: 'https://shradhanjalimsg.com',
    siteName: 'Shradhanjali Msg',
    locale: 'gu_IN',
    alternateLocale: ['en_US', 'hi_IN'],
    type: 'website',
    images: [
      {
        url: 'https://shradhanjalimsg.com/images/hero-candle.jpg',
        width: 1200,
        height: 630,
        alt: 'Shradhanjali Msg - Gujarati Memorial Tributes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shradhanjali Msg — ભાવપૂર્ણ શ્રદ્ધાંજલિ સંદેશ',
    description: 'Respectful condolences, punyatithi tributes, and memorial messages in Gujarati.',
    site: '@shradhanjalimsg',
    creator: '@shradhanjalimsg',
    images: ['https://shradhanjalimsg.com/images/hero-candle.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

import { getSettings } from '@/lib/db';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();
  const searchConsoleTag = settings.technical?.searchConsoleMetaTag?.trim();
  const customHeaderCode = settings.technical?.customHeaderCode?.trim();
  const customFooterCode = settings.technical?.customFooterCode?.trim();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash theme script: Strictly defaults to dark mode unless user explicitly saved light */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var t = localStorage.getItem('shradhanjali-theme') || localStorage.getItem('theme');
                if (t === 'light') {
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                }
                var l = localStorage.getItem('shradhanjali_lang');
                if (l) {
                  document.documentElement.lang = l;
                }
              } catch(e){}
            })();`,
          }}
        />

        {/* Google Search Console HTML Tag Verification */}
        {searchConsoleTag && (
          searchConsoleTag.startsWith('<') ? (
            <div dangerouslySetInnerHTML={{ __html: searchConsoleTag }} />
          ) : (
            <meta name="google-site-verification" content={searchConsoleTag} />
          )
        )}

        {/* Custom Header Code (GTM / CSS / Analytics) */}
        {customHeaderCode && (
          <div dangerouslySetInnerHTML={{ __html: customHeaderCode }} />
        )}

        {/* Structured Data: Organization & WebSite with Sitelinks SearchBox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': 'https://shradhanjalimsg.com/#website',
                  url: 'https://shradhanjalimsg.com',
                  name: 'Shradhanjali Msg',
                  alternateName: ['શ્રદ્ધાંજલિ સંદેશ', 'Shradhanjali', 'shradhanjalimsg.com'],
                  description: 'ભાવપૂર્ણ ગુજરાતી શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ શ્રદ્ધાંજલિ અને શોક સંદેશ પોર્ટલ.',
                  inLanguage: 'gu-IN',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://shradhanjalimsg.com/search?q={search_term_string}',
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://shradhanjalimsg.com/#organization',
                  name: 'Shradhanjali Msg',
                  url: 'https://shradhanjalimsg.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://shradhanjalimsg.com/favicon.svg',
                    caption: 'Shradhanjali Msg Logo',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#F5C45E] selection:text-[#061625]">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>

        {/* Custom Footer Code (Scripts / Tracking / Chat) */}
        {customFooterCode && (
          <div dangerouslySetInnerHTML={{ __html: customFooterCode }} />
        )}
      </body>
    </html>
  );
}
