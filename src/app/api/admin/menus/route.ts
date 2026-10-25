import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getMenus, updateMenus } from '@/lib/db';
import { MenuItem } from '@/lib/types';

export async function GET() {
  const menus = getMenus();
  return NextResponse.json(menus);
}

export async function POST(req: NextRequest) {
  const user = await requireAuth(['admin', 'editor']);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { header, footer }: { header: MenuItem[]; footer: MenuItem[] } = await req.json();
    updateMenus(header, footer);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
