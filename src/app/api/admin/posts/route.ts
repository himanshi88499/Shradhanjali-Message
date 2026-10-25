import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getPosts, savePost } from '@/lib/db';
import { Post } from '@/lib/types';

export async function GET(req: NextRequest) {
  const user = await requireAuth(['admin', 'editor', 'author']);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const posts = getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const user = await requireAuth(['admin', 'editor', 'author']);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: Post = await req.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ error: 'લેખનું શીર્ષક જરૂરી છે.' }, { status: 400 });
    }

    const saved = savePost({
      ...body,
      authorId: body.authorId || user.userId,
    });

    return NextResponse.json({ success: true, post: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error saving post' }, { status: 500 });
  }
}
