'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  Eye,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { Post, Category, MessageCard } from '@/lib/types';

interface PostEditorProps {
  initialPost?: Partial<Post>;
  categories: Category[];
  isEdit?: boolean;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  initialPost,
  categories,
  isEdit = false,
}) => {
  const router = useRouter();

  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [categoryId, setCategoryId] = useState(initialPost?.categoryId || (categories[0]?.id || 'cat-1'));
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [quote, setQuote] = useState(initialPost?.quote || '');
  const [featuredImage, setFeaturedImage] = useState(initialPost?.featuredImage || '/images/hero-candle.jpg');
  const [imageAlt, setImageAlt] = useState(initialPost?.imageAlt || '');
  const [readingTime, setReadingTime] = useState(initialPost?.readingTime || '5 મિનિટ વાંચો');
  const [status, setStatus] = useState<'published' | 'draft' | 'scheduled'>(initialPost?.status || 'published');
  const [showTableOfContents, setShowTableOfContents] = useState(initialPost?.showTableOfContents ?? true);
  const [content, setContent] = useState(initialPost?.content || '');
  const [messageCards, setMessageCards] = useState<MessageCard[]>(
    initialPost?.messageCards || [
      { id: 1, text: 'પ્રિયજનની યાદ હંમેશા અમારા હૃદયમાં જીવંત રહેશે. ભાવપૂર્ણ શ્રદ્ધાંજલિ.' },
    ]
  );

  // SEO fields
  const [seoTitle, setSeoTitle] = useState(initialPost?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialPost?.seoDescription || '');
  const [focusKeyword, setFocusKeyword] = useState(initialPost?.focusKeyword || '');

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Auto-slug generator from title if slug not manually set
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit && !slug) {
      // Basic latin transliteration / fallback slug
      const generated = val
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated || `post-${Date.now()}`);
    }
  };

  // Add a new message card
  const handleAddCard = () => {
    const nextId = messageCards.length > 0 ? Math.max(...messageCards.map((m) => m.id)) + 1 : 1;
    setMessageCards([...messageCards, { id: nextId, text: '' }]);
  };

  // Update card text
  const handleCardTextChange = (id: number, text: string) => {
    setMessageCards(messageCards.map((c) => (c.id === id ? { ...c, text } : c)));
  };

  // Remove card
  const handleRemoveCard = (id: number) => {
    setMessageCards(messageCards.filter((c) => c.id !== id));
  };

  // 100-point SEO checklist calculations
  const calculateSeoScore = () => {
    let score = 0;
    const checks: { label: string; passed: boolean; tip: string }[] = [];

    // 1. Title presence & length (15 pts)
    const titleLen = (seoTitle || title).length;
    const titlePass = titleLen >= 30 && titleLen <= 70;
    score += titlePass ? 15 : titleLen > 0 ? 8 : 0;
    checks.push({
      label: 'SEO શીર્ષક લંબાઈ (30-70 અક્ષરો)',
      passed: titlePass,
      tip: `હાલ: ${titleLen} અક્ષરો`,
    });

    // 2. Meta description presence & length (15 pts)
    const descLen = (seoDescription || excerpt).length;
    const descPass = descLen >= 80 && descLen <= 170;
    score += descPass ? 15 : descLen > 0 ? 8 : 0;
    checks.push({
      label: 'મેટા વિવરણ લંબાઈ (80-170 અક્ષરો)',
      passed: descPass,
      tip: `હાલ: ${descLen} અક્ષરો`,
    });

    // 3. Focus keyword presence (10 pts)
    const hasFocus = focusKeyword.trim().length > 0;
    score += hasFocus ? 10 : 0;
    checks.push({
      label: 'ફોકસ કીવર્ડ નક્કી કરેલ છે',
      passed: hasFocus,
      tip: hasFocus ? focusKeyword : 'કીવર્ડ દાખલ કરો',
    });

    // 4. Keyword in Title (15 pts)
    const kwInTitle = hasFocus && (seoTitle || title).toLowerCase().includes(focusKeyword.toLowerCase());
    score += kwInTitle ? 15 : 0;
    checks.push({
      label: 'શીર્ષકમાં ફોકસ કીવર્ડ હાજર છે',
      passed: kwInTitle,
      tip: kwInTitle ? 'હાજર છે' : 'શીર્ષકમાં કીવર્ડ ઉમેરો',
    });

    // 5. Keyword in Content (15 pts)
    const kwInContent = hasFocus && content.toLowerCase().includes(focusKeyword.toLowerCase());
    score += kwInContent ? 15 : 0;
    checks.push({
      label: 'કન્ટેન્ટમાં ફોકસ કીવર્ડ હાજર છે',
      passed: kwInContent,
      tip: kwInContent ? 'હાજર છે' : 'કન્ટેન્ટમાં કીવર્ડ ઉમેરો',
    });

    // 6. Featured Image & Alt text (15 pts)
    const hasImageAlt = featuredImage && (imageAlt.trim().length > 0 || title.length > 0);
    score += hasImageAlt ? 15 : 0;
    checks.push({
      label: 'ઇમેજ Alt ટેગ હાજર છે',
      passed: Boolean(hasImageAlt),
      tip: hasImageAlt ? 'ઉત્તમ' : 'ઇમેજ Alt ટેગ ઉમેરો',
    });

    // 7. Headings (H2/H3) structure (15 pts)
    const hasHeadings = content.includes('## ') || content.includes('### ');
    score += hasHeadings ? 15 : 0;
    checks.push({
      label: 'H2/H3 હેડિંગ્સ હાજર છે',
      passed: hasHeadings,
      tip: hasHeadings ? 'યોગ્ય માળખું' : '## હેડિંગ્સ ઉમેરો',
    });

    return { score: Math.min(100, score), checks };
  };

  const seoEvaluation = calculateSeoScore();

  // Save form handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setNotification({ type: 'error', message: 'કૃપા કરીને લેખનું શીર્ષક લખો.' });
      return;
    }

    setLoading(true);
    setNotification(null);

    const selectedCategory = categories.find((c) => c.id === categoryId);

    const postData: Partial<Post> = {
      id: initialPost?.id,
      title: title.trim(),
      slug: (slug || `post-${Date.now()}`).trim(),
      categoryId,
      categoryName: selectedCategory?.name || 'શ્રદ્ધાંજલિ સંદેશ',
      categorySlug: selectedCategory?.slug || 'shradhanjali',
      excerpt: excerpt.trim(),
      quote: quote.trim(),
      featuredImage: featuredImage.trim(),
      imageAlt: imageAlt.trim() || title.trim(),
      readingTime: readingTime.trim(),
      status,
      showTableOfContents,
      content,
      messageCards,
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim() || excerpt.trim(),
      focusKeyword: focusKeyword.trim(),
      tags: initialPost?.tags || ['ભાવપૂર્ણ'],
    };

    try {
      const url = isEdit ? `/api/admin/posts/${initialPost?.id}` : '/api/admin/posts';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'સેવ કરવામાં ભૂલ આવી.');

      setNotification({ type: 'success', message: 'લેખ સફળતાપૂર્વક સેવ થયો!' });
      setTimeout(() => {
        router.push('/admin/posts');
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'સેવ કરવામાં ભૂલ આવી.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C3A52]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
            className="p-2 rounded-xl bg-[#0B1D2D] hover:bg-[#10263B] text-[#B9C6D6] hover:text-white border border-[#1C3A52]"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {isEdit ? 'લેખ સંપાદિત કરો (Edit Post)' : 'નવો લેખ ઉમેરો (Add New Post)'}
            </h1>
            <p className="text-xs text-[#8495A9]">
              ગુજરાતી ભાષામાં શ્રદ્ધાંજલિ સંદેશ અને લેખ લખો.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setStatus(status === 'published' ? 'draft' : 'published')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              status === 'published'
                ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/40'
                : 'bg-[#FFD782]/15 text-[#FFD782] border-[#FFD782]/40'
            }`}
          >
            {status === 'published' ? 'પ્રકાશિત (Published)' : 'ડ્રાફ્ટ (Draft)'}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md disabled:opacity-50"
          >
            <Save size={15} />
            <span>{loading ? 'સેવ થઈ રહ્યું છે...' : 'સેવ કરો'}</span>
          </button>
        </div>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
            notification.type === 'success'
              ? 'bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E]'
              : 'bg-[#EF4444]/15 border border-[#EF4444]/40 text-[#EF4444]'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main 2-column layout: Form (8 cols) & Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Title, Cards, Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Slug */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                લેખનું શીર્ષક (Gujarati Title) <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="દા.ત. માતાજીની પુણ્યતિથિ પર શ્રદ્ધાંજલિ સંદેશ..."
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-[#8495A9] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                URL સ્લગ (Slug)
              </label>
              <div className="flex items-center bg-[#061321] border border-[#1C3A52] focus-within:border-gold rounded-xl px-3 py-2 text-xs">
                <span className="text-[#8495A9] mr-1">/post/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-transparent text-gold font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                ટૂંકો સારાંશ (Excerpt)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="લેખનો ટૂંકો સારાંશ જે કાર્ડમાં અને સોશિયલ મીડિયા પર દેખાશે..."
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-xs text-white placeholder-[#8495A9] focus:outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                ઇમેજ પર ક્વોટ (Quote Overlay Text)
              </label>
              <input
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="દા.ત. માતાનો પ્રેમ કદી ભુલાય નહિ... એ તો જીવનભરનું આશીર્વાદ છે."
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8495A9] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Individual Message Cards Builder */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C3A52]/60 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles size={16} className="text-gold" />
                  <span>શ્રદ્ધાંજલિ સંદેશ કાર્ડ્સ (Individual Message Cards)</span>
                </h3>
                <p className="text-[11px] text-[#8495A9] mt-0.5">
                  દરેક સંદેશ માટે અલગ Copy અને WhatsApp/Facebook બટન જનરેટ થશે.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddCard}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#061321] hover:bg-[#142B40] text-gold border border-gold/40 rounded-lg text-xs font-semibold transition-colors"
              >
                <Plus size={13} />
                <span>કાર્ડ ઉમેરો</span>
              </button>
            </div>

            <div className="space-y-3">
              {messageCards.map((card, idx) => (
                <div
                  key={card.id}
                  className="flex items-start gap-3 p-3 bg-[#061321] border border-[#1C3A52] rounded-xl"
                >
                  <span className="w-6 h-6 rounded-full bg-[#142B40] text-gold font-bold text-xs flex items-center justify-center shrink-0 mt-2">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={card.text}
                    onChange={(e) => handleCardTextChange(card.id, e.target.value)}
                    placeholder="ગુજરાતી શ્રદ્ધાંજલિ સંદેશ અહીં લખો..."
                    className="w-full bg-transparent text-xs text-white placeholder-[#8495A9] focus:outline-none resize-none leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCard(card.id)}
                    className="p-1.5 text-[#8495A9] hover:text-[#EF4444] transition-colors shrink-0"
                    title="ડિલીટ કરો"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Main Article Content & Live Preview */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C3A52]/60 mb-4">
              <h3 className="text-sm font-bold text-white">મુખ્ય કન્ટેન્ટ (Article Content)</h3>

              <div className="flex items-center bg-[#061321] rounded-lg p-0.5 border border-[#1C3A52]">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    activeTab === 'edit' ? 'bg-[#142B40] text-gold' : 'text-[#8495A9] hover:text-white'
                  }`}
                >
                  <Edit3 size={13} className="inline mr-1" />
                  એડિટર
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    activeTab === 'preview' ? 'bg-[#142B40] text-gold' : 'text-[#8495A9] hover:text-white'
                  }`}
                >
                  <Eye size={13} className="inline mr-1" />
                  લાઇવ પ્રિવ્યૂ
                </button>
              </div>
            </div>

            {activeTab === 'edit' ? (
              <div>
                <p className="text-[11px] text-[#8495A9] mb-2">
                  સૂચના: હેડિંગ્સ માટે <code>##</code> (H2) અને <code>###</code> (H3) નો ઉપયોગ કરો.
                </p>
                <textarea
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="## હેડિંગ અહીં લખો&#10;&#10;કન્ટેન્ટનો પેરાગ્રાફ અહીં લખો..."
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-4 text-xs sm:text-sm text-white placeholder-[#8495A9] focus:outline-none transition-colors font-mono leading-relaxed"
                />
              </div>
            ) : (
              <div className="bg-[#061321] border border-[#1C3A52] rounded-xl p-5 text-sm text-[#B9C6D6] leading-relaxed space-y-4 min-h-[220px]">
                {content ? (
                  content.split('\n\n').map((p, i) => {
                    if (p.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-gold">{p.replace('## ', '')}</h2>;
                    if (p.startsWith('### ')) return <h3 key={i} className="text-base font-semibold text-[#FFD782]">{p.replace('### ', '')}</h3>;
                    return <p key={i}>{p}</p>;
                  })
                ) : (
                  <p className="text-xs text-[#8495A9]">પ્રિવ્યૂ જોવા માટે લખાણ દાખલ કરો.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Category, Image, SEO Score */}
        <div className="lg:col-span-4 space-y-6">
          {/* Post Settings */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              પ્રકાશન વિગતો (Publishing Settings)
            </h3>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                કેટેગરી
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                ફીચર્ડ ઇમેજ URL
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors mb-2"
              />
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#1C3A52] bg-[#061321]">
                <img src={featuredImage} alt="Featured Preview" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Image Alt */}
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                ઇમેજ Alt ટેગ
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="દા.ત. માતાજીની પુણ્યતિથિ સ્મરણ દીવો"
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              />
            </div>

            {/* Reading Time */}
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                વાંચન સમય (Reading Time)
              </label>
              <input
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              />
            </div>

            {/* TOC Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-[#1C3A52]/60">
              <span className="text-xs text-[#B9C6D6]">ટેબલ ઓફ કન્ટેન્ટ (TOC) દર્શાવો</span>
              <input
                type="checkbox"
                checked={showTableOfContents}
                onChange={(e) => setShowTableOfContents(e.target.checked)}
                className="w-4 h-4 accent-[#F5C45E]"
              />
            </div>
          </div>

          {/* 100-Point SEO Checklist Score Card */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C3A52]/60">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                SEO સ્કોર અને ચકાસણી
              </h3>
              <div
                className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                  seoEvaluation.score >= 80
                    ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/40'
                    : seoEvaluation.score >= 50
                    ? 'bg-[#FFD782]/15 text-[#FFD782] border border-[#FFD782]/40'
                    : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/40'
                }`}
              >
                {seoEvaluation.score} / 100
              </div>
            </div>

            {/* Focus keyword input */}
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                મુખ્ય ફોકસ કીવર્ડ (Focus Keyword)
              </label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="દા.ત. માતાજીની પુણ્યતિથિ"
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              />
            </div>

            {/* SEO Title */}
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                SEO શીર્ષક (SEO Title)
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="ગૂગલમાં દેખાનારું શીર્ષક..."
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors"
              />
            </div>

            {/* SEO Meta Description */}
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                મેટા ડિસ્ક્રિપ્શન (Meta Description)
              </label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="સર્ચ એન્જિન માટે 150 અક્ષરોનું વિવરણ..."
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-xs text-white focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Real checklist items */}
            <div className="pt-2 border-t border-[#1C3A52]/60 space-y-2 text-xs">
              {seoEvaluation.checks.map((chk, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {chk.passed ? (
                      <CheckCircle2 size={13} className="text-[#22C55E] shrink-0" />
                    ) : (
                      <XCircle size={13} className="text-[#EF4444] shrink-0" />
                    )}
                    <span className={chk.passed ? 'text-[#B9C6D6]' : 'text-[#8495A9]'}>
                      {chk.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8495A9] font-mono">{chk.tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
