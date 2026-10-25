import React from 'react';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/ContactForm';
import { getSettings } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Contact Us | Shradhanjali Msg — We Are Here For You',
  description:
    'Contact Shradhanjali Msg with any questions, tribute suggestions, or memorial guidance.',
};

export default function ContactPage() {
  const settings = getSettings();

  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', url: '/' },
            { label: 'Contact Us' },
          ]}
        />

        {/* Hero Section */}
        <div className="mt-4 mb-12">
          <span className="text-gold font-bold tracking-widest text-xs sm:text-sm uppercase">
            Shradhanjali Msg
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-primary mt-2 mb-3">
            Contact Us
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-gold mb-6">
            We Are Here To Support You
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-theme-secondary leading-relaxed">
              <p>
                Whether you have an inquiry, feedback on memorial content, or wish to suggest a tribute message, please feel free to reach out to us.
              </p>
              <p>
                Every message is important to our team, and we will get back to you as soon as possible.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-theme aspect-[16/10] bg-theme-card shadow-xl">
                <img
                  src="/images/lotus-water.jpg"
                  alt="Shradhanjali Memorial Lotus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone */}
          <div className="bg-theme-card border border-theme rounded-2xl p-6 card-glow flex items-start gap-4 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-theme-surface border border-theme flex items-center justify-center shrink-0 text-gold">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-theme-primary mb-1">Phone Assistance</h3>
              <p className="text-base font-bold text-gold">{settings.contactPhone}</p>
              <p className="text-xs text-theme-muted mt-1">(Mon - Sat, 9:00 AM - 6:00 PM)</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-theme-card border border-theme rounded-2xl p-6 card-glow flex items-start gap-4 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-theme-surface border border-theme flex items-center justify-center shrink-0 text-gold">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-theme-primary mb-1">Email Support</h3>
              <p className="text-base font-bold text-gold break-all">{settings.contactEmail}</p>
              <p className="text-xs text-theme-muted mt-1">(Response within 24 hours)</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-theme-card border border-theme rounded-2xl p-6 card-glow flex items-start gap-4 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-theme-surface border border-theme flex items-center justify-center shrink-0 text-gold">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-theme-primary mb-1">Editorial Office</h3>
              <p className="text-sm font-medium text-theme-secondary leading-snug">
                {settings.contactAddress}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Main Section: Form & Quick Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-theme-card border border-theme rounded-2xl p-6 card-glow transition-colors">
              <h3 className="text-base font-bold text-theme-primary mb-1">Quick Communication</h3>
              <p className="text-xs text-theme-muted mb-4">
                You may also reach our team via social channels.
              </p>

              <div className="space-y-3">
                <a
                  href={`https://api.whatsapp.com/send?phone=${settings.socials.whatsappNumber || '919876543210'}&text=${encodeURIComponent('Hello, I am reaching out regarding Shradhanjali Msg.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#128C7E] hover:bg-[#0f776a] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
                >
                  <MessageCircle size={18} />
                  <span>Connect on WhatsApp</span>
                </a>

                <a
                  href={settings.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1877F2] hover:bg-[#1567d3] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
                >
                  <span>Connect on Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
