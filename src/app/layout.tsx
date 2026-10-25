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
    icon: '/favicon.ico',
    apple: '/favicon.ico',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#D9A441] selection:text-white">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
