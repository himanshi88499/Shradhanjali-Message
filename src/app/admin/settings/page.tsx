'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Settings, Globe, Share2, Shield, Eye } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'homepage' | 'social' | 'technical'>('general');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setLoading(true);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage('સેટિંગ્સ સફળતાપૂર્વક સાચવવામાં આવી!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!settings) {
    return <div className="text-center py-12 text-gold">સેટિંગ્સ લોડ થઈ રહી છે...</div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C3A52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white">વેબસાઇટ સેટિંગ્સ (Website Settings)</h1>
          <p className="text-xs text-[#8495A9] mt-1">
            બ્રાન્ડિંગ, સંપર્ક વિગતો, હોમપેજ ટેક્સ્ટ અને ટેકનિકલ વિકલ્પો.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-[#ffd782] disabled:opacity-50 text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md self-start sm:self-auto"
        >
          <Save size={15} />
          <span>{loading ? 'સાચવી રહ્યાં છીએ...' : 'સેટિંગ્સ સાચવો'}</span>
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#1C3A52] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'general' ? 'bg-[#142B40] text-gold border border-gold/40' : 'text-[#8495A9] hover:text-white'
          }`}
        >
          <Settings size={14} />
          <span>સામાન્ય (General)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('homepage')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'homepage' ? 'bg-[#142B40] text-gold border border-gold/40' : 'text-[#8495A9] hover:text-white'
          }`}
        >
          <Globe size={14} />
          <span>હોમપેજ કન્ટેન્ટ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'social' ? 'bg-[#142B40] text-gold border border-gold/40' : 'text-[#8495A9] hover:text-white'
          }`}
        >
          <Share2 size={14} />
          <span>સોશિયલ લિંક્સ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('technical')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'technical' ? 'bg-[#142B40] text-gold border border-gold/40' : 'text-[#8495A9] hover:text-white'
          }`}
        >
          <Shield size={14} />
          <span>ટેકનિકલ & એનાલિટિક્સ</span>
        </button>
      </div>

      {/* Tab 1: General */}
      {activeTab === 'general' && (
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">વેબસાઇટ નામ (Site Name)</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">ટેગલાઇન (Tagline)</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">સંપર્ક ઇમેઇલ (Contact Email)</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">સંપર્ક ફોન (Phone Number)</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">સરનામું (Address)</label>
            <input
              type="text"
              value={settings.contactAddress}
              onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">કૉપિરાઇટ લખાણ (Copyright Text)</label>
            <input
              type="text"
              value={settings.copyrightText}
              onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Homepage */}
      {activeTab === 'homepage' && (
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4 text-xs">
          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">હીરો બેજ (Hero Badge)</label>
            <input
              type="text"
              value={settings.heroBadge}
              onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">હીરો મુખ્ય હેડિંગ (Hero Heading)</label>
            <input
              type="text"
              value={settings.heroHeading}
              onChange={(e) => setSettings({ ...settings, heroHeading: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">હીરો સબટાઈટલ (Hero Subtitle)</label>
            <textarea
              rows={2}
              value={settings.heroSubtitle}
              onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-white focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">હીરો ક્વોટ (Hero Quote)</label>
            <input
              type="text"
              value={settings.heroQuote}
              onChange={(e) => setSettings({ ...settings, heroQuote: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">શોધ બોક્સ પ્લેસહોલ્ડર (Search Placeholder)</label>
            <input
              type="text"
              value={settings.searchPlaceholder}
              onChange={(e) => setSettings({ ...settings, searchPlaceholder: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Social */}
      {activeTab === 'social' && (
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4 text-xs">
          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">WhatsApp સંપર્ક નંબર</label>
            <input
              type="text"
              value={settings.socials.whatsappNumber || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socials: { ...settings.socials, whatsappNumber: e.target.value },
                })
              }
              placeholder="919876543210"
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">Facebook URL</label>
              <input
                type="text"
                value={settings.socials.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, facebook: e.target.value },
                  })
                }
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">Twitter / X URL</label>
              <input
                type="text"
                value={settings.socials.twitter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, twitter: e.target.value },
                  })
                }
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">YouTube URL</label>
              <input
                type="text"
                value={settings.socials.youtube}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, youtube: e.target.value },
                  })
                }
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">Instagram URL</label>
              <input
                type="text"
                value={settings.socials.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, instagram: e.target.value },
                  })
                }
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Technical */}
      {activeTab === 'technical' && (
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4 text-xs">
          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">
              Google Analytics 4 Measurement ID
            </label>
            <input
              type="text"
              value={settings.technical.gaMeasurementId || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: { ...settings.technical, gaMeasurementId: e.target.value },
                })
              }
              placeholder="G-XXXXXXXXXX"
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-gold font-mono focus:outline-none"
            />
            <p className="text-[11px] text-[#8495A9] mt-1">
              Google Analytics માંથી મેળવેલો Measurement ID અહીં ઉમેરો.
            </p>
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">
              Google AdSense Publisher ID (Optional)
            </label>
            <input
              type="text"
              value={settings.technical.adsensePublisherId || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: { ...settings.technical, adsensePublisherId: e.target.value },
                })
              }
              placeholder="pub-XXXXXXXXXXXXXXXX"
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#1C3A52]/60">
            <div>
              <span className="font-semibold text-white block">સર્ચ એન્જિન ઇન્ડેક્સિંગ (Search Indexing)</span>
              <span className="text-[11px] text-[#8495A9]">
                Google અને Bing જેવા સર્ચ એન્જિનને આ સાઈટ ઇન્ડેક્સ કરવાની મંજૂરી આપો.
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.technical.allowIndexing ?? true}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: { ...settings.technical, allowIndexing: e.target.checked },
                })
              }
              className="w-4 h-4 accent-[#F5C45E]"
            />
          </div>
        </div>
      )}
    </form>
  );
}
