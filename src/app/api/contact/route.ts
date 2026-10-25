import { NextRequest, NextResponse } from 'next/server';
import { addContactSubmission } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'કૃપા કરીને સાચું નામ દાખલ કરો.' }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'કૃપા કરીને માન્ય ઇમેઇલ એડ્રેસ દાખલ કરો.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json({ error: 'કૃપા કરીને તમારો સંદેશ દાખલ કરો (ઓછામાં ઓછા 5 અક્ષરો).' }, { status: 400 });
    }

    const saved = addContactSubmission({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      subject: subject || 'સામાન્ય પૂછપરછ',
      message: message.trim(),
    });

    return NextResponse.json({ success: true, submissionId: saved.id }, { status: 200 });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ error: 'સર્વર સમસ્યા આવી. કૃપા કરીને થોડીવાર પછી પ્રયત્ન કરો.' }, { status: 500 });
  }
}
