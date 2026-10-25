'use client';

import React, { useState, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, Copy, Check, ExternalLink } from 'lucide-react';
import { MediaItem } from '@/lib/types';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      if (Array.isArray(data)) setMedia(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('file', selectedFile);
    fd.append('altText', altText);
    fd.append('title', title);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: fd,
      });

      if (res.ok) {
        setSelectedFile(null);
        setAltText('');
        setTitle('');
        fetchMedia();
      } else {
        const d = await res.json();
        alert(d.error || 'અપલોડ નિષ્ફળ ગયું.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = async (item: MediaItem) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('શું તમે આ ઇમેજ ડિલીટ કરવા માંગો છો?')) return;
    try {
      await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setMedia(media.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-5 border-b border-[#1C3A52]">
        <h1 className="text-2xl font-extrabold text-white">મીડિયા લાઇબ્રેરી (Media Library)</h1>
        <p className="text-xs text-[#8495A9] mt-1">
          તમામ અપલોડ કરેલ ઇમેજ અને ફાઇલોનું સંચાલન કરો.
        </p>
      </div>

      {/* Upload Box */}
      <form
        onSubmit={handleUpload}
        className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow flex flex-col md:flex-row items-center gap-6"
      >
        <div className="flex-1 w-full space-y-3 text-xs">
          <div>
            <label className="block text-[#B9C6D6] font-medium mb-1">ઇમેજ ફાઇલ પસંદ કરો</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-[#8495A9] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gold file:text-[#061321] hover:file:bg-[#ffd782] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="ઇમેજ Alt ટેગ (વર્ણન)..."
              className="bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ઇમેજ ટાઈટલ..."
              className="bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading || !selectedFile}
          className="w-full md:w-auto px-6 py-3 bg-gold hover:bg-[#ffd782] disabled:opacity-50 text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
        >
          <UploadCloud size={16} />
          <span>{uploading ? 'અપલોડ ચાલુ છે...' : 'અપલોડ કરો'}</span>
        </button>
      </form>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#0B1D2D] border border-[#1C3A52] rounded-xl overflow-hidden card-glow flex flex-col"
          >
            <div className="relative aspect-square bg-[#061321] overflow-hidden">
              <img
                src={item.url}
                alt={item.altText}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="p-2.5 flex flex-col justify-between flex-1 text-[11px]">
              <p className="text-white font-medium truncate mb-1" title={item.name}>
                {item.title || item.name}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#1C3A52]/50 text-[#8495A9]">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(item)}
                  className="flex items-center gap-1 hover:text-gold transition-colors"
                  title="URL કૉપી કરો"
                >
                  {copiedId === item.id ? (
                    <Check size={12} className="text-[#22C55E]" />
                  ) : (
                    <Copy size={12} />
                  )}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="text-[#8495A9] hover:text-[#EF4444] transition-colors p-1"
                  title="ડિલીટ કરો"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
