'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Settings, Globe, Share2, Shield, Code, Search, DollarSign } from 'lucide-react';
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
        setMessage('Website settings saved successfully!');
        setTimeout(() => setMessage(''), 3500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!settings) {
    return <div className="text-center py-12 text-gold">Loading settings...</div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C3A52]">
        <div>
          <h1 className="text-2xl font-extrabold text-theme-primary">Website Settings</h1>
          <p className="text-xs text-[#8495A9] mt-1">
            Configure site branding, contact information, social links, SEO tags, AdSense ads.txt, and custom scripts.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-[#ffd782] disabled:opacity-50 text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md self-start sm:self-auto"
        >
          <Save size={15} />
          <span>{loading ? 'Saving Changes...' : 'Save Settings'}</span>
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs flex items-center gap-2 animate-fade-in">
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
          <span>General</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('homepage')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'homepage' ? 'bg-[#142B40] text-gold border border-gold/40' : 'text-[#8495A9] hover:text-white'
          }`}
        >
          <Globe size={14} />
          <span>Homepage Content</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'social' ? 'bg-[#142B40] text-gold border border-gold/40' : 'text-[#8495A9] hover:text-white'
          }`}
        >
          <Share2 size={14} />
          <span>Social Channels</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('technical')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'technical' ? 'bg-[#142B40] text-gold border border-gold/40' : 'text-[#8495A9] hover:text-white'
          }`}
        >
          <Code size={14} />
          <span>Technical, SEO & Ads</span>
        </button>
      </div>

      {/* Tab 1: General */}
      {activeTab === 'general' && (
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4 text-xs">
          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">Website Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">Contact Phone</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">Physical / Editorial Office Address</label>
            <textarea
              rows={2}
              value={settings.contactAddress}
              onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">Footer Copyright Notice</label>
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
            <label className="block text-[#B9C6D6] font-semibold mb-1">Hero Intro Badge</label>
            <input
              type="text"
              value={settings.heroBadge}
              onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">Hero Subtitle</label>
            <textarea
              rows={2}
              value={settings.heroSubtitle}
              onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">Search Bar Placeholder</label>
            <input
              type="text"
              value={settings.searchPlaceholder}
              onChange={(e) => setSettings({ ...settings, searchPlaceholder: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#B9C6D6] font-semibold mb-1">Featured Memorial Strip Title</label>
            <input
              type="text"
              value={settings.infoCardsTitle}
              onChange={(e) => setSettings({ ...settings, infoCardsTitle: e.target.value })}
              className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Social */}
      {activeTab === 'social' && (
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">WhatsApp Number (with country code)</label>
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
              <label className="block text-[#B9C6D6] font-semibold mb-1">X / Twitter URL</label>
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

      {/* Tab 4: Technical, SEO, Ads & Custom Code Injection */}
      {activeTab === 'technical' && (
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-5 text-xs">
          {/* Google Search Console HTML Tag Verification */}
          <div className="p-4 rounded-xl bg-[#061321] border border-[#1C3A52] space-y-2">
            <div className="flex items-center gap-2 text-gold font-bold">
              <Search size={15} />
              <span>Google Search Console Verification (HTML Tag Method)</span>
            </div>
            <p className="text-[11px] text-[#8495A9]">
              Paste your full Google verification meta tag (e.g.{' '}
              <code className="text-white bg-black/40 px-1 py-0.5 rounded">&lt;meta name="google-site-verification" content="..." /&gt;</code>)
              or just the verification token code.
            </p>
            <textarea
              rows={2}
              value={settings.technical.searchConsoleMetaTag || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: { ...settings.technical, searchConsoleMetaTag: e.target.value },
                })
              }
              placeholder='<meta name="google-site-verification" content="your-verification-code-here" />'
              className="w-full bg-[#0B1D2D] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-gold font-mono focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* AdSense ads.txt */}
          <div className="p-4 rounded-xl bg-[#061321] border border-[#1C3A52] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gold font-bold">
                <DollarSign size={15} />
                <span>Google AdSense ads.txt Configuration</span>
              </div>
              <a
                href="/ads.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-gold hover:underline font-semibold"
              >
                View Live /ads.txt ↗
              </a>
            </div>
            <p className="text-[11px] text-[#8495A9]">
              Enter your official AdSense ads.txt records line by line. Accessible directly at{' '}
              <code className="text-white bg-black/40 px-1 py-0.5 rounded">https://shradhanjali.in/ads.txt</code>
            </p>
            <textarea
              rows={3}
              value={settings.technical.adsTxt || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: { ...settings.technical, adsTxt: e.target.value },
                })
              }
              placeholder="google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"
              className="w-full bg-[#0B1D2D] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-white font-mono focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Custom Header Code */}
          <div className="p-4 rounded-xl bg-[#061321] border border-[#1C3A52] space-y-2">
            <div className="flex items-center gap-2 text-gold font-bold">
              <Code size={15} />
              <span>Custom Header Code (&lt;head&gt; Scripts & Styles)</span>
            </div>
            <p className="text-[11px] text-[#8495A9]">
              Inject custom scripts, Google Tag Manager, custom CSS, or verification tags directly into the{' '}
              <code className="text-white bg-black/40 px-1 py-0.5 rounded">&lt;head&gt;</code> section of every page.
            </p>
            <textarea
              rows={4}
              value={settings.technical.customHeaderCode || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: { ...settings.technical, customHeaderCode: e.target.value },
                })
              }
              placeholder="<!-- Google Tag Manager / Custom Tracking Scripts / CSS -->&#10;<script>&#10;  // Your header script here&#10;</script>"
              className="w-full bg-[#0B1D2D] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-white font-mono focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Custom Footer Code */}
          <div className="p-4 rounded-xl bg-[#061321] border border-[#1C3A52] space-y-2">
            <div className="flex items-center gap-2 text-gold font-bold">
              <Code size={15} />
              <span>Custom Footer Code (&lt;body&gt; Closing Scripts)</span>
            </div>
            <p className="text-[11px] text-[#8495A9]">
              Inject tracking pixels, live chat widgets, or conversion scripts immediately before the closing{' '}
              <code className="text-white bg-black/40 px-1 py-0.5 rounded">&lt;/body&gt;</code> tag.
            </p>
            <textarea
              rows={4}
              value={settings.technical.customFooterCode || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  technical: { ...settings.technical, customFooterCode: e.target.value },
                })
              }
              placeholder="<!-- Tracking pixels / Live chat / Conversion scripts -->&#10;<script>&#10;  // Your footer script here&#10;</script>"
              className="w-full bg-[#0B1D2D] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-white font-mono focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* GA4 and AdSense IDs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

            <div>
              <label className="block text-[#B9C6D6] font-semibold mb-1">
                Google AdSense Publisher ID
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
          </div>

          {/* Search Indexing */}
          <div className="flex items-center justify-between pt-3 border-t border-[#1C3A52]/60">
            <div>
              <span className="font-semibold text-white block">Search Engine Indexing</span>
              <span className="text-[11px] text-[#8495A9]">
                Allow search engines like Google and Bing to crawl and index this website.
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
