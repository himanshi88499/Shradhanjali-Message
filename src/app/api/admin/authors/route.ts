import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { getAuthors, saveAuthor } from '@/lib/db';
import { Author } from '@/lib/types';

export async function GET(req: NextRequest) {
  const user = await requireAuth(['admin', 'editor', 'author']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const authors = getAuthors();
  return NextResponse.json(authors);
}

export async function POST(req: NextRequest) {
  const user = await requireAuth(['admin', 'editor', 'author']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body: Author = await req.json();
    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ error: 'લેખકનું નામ જરૂરી છે.' }, { status: 400 });
    }

    const saved = saveAuthor(body);

    // Revalidate paths where author box appears
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/post/[slug]', 'page');
    } catch (e) {
      // Ignore in dev
    }

    return NextResponse.json({ success: true, author: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error saving author' }, { status: 500 });
  }
}
