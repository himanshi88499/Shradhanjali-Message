import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { getAuthorById, saveAuthor, deleteAuthor } from '@/lib/db';
import { Author } from '@/lib/types';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const user = await requireAuth(['admin', 'editor', 'author']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const author = getAuthorById(id);
  if (!author) return NextResponse.json({ error: 'Author not found' }, { status: 404 });

  return NextResponse.json(author);
}

export async function PUT(req: NextRequest, { params }: Props) {
  const user = await requireAuth(['admin', 'editor', 'author']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body: Partial<Author> = await req.json();
    const updated = saveAuthor({ ...body, id } as Author);

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/post/[slug]', 'page');
    } catch (e) {
      // Ignore in dev
    }

    return NextResponse.json({ success: true, author: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating author' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const user = await requireAuth(['admin']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const deleted = deleteAuthor(id);
  if (!deleted) return NextResponse.json({ error: 'Author not found' }, { status: 404 });

  try {
    revalidatePath('/', 'layout');
    revalidatePath('/post/[slug]', 'page');
  } catch (e) {
    // Ignore in dev
  }

  return NextResponse.json({ success: true });
}
