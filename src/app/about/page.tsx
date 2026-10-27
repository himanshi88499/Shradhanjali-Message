import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Heart, ShieldCheck, Users, Sparkles, ArrowRight, Award } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LotusIcon } from '@/components/LotusLogo';
import { RichText } from '@/components/RichText';
import { getPageBySlug } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageBySlug('about');
  return {
    title: page?.seoTitle || `${page?.title || 'અમારા વિશે'} | શ્રદ્ધાંજલિ - એક ભાવનાત્મક પ્રયાસ`,
    description:
      page?.seoDescription ||
      'શ્રદ્ધાંજલિ એક એવું મંચ છે, જ્યાં પ્રિયજનોની યાદોને શબ્દોમાં વ્યક્ત કરવા, સંવેદનશીલ સંદેશ શોધવા અને જીવન તથા સ્મૃતિઓ સંબંધિત ઉપયોગી માહિતી મેળવવા માટે સામગ્રી રજૂ કરવામાં આવે છે.',
    alternates: {
      canonical: '/about',
    },
  };
}

const DEFAULT_VALUE_CARDS = [
  {
    id: 1,
    icon: 'heart',
    title: 'ભાવના',
    description: 'અમારો પ્રયાસ છે કે દરેક સંદેશ હૃદયથી લખાયેલો હોય.',
  },
  {
    id: 2,
    icon: 'shield',
    title: 'વિશ્વસનીયતા',
    description: 'અમે માત્ર સાચી અને પ્રમાણિત માહિતી જ પ્રસારિત કરીએ છીએ.',
  },
  {
    id: 3,
    icon: 'users',
    title: 'સમાજ માટે',
    description: 'આ વેબસાઇટ સમાજમાં સકારાત્મક ભાવનાઓ ફેલાવવા માટે બનાવવામાં આવી છે.',
  },
  {
    id: 4,
    icon: 'lotus',
    title: 'સાદગી',
    description: 'સરળ ભાષા, સાફ ડિઝાઇન અને સરળ નેવિગેશન – અમારી પ્રાથમિકતા છે.',
  },
];

const DEFAULT_TEAM_MEMBERS = [
  {
    id: 1,
    name: 'ઉષા બાતા',
    role: 'સ્થાપક અને કન્ટેન્ટ મેનેજર',
    bio: 'શબ્દો દ્વારા લોકો સુધી ભાવનાઓ પહોંચાડવાનો પ્રયત્ન.',
    image: '/images/author-hina.jpg',
  },
  {
    id: 2,
    name: 'ટેક સપોર્ટ',
    role: 'ટેકનિકલ સહાય',
    bio: 'સાઈટની ટેકનિકલ કામગીરી અને સુરક્ષા માટે જવાબદાર.',
    image: '',
  },
  {
    id: 3,
    name: 'કન્ટેન્ટ ટીમ',
    role: 'લેખક અને સંપાદન',
    bio: 'પ્રમાણિત અને ગુણવત્તાસભર માહિતી પ્રદાન કરવા માટે.',
    image: '',
  },
];

function renderCardIcon(icon?: string) {
  switch (icon?.toLowerCase()) {
    case 'heart':
      return <Heart size={22} />;
    case 'shield':
      return <ShieldCheck size={22} />;
    case 'users':
      return <Users size={22} />;
    case 'sparkles':
      return <Sparkles size={22} />;
    case 'award':
      return <Award size={22} />;
    case 'lotus':
    default:
      return <LotusIcon size={22} />;
  }
}

