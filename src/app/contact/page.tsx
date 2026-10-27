import React from 'react';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/ContactForm';
import { RichText } from '@/components/RichText';
import { getPageBySlug, getSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageBySlug('contact');
  return {
    title:
      page?.seoTitle ||
      `${page?.title || 'Contact Us'} | Shradhanjali Msg — We Are Here For You`,
    description:
      page?.seoDescription ||
      'Contact Shradhanjali Msg with any questions, tribute suggestions, or memorial guidance.',
    alternates: {
      canonical: '/contact',
    },
  };
}

export default function ContactPage() {
  const page = getPageBySlug('contact');
  const settings = getSettings();
  const meta = page?.metadata || {};

  const badge = meta.badge || 'Shradhanjali Msg';
  const pageTitle = page?.title || 'Contact Us';
  const subtitle = meta.subtitle || 'We Are Here To Support You';
  const content =
    page?.content ||
    'Whether you have an inquiry, feedback on memorial content, or wish to suggest a tribute message, please feel free to reach out to us.';
  const heroDescription =
    meta.heroDescription ||
    'Every message is important to our team, and we will get back to you as soon as possible.';
  const heroImage = meta.heroImage || '/images/lotus-water.jpg';
  const heroImageAlt = meta.heroImageAlt || 'Shradhanjali Memorial Lotus';

  const phoneTitle = meta.phoneTitle || 'Phone Assistance';
  const phoneNumber =
    meta.phoneNumber || settings.contactPhone || '+91 98765 43210';
  const phoneHours = meta.phoneHours || '(Mon - Sat, 9:00 AM - 6:00 PM)';

  const emailTitle = meta.emailTitle || 'Email Support';
  const emailAddress =
    meta.emailAddress || settings.contactEmail || 'support@shradhanjalimsg.com';
  const emailResponseTime =
    meta.emailResponseTime || '(Response within 24 hours)';

  const addressTitle = meta.addressTitle || 'Editorial Office';
  const addressText =
    meta.addressText ||
    settings.contactAddress ||
    'Ahmedabad, Gujarat, India - 380001';

  const quickChannelsTitle = meta.quickChannelsTitle || 'Quick Communication';
  const quickChannelsSubtitle =
    meta.quickChannelsSubtitle ||
    'You may also reach our team via social channels.';
  const whatsappButtonText =
    meta.whatsappButtonText || 'Connect on WhatsApp';
  const whatsappNumber =
    meta.whatsappNumber || settings.socials?.whatsappNumber || '919876543210';
  const whatsappMessage =
    meta.whatsappMessage || 'Hello, I am reaching out regarding Shradhanjali Msg.';
  const facebookButtonText =
    meta.facebookButtonText || 'Connect on Facebook';
  const facebookUrl =
    meta.facebookUrl || settings.socials?.facebook || 'https://facebook.com';

  return (
    <div className="min-h-screen flex flex-col bg-theme-main text-theme-primary transition-colors">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', url: '/' },
            { label: pageTitle },
          ]}
        />

        {/* Hero Section */}
        <div className="mt-4 mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-theme-primary mt-2 mb-3">
            {pageTitle}
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-gold mb-6">
            {subtitle}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-theme-secondary leading-relaxed">
              <p><RichText content={content} /></p>
              {heroDescription && <p><RichText content={heroDescription} /></p>}
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-theme aspect-[16/10] bg-theme-card shadow-xl">
                <img
                  src={heroImage}
                  alt={heroImageAlt}
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
              <h3 className="text-sm font-semibold text-theme-primary mb-1">
                {phoneTitle}
              </h3>
              <p className="text-base font-bold text-gold">{phoneNumber}</p>
              {phoneHours && (
                <p className="text-xs text-theme-muted mt-1">{phoneHours}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="bg-theme-card border border-theme rounded-2xl p-6 card-glow flex items-start gap-4 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-theme-surface border border-theme flex items-center justify-center shrink-0 text-gold">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-theme-primary mb-1">
                {emailTitle}
              </h3>
              <p className="text-base font-bold text-gold break-all">
                {emailAddress}
              </p>
              {emailResponseTime && (
                <p className="text-xs text-theme-muted mt-1">
                  {emailResponseTime}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="bg-theme-card border border-theme rounded-2xl p-6 card-glow flex items-start gap-4 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-theme-surface border border-theme flex items-center justify-center shrink-0 text-gold">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-theme-primary mb-1">
                {addressTitle}
              </h3>
              <p className="text-sm font-medium text-theme-secondary leading-snug">
                {addressText}
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
              <h3 className="text-base font-bold text-theme-primary mb-1">
                {quickChannelsTitle}
              </h3>
              <p className="text-xs text-theme-muted mb-4">
                {quickChannelsSubtitle}
              </p>

              <div className="space-y-3">
                <a
                  href={`https://api.whatsapp.com/send?phone=${encodeURIComponent(whatsappNumber)}&text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#128C7E] hover:bg-[#0f776a] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
                >
                  <MessageCircle size={18} />
                  <span>{whatsappButtonText}</span>
                </a>

                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1877F2] hover:bg-[#1567d3] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
                  >
                    <span>{facebookButtonText}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
