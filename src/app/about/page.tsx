import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Heart, ShieldCheck, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LotusIcon } from '@/components/LotusLogo';
import { getPageBySlug } from '@/lib/db';

export const metadata: Metadata = {
  title: 'અમારા વિશે | શ્રદ્ધાંજલિ - એક ભાવનાત્મક પ્રયાસ',
  description: 'શ્રદ્ધાંજલિ એક એવું મંચ છે, જ્યાં પ્રિયજનોની યાદોને શબ્દોમાં વ્યક્ત કરવા, સંવેદનશીલ સંદેશ શોધવા અને જીવન તથા સ્મૃતિઓ સંબંધિત ઉપયોગી માહિતી મેળવવા માટે સામગ્રી રજૂ કરવામાં આવે છે.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const page = getPageBySlug('about');

  return (
    <div className="min-h-screen flex flex-col bg-[#061321] text-[#F4F6FA]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'હોમ', url: '/' },
            { label: 'અમારા વિશે' },
          ]}
        />

        {/* Hero Section */}
        <div className="mt-4 mb-14">
          <span className="text-gold font-bold tracking-widest text-sm uppercase">
            શ્રદ્ધાંજલિ
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 mb-3">
            અમારા વિશે
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-gold mb-6">
            શ્રદ્ધાંજલિ – એક ભાવનાત્મક પ્રયાસ
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-[#B9C6D6] leading-relaxed">
              <p>
                {page?.content ||
                  'શ્રદ્ધાંજલિ એક એવી વેબસાઇટ છે, જે આપણા પ્રિયજનોની યાદોને જીવંત રાખવા, ભાવપૂર્વક સંદેશાઓ, શાયરી અને માહિતી દ્વારા લોકોને સહાય કરે છે.'}
              </p>
              <p>
                અમારું લક્ષ્ય છે કે દરેક વ્યક્તિને પોતાના લાગણી વ્યક્ત કરવા માટે એક સુંદર, સરળ અને વિશ્વસનીય મંચ મળી રહે.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#1C3A52] aspect-[16/10] bg-[#0B1D2D] shadow-2xl">
                <img
                  src="/images/hero-candle.jpg"
                  alt="શ્રદ્ધાંજલિ ભાવનાત્મક દીવો"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061321]/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Value Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 1: ભાવના */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#061321] border border-[#1C3A52] flex items-center justify-center mb-4 text-gold">
              <Heart size={22} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">ભાવના</h3>
            <p className="text-xs sm:text-sm text-[#B9C6D6] leading-relaxed">
              અમારો પ્રયાસ છે કે દરેક સંદેશ હૃદયથી લખાયેલો હોય.
            </p>
          </div>

          {/* Card 2: વિશ્વસનીયતા */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#061321] border border-[#1C3A52] flex items-center justify-center mb-4 text-gold">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">વિશ્વસનીયતા</h3>
            <p className="text-xs sm:text-sm text-[#B9C6D6] leading-relaxed">
              અમે માત્ર સાચી અને પ્રમાણિત માહિતી જ પ્રસારિત કરીએ છીએ.
            </p>
          </div>

          {/* Card 3: સમાજ માટે */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#061321] border border-[#1C3A52] flex items-center justify-center mb-4 text-gold">
              <Users size={22} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">સમાજ માટે</h3>
            <p className="text-xs sm:text-sm text-[#B9C6D6] leading-relaxed">
              આ વેબસાઇટ સમાજમાં સકારાત્મક ભાવનાઓ ફેલાવવા માટે બનાવવામાં આવી છે.
            </p>
          </div>

          {/* Card 4: સાદગી */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#061321] border border-[#1C3A52] flex items-center justify-center mb-4 text-gold">
              <LotusIcon size={22} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">સાદગી</h3>
            <p className="text-xs sm:text-sm text-[#B9C6D6] leading-relaxed">
              સરળ ભાષા, સાફ ડિઝાઇન અને સરળ નેવિગેશન – અમારી પ્રાથમિકતા છે.
            </p>
          </div>
        </div>

        {/* અમારી સફર (Our Journey) & Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-8 bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-8 card-glow">
            <h3 className="text-2xl font-bold text-white mb-4">અમારી સફર</h3>
            <div className="space-y-4 text-sm sm:text-base text-[#B9C6D6] leading-relaxed">
              <p>
                આ વેબસાઇટ એક નાના વિચારથી શરૂ થઈ હતી – કે કેટલીકવાર આપણા મનમાં હોય તેવી ભાવનાઓને શબ્દો મળતા નથી. ત્યારે અમે વિચાર્યું કે કેમ ન એક એવી જગ્યા બનાવીએ, જ્યાં લોકો સરળતાથી શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિનાં સંદેશ, શાયરી અને સંબંધિત માહિતી મેળવી શકે.
              </p>
              <p>
                આજે, અમે સતત પ્રયત્નશીલ છીએ કે શ્રદ્ધાંજલિને એક વિશ્વસનીય અને ઉપયોગી પ્લેટફોર્મ બનાવી શકીએ, જ્યાં દરેક મુલાકાતી ને શાંતિ, સંવેદના અને સકારાત્મકતા મળે.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#0A1B2B] border border-[#1C3A52] rounded-2xl p-6 flex flex-col justify-center items-center text-center relative card-glow">
            <LotusIcon size={34} className="mb-4" />
            <p className="text-base sm:text-lg text-white font-medium italic leading-relaxed">
              &ldquo;યાદો ક્યારેય મરતા નથી, એ હંમેશા હૃદયમાં જીવંત રહે છે.&rdquo;
            </p>
          </div>
        </div>

        {/* અમારી ટીમ (Our Team) */}
        <div className="mb-16">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">અમારી ટીમ</h3>
            <p className="text-sm text-[#B9C6D6]">
              અમને આ કાર્યમાં મદદ કરનાર, પ્રેરણા આપનાર અને સાથ આપનાર તમામનો આભાર.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Member 1 */}
            <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold mb-4 shadow-md bg-[#061321]">
                <img
                  src="/images/author-hina.jpg"
                  alt="ઉષા બાતા"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-base font-bold text-white">ઉષા બાતા</h4>
              <p className="text-xs text-gold mb-2">સ્થાપક અને કન્ટેન્ટ મેનેજર</p>
              <p className="text-xs text-[#B9C6D6] leading-relaxed">
                શબ્દો દ્વારા લોકો સુધી ભાવનાઓ પહોંચાડવાનો પ્રયત્ન.
              </p>
            </div>

            {/* Member 2 */}
            <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold mb-4 shadow-md bg-[#142B40] flex items-center justify-center text-gold">
                <Users size={32} />
              </div>
              <h4 className="text-base font-bold text-white">ટેક સપોર્ટ</h4>
              <p className="text-xs text-gold mb-2">ટેકનિકલ સહાય</p>
              <p className="text-xs text-[#B9C6D6] leading-relaxed">
                સાઈટની ટેકનિકલ કામગીરી અને સુરક્ષા માટે જવાબદાર.
              </p>
            </div>

            {/* Member 3 */}
            <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold mb-4 shadow-md bg-[#142B40] flex items-center justify-center text-gold">
                <Sparkles size={32} />
              </div>
              <h4 className="text-base font-bold text-white">કન્ટેન્ટ ટીમ</h4>
              <p className="text-xs text-gold mb-2">લેખક અને સંપાદન</p>
              <p className="text-xs text-[#B9C6D6] leading-relaxed">
                પ્રમાણિત અને ગુણવત્તાસભર માહિતી પ્રદાન કરવા માટે.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action bottom banner */}
        <div className="bg-gradient-to-r from-[#0A1B2B] via-[#0B1D2D] to-[#0A1B2B] border border-[#1C3A52] rounded-3xl p-8 sm:p-10 text-center card-glow mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            અમારો હેતુ માત્ર માહિતી આપવાનો નથી, પણ એકબીજાના દુઃખમાં સાથ આપવાનો છે.
          </h3>
          <p className="text-sm text-[#B9C6D6] max-w-xl mx-auto mb-6">
            જો તમારી પાસે કોઈ પ્રશ્ન કે સૂચન હોય તો અમને જણાવો.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-[#ffd782] text-[#061321] font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg"
          >
            <span>અમારો સંપર્ક કરો</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
