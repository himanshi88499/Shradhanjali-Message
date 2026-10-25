import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // If user is not logged in, we let the client handle /admin/login or redirect
  return (
    <AdminLayoutClient user={user}>
      {children}
    </AdminLayoutClient>
  );
}
