import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getPostById, deletePost, savePost } from '@/lib/db';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const user = await requireAuth(['admin', 'editor', 'author']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const post = getPostById(id);
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  return NextResponse.json(post);
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const user = await requireAuth(['admin', 'editor']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const deleted = deletePost(id);
  if (!deleted) return NextResponse.json({ error: 'Post not found or could not be deleted' }, { status: 404 });

  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest, { params }: Props) {
  const user = await requireAuth(['admin', 'editor', 'author']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const updated = savePost({ ...body, id });
    return NextResponse.json({ success: true, post: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
