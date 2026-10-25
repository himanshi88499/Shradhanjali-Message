import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getPages, savePage } from '@/lib/db';
import { Page } from '@/lib/types';

export async function GET() {
  const pages = getPages();
  return NextResponse.json(pages);
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
    return NextResponse.json({ success: true, page: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
