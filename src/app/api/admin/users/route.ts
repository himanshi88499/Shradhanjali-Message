import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { requireAuth } from '@/lib/auth';
import { getUsers, getUserById, getUserByEmail, saveUser, deleteUser } from '@/lib/db';
import { User } from '@/lib/types';

export async function GET() {
  const user = await requireAuth(['admin', 'editor']);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const users = getUsers().map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    avatar: u.avatar || '',
    bio: u.bio || '',
    createdAt: u.createdAt,
  }));

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const sessionUser = await requireAuth(['admin']);
  if (!sessionUser) {
    return NextResponse.json({ error: 'માત્ર એડમિનિસ્ટ્રેટર જ યુઝર્સ મેનેજ કરી શકે છે.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, name, email, password, role, bio, avatar } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'નામ દાખલ કરવું જરૂરી છે.' }, { status: 400 });
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'ઇમેઇલ દાખલ કરવો જરૂરી છે.' }, { status: 400 });
    }

    const validRoles = ['admin', 'editor', 'author', 'subscriber'];
    if (!role || !validRoles.includes(role)) {
      return NextResponse.json({ error: 'યોગ્ય રોલ પસંદ કરો.' }, { status: 400 });
    }

    if (id) {
      // Editing existing user
      const existing = getUserById(id);
      if (!existing) {
        return NextResponse.json({ error: 'યુઝર મળ્યો નથી.' }, { status: 404 });
      }

      // Check email uniqueness if email changed
      if (existing.email.toLowerCase() !== email.toLowerCase()) {
        const emailTaken = getUserByEmail(email);
        if (emailTaken && emailTaken.id !== id) {
          return NextResponse.json({ error: 'આ ઇમેઇલ પહેલેથી વપરાયેલ છે.' }, { status: 400 });
        }
      }

      let passwordHash = existing.passwordHash;
      if (password && password.trim().length > 0) {
        if (password.length < 6) {
          return NextResponse.json({ error: 'પાસવર્ડ ઓછામાં ઓછો 6 અક્ષરનો હોવો જોઈએ.' }, { status: 400 });
        }
        passwordHash = await bcrypt.hash(password.trim(), 10);
      }

      const updatedUser: User = {
        ...existing,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        bio: bio || '',
        avatar: avatar || existing.avatar || '/images/author-team.jpg',
        passwordHash,
      };

      saveUser(updatedUser);

      return NextResponse.json({
        success: true,
        message: 'યુઝર સફળતાપૂર્વક અપડેટ થયો.',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          avatar: updatedUser.avatar,
          bio: updatedUser.bio,
          createdAt: updatedUser.createdAt,
        },
      });
    } else {
      // Creating new user
      const emailTaken = getUserByEmail(email);
      if (emailTaken) {
        return NextResponse.json({ error: 'આ ઇમેઇલ ધરાવતો યુઝર પહેલેથી ઉપલબ્ધ છે.' }, { status: 400 });
      }

      if (!password || password.trim().length < 6) {
        return NextResponse.json({ error: 'નવા યુઝર માટે ઓછામાં ઓછો 6 અક્ષરનો પાસવર્ડ જરૂરી છે.' }, { status: 400 });
      }

      const passwordHash = await bcrypt.hash(password.trim(), 10);
      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        passwordHash,
        role,
        bio: bio || '',
        avatar: avatar || '/images/author-team.jpg',
        createdAt: new Date().toISOString(),
      };

      saveUser(newUser);

      return NextResponse.json({
        success: true,
        message: 'નવો યુઝર સફળતાપૂર્વક ઉમેરાયો.',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar,
          bio: newUser.bio,
          createdAt: newUser.createdAt,
        },
      });
    }
  } catch (err: any) {
    console.error('Error in user management API:', err);
    return NextResponse.json({ error: err.message || 'Error saving user' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const sessionUser = await requireAuth(['admin']);
  if (!sessionUser) {
    return NextResponse.json({ error: 'માત્ર એડમિનિસ્ટ્રેટર જ યુઝર ડિલીટ કરી શકે છે.' }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'યુઝર આઈડી જરૂરી છે.' }, { status: 400 });
    }

    if (id === sessionUser.userId) {
      return NextResponse.json({ error: 'તમે પોતાનું એકાઉન્ટ જાતે ડિલીટ કરી શકતા નથી.' }, { status: 400 });
    }

    const success = deleteUser(id);
    if (!success) {
      return NextResponse.json({ error: 'આ યુઝર ડિલીટ કરી શકાયો નથી (છેલ્લો એડમિન અથવા અમાન્ય આઈડી).' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'યુઝર સફળતાપૂર્વક ડિલીટ થયો.' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error deleting user' }, { status: 500 });
  }
}
