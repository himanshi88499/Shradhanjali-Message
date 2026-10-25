import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { getUserByEmail, getUserById } from './db';
import { User } from './types';

const SESSION_COOKIE_NAME = 'shradhanjali_session';

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'author' | 'subscriber';
}

// Encode simple secure token (in production with secret)
function encodeSession(data: SessionData): string {
  const payload = JSON.stringify({ ...data, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  return Buffer.from(payload).toString('base64');
}

function decodeSession(token: string): SessionData | null {
  try {
    const json = Buffer.from(token, 'base64').toString('utf-8');
    const data = JSON.parse(json);
    if (data.exp && data.exp < Date.now()) {
      return null;
    }
    return {
      userId: data.userId,
      email: data.email,
      name: data.name,
      role: data.role,
    };
  } catch {
    return null;
  }
}

export async function loginUser(email: string, passwordPlain: string): Promise<User | null> {
  const user = getUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(passwordPlain, user.passwordHash);
  if (!isValid) return null;

  const cookieStore = await cookies();
  const sessionToken = encodeSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });

  return user;
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUser(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) return null;
  return decodeSession(sessionCookie.value);
}

export async function requireAuth(allowedRoles: string[] = ['admin', 'editor']): Promise<SessionData | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  if (!allowedRoles.includes(user.role)) return null;
  return user;
}
