import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = getSettings();
  const customAds = settings.technical?.adsTxt?.trim();

  let content = customAds;
  if (!content) {
    if (settings.technical?.adsensePublisherId) {
      const pubId = settings.technical.adsensePublisherId.replace(/^pub-/, 'pub-');
      content = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
    } else {
      content = '# Google AdSense ads.txt\n# Configure your ads.txt entries in Admin Settings -> Website Settings\n';
    }
  }

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
