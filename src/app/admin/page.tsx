import React from 'react';
import Link from 'next/link';
import {
  FileText,
  FolderOpen,
  Image as ImageIcon,
  MessageSquare,
  Users,
  PlusCircle,
  Settings,
  ExternalLink,
  BarChart2,
  CheckCircle,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import {
  getPosts,
  getCategories,
  getPages,
  getMedia,
  getContactSubmissions,
  getUsers,
  getSettings,
} from '@/lib/db';

export default function AdminDashboardPage() {
  const allPosts = getPosts();
  const publishedPosts = allPosts.filter((p) => p.status === 'published');
  const draftPosts = allPosts.filter((p) => p.status === 'draft');
  const categories = getCategories();
  const pages = getPages();
  const media = getMedia();
  const submissions = getContactSubmissions();
  const users = getUsers();
  const settings = getSettings();

  const recentPosts = allPosts.slice(0, 6);
  const recentSubmissions = submissions.slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1C3A52]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-primary">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#8495A9] mt-1">
            Manage Shradhanjali portal content, tribute messages, and activities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md"
          >
            <PlusCircle size={15} />
            <span>Add New Post</span>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0B1D2D] hover:bg-[#10263B] border border-[#1C3A52] text-[#B9C6D6] hover:text-gold text-xs font-semibold rounded-xl transition-colors"
          >
            <span>View Site</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Published Posts */}
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-4 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#8495A9]">Published Posts</span>
            <FileText size={16} className="text-gold" />
          </div>
          <p className="text-2xl font-black text-theme-primary">{publishedPosts.length}</p>
          <span className="text-[10px] text-[#22C55E] flex items-center gap-1 mt-1 font-medium">
            <CheckCircle size={10} /> Live
          </span>
        </div>

        {/* Draft Posts */}
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-4 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#8495A9]">Draft Posts</span>
            <Clock size={16} className="text-[#FFD782]" />
          </div>
          <p className="text-2xl font-black text-theme-primary">{draftPosts.length}</p>
          <span className="text-[10px] text-[#8495A9] mt-1 block">Unpublished</span>
        </div>

        {/* Categories */}
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-4 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#8495A9]">Categories</span>
            <FolderOpen size={16} className="text-gold" />
          </div>
          <p className="text-2xl font-black text-theme-primary">{categories.length}</p>
          <Link href="/admin/categories" className="text-[10px] text-gold hover:underline mt-1 block">
            Manage →
          </Link>
        </div>

        {/* Pages */}
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-4 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#8495A9]">Total Pages</span>
            <FileText size={16} className="text-gold" />
          </div>
          <p className="text-2xl font-black text-theme-primary">{pages.length}</p>
          <Link href="/admin/pages" className="text-[10px] text-gold hover:underline mt-1 block">
            All Pages →
          </Link>
        </div>

        {/* Media */}
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-4 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#8495A9]">Media Files</span>
            <ImageIcon size={16} className="text-gold" />
          </div>
          <p className="text-2xl font-black text-theme-primary">{media.length}</p>
          <Link href="/admin/media" className="text-[10px] text-gold hover:underline mt-1 block">
            Library →
          </Link>
        </div>

        {/* Submissions */}
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-4 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#8495A9]">Contact Messages</span>
            <MessageSquare size={16} className="text-gold" />
          </div>
          <p className="text-2xl font-black text-theme-primary">{submissions.length}</p>
          <Link href="/admin/contact" className="text-[10px] text-gold hover:underline mt-1 block">
            Inbox →
          </Link>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
        <h2 className="text-sm font-bold text-theme-primary mb-3">Quick Actions</h2>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/posts/new"
            className="px-3.5 py-2 bg-[#061321] hover:bg-[#142B40] text-gold border border-[#1C3A52] hover:border-gold rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <PlusCircle size={14} />
            <span>New Post</span>
          </Link>
          <Link
            href="/admin/categories"
            className="px-3.5 py-2 bg-[#061321] hover:bg-[#142B40] text-theme-primary border border-[#1C3A52] hover:border-gold rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <FolderOpen size={14} className="text-gold" />
            <span>Add Category</span>
          </Link>
          <Link
            href="/admin/media"
            className="px-3.5 py-2 bg-[#061321] hover:bg-[#142B40] text-theme-primary border border-[#1C3A52] hover:border-gold rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <ImageIcon size={14} className="text-gold" />
            <span>Upload Media</span>
          </Link>
          <Link
            href="/admin/menus"
            className="px-3.5 py-2 bg-[#061321] hover:bg-[#142B40] text-theme-primary border border-[#1C3A52] hover:border-gold rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Settings size={14} className="text-gold" />
            <span>Menu Settings</span>
          </Link>
          <Link
            href="/admin/settings"
            className="px-3.5 py-2 bg-[#061321] hover:bg-[#142B40] text-theme-primary border border-[#1C3A52] hover:border-gold rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Settings size={14} className="text-gold" />
            <span>Website Settings</span>
          </Link>
        </div>
      </div>

      {/* 2-Column: Recent Posts & Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Posts Table (8 cols) */}
        <div className="lg:col-span-8 bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow">
          <div className="flex items-center justify-between pb-4 border-b border-[#1C3A52]/70 mb-4">
            <h3 className="text-base font-bold text-theme-primary">Recent Posts</h3>
            <Link href="/admin/posts" className="text-xs text-gold hover:underline font-semibold">
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#8495A9] border-b border-[#1C3A52]/50">
                  <th className="pb-3 font-semibold">Title</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C3A52]/40">
                {recentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#10263B]/50 transition-colors">
                    <td className="py-3 font-medium text-theme-primary max-w-[220px] truncate pr-3">
                      <Link href={`/admin/posts/edit/${post.id}`} className="hover:text-gold transition-colors">
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-3 text-[#B9C6D6]">
                      {post.categoryName || 'General'}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          post.status === 'published'
                            ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30'
                            : 'bg-[#FFD782]/15 text-[#FFD782] border border-[#FFD782]/30'
                        }`}
                      >
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/posts/edit/${post.id}`}
                          className="text-gold hover:underline font-semibold text-[11px]"
                        >
                          Edit
                        </Link>
                        <a
                          href={`/post/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8495A9] hover:text-gold"
                          title="View Live"
                        >
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Submissions & Analytics Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recent Submissions */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C3A52]/70 mb-4">
              <h3 className="text-base font-bold text-theme-primary">Recent Contact Submissions</h3>
              <Link href="/admin/contact" className="text-xs text-gold hover:underline font-semibold">
                View All →
              </Link>
            </div>

            {recentSubmissions.length > 0 ? (
              <div className="space-y-3">
                {recentSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3 bg-[#061321] border border-[#1C3A52] rounded-xl hover:border-gold/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-theme-primary truncate max-w-[150px]">
                        {sub.name}
                      </span>
                      <span className="text-[10px] text-[#8495A9]">
                        {new Date(sub.createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#B9C6D6] line-clamp-2 leading-relaxed">
                      {sub.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8495A9] text-center py-6">
                No new contact submissions yet.
              </p>
            )}
          </div>

          {/* Real-time Google Analytics Status */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow">
            <div className="flex items-center gap-2 mb-3">
              <BarChart2 size={18} className="text-gold" />
              <h3 className="text-base font-bold text-theme-primary">Google Analytics 4</h3>
            </div>

            {settings.technical.gaMeasurementId ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#22C55E]">
                  <CheckCircle size={14} />
                  <span className="font-semibold">Connected (Active)</span>
                </div>
                <p className="text-[#8495A9]">
                  Measurement ID:{' '}
                  <span className="font-mono text-theme-primary">{settings.technical.gaMeasurementId}</span>
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-[#B9C6D6]">
                <p className="leading-relaxed">
                  Google Analytics is not connected yet. Add your GA4 Measurement ID in Website Settings.
                </p>
                <Link
                  href="/admin/settings"
                  className="inline-block px-3 py-1.5 bg-[#142B40] text-gold border border-gold/30 hover:bg-[#1A3854] rounded-lg text-xs font-semibold transition-colors"
                >
                  Configure GA4 →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
