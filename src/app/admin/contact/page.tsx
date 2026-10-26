import React from 'react';
import { getContactSubmissions } from '@/lib/db';
import { Mail, Phone, Calendar } from 'lucide-react';

export default function AdminContactSubmissionsPage() {
  const submissions = getContactSubmissions();

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="pb-5 border-b border-[#1C3A52]">
        <h1 className="text-2xl font-extrabold text-white">
          Contact Messages
        </h1>
        <p className="text-xs text-[#8495A9] mt-1">
          Visitor inquiries and messages submitted via the Contact form. (Total: {submissions.length})
        </p>
      </div>

      <div className="space-y-4">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1C3A52]/60">
              <div>
                <span className="text-base font-bold text-white mr-2">{sub.name}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30">
                  {sub.subject}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8495A9]">
                <Calendar size={13} />
                <span>
                  {new Date(sub.createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#B9C6D6]">
              <div className="flex items-center gap-1.5">
                <Mail size={13} className="text-gold" />
                <a href={`mailto:${sub.email}`} className="hover:underline text-white">
                  {sub.email}
                </a>
              </div>
              {sub.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone size={13} className="text-gold" />
                  <a href={`tel:${sub.phone}`} className="hover:underline text-white">
                    {sub.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="bg-[#061321] border border-[#1C3A52] rounded-xl p-4 text-xs sm:text-sm text-[#F4F6FA] leading-relaxed whitespace-pre-line">
              {sub.message}
            </div>
          </div>
        ))}

        {submissions.length === 0 && (
          <div className="text-center py-12 bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl text-[#8495A9]">
            No contact submissions yet.
          </div>
        )}
      </div>
    </div>
  );
}
