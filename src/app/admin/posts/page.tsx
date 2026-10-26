'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Edit2, Trash2, ArrowUpRight, CheckCircle, Clock } from 'lucide-react';
import { Post, Category } from '@/lib/types';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const fetchPosts = async () => {
    try {
      const [resPosts, resCats] = await Promise.all([
        fetch('/api/admin/posts'),
        fetch('/api/admin/categories'),
      ]);
      const dataPosts = await resPosts.json();
      const dataCats = await resCats.json();
      if (Array.isArray(dataPosts)) setPosts(dataPosts);
      if (Array.isArray(dataCats)) setCategories(dataCats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete post "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete post.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'all' || post.categoryId === selectedCat;
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1C3A52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white">All Posts</h1>
          <p className="text-xs text-[#8495A9] mt-1">
            Total {posts.length} posts available in the system.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          <span>Add New Post</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-4 card-glow flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8495A9]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or slug..."
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#8495A9] focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category */}
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-[#B9C6D6] focus:outline-none transition-colors"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-[#B9C6D6] focus:outline-none transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl overflow-hidden card-glow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#061321]/60 text-[#8495A9] border-b border-[#1C3A52]">
                <th className="py-3.5 px-4 font-semibold">Image</th>
                <th className="py-3.5 px-4 font-semibold">Title</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C3A52]/40">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-[#10263B]/50 transition-colors">
                  <td className="py-3 px-4 w-16">
                    <div className="w-12 h-10 rounded-lg overflow-hidden bg-[#061321] border border-[#1C3A52]">
                      <img
                        src={post.featuredImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-white max-w-xs">
                    <Link
                      href={`/admin/posts/edit/${post.id}`}
                      className="hover:text-gold transition-colors font-bold block truncate"
                    >
                      {post.title}
                    </Link>
                    <span className="text-[11px] text-[#8495A9] font-mono">
                      /{post.slug}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#B9C6D6]">
                    {post.categoryName || 'General'}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        post.status === 'published'
                          ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30'
                          : 'bg-[#FFD782]/15 text-[#FFD782] border border-[#FFD782]/30'
                      }`}
                    >
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#8495A9]">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/edit/${post.id}`}
                        className="p-1.5 rounded-lg bg-[#061321] hover:bg-[#142B40] text-gold border border-[#1C3A52] hover:border-gold transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={13} />
                      </Link>
                      <a
                        href={`/post/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#061321] hover:bg-[#142B40] text-[#B9C6D6] hover:text-white border border-[#1C3A52] transition-colors"
                        title="View Live"
                      >
                        <ArrowUpRight size={13} />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id, post.title)}
                        className="p-1.5 rounded-lg bg-[#061321] hover:bg-[#EF4444]/20 text-[#EF4444] border border-[#1C3A52] transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPosts.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-[#8495A9]">
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
