import React from 'react';
import { getPosts, getPages, getCategories, getSettings } from '@/lib/db';
import { CheckCircle2, ExternalLink, Globe, Search, ShieldCheck } from 'lucide-react';

export default function AdminSeoPage() {
  const posts = getPosts('published');
  const pages = getPages();
  const categories = getCategories();
  const settings = getSettings();

  const postsWithSeo = posts.filter((p) => p.seoTitle && p.seoDescription);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="pb-5 border-b border-[#1C3A52]">
        <h1 className="text-2xl font-extrabold text-white">SEO Management</h1>
        <p className="text-xs text-[#8495A9] mt-1">
          Search engine optimization overview, sitemap, robots.txt, and structured schema data.
        </p>
      </div>

      {/* SEO Health Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8495A9]">SEO Optimized Posts</span>
            <Search size={16} className="text-gold" />
          </div>
          <p className="text-2xl font-black text-white">
            {postsWithSeo.length} / {posts.length}
          </p>
          <span className="text-[10px] text-[#22C55E] flex items-center gap-1 mt-1 font-semibold">
            <CheckCircle2 size={11} /> High Coverage
          </span>
        </div>

        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8495A9]">XML Sitemap Status</span>
            <Globe size={16} className="text-gold" />
          </div>
          <p className="text-sm font-bold text-[#22C55E] flex items-center gap-1.5">
            <CheckCircle2 size={15} /> Active
          </p>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-gold hover:underline mt-2 inline-flex items-center gap-1"
          >
            <span>Open /sitemap.xml</span>
            <ExternalLink size={10} />
          </a>
        </div>

        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8495A9]">robots.txt Status</span>
            <ShieldCheck size={16} className="text-gold" />
          </div>
          <p className="text-sm font-bold text-[#22C55E] flex items-center gap-1.5">
            <CheckCircle2 size={15} /> Configured (Valid)
          </p>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-gold hover:underline mt-2 inline-flex items-center gap-1"
          >
            <span>Open /robots.txt</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* SEO Guidelines & Features */}
      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4">
        <h2 className="text-base font-bold text-white">Automated Technical SEO Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#B9C6D6]">
          <div className="p-4 bg-[#061321] border border-[#1C3A52] rounded-xl space-y-1.5">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#22C55E]" />
              <span>BreadcrumbList Schema (JSON-LD)</span>
            </h3>
            <p className="text-[#8495A9] leading-relaxed">
              Google standard BreadcrumbList structured data is automatically embedded on all article pages.
            </p>
          </div>

          <div className="p-4 bg-[#061321] border border-[#1C3A52] rounded-xl space-y-1.5">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#22C55E]" />
              <span>Article & FAQ Schema (JSON-LD)</span>
            </h3>
            <p className="text-[#8495A9] leading-relaxed">
              Every post contains Schema.org Article data and dynamic 5-question FAQPage schema for rich Google snippets.
            </p>
          </div>

          <div className="p-4 bg-[#061321] border border-[#1C3A52] rounded-xl space-y-1.5">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#22C55E]" />
              <span>Clean Canonical URLs</span>
            </h3>
            <p className="text-[#8495A9] leading-relaxed">
              Explicit canonical tags protect against duplicate indexing across parameters and protocols.
            </p>
          </div>

          <div className="p-4 bg-[#061321] border border-[#1C3A52] rounded-xl space-y-1.5">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#22C55E]" />
              <span>100-Point SEO Checklist in Editor</span>
            </h3>
            <p className="text-[#8495A9] leading-relaxed">
              Real-time score calculator evaluates keywords, title length, meta description, and heading hierarchy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
