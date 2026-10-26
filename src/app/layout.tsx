import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageContext';

export const metadata: Metadata = {
  title: 'Shradhanjali Msg — Memorial Condolences & Tributes',
  description:
    'Shradhanjali Msg is a respectful digital memorial and tribute publishing platform offering condolences, punyatithi messages, memorial poetry, and thoughtful remembrance guidance.',
  metadataBase: new URL('https://shradhanjali.in'),
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Shradhanjali Msg — Everlasting in Loving Memories',
    description: 'Respectful condolences, punyatithi tributes, and memorial messages.',
    url: 'https://shradhanjali.in',
    siteName: 'Shradhanjali Msg',
    locale: 'en_US',
    type: 'website',
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