export default function AboutPage() {
  const page = getPageBySlug('about');
  const meta = page?.metadata || {};

  const badge = meta.badge || 'શ્રદ્ધાંજલિ';
  const pageTitle = page?.title || 'અમારા વિશે';
  const subtitle = meta.subtitle || 'શ્રદ્ધાંજલિ – એક ભાવનાત્મક પ્રયાસ';
  const content =
    page?.content ||
    'શ્રદ્ધાંજલિ એક એવી વેબસાઇટ છે, જે આપણા પ્રિયજનોની યાદોને જીવંત રાખવા, ભાવપૂર્વક સંદેશાઓ, શાયરી અને માહિતી દ્વારા લોકોને સહાય કરે છે.';
  const heroDescription =
    meta.heroDescription ||
    'અમારું લક્ષ્ય છે કે દરેક વ્યક્તિને પોતાના લાગણી વ્યક્ત કરવા માટે એક સુંદર, સરળ અને વિશ્વસનીય મંચ મળી રહે.';
  const heroImage = meta.heroImage || '/images/hero-candle.jpg';
  const heroImageAlt = meta.heroImageAlt || 'શ્રદ્ધાંજલિ ભાવનાત્મક દીવો';

  const valueCards =
    meta.valueCards && meta.valueCards.length > 0 ? meta.valueCards : DEFAULT_VALUE_CARDS;

  const journeyTitle = meta.journeyTitle || 'અમારી સફર';
  const journeyText =
    meta.journeyText ||
    'આ વેબસાઇટ એક નાના વિચારથી શરૂ થઈ હતી – કે કેટલીકવાર આપણા મનમાં હોય તેવી ભાવનાઓને શબ્દો મળતા નથી. ત્યારે અમે વિચાર્યું કે કેમ ન એક એવી જગ્યા બનાવીએ, જ્યાં લોકો સરળતાથી શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિનાં સંદેશ, શાયરી અને સંબંધિત માહિતી મેળવી શકે.\n\nઆજે, અમે સતત પ્રયત્નશીલ છીએ કે શ્રદ્ધાંજલિને એક વિશ્વસનીય અને ઉપયોગી પ્લેટફોર્મ બનાવી શકીએ, જ્યાં દરેક મુલાકાતી ને શાંતિ, સંવેદના અને સકારાત્મકતા મળે.';
  const missionQuote =
    meta.missionQuote || '“યાદો ક્યારેય મરતા નથી, એ હંમેશા હૃદયમાં જીવંત રહે છે.”';

  const teamTitle = meta.teamTitle || 'અમારી ટીમ';
  const teamSubtitle =
    meta.teamSubtitle ||
    'અમને આ કાર્યમાં મદદ કરનાર, પ્રેરણા આપનાર અને સાથ આપનાર તમામનો આભાર.';
  const teamMembers =
    meta.teamMembers && meta.teamMembers.length > 0
      ? meta.teamMembers
      : DEFAULT_TEAM_MEMBERS;

  const ctaHeading =
    meta.ctaHeading ||
    'અમારો હેતુ માત્ર માહિતી આપવાનો નથી, પણ એકબીજાના દુઃખમાં સાથ આપવાનો છે.';
  const ctaSubtitle =
    meta.ctaSubtitle || 'જો તમારી પાસે કોઈ પ્રશ્ન કે સૂચન હોય તો અમને જણાવો.';
  const ctaButtonText = meta.ctaButtonText || 'અમારો સંપર્ક કરો';
  const ctaButtonLink = meta.ctaButtonLink || '/contact';

  return (
    <div className="min-h-screen flex flex-col bg-[#061321] text-[#F4F6FA]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'હોમ', url: '/' },
            { label: pageTitle },
          ]}
        />

        {/* Hero Section */}
        <div className="mt-4 mb-14">
          <span className="text-gold font-bold tracking-widest text-sm uppercase">
            {badge}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 mb-3">
            {pageTitle}
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-gold mb-6">
            {subtitle}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-[#B9C6D6] leading-relaxed">
              <p><RichText content={content} /></p>
              {heroDescription && <p><RichText content={heroDescription} /></p>}
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#1C3A52] aspect-[16/10] bg-[#0B1D2D] shadow-2xl">
                <img
                  src={heroImage}
                  alt={heroImageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061321]/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {valueCards.map((card, idx) => (
            <div
              key={card.id || idx}
              className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#061321] border border-[#1C3A52] flex items-center justify-center mb-4 text-gold">
                {renderCardIcon(card.icon)}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-xs sm:text-sm text-[#B9C6D6] leading-relaxed">
                <RichText content={card.description} />
              </p>
            </div>
          ))}
        </div>

        {/* Our Journey & Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-8 bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-8 card-glow">
            <h3 className="text-2xl font-bold text-white mb-4">{journeyTitle}</h3>
            <div className="space-y-4 text-sm sm:text-base text-[#B9C6D6] leading-relaxed">
              {journeyText.split('\n\n').map((paragraph, index) => (
                <p key={index}><RichText content={paragraph} /></p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#0A1B2B] border border-[#1C3A52] rounded-2xl p-6 flex flex-col justify-center items-center text-center relative card-glow">
            <LotusIcon size={34} className="mb-4" />
            <p className="text-base sm:text-lg text-white font-medium italic leading-relaxed">
              {missionQuote}
            </p>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">{teamTitle}</h3>
            <p className="text-sm text-[#B9C6D6]">{teamSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={member.id || idx}
                className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold mb-4 shadow-md bg-[#142B40] flex items-center justify-center text-gold">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users size={32} />
                  )}
                </div>
                <h4 className="text-base font-bold text-white">{member.name}</h4>
                <p className="text-xs text-gold mb-2">{member.role}</p>
                <p className="text-xs text-[#B9C6D6] leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-[#0A1B2B] via-[#0B1D2D] to-[#0A1B2B] border border-[#1C3A52] rounded-3xl p-8 sm:p-10 text-center card-glow mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            {ctaHeading}
          </h3>
          <p className="text-sm text-[#B9C6D6] max-w-xl mx-auto mb-6">
            {ctaSubtitle}
          </p>
          <Link
            href={ctaButtonLink}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-[#ffd782] text-[#061321] font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg"
          >
            <span>{ctaButtonText}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
