'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon,
  Heart,
  ShieldCheck,
  Users,
  Sparkles,
  Award,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  FileText,
  Layers,
} from 'lucide-react';
import { Page, PageMetaSection, PageValueCard, PageTeamMember } from '@/lib/types';
import { LotusIcon } from '@/components/LotusLogo';

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Common fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [metadata, setMetadata] = useState<PageMetaSection>({});

  // Active section tab for rich pages
  const [activeTab, setActiveTab] = useState<'hero' | 'widgets' | 'seo'>('hero');

  useEffect(() => {
    fetch('/api/admin/pages')
      .then((res) => res.json())
      .then((pages: Page[]) => {
        const found = pages.find((p) => p.id === id);
        if (found) {
          setPage(found);
          setTitle(found.title || '');
          setContent(found.content || '');
          setSeoTitle(found.seoTitle || found.title || '');
          setSeoDescription(found.seoDescription || '');
          setMetadata(found.metadata || {});
        }
      })
      .catch((err) => console.error('Failed to load page:', err));
  }, [id]);

  const updateMetaField = <K extends keyof PageMetaSection>(key: K, value: PageMetaSection[K]) => {
    setMetadata((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getPageLiveUrl = (slug: string) => {
    switch (slug) {
      case 'home':
        return '/';
      case 'about':
        return '/about';
      case 'contact':
        return '/contact';
      case 'privacy-policy':
        return '/privacy-policy';
      case 'disclaimer':
        return '/disclaimer';
      case 'terms':
        return '/terms';
      default:
        return `/${slug}`;
    }
  };

  // Helper for Value Cards (About page)
  const handleAddValueCard = () => {
    const cards = [...(metadata.valueCards || [])];
    cards.push({
      id: Date.now(),
      icon: 'heart',
      title: 'નવી વિશેષતા',
      description: 'અહીં વિશેષતાની વિગત લખો.',
    });
    updateMetaField('valueCards', cards);
  };

  const handleUpdateValueCard = (index: number, field: keyof PageValueCard, val: any) => {
    const cards = [...(metadata.valueCards || [])];
    if (cards[index]) {
      cards[index] = { ...cards[index], [field]: val };
      updateMetaField('valueCards', cards);
    }
  };

  const handleRemoveValueCard = (index: number) => {
    const cards = (metadata.valueCards || []).filter((_, i) => i !== index);
    updateMetaField('valueCards', cards);
  };

  // Helper for Team Members (About page)
  const handleAddTeamMember = () => {
    const team = [...(metadata.teamMembers || [])];
    team.push({
      id: Date.now(),
      name: 'નવું સભ્ય',
      role: 'હોદ્દો / ભૂમિકા',
      bio: 'સભ્યનો પરિચય અથવા વિગત.',
      image: '',
    });
    updateMetaField('teamMembers', team);
  };

  const handleUpdateTeamMember = (index: number, field: keyof PageTeamMember, val: any) => {
    const team = [...(metadata.teamMembers || [])];
    if (team[index]) {
      team[index] = { ...team[index], [field]: val };
      updateMetaField('teamMembers', team);
    }
  };

  const handleRemoveTeamMember = (index: number) => {
    const team = (metadata.teamMembers || []).filter((_, i) => i !== index);
    updateMetaField('teamMembers', team);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!page) return;
    setLoading(true);
    setMessage('');

    try {
      const updatedData: Page = {
        ...page,
        title,
        content,
        seoTitle,
        seoDescription,
        metadata,
      };

      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.page) {
          setPage(json.page);
        }
        setMessage('Changes saved successfully! Public page has been updated.');
        setTimeout(() => setMessage(''), 4000);
      } else {
        setMessage('Failed to save page. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  if (!page) {
    return (
      <div className="text-center py-16 text-gold flex items-center justify-center gap-2">
        <span className="animate-spin text-xl">⏳</span>
        <span>Loading page editor...</span>
      </div>
    );
  }

  const isAboutPage = page.slug === 'about';
  const isContactPage = page.slug === 'contact';
  const isLegalPage =
    page.slug === 'privacy-policy' || page.slug === 'terms' || page.slug === 'disclaimer';

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#1C3A52]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/pages')}
            className="p-2 rounded-xl bg-[#0B1D2D] hover:bg-[#10263B] text-[#B9C6D6] hover:text-white border border-[#1C3A52] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Edit Page: {title || page.title}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                {page.status}
              </span>
            </div>
            <p className="text-xs text-gold font-mono">
              Live Path: {getPageLiveUrl(page.slug)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={getPageLiveUrl(page.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0B1D2D] hover:bg-[#10263B] text-[#B9C6D6] hover:text-white text-xs font-semibold rounded-xl border border-[#1C3A52] transition-colors"
          >
            <ExternalLink size={14} className="text-gold" />
            <span>View Live</span>
          </a>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-1.5 px-5 py-2 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <Save size={14} />
            <span>{loading ? 'Saving...' : 'Save Page'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between gap-2 transition-all ${
            message.includes('successfully')
              ? 'bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E]'
              : 'bg-red-500/15 border border-red-500/40 text-red-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span className="font-medium">{message}</span>
          </div>
          <button
            type="button"
            onClick={() => setMessage('')}
            className="text-xs opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Page Navigation Tabs (for About and Contact) */}
      {(isAboutPage || isContactPage) && (
        <div className="flex border-b border-[#1C3A52] gap-2 pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'hero'
                ? 'bg-[#0B1D2D] text-gold border-t border-x border-[#1C3A52]'
                : 'text-[#8495A9] hover:text-white'
            }`}
          >
            <FileText size={14} />
            <span>Hero & Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('widgets')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'widgets'
                ? 'bg-[#0B1D2D] text-gold border-t border-x border-[#1C3A52]'
                : 'text-[#8495A9] hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>Page Widgets & Sections</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'seo'
                ? 'bg-[#0B1D2D] text-gold border-t border-x border-[#1C3A52]'
                : 'text-[#8495A9] hover:text-white'
            }`}
          >
            <span>SEO & Metadata</span>
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. ABOUT PAGE EDITABLE SECTIONS                              */}
      {/* ============================================================ */}
      {isAboutPage && (
        <>
          {/* Tab 1: Hero Section */}
          {(activeTab === 'hero' || !activeTab) && (
            <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-5">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1C3A52] pb-3">
                <FileText size={16} className="text-gold" />
                <span>Hero Section Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                    Main Title (H1)
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    placeholder="અમારા વિશે"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                    Hero Badge / Tagline
                  </label>
                  <input
                    type="text"
                    value={metadata.badge || ''}
                    onChange={(e) => updateMetaField('badge', e.target.value)}
                    className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    placeholder="શ્રદ્ધાંજલિ"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                  Hero Subtitle (H2)
                </label>
                <input
                  type="text"
                  value={metadata.subtitle || ''}
                  onChange={(e) => updateMetaField('subtitle', e.target.value)}
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  placeholder="શ્રદ્ધાંજલિ – એક ભાવનાત્મક પ્રયાસ"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                  Hero Primary Paragraph (Content)
                </label>
                <textarea
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none leading-relaxed"
                  placeholder="શ્રદ્ધાંજલિ એક એવી વેબસાઇટ છે..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                  Hero Secondary Paragraph
                </label>
                <textarea
                  rows={2}
                  value={metadata.heroDescription || ''}
                  onChange={(e) => updateMetaField('heroDescription', e.target.value)}
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none leading-relaxed"
                  placeholder="અમારું લક્ષ્ય છે કે દરેક વ્યક્તિને..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#1C3A52]/50">
                <div>
                  <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                    Hero Image URL
                  </label>
                  <input
                    type="text"
                    value={metadata.heroImage || ''}
                    onChange={(e) => updateMetaField('heroImage', e.target.value)}
                    className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    placeholder="/images/hero-candle.jpg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                    Hero Image Alt Text
                  </label>
                  <input
                    type="text"
                    value={metadata.heroImageAlt || ''}
                    onChange={(e) => updateMetaField('heroImageAlt', e.target.value)}
                    className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    placeholder="શ્રદ્ધાંજલિ ભાવનાત્મક દીવો"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Widgets & Sections */}
          {activeTab === 'widgets' && (
            <div className="space-y-6">
              {/* Widget 1: Value Cards */}
              <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4">
                <div className="flex items-center justify-between border-b border-[#1C3A52] pb-3">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Heart size={16} className="text-gold" />
                      <span>Value Cards (4 Highlights)</span>
                    </h2>
                    <p className="text-xs text-[#8495A9] mt-0.5">
                      Highlight the core values and pillars of the platform.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddValueCard}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#061321] hover:bg-[#142B40] text-gold text-xs font-semibold rounded-xl border border-[#1C3A52]"
                  >
                    <Plus size={14} />
                    <span>Add Card</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(metadata.valueCards || []).map((card, idx) => (
                    <div
                      key={card.id || idx}
                      className="bg-[#061321] border border-[#1C3A52] rounded-xl p-4 space-y-3 relative group"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveValueCard(idx)}
                        className="absolute top-3 right-3 text-red-400 hover:text-red-300 p-1 rounded-lg hover:bg-red-500/10"
                        title="Delete Card"
                      >
                        <Trash2 size={14} />
                      </button>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                            Icon
                          </label>
                          <select
                            value={card.icon || 'heart'}
                            onChange={(e) => handleUpdateValueCard(idx, 'icon', e.target.value)}
                            className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none"
                          >
                            <option value="heart">Heart</option>
                            <option value="shield">Shield</option>
                            <option value="users">Users</option>
                            <option value="lotus">Lotus</option>
                            <option value="sparkles">Sparkles</option>
                            <option value="award">Award</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                            Card Title
                          </label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => handleUpdateValueCard(idx, 'title', e.target.value)}
                            className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            placeholder="ભાવના"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={card.description}
                          onChange={(e) =>
                            handleUpdateValueCard(idx, 'description', e.target.value)
                          }
                          className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg p-2 text-xs text-white focus:outline-none leading-relaxed"
                          placeholder="અમારો પ્રયાસ છે..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 2: Our Journey & Quote */}
              <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1C3A52] pb-3">
                  <LotusIcon size={18} />
                  <span>Our Journey (&quot;અમારી સફર&quot;) & Quote</span>
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                    Journey Section Title
                  </label>
                  <input
                    type="text"
                    value={metadata.journeyTitle || ''}
                    onChange={(e) => updateMetaField('journeyTitle', e.target.value)}
                    className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    placeholder="અમારી સફર"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                    Journey Story Content (Paragraphs)
                  </label>
                  <textarea
                    rows={4}
                    value={metadata.journeyText || ''}
                    onChange={(e) => updateMetaField('journeyText', e.target.value)}
                    className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none leading-relaxed"
                    placeholder="આ વેબસાઇટ એક નાના વિચારથી શરૂ થઈ હતી..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                    Inspirational Quote Card
                  </label>
                  <input
                    type="text"
                    value={metadata.missionQuote || ''}
                    onChange={(e) => updateMetaField('missionQuote', e.target.value)}
                    className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    placeholder="“યાદો ક્યારેય મરતા નથી, એ હંમેશા હૃદયમાં જીવંત રહે છે.”"
                  />
                </div>
              </div>

              {/* Widget 3: Our Team */}
              <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4">
                <div className="flex items-center justify-between border-b border-[#1C3A52] pb-3">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Users size={16} className="text-gold" />
                      <span>Our Team Section</span>
                    </h2>
                    <p className="text-xs text-[#8495A9] mt-0.5">
                      Introduce key members and management team.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTeamMember}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#061321] hover:bg-[#142B40] text-gold text-xs font-semibold rounded-xl border border-[#1C3A52]"
                  >
                    <Plus size={14} />
                    <span>Add Member</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      Team Section Heading
                    </label>
                    <input
                      type="text"
                      value={metadata.teamTitle || ''}
                      onChange={(e) => updateMetaField('teamTitle', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      placeholder="અમારી ટીમ"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      Team Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={metadata.teamSubtitle || ''}
                      onChange={(e) => updateMetaField('teamSubtitle', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      placeholder="અમને આ કાર્યમાં મદદ કરનાર તમામનો આભાર."
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {(metadata.teamMembers || []).map((member, idx) => (
                    <div
                      key={member.id || idx}
                      className="bg-[#061321] border border-[#1C3A52] rounded-xl p-4 relative group grid grid-cols-1 sm:grid-cols-3 gap-3 items-start"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveTeamMember(idx)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-300 p-1 rounded-lg hover:bg-red-500/10"
                        title="Remove Member"
                      >
                        <Trash2 size={14} />
                      </button>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleUpdateTeamMember(idx, 'name', e.target.value)}
                          className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                          placeholder="નામ"
                        />
                        <label className="block text-[10px] font-semibold text-[#8495A9] mt-2 mb-1">
                          Role / Title
                        </label>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => handleUpdateTeamMember(idx, 'role', e.target.value)}
                          className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                          placeholder="સ્થાપક અને કન્ટેન્ટ મેનેજર"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                          Bio / Contribution
                        </label>
                        <textarea
                          rows={2}
                          value={member.bio}
                          onChange={(e) => handleUpdateTeamMember(idx, 'bio', e.target.value)}
                          className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg p-2 text-xs text-white focus:outline-none"
                          placeholder="શબ્દો દ્વારા લોકો સુધી ભાવનાઓ પહોંચાડવાનો પ્રયત્ન."
                        />
                        <label className="block text-[10px] font-semibold text-[#8495A9] mt-2 mb-1">
                          Photo URL (Optional)
                        </label>
                        <input
                          type="text"
                          value={member.image || ''}
                          onChange={(e) => handleUpdateTeamMember(idx, 'image', e.target.value)}
                          className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                          placeholder="/images/author-hina.jpg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 4: Bottom Call To Action Banner */}
              <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1C3A52] pb-3">
                  <Award size={16} className="text-gold" />
                  <span>Bottom Banner CTA Widget</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      CTA Heading
                    </label>
                    <input
                      type="text"
                      value={metadata.ctaHeading || ''}
                      onChange={(e) => updateMetaField('ctaHeading', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                      placeholder="અમારો હેતુ માત્ર માહિતી આપવાનો નથી..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      CTA Subtitle
                    </label>
                    <input
                      type="text"
                      value={metadata.ctaSubtitle || ''}
                      onChange={(e) => updateMetaField('ctaSubtitle', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                      placeholder="જો તમારી પાસે કોઈ પ્રશ્ન કે સૂચન હોય..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={metadata.ctaButtonText || ''}
                      onChange={(e) => updateMetaField('ctaButtonText', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                      placeholder="અમારો સંપર્ક કરો"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      CTA Button Link
                    </label>
                    <input
                      type="text"
                      value={metadata.ctaButtonLink || ''}
                      onChange={(e) => updateMetaField('ctaButtonLink', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                      placeholder="/contact"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ============================================================ */}
      {/* 2. CONTACT PAGE EDITABLE SECTIONS                            */}
      {/* ============================================================ */}
      {isContactPage && (
        <>
          {/* Tab 1: Hero Section */}
          {(activeTab === 'hero' || !activeTab) && (
            <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-5">
              <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1C3A52] pb-3">
                <FileText size={16} className="text-gold" />
                <span>Contact Page Hero Section</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                    Page Title (H1)
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    placeholder="Contact Us"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                    Hero Badge
                  </label>
                  <input
                    type="text"
                    value={metadata.badge || ''}
                    onChange={(e) => updateMetaField('badge', e.target.value)}
                    className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                    placeholder="Shradhanjali Msg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                  Hero Subtitle (H2)
                </label>
                <input
                  type="text"
                  value={metadata.subtitle || ''}
                  onChange={(e) => updateMetaField('subtitle', e.target.value)}
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  placeholder="We Are Here To Support You"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                  Hero Primary Paragraph (Content)
                </label>
                <textarea
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none leading-relaxed"
                  placeholder="Whether you have an inquiry, feedback on memorial content..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                  Hero Secondary Paragraph
                </label>
                <textarea
                  rows={2}
                  value={metadata.heroDescription || ''}
                  onChange={(e) => updateMetaField('heroDescription', e.target.value)}
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none leading-relaxed"
                  placeholder="Every message is important to our team..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#1C3A52]/50">
                <div>
                  <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                    Hero Image URL
                  </label>
                  <input
                    type="text"
                    value={metadata.heroImage || ''}
                    onChange={(e) => updateMetaField('heroImage', e.target.value)}
                    className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    placeholder="/images/lotus-water.jpg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                    Hero Image Alt Text
                  </label>
                  <input
                    type="text"
                    value={metadata.heroImageAlt || ''}
                    onChange={(e) => updateMetaField('heroImageAlt', e.target.value)}
                    className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    placeholder="Shradhanjali Memorial Lotus"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Contact Widgets */}
          {activeTab === 'widgets' && (
            <div className="space-y-6">
              {/* Contact Information Cards (Phone, Email, Address) */}
              <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-5">
                <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1C3A52] pb-3">
                  <Phone size={16} className="text-gold" />
                  <span>Contact Information Cards (3 Info Widgets)</span>
                </h2>

                {/* Card 1: Phone */}
                <div className="bg-[#061321] border border-[#1C3A52] rounded-xl p-4 space-y-3">
                  <h3 className="text-xs font-bold text-gold flex items-center gap-1.5">
                    <Phone size={13} />
                    <span>Card 1: Phone Assistance</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={metadata.phoneTitle || ''}
                        onChange={(e) => updateMetaField('phoneTitle', e.target.value)}
                        className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        placeholder="Phone Assistance"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={metadata.phoneNumber || ''}
                        onChange={(e) => updateMetaField('phoneNumber', e.target.value)}
                        className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                        Working Hours Note
                      </label>
                      <input
                        type="text"
                        value={metadata.phoneHours || ''}
                        onChange={(e) => updateMetaField('phoneHours', e.target.value)}
                        className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        placeholder="(Mon - Sat, 9:00 AM - 6:00 PM)"
                      />
                    </div>
                  </div>
                </div>

                {/* Card 2: Email */}
                <div className="bg-[#061321] border border-[#1C3A52] rounded-xl p-4 space-y-3">
                  <h3 className="text-xs font-bold text-gold flex items-center gap-1.5">
                    <Mail size={13} />
                    <span>Card 2: Email Support</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={metadata.emailTitle || ''}
                        onChange={(e) => updateMetaField('emailTitle', e.target.value)}
                        className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        placeholder="Email Support"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                        Email Address
                      </label>
                      <input
                        type="text"
                        value={metadata.emailAddress || ''}
                        onChange={(e) => updateMetaField('emailAddress', e.target.value)}
                        className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        placeholder="support@shradhanjalimsg.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                        Response Note
                      </label>
                      <input
                        type="text"
                        value={metadata.emailResponseTime || ''}
                        onChange={(e) => updateMetaField('emailResponseTime', e.target.value)}
                        className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        placeholder="(Response within 24 hours)"
                      />
                    </div>
                  </div>
                </div>

                {/* Card 3: Address */}
                <div className="bg-[#061321] border border-[#1C3A52] rounded-xl p-4 space-y-3">
                  <h3 className="text-xs font-bold text-gold flex items-center gap-1.5">
                    <MapPin size={13} />
                    <span>Card 3: Editorial Office / Address</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={metadata.addressTitle || ''}
                        onChange={(e) => updateMetaField('addressTitle', e.target.value)}
                        className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        placeholder="Editorial Office"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-[#8495A9] mb-1">
                        Full Address
                      </label>
                      <input
                        type="text"
                        value={metadata.addressText || ''}
                        onChange={(e) => updateMetaField('addressText', e.target.value)}
                        className="w-full bg-[#0B1D2D] border border-[#1C3A52] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        placeholder="Ahmedabad, Gujarat, India - 380001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Communication (WhatsApp & Social Channels) */}
              <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1C3A52] pb-3">
                  <MessageCircle size={16} className="text-gold" />
                  <span>Quick Communication Channels (WhatsApp / Facebook)</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={metadata.quickChannelsTitle || ''}
                      onChange={(e) => updateMetaField('quickChannelsTitle', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      placeholder="Quick Communication"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={metadata.quickChannelsSubtitle || ''}
                      onChange={(e) => updateMetaField('quickChannelsSubtitle', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      placeholder="You may also reach our team via social channels."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      WhatsApp Button Label
                    </label>
                    <input
                      type="text"
                      value={metadata.whatsappButtonText || ''}
                      onChange={(e) => updateMetaField('whatsappButtonText', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      placeholder="Connect on WhatsApp"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      WhatsApp Phone Number (with Country Code)
                    </label>
                    <input
                      type="text"
                      value={metadata.whatsappNumber || ''}
                      onChange={(e) => updateMetaField('whatsappNumber', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      placeholder="919876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      WhatsApp Pre-filled Message
                    </label>
                    <input
                      type="text"
                      value={metadata.whatsappMessage || ''}
                      onChange={(e) => updateMetaField('whatsappMessage', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      placeholder="Hello, I am reaching out regarding Shradhanjali Msg."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      Facebook Button Label
                    </label>
                    <input
                      type="text"
                      value={metadata.facebookButtonText || ''}
                      onChange={(e) => updateMetaField('facebookButtonText', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      placeholder="Connect on Facebook"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                      Facebook URL
                    </label>
                    <input
                      type="text"
                      value={metadata.facebookUrl || ''}
                      onChange={(e) => updateMetaField('facebookUrl', e.target.value)}
                      className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                      placeholder="https://facebook.com/shradhanjalimsg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ============================================================ */}
      {/* 3. POLICY PAGES & GENERIC CONTENT EDITOR                     */}
      {/* ============================================================ */}
      {(!isAboutPage && !isContactPage) && (
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                Page Title (H1)
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
                Last Updated Notice Text
              </label>
              <input
                type="text"
                value={metadata.lastUpdatedText || ''}
                onChange={(e) => updateMetaField('lastUpdatedText', e.target.value)}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                placeholder="Last Updated: April 2026"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#B9C6D6]">
                Page Content (Markdown / Text)
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setContent((prev) => prev + '\n\n## Subheading\n')}
                  className="px-2 py-0.5 text-[10px] bg-[#061321] text-gold border border-[#1C3A52] rounded hover:bg-[#142B40]"
                >
                  + Add H2
                </button>
                <button
                  type="button"
                  onClick={() => setContent((prev) => prev + '\n\n### Sub-section\n')}
                  className="px-2 py-0.5 text-[10px] bg-[#061321] text-gold border border-[#1C3A52] rounded hover:bg-[#142B40]"
                >
                  + Add H3
                </button>
                <button
                  type="button"
                  onClick={() => setContent((prev) => prev + '\n• Bullet point')}
                  className="px-2 py-0.5 text-[10px] bg-[#061321] text-[#B9C6D6] border border-[#1C3A52] rounded hover:bg-[#142B40]"
                >
                  + Bullet
                </button>
              </div>
            </div>
            <textarea
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-4 text-xs sm:text-sm text-white focus:outline-none leading-relaxed font-mono"
            />
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. SEO & META TAGS (Common across all pages)                 */}
      {/* ============================================================ */}
      {(!isAboutPage && !isContactPage) || activeTab === 'seo' ? (
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1C3A52] pb-3">
            <span>Search Engine Optimization (SEO)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                placeholder="Page Title | Shradhanjali Msg"
              />
              <p className="text-[10px] text-[#8495A9] mt-1">
                Appears in browser tabs and Google search results ({seoTitle.length} characters)
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B9C6D6] mb-1.5">
                SEO Meta Description
              </label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-xs text-white focus:outline-none leading-relaxed"
                placeholder="Concise overview for search engine snippets..."
              />
              <p className="text-[10px] text-[#8495A9] mt-1">
                Keep between 120-160 characters ({seoDescription.length} characters)
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Floating Bottom Action Bar */}
      <div className="sticky bottom-4 z-20 bg-[#061321]/95 backdrop-blur-md border border-[#1C3A52] rounded-2xl p-4 flex items-center justify-between shadow-2xl">
        <div className="text-xs text-[#8495A9]">
          Editing <span className="text-gold font-bold">{page.title}</span> (/{page.slug})
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="px-4 py-2 bg-[#0B1D2D] hover:bg-[#10263B] text-[#B9C6D6] hover:text-white text-xs font-semibold rounded-xl border border-[#1C3A52] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-1.5 px-6 py-2 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <Save size={14} />
            <span>{loading ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
