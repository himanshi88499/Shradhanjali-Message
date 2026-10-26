'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';
import { Menu, Bell, User as UserIcon, Sun, Moon } from 'lucide-react';
import { SessionData } from '@/lib/auth';
import { useTheme } from '@/components/ThemeProvider';

interface AdminLayoutClientProps {
  children: React.ReactNode;
  user: SessionData | null;
}

export const AdminLayoutClient: React.FC<AdminLayoutClientProps> = ({ children, user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoginPage && !user) {
      router.push('/admin/login');
    }
  }, [isLoginPage, user, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#061321] flex items-center justify-center text-gold text-sm font-semibold">
        ચકાસણી ચાલુ છે...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061321] text-[#F4F6FA] flex">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-30 bg-[#0A1B2B]/90 backdrop-blur-md border-b border-[#1C3A52] px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#B9C6D6] hover:bg-[#0B1D2D] hover:text-white"
            >
              <Menu size={20} />
            </button>
            <span className="text-xs sm:text-sm font-bold text-white">
              શ્રદ્ધાંજલિ CMS કંટ્રોલ પેનલ
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[#0B1D2D] border border-[#1C3A52] hover:border-gold text-gold transition-colors flex items-center justify-center"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-3 py-1.5 bg-[#0B1D2D] border border-[#1C3A52] hover:border-gold text-gold text-xs font-semibold rounded-lg transition-colors"
            >
              લાઈવ સાઈટ જુઓ
            </a>

            <div className="flex items-center gap-2 pl-3 border-l border-[#1C3A52]">
              <div className="w-8 h-8 rounded-full bg-[#142B40] text-gold border border-gold/40 flex items-center justify-center text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                <p className="text-[10px] text-gold">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
