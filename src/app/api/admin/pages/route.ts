import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { getPages, savePage } from '@/lib/db';
import { Page } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const pages = getPages();
  return NextResponse.json(pages, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(req: NextRequest) {
  const user = await requireAuth(['admin', 'editor']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body: Page = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    const saved = savePage(body);

    // Invalidate caches immediately so public pages update in real-time
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/about');
      revalidatePath('/contact');
      revalidatePath('/privacy-policy');
      revalidatePath('/terms');
      revalidatePath('/disclaimer');
      if (saved.slug) {
        revalidatePath(`/${saved.slug}`);
      }
    } catch (e) {
      console.warn('Revalidation notice:', e);
    }

    return NextResponse.json({ success: true, page: saved });
  } catch (err: any) {
    console.error('Save page error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
