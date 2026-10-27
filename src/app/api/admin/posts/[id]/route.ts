import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { getPostById, deletePost, savePost, restorePost } from '@/lib/db';

interface Props {
  params: Promise<{ id: string }>;
}

function triggerRevalidation() {
  try {
    revalidatePath('/', 'layout');
    revalidatePath('/posts');
    revalidatePath('/categories');
    revalidatePath('/category/[slug]', 'page');
    revalidatePath('/post/[slug]', 'page');
  } catch (e) {
    // Ignore in development
  }
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
  const permanent = req.nextUrl.searchParams.get('permanent') === 'true';
  const deleted = deletePost(id, permanent);
  if (!deleted) return NextResponse.json({ error: 'Post not found or could not be deleted' }, { status: 404 });

  triggerRevalidation();

  return NextResponse.json({ success: true, permanent });
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const user = await requireAuth(['admin', 'editor', 'author']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    if (body.action === 'restore') {
      const restored = restorePost(id);
      if (!restored) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      triggerRevalidation();
      return NextResponse.json({ success: true, message: 'Post restored to draft' });
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  const user = await requireAuth(['admin', 'editor', 'author']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const updated = savePost({ ...body, id });
    triggerRevalidation();
    return NextResponse.json({ success: true, post: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

