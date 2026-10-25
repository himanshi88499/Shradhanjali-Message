import React from 'react';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageCircle, Send, Plus, ChevronDown, Heart } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/ContactForm';
import { LotusIcon } from '@/components/LotusLogo';
import { getSettings } from '@/lib/db';
import { FaqAccordion } from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'સંપર્ક કરો | શ્રદ્ધાંજલિ - અમે તમારા માટે છીએ',
  description: 'શ્રદ્ધાંજલિ પોર્ટલનો સંપર્ક કરો. કોઈપણ પ્રશ્ન, સૂચન અથવા માર્ગદર્શન માટે ઇમેઇલ, ફોન અથવા સંદેશ ફોર્મ દ્વારા અમારો સંપર્ક કરો.',
};

export default function ContactPage() {
  const settings = getSettings();

  return (
    <div className="min-h-screen flex flex-col bg-[#061321] text-[#F4F6FA]">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'હોમ', url: '/' },
            { label: 'સંપર્ક' },
          ]}
        />

        {/* Hero Section */}
        <div className="mt-4 mb-12">
          <span className="text-gold font-bold tracking-widest text-sm uppercase">
            શ્રદ્ધાંજલિ
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 mb-3">
            સંપર્ક કરો
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-gold mb-6">
            અમારો સંપર્ક કરો – અમે તમારા માટે છીએ
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-[#B9C6D6] leading-relaxed">
              <p>
                તમને કોઈ પ્રશ્ન હોય, સૂચન આપવું હોય કે સાઈટ અંગે કોઈ પણ માહિતી જોઈતી હોય, તો નિઃસંકોચ અમારો સંપર્ક કરો.
              </p>
              <p>
                તમારો સંદેશ અમને ખૂબ જ મહત્વનો છે અને અમે વહેલામાં વહેલી તકે પ્રત્યુત્તર આપીશું.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#1C3A52] aspect-[16/10] bg-[#0B1D2D] shadow-2xl">
                <img
                  src="/images/lotus-water.jpg"
                  alt="શ્રદ્ધાંજલિ પવિત્ર કમળ સંપર્ક"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061321]/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#061321] border border-[#1C3A52] flex items-center justify-center shrink-0 text-gold">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">મોબાઇલ નંબર</h3>
              <p className="text-base font-bold text-gold">{settings.contactPhone}</p>
              <p className="text-xs text-[#8495A9] mt-1">(સોમ - શનિ, સવારે 9 થી સાંજે 6)</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#061321] border border-[#1C3A52] flex items-center justify-center shrink-0 text-gold">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">ઇમેઇલ એડ્રેસ</h3>
              <p className="text-base font-bold text-gold break-all">{settings.contactEmail}</p>
              <p className="text-xs text-[#8495A9] mt-1">(24 કલાકમાં જવાબ આપવાનો પ્રયત્ન)</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#061321] border border-[#1C3A52] flex items-center justify-center shrink-0 text-gold">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">અમારું સરનામું</h3>
              <p className="text-sm font-medium text-[#B9C6D6] leading-snug">
                {settings.contactAddress}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Main Section: Form (Left) & Quick Contact / FAQ / Quote (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Quick Contact, FAQ, Quote (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* ઝડપી સંપર્ક (Quick Contact Buttons) */}
            <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow">
              <h3 className="text-base font-bold text-white mb-1">ઝડપી સંપર્ક</h3>
              <p className="text-xs text-[#8495A9] mb-4">
                તમે નીચેના માધ્યમથી પણ અમારો સંપર્ક કરી શકો છો.
              </p>

              <div className="space-y-3">
                <a
                  href={`https://api.whatsapp.com/send?phone=${settings.socials.whatsappNumber || '919876543210'}&text=${encodeURIComponent('નમસ્કાર, મારે શ્રદ્ધાંજલિ પોર્ટલ બાબતે વાત કરવી છે.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#128C7E] hover:bg-[#0f776a] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp પર સંપર્ક કરો</span>
                </a>

                <a
                  href={settings.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1877F2] hover:bg-[#1567d3] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
                >
                  <span>Facebook પર સંપર્ક કરો</span>
                </a>

                <a
                  href={settings.socials.telegram || 'https://t.me'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#2AABEE] hover:bg-[#2297d4] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
                >
                  <Send size={18} />
                  <span>Telegram પર જોડાઓ</span>
                </a>
              </div>
            </div>

            {/* ઝડપી પ્રશ્નો (FAQ Accordion) */}
            <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow">
              <h3 className="text-base font-bold text-white mb-4">ઝડપી પ્રશ્નો (FAQ)</h3>
              <FaqAccordion />
            </div>

            {/* Quote Card */}
            <div className="bg-[#0A1B2B] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow">
              <div className="flex justify-center mb-3">
                <LotusIcon size={28} />
              </div>
              <p className="text-sm font-medium text-white italic leading-relaxed">
                &ldquo;દરેક સંદેશમાં છે એક નવી આશા, એક નવી યાદે...&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Bottom 3 Banner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 1: અમારી સાથે જોડાઓ */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center justify-center">
            <LotusIcon size={24} className="mb-3" />
            <h4 className="text-base font-bold text-white mb-1.5">અમારી સાથે જોડાઓ</h4>
            <p className="text-xs text-[#B9C6D6] leading-relaxed">
              સામાજિક માધ્યમ પર જોડાઈ અમારા અપડેટ્સ મેળવો.
            </p>
          </div>

          {/* 2: અમને લખો */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center justify-center">
            <Mail size={24} className="text-gold mb-3" />
            <h4 className="text-base font-bold text-white mb-1.5">અમને લખો</h4>
            <p className="text-xs text-[#B9C6D6] leading-relaxed">
              તમારો સવાલ, સૂચન અથવા ફીડબેક અમને મોકલો.
            </p>
          </div>

          {/* 3: અમારો હેતુ */}
          <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 text-center card-glow flex flex-col items-center justify-center">
            <Heart size={24} className="text-gold mb-3" />
            <h4 className="text-base font-bold text-white mb-1.5">અમારો હેતુ</h4>
            <p className="text-xs text-[#B9C6D6] leading-relaxed">
              દરેક વ્યક્તિ સુધી સકારાત્મક અને સંવેદનશીલ સંદેશ પહોંચાડવો.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
