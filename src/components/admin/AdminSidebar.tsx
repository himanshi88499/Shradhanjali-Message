'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderOpen,
  Image,
  MessageSquare,
  Search,
  Menu,
  Settings,
  Users,
  ExternalLink,
  LogOut,
  X,
} from 'lucide-react';
import { LotusLogo } from '@/components/LotusLogo';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user?: { name: string; email: string; role: string };
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose, user }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'All Posts', href: '/admin/posts', icon: FileText },
    { label: 'Add New Post', href: '/admin/posts/new', icon: PlusCircle },
    { label: 'Pages', href: '/admin/pages', icon: FileText },
    { label: 'Categories', href: '/admin/categories', icon: FolderOpen },
    { label: 'Media Library', href: '/admin/media', icon: Image },
    { label: 'Contact Messages', href: '/admin/contact', icon: MessageSquare },
    { label: 'SEO Management', href: '/admin/seo', icon: Search },
    { label: 'Menus', href: '/admin/menus', icon: Menu },
    { label: 'Website Settings', href: '/admin/settings', icon: Settings },
    { label: 'Users & Roles', href: '/admin/users', icon: Users },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0A1B2B] border-r border-[#1C3A52] text-[#B9C6D6] w-64 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1C3A52] flex items-center justify-between">
        <LotusLogo size="sm" />
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md text-[#8495A9] hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* User Info Badge */}
      <div className="px-5 py-4 border-b border-[#1C3A52]/70 bg-[#061321]/50">
        <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin'}</p>
        <span className="inline-block mt-0.5 px-2 py-0.5 bg-gold/15 text-gold text-[10px] font-bold rounded-full">
          {user?.role?.toUpperCase() || 'ADMIN'}
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#0B1D2D] text-gold border border-gold/30 font-semibold shadow-sm'
                  : 'hover:bg-[#0B1D2D] hover:text-white'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-gold' : 'text-[#8495A9]'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-[#1C3A52] space-y-1 bg-[#061321]/40">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-[#0B1D2D] hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={14} className="text-[#8495A9]" />
            <span>View Website</span>
          </span>
          <span className="text-[10px] bg-[#142B40] text-gold px-1.5 py-0.5 rounded">Live</span>
        </a>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <div className="relative z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
