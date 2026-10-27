'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Save,
  CheckCircle2,
  UploadCloud,
  Image as ImageIcon,
  User,
  Share2,
  ExternalLink,
  Sparkles,
  Loader2,
  Eye,
  Globe,
} from 'lucide-react';
import { TwitterIcon, InstagramIcon, YoutubeIcon } from '@/components/SocialIcons';
import { Author } from '@/lib/types';

export default function AdminAuthorPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>('author-1');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [boxTitle, setBoxTitle] = useState('About the Author');
  const [socials, setSocials] = useState<{
    twitter?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
  }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch authors
  const fetchAuthors = async () => {
    try {
      const res = await fetch('/api/admin/authors');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAuthors(data);
          const current = data.find((a: Author) => a.id === selectedAuthorId) || data[0];
          populateForm(current);
        }
      }
    } catch (err) {
      console.error('Failed to load authors:', err);
    } finally {
      setLoading(false);
    }
  };

  const populateForm = (author: Author) => {
    setSelectedAuthorId(author.id);
    setName(author.name || '');
    setRoleTitle(author.roleTitle || '');
    setBio(author.bio || '');
    setAvatar(author.avatar || '/images/author-hina.jpg');
    setBoxTitle(author.boxTitle || 'About the Author');
    setSocials({
      twitter: author.socials?.twitter || '',
      instagram: author.socials?.instagram || '',
      youtube: author.socials?.youtube || '',
      website: author.socials?.website || '',
    });
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleAuthorSelect = (id: string) => {
    const found = authors.find((a) => a.id === id);
    if (found) {
      populateForm(found);
    }
  };

  // Image file upload handler
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        setAvatar(data.url);
        setMessage({ text: 'Author photo uploaded successfully!', type: 'success' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ text: data.error || 'Failed to upload photo.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Error uploading image.', type: 'error' });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Save author
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ text: 'Author name cannot be empty.', type: 'error' });
      return;
    }

    setSaving(true);
    setMessage(null);

    const payload: Author = {
      id: selectedAuthorId || 'author-1',
      name: name.trim(),
      roleTitle: roleTitle.trim(),
      bio: bio.trim(),
      avatar: avatar.trim() || '/images/author-hina.jpg',
      boxTitle: boxTitle.trim() || 'About the Author',
      socials: {
        twitter: socials.twitter?.trim() || undefined,
        instagram: socials.instagram?.trim() || undefined,
        youtube: socials.youtube?.trim() || undefined,
        website: socials.website?.trim() || undefined,
      },
    };

    try {
      const res = await fetch(`/api/admin/authors/${selectedAuthorId || 'author-1'}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({
          text: 'Author Box updated successfully! Changes will appear on all blog post pages.',
          type: 'success',
        });
        // Update local authors list
        setAuthors((prev) =>
          prev.map((a) => (a.id === payload.id ? { ...a, ...payload } : a))
        );
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage({ text: data.error || 'Failed to save author info.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Network error saving author info.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-gold flex items-center justify-center gap-2">
        <Loader2 className="animate-spin w-5 h-5" />
        <span>Loading Author Profile editor...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C3A52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span>Author Box Management</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30">
              Live on Posts
            </span>
          </h1>
          <p className="text-xs text-[#8495A9] mt-1">
            Edit the author box that appears at the bottom of all blog posts (Image, Name, Designation, Bio & Social Links).
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-[#ffd782] disabled:opacity-50 text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md self-start sm:self-auto"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          <span>{saving ? 'Saving...' : 'Save Author Box'}</span>
        </button>
      </div>

      {/* Alert Notification */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 animate-fade-in ${
            message.type === 'success'
              ? 'bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E]'
              : 'bg-red-500/15 border border-red-500/40 text-red-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 size={16} /> : <span>⚠️</span>}
          <span>{message.text}</span>
        </div>
      )}

      {/* Select Author Profile (if multiple exist) */}
      {authors.length > 1 && (
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-4 card-glow flex items-center justify-between gap-4">
          <span className="text-xs text-[#B9C6D6] font-medium">Select Author Profile to Edit:</span>
          <select
            value={selectedAuthorId}
            onChange={(e) => handleAuthorSelect(e.target.value)}
            className="bg-[#061321] border border-[#1C3A52] text-gold text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-gold"
          >
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.roleTitle || a.id})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Main Author Editor Form Card */}
      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-6">
        {/* Section 1: Author Photo / Avatar Upload */}
        <div>
          <label className="block text-xs font-bold text-white mb-3">
            Author Profile Photo / Image
          </label>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-[#061321] p-5 rounded-2xl border border-[#1C3A52]">
            {/* Circular Preview */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold shadow-lg bg-[#0A1B2B] flex items-center justify-center">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name || 'Author'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/author-hina.jpg';
                    }}
                  />
                ) : (
                  <User className="w-10 h-10 text-gold" />
                )}
              </div>
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-gold animate-spin" />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex-1 space-y-3 w-full">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={uploadingImage}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
                >
                  <UploadCloud size={15} />
                  <span>{uploadingImage ? 'Uploading Image...' : 'Upload New Photo'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAvatar('/images/author-hina.jpg')}
                  className="px-3 py-2 bg-[#0B1D2D] hover:bg-[#10263B] text-[#8495A9] hover:text-white text-xs rounded-xl border border-[#1C3A52] transition-colors"
                >
                  Reset Default
                </button>
              </div>

              <div>
                <label className="block text-[11px] text-[#8495A9] mb-1">
                  Or enter custom Image URL directly:
                </label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="/images/author-hina.jpg or https://..."
                  className="w-full bg-[#0B1D2D] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Author Basic Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
              Author Name (લેખકનું નામ) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. હિના પટેલ"
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
              Role / Designation (હોદ્દો / ભૂમિકા)
            </label>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g. લેખક અને સમાજસેવિકા"
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
            Author Box Header Title (હેડિંગ)
          </label>
          <input
            type="text"
            value={boxTitle}
            onChange={(e) => setBoxTitle(e.target.value)}
            placeholder="About the Author (or લેખક વિશે)"
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          />
          <p className="text-[10px] text-[#8495A9] mt-1">
            Header text shown above the author info card in post pages.
          </p>
        </div>

        {/* Section 3: Author Bio */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#B9C6D6]">
              Author Bio / Information (લેખક પરિચય અને વિગત)
            </label>
            <span className="text-[11px] text-[#8495A9]">{bio.length} characters</span>
          </div>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="લેખક વિશે ટૂંકી અને સન્માનનીય માહિતી લખો..."
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none leading-relaxed resize-y"
          />
        </div>

        {/* Section 4: Social Channels */}
        <div className="pt-4 border-t border-[#1C3A52] space-y-4">
          <div className="flex items-center gap-2 text-gold font-bold text-xs">
            <Share2 size={15} />
            <span>Author Social Links (સોશિયલ મીડિયા લિંક્સ)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1">
                X / Twitter URL
              </label>
              <input
                type="url"
                value={socials.twitter || ''}
                onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                placeholder="https://x.com/username"
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={socials.instagram || ''}
                onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                placeholder="https://instagram.com/username"
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={socials.youtube || ''}
                onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                placeholder="https://youtube.com/@channel"
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1">
                Website / Portfolio URL
              </label>
              <input
                type="url"
                value={socials.website || ''}
                onChange={(e) => setSocials({ ...socials, website: e.target.value })}
                placeholder="https://example.com"
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Live Preview Box (Exact match to live website post page)     */}
      {/* ============================================================ */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gold font-bold text-xs">
          <Eye size={15} />
          <span>Live Post Page Preview (લાઇવ પ્રિવ્યુ)</span>
        </div>

        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 sm:p-6 card-glow transition-all">
          <div className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
            <span>{boxTitle || 'About the Author'}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold shrink-0 shadow-lg bg-[#061321]">
              <img
                src={avatar || '/images/author-hina.jpg'}
                alt={name || 'Author'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/author-hina.jpg';
                }}
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {name || 'Author Name'}
                  </h4>
                  {roleTitle && <p className="text-xs text-gold">{roleTitle}</p>}
                </div>
                {/* Social icons */}
                <div className="flex items-center justify-center sm:justify-end space-x-2 text-[#8495A9]">
                  {socials.twitter && (
                    <span className="p-1.5 rounded-full text-gold">
                      <TwitterIcon size={16} />
                    </span>
                  )}
                  {socials.instagram && (
                    <span className="p-1.5 rounded-full text-gold">
                      <InstagramIcon size={16} />
                    </span>
                  )}
                  {socials.youtube && (
                    <span className="p-1.5 rounded-full text-gold">
                      <YoutubeIcon size={16} />
                    </span>
                  )}
                  {socials.website && (
                    <span className="p-1.5 rounded-full text-gold">
                      <Globe size={16} />
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#B9C6D6] leading-relaxed">
                {bio || 'હું હિના પટેલ, છેલ્લા 5 વર્ષથી ગુજરાતી ભાષામાં શ્રદ્ધાંજલિ, શોક સંદેશ અને જીવન મૂલ્ય સંબંધિત લેખો લખું છું.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Action Bar */}
      <div className="sticky bottom-4 z-20 bg-[#061321]/95 backdrop-blur-md border border-[#1C3A52] rounded-2xl p-4 flex items-center justify-between shadow-2xl">
        <div className="text-xs text-[#8495A9]">
          Editing Author: <span className="text-gold font-bold">{name || 'Author'}</span>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 px-6 py-2.5 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>
    </form>
  );
}
