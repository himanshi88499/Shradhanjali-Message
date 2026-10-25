import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'ઇમેઇલ અને પાસવર્ડ દાખલ કરો.' }, { status: 400 });
    }

    const user = await loginUser(email.trim(), password);
    if (!user) {
      return NextResponse.json({ error: 'અમાન્ય ઇમેઇલ અથવા પાસવર્ડ.' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'લૉગિનમાં ક્ષતિ સર્જાઈ.' }, { status: 500 });
  }
}
