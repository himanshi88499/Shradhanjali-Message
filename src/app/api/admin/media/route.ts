import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requireAuth } from '@/lib/auth';
import { getMedia, saveMedia, deleteMedia } from '@/lib/db';
import { MediaItem } from '@/lib/types';

export async function GET() {
  const media = getMedia();
  return NextResponse.json(media);
}

export async function POST(req: NextRequest) {
  const user = await requireAuth(['admin', 'editor', 'author']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const title = (formData.get('title') as string) || '';
    const altText = (formData.get('altText') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'કોઈ ફાઇલ પસંદ કરેલ નથી.' }, { status: 400 });
    }

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'માત્ર ઇમેજ ફાઇલો (JPG, PNG, WebP, SVG) માન્ય છે.' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.name) || '.jpg';
    const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadsDir, cleanName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const mediaItem: MediaItem = {
      id: `med-${Date.now()}`,
      name: file.name,
      url: `/uploads/${cleanName}`,
      altText: altText || file.name,
      title: title || file.name,
      size: file.size,
      mimeType: file.type,
      createdAt: new Date().toISOString(),
    };

    saveMedia(mediaItem);
    return NextResponse.json({ success: true, media: mediaItem });
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message || 'અપલોડમાં સમસ્યા આવી.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await requireAuth(['admin', 'editor']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await req.json();
    deleteMedia(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
