'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';
import { Page } from '@/lib/types';

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/pages')
      .then((res) => res.json())
      .then((pages: Page[]) => {
        const found = pages.find((p) => p.id === id);
        if (found) {
          setPage(found);
          setTitle(found.title);
          setContent(found.content);
          setSeoTitle(found.seoTitle || found.title);
          setSeoDescription(found.seoDescription || '');
        }
      });
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!page) return;
    setLoading(true);

    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...page,
          title,
          content,
          seoTitle,
          seoDescription,
        }),
      });

      if (res.ok) {
        setMessage('Page updated successfully!');
        setTimeout(() => {
          router.push('/admin/pages');
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!page) {
    return (
      <div className="text-center py-12 text-gold">Loading page content...</div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between pb-5 border-b border-[#1C3A52]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/pages')}
            className="p-2 rounded-xl bg-[#0B1D2D] hover:bg-[#10263B] text-[#B9C6D6] hover:text-white border border-[#1C3A52]"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Edit Page: {page.title}</h1>
            <p className="text-xs text-gold font-mono">/{page.slug}</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md"
        >
          <Save size={14} />
          <span>{loading ? 'Saving...' : 'Save Page'}</span>
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </div>
      )}

      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
            Page Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
            Page Content (Markdown / Text)
          </label>
          <textarea
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-4 text-xs sm:text-sm text-white focus:outline-none leading-relaxed font-mono"
          />
        </div>

        <div className="pt-4 border-t border-[#1C3A52]/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
              SEO Title
            </label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
              Meta Description
            </label>
            <input
              type="text"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
