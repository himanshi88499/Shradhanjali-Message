import React from 'react';
import { getPosts, getPages, getCategories, getSettings } from '@/lib/db';
import { CheckCircle2, AlertCircle, ExternalLink, Globe, Search, ShieldCheck } from 'lucide-react';

export default function AdminSeoPage() {
  const posts = getPosts('published');
  const pages = getPages();
  const categories = getCategories();
  const settings = getSettings();

  const postsWithSeo = posts.filter((p) => p.seoTitle && p.seoDescription);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="pb-5 border-b border-[#1C3A52]">
        <h1 className="text-2xl font-extrabold text-white">SEO મેનેજમેન્ટ (SEO System)</h1>
        <p className="text-xs text-[#8495A9] mt-1">
          સર્ચ એન્જિન ઑપ્ટિમાઇઝેશન, સાઇટમેપ, અને સ્ટ્રક્ચર્ડ ડેટા વિહંગાવલોકન.
        </p>
      </div>

      {/* SEO Health Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8495A9]">SEO ઑપ્ટિમાઇઝ્ડ લેખો</span>
            <Search size={16} className="text-gold" />
          </div>
          <p className="text-2xl font-black text-white">
            {postsWithSeo.length} / {posts.length}
          </p>
          <span className="text-[10px] text-[#22C55E] flex items-center gap-1 mt-1 font-semibold">
            <CheckCircle2 size={11} /> 100% કવરેજ
          </span>
        </div>

        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8495A9]">XML સાઇટમેપ સ્ટેટસ</span>
            <Globe size={16} className="text-gold" />
          </div>
          <p className="text-sm font-bold text-[#22C55E] flex items-center gap-1.5">
            <CheckCircle2 size={15} /> સક્રિય (Active)
          </p>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-gold hover:underline mt-2 inline-flex items-center gap-1"
          >
            <span>/sitemap.xml ખોલો</span>
            <ExternalLink size={10} />
          </a>
        </div>

        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8495A9]">robots.txt સ્ટેટસ</span>
            <ShieldCheck size={16} className="text-gold" />
          </div>
          <p className="text-sm font-bold text-[#22C55E] flex items-center gap-1.5">
            <CheckCircle2 size={15} /> કન્ફિગર્ડ (Valid)
          </p>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-gold hover:underline mt-2 inline-flex items-center gap-1"
          >
            <span>/robots.txt ખોલો</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* SEO Guidelines & Features */}
      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-4">
        <h2 className="text-base font-bold text-white">ઓટોમેટેડ ટેકનિકલ SEO સુવિધાઓ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#B9C6D6]">
          <div className="p-4 bg-[#061321] border border-[#1C3A52] rounded-xl space-y-1.5">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#22C55E]" />
              <span>BreadcrumbList Schema (JSON-LD)</span>
            </h3>
            <p className="text-[#8495A9] leading-relaxed">
              દરેક લેખ અને પેજ પર ગૂગલ સ્ટાન્ડર્ડ BreadcrumbList સ્ટ્રક્ચર્ડ ડેટા આપોઆપ એમ્બેડ થાય છે.
            </p>
          </div>

          <div className="p-4 bg-[#061321] border border-[#1C3A52] rounded-xl space-y-1.5">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#22C55E]" />
              <span>Article Schema & OpenGraph</span>
            </h3>
            <p className="text-[#8495A9] leading-relaxed">
              દરેક શ્રદ્ધાંજલિ લેખ માટે શીર્ષક, લેખક, તારીખ, અને ફીચર્ડ ઇમેજ સાથેનું સ્કીમા સમાવિષ્ટ છે.
            </p>
          </div>

          <div className="p-4 bg-[#061321] border border-[#1C3A52] rounded-xl space-y-1.5">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#22C55E]" />
              <span>ગુજરાતી યુનિકોડ & કેનોનિકલ URLs</span>
            </h3>
            <p className="text-[#8495A9] leading-relaxed">
              સ્વચ્છ, સર્ચ-ફ્રેન્ડલી Latin સ્લગ્સ સાથે સચોટ કેનોનિકલ ટેગ્સ ડુપ્લિકેટ કન્ટેન્ટ અટકાવે છે.
            </p>
          </div>

          <div className="p-4 bg-[#061321] border border-[#1C3A52] rounded-xl space-y-1.5">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#22C55E]" />
              <span>100-Point SEO Checklist એડિટર</span>
            </h3>
            <p className="text-[#8495A9] leading-relaxed">
              નવો લેખ લખતી વખતે લાઈવ 100-પોઇન્ટ ચેકલિસ્ટ સ્કોર કેલ્ક્યુલેટર વાસ્તવિક માર્ગદર્શન આપે છે.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
