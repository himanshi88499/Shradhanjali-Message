'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Save,
  CheckCircle2,
  Search,
  Globe,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  UploadCloud,
  Eye,
  Loader2,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { Page, SiteSettings } from '@/lib/types';

export default function AdminSeoPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Homepage SEO fields
  const [homePage, setHomePage] = useState<Page | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogImage, setOgImage] = useState('');

  // Technical SEO fields
  const [searchConsoleMetaTag, setSearchConsoleMetaTag] = useState('');
  const [allowIndexing, setAllowIndexing] = useState(true);

  const [uploadingOgImage, setUploadingOgImage] = useState(false);
  const ogFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pagesRes, settingsRes] = await Promise.all([
          fetch('/api/admin/pages'),
          fetch('/api/admin/settings'),
        ]);

        if (pagesRes.ok) {
          const pages: Page[] = await pagesRes.json();
          const hp = pages.find((p) => p.slug === 'home' || p.id === 'page-home');
          if (hp) {
            setHomePage(hp);
            setSeoTitle(hp.seoTitle || 'શ્રદ્ધાંજલિ — પ્રિયજનોની સ્મૃતિઓ ક્યારેય ભૂલાતી નથી | Shradhanjali Msg');
            setSeoDescription(
              hp.seoDescription ||
                'શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી અને સંવેદનશીલ માહિતી માટેનું વિશ્વસનીય અને સન્માનનીય ગુજરાતી મંચ.'
            );
            setSeoKeywords(hp.seoKeywords || 'શ્રદ્ધાંજલિ, શોક સંદેશ, પુણ્યતિથિ, ગુજરાતી શ્રદ્ધાંજલિ');
            setCanonicalUrl(hp.canonicalUrl || 'https://shradhanjalimsg.com');
            setOgImage(hp.ogImage || '/images/hero-candle.jpg');
          }
        }

        if (settingsRes.ok) {
          const st: SiteSettings = await settingsRes.json();
          setSettings(st);
          if (st.technical) {
            setSearchConsoleMetaTag(st.technical.searchConsoleMetaTag || '');
            setAllowIndexing(st.technical.allowIndexing ?? true);
          }
        }
      } catch (err) {
        console.error('Failed to load SEO configuration:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // OG Image Upload
  const handleOgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingOgImage(true);
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
        setOgImage(data.url);
        setMessage({ text: 'Social share image uploaded successfully!', type: 'success' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ text: data.error || 'Failed to upload image.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Error uploading image.', type: 'error' });
    } finally {
      setUploadingOgImage(false);
      if (ogFileInputRef.current) ogFileInputRef.current.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      // 1. Update Homepage SEO via /api/admin/pages
      if (homePage) {
        const updatedHomePage: Page = {
          ...homePage,
          seoTitle: seoTitle.trim(),
          seoDescription: seoDescription.trim(),
          seoKeywords: seoKeywords.trim(),
          canonicalUrl: canonicalUrl.trim(),
          ogImage: ogImage.trim(),
        };

        const pageRes = await fetch('/api/admin/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedHomePage),
        });

        if (!pageRes.ok) {
          throw new Error('Failed to save Homepage SEO');
        }
      }

      // 2. Update Settings (Google Search Console, allowIndexing) via /api/admin/settings
      if (settings) {
        const updatedSettings: SiteSettings = {
          ...settings,
          technical: {
            ...settings.technical,
            searchConsoleMetaTag: searchConsoleMetaTag.trim(),
            allowIndexing,
          },
        };

        const settingsRes = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedSettings),
        });

        if (!settingsRes.ok) {
          throw new Error('Failed to save technical SEO settings');
        }
      }

      setMessage({
        text: 'Homepage SEO settings saved successfully! Changes are live on the homepage.',
        type: 'success',
      });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      console.error(err);
      setMessage({ text: err.message || 'Error saving SEO settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-gold flex items-center justify-center gap-2">
        <Loader2 className="animate-spin w-5 h-5" />
        <span>Loading SEO Management...</span>
      </div>
    );
  }

  const titleLength = seoTitle.length;
  const descLength = seoDescription.length;

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C3A52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span>SEO Management</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-semibold">
              Homepage & Site SEO
            </span>
          </h1>
          <p className="text-xs text-[#8495A9] mt-1">
            Configure Homepage Google Search title, meta description, keywords, OpenGraph image, and search engine verification.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-[#ffd782] disabled:opacity-50 text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md self-start sm:self-auto"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          <span>{saving ? 'Saving...' : 'Save SEO Settings'}</span>
        </button>
      </div>

      {/* Notification Toast */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 animate-fade-in ${
            message.type === 'success'
              ? 'bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E]'
              : 'bg-red-500/15 border border-red-500/40 text-red-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-4 card-glow">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#8495A9]">Search Engine Indexing</span>
            <ShieldCheck size={16} className={allowIndexing ? 'text-[#22C55E]' : 'text-red-400'} />
          </div>
          <p className="text-sm font-bold text-white">
            {allowIndexing ? 'Indexable by Google & Bing' : 'Blocked (noindex)'}
          </p>
        </div>

        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-4 card-glow">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#8495A9]">XML Sitemap</span>
            <Globe size={16} className="text-gold" />
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-gold hover:underline inline-flex items-center gap-1"
          >
            <span>/sitemap.xml</span>
            <ExternalLink size={11} />
          </a>
        </div>

        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-4 card-glow">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-[#8495A9]">Robots Directive</span>
            <ShieldCheck size={16} className="text-[#22C55E]" />
          </div>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-gold hover:underline inline-flex items-center gap-1"
          >
            <span>/robots.txt</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Live Google Search Snippet Simulation */}
      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-3">
        <div className="flex items-center gap-2 text-gold font-bold text-xs">
          <Eye size={15} />
          <span>Google Search Result Snippet Preview</span>
        </div>

        <div className="p-4 rounded-xl bg-white text-black font-sans shadow-md border border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <div className="w-4 h-4 rounded-full bg-gold/40 flex items-center justify-center text-[9px] font-bold text-black">
              S
            </div>
            <span className="truncate">https://shradhanjalimsg.com</span>
          </div>
          <div className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-1 mb-1">
            {seoTitle || 'Homepage Meta Title | Shradhanjali Msg'}
          </div>
          <p className="text-xs sm:text-sm text-[#4d5156] line-clamp-2 leading-relaxed">
            {seoDescription ||
              'શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી અને સંવેદનશીલ માહિતી માટેનું વિશ્વસનીય અને સન્માનનીય ગુજરાતી મંચ.'}
          </p>
        </div>
      </div>

      {/* Main Homepage SEO Configuration Fields */}
      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-5 text-xs">
        <h2 className="text-sm font-bold text-white border-b border-[#1C3A52] pb-3 flex items-center gap-2">
          <Search size={15} className="text-gold" />
          <span>Homepage Metadata Configuration</span>
        </h2>

        {/* Homepage SEO Meta Title */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[#B9C6D6] font-semibold">
              Homepage Meta Title (મુખ્ય શીર્ષક) *
            </label>
            <span
              className={`text-[11px] font-mono ${
                titleLength >= 45 && titleLength <= 65
                  ? 'text-[#22C55E]'
                  : titleLength > 65
                  ? 'text-yellow-400'
                  : 'text-[#8495A9]'
              }`}
            >
              {titleLength} / 60 characters (Recommended: 50-60)
            </span>
          </div>
          <input
            type="text"
            required
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="શ્રદ્ધાંજલિ — પ્રિયજનોની સ્મૃતિઓ ક્યારેય ભૂલાતી નથી | Shradhanjali Msg"
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2.5 text-white text-xs sm:text-sm focus:outline-none"
          />
          <p className="text-[10px] text-[#8495A9] mt-1">
            Displayed on browser tabs and Google search engine results headline.
          </p>
        </div>

        {/* Homepage SEO Meta Description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[#B9C6D6] font-semibold">
              Homepage Meta Description (વર્ણન) *
            </label>
            <span
              className={`text-[11px] font-mono ${
                descLength >= 120 && descLength <= 165
                  ? 'text-[#22C55E]'
                  : descLength > 165
                  ? 'text-yellow-400'
                  : 'text-[#8495A9]'
              }`}
            >
              {descLength} / 160 characters (Recommended: 130-160)
            </span>
          </div>
          <textarea
            rows={3}
            required
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી અને સંવેદનશીલ માહિતી માટેનું વિશ્વસનીય અને સન્માનનીય ગુજરાતી મંચ."
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
          />
          <p className="text-[10px] text-[#8495A9] mt-1">
            Brief summary snippet shown under the title on Google and Bing search results.
          </p>
        </div>

        {/* Focus Keywords */}
        <div>
          <label className="block text-[#B9C6D6] font-semibold mb-1.5">
            Homepage Focus Keywords (કીવર્ડ્સ, અલ્પવિરામથી અલગ કરો)
          </label>
          <input
            type="text"
            value={seoKeywords}
            onChange={(e) => setSeoKeywords(e.target.value)}
            placeholder="શ્રદ્ધાંજલિ, શોક સંદેશ, પુણ્યતિથિ, શાયરી, ગુજરાતી શ્રદ્ધાંજલિ"
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none font-medium"
          />
          <p className="text-[10px] text-[#8495A9] mt-1">
            Separate multiple keywords with commas (e.g. શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી, શોક સંદેશ).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Canonical URL */}
          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1.5">Canonical URL</label>
            <input
              type="text"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              placeholder="https://shradhanjalimsg.com"
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
            />
          </div>

          {/* Social Share Image (OG Image) */}
          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1.5">
              Social Share Image (OG Image)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="/images/hero-candle.jpg"
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
              <input
                type="file"
                ref={ogFileInputRef}
                onChange={handleOgImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                disabled={uploadingOgImage}
                onClick={() => ogFileInputRef.current?.click()}
                className="px-3 py-2 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 transition-colors disabled:opacity-50"
              >
                <UploadCloud size={14} />
                <span>{uploadingOgImage ? '...' : 'Upload'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Search Console & Crawling */}
      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4 text-xs">
        <h2 className="text-sm font-bold text-white border-b border-[#1C3A52] pb-3 flex items-center gap-2">
          <ShieldCheck size={15} className="text-gold" />
          <span>Search Console & Crawling Verification</span>
        </h2>

        {/* Google Search Console HTML Tag Verification */}
        <div>
          <label className="block text-[#B9C6D6] font-semibold mb-1.5">
            Google Search Console HTML Verification Tag or Code
          </label>
          <textarea
            rows={2}
            value={searchConsoleMetaTag}
            onChange={(e) => setSearchConsoleMetaTag(e.target.value)}
            placeholder='<meta name="google-site-verification" content="your-code-here" />'
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-gold font-mono focus:outline-none resize-none leading-relaxed"
          />
          <p className="text-[10px] text-[#8495A9] mt-1">
            Directly verifies your domain on Google Search Console without uploading files.
          </p>
        </div>

        {/* Search Engine Indexing Toggle */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1C3A52]/60">
          <div>
            <span className="font-semibold text-white block">Allow Search Engine Indexing</span>
            <span className="text-[11px] text-[#8495A9]">
              When enabled, robots meta tag is set to index, follow.
            </span>
          </div>
          <input
            type="checkbox"
            checked={allowIndexing}
            onChange={(e) => setAllowIndexing(e.target.checked)}
            className="w-4 h-4 accent-[#F5C45E]"
          />
        </div>
      </div>

      {/* Floating Save Action Bar */}
      <div className="sticky bottom-4 z-20 bg-[#061321]/95 backdrop-blur-md border border-[#1C3A52] rounded-2xl p-4 flex items-center justify-between shadow-2xl">
        <div className="text-xs text-[#8495A9]">
          Configuring Homepage SEO: <span className="text-gold font-bold">{seoTitle.slice(0, 30)}...</span>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 px-6 py-2.5 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{saving ? 'Saving...' : 'Save All SEO Settings'}</span>
        </button>
      </div>
    </form>
  );
}
