'use client';

import React, { useState, useEffect } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Eye,
  X,
  FileText,
  Calendar,
  HardDrive,
} from 'lucide-react';
import { MediaItem } from '@/lib/types';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeModalItem, setActiveModalItem] = useState<MediaItem | null>(null);

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
        alert(d.error || 'Failed to upload media file.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while uploading.');
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = async (item: MediaItem) => {
    try {
      const fullUrl = item.url.startsWith('http') ? item.url : `${window.location.origin}${item.url}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setMedia(media.filter((m) => m.id !== id));
      if (activeModalItem?.id === id) {
        setActiveModalItem(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header in Clean English */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C3A52]">
        <div>
          <h1 className="text-2xl font-extrabold text-theme-primary">Media Library</h1>
          <p className="text-xs text-[#8495A9] mt-1">
            Manage, upload, view and organize all tribute images and media assets. Total: {media.length} files.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      <form
        onSubmit={handleUpload}
        className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow flex flex-col md:flex-row items-center gap-6"
      >
        <div className="flex-1 w-full space-y-3 text-xs">
          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1.5">
              Select Image File (JPG, PNG, WebP, SVG)
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-[#8495A9] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gold file:text-[#061321] hover:file:bg-[#ffd782] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#8495A9] font-medium mb-1">Image Alt Text (Description)</label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g. Memorial candle tribute photo"
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8495A9] font-medium mb-1">Image Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Shradhanjali Banner Diya"
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading || !selectedFile}
          className="w-full md:w-auto px-6 py-3.5 bg-gold hover:bg-[#ffd782] disabled:opacity-50 text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0 self-end md:self-center"
        >
          <UploadCloud size={16} />
          <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
        </button>
      </form>

      {/* Media Grid */}
      {media.length === 0 ? (
        <div className="p-12 text-center bg-[#0B1D2D] border border-dashed border-[#1C3A52] rounded-2xl text-xs text-[#8495A9]">
          <ImageIcon size={36} className="mx-auto mb-2 text-[#8495A9] opacity-40" />
          <p>No media files found. Upload an image above to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#0B1D2D] border border-[#1C3A52] hover:border-gold/50 rounded-xl overflow-hidden card-glow flex flex-col transition-all"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => setActiveModalItem(item)}
                className="relative aspect-square bg-[#061321] overflow-hidden cursor-pointer"
              >
                <img
                  src={item.url}
                  alt={item.altText || item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="p-2 rounded-full bg-gold text-[#061321] font-bold shadow-md hover:scale-110 transition-transform">
                    <Eye size={14} />
                  </span>
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-2.5 flex flex-col justify-between flex-1 text-[11px]">
                <p
                  onClick={() => setActiveModalItem(item)}
                  className="text-theme-primary font-semibold truncate mb-1 cursor-pointer hover:text-gold transition-colors"
                  title={item.title || item.name}
                >
                  {item.title || item.name}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#1C3A52]/50 text-[#8495A9]">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item)}
                    className="flex items-center gap-1 hover:text-gold transition-colors"
                    title="Copy Image URL"
                  >
                    {copiedId === item.id ? (
                      <Check size={12} className="text-[#22C55E]" />
                    ) : (
                      <Copy size={12} />
                    )}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveModalItem(item)}
                      className="text-[#8495A9] hover:text-gold transition-colors p-1"
                      title="View Image"
                    >
                      <Eye size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.name)}
                      className="text-[#8495A9] hover:text-[#EF4444] transition-colors p-1"
                      title="Delete Image"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Lightbox / Full View Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto card-glow flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#1C3A52] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-gold" />
                <h3 className="text-base font-bold text-white truncate max-w-md">
                  {activeModalItem.title || activeModalItem.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="p-1 rounded-lg text-[#8495A9] hover:text-white hover:bg-[#142B40] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* Full Image Preview */}
              <div className="relative rounded-xl overflow-hidden border border-[#1C3A52] bg-[#061321] flex items-center justify-center max-h-[420px]">
                <img
                  src={activeModalItem.url}
                  alt={activeModalItem.altText || activeModalItem.name}
                  className="max-h-[420px] w-auto max-w-full object-contain"
                />
              </div>

              {/* Details & Copy Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#061321] border border-[#1C3A52] rounded-xl p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#8495A9]">
                    <FileText size={14} className="text-gold shrink-0" />
                    <span>File Name:</span>
                    <span className="text-white font-mono truncate">{activeModalItem.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8495A9]">
                    <HardDrive size={14} className="text-gold shrink-0" />
                    <span>File Size:</span>
                    <span className="text-white">{formatFileSize(activeModalItem.size)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#8495A9]">
                    <Calendar size={14} className="text-gold shrink-0" />
                    <span>Upload Date:</span>
                    <span className="text-white">
                      {new Date(activeModalItem.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  {activeModalItem.altText && (
                    <div className="flex items-center gap-2 text-[#8495A9]">
                      <span>Alt Text:</span>
                      <span className="text-white truncate">{activeModalItem.altText}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Image URL Box with One-Click Copy */}
              <div>
                <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">Direct Image URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={activeModalItem.url}
                    className="flex-1 bg-[#061321] border border-[#1C3A52] rounded-xl px-3.5 py-2 text-xs font-mono text-gold focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(activeModalItem)}
                    className="px-4 py-2 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0"
                  >
                    {copiedId === activeModalItem.id ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedId === activeModalItem.id ? 'Copied' : 'Copy URL'}</span>
                  </button>
                  <a
                    href={activeModalItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#061321] hover:bg-[#142B40] border border-[#1C3A52] text-[#B9C6D6] hover:text-white transition-colors shrink-0"
                    title="Open Full Size in New Tab"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#1C3A52] flex items-center justify-between bg-[#061321]/50">
              <button
                type="button"
                onClick={() => handleDelete(activeModalItem.id, activeModalItem.name)}
                className="px-4 py-2 bg-[#EF4444]/15 hover:bg-[#EF4444]/25 text-[#EF4444] border border-[#EF4444]/30 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                <span>Delete File</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 bg-[#142B40] hover:bg-[#1C3A52] text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
