import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'શ્રદ્ધાંજલિ - સ્મૃતિઓમાં સદાય... | ગુજરાતી શ્રદ્ધાંજલિ પોર્ટલ',
  description:
    'આપણા પ્રિયજનોની યાદ સાચવવા અને લાગણીઓને શબ્દોમાં વ્યક્ત કરવા માટે શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ શુભેચ્છા, શાયરી અને ઉપયોગી માહિતી.',
  metadataBase: new URL('https://shradhanjali.in'),
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'શ્રદ્ધાંજલિ - સ્મૃતિઓમાં સદાય...',
    description: 'ગુજરાતી ભાષામાં શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ શુભેચ્છા અને શાયરી.',
    url: 'https://shradhanjali.in',
    siteName: 'શ્રદ્ધાંજલિ',
    locale: 'gu_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="gu" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var t = localStorage.getItem('shradhanjali-theme') || localStorage.getItem('theme');
                var m = window.matchMedia('(prefers-color-scheme: light)').matches;
                if (t === 'light' || (!t && m)) {
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                }
              } catch(e){}
            })();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#F5C45E] selection:text-[#061321]">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
