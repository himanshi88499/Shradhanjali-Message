import React from 'react';
import Link from 'next/link';
import { getPages } from '@/lib/db';
import { Edit2, ArrowUpRight, FileText, CheckCircle } from 'lucide-react';

export default function AdminPagesPage() {
  const pages = getPages();

  const getPageLiveUrl = (slug: string) => {
    switch (slug) {
      case 'home':
        return '/';
      case 'about':
        return '/about';
      case 'contact':
        return '/contact';
      case 'privacy-policy':
        return '/privacy-policy';
      case 'disclaimer':
        return '/disclaimer';
      case 'terms':
        return '/terms';
      default:
        return `/${slug}`;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-5 border-b border-[#1C3A52]">
        <h1 className="text-2xl font-extrabold text-white">પેજીસ મેનેજમેન્ટ (Pages)</h1>
        <p className="text-xs text-[#8495A9] mt-1">
          વેબસાઇટના સ્થિર અને માહિતીપ્રદ પૃષ્ઠોનું સંચાલન કરો.
        </p>
      </div>

      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl overflow-hidden card-glow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#061321]/60 text-[#8495A9] border-b border-[#1C3A52]">
                <th className="py-3.5 px-4 font-semibold">પેજ શીર્ષક (Title)</th>
                <th className="py-3.5 px-4 font-semibold">સ્લગ</th>
                <th className="py-3.5 px-4 font-semibold">સ્થિતિ</th>
                <th className="py-3.5 px-4 font-semibold">છેલ્લે અપડેટ</th>
                <th className="py-3.5 px-4 font-semibold text-right">ક્રિયા</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C3A52]/40">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-[#10263B]/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <FileText size={15} className="text-gold shrink-0" />
                    <span>{page.title}</span>
                  </td>
                  <td className="py-3 px-4 text-gold font-mono">/{page.slug}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                      પ્રકાશિત
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#8495A9]">
                    {new Date(page.updatedAt).toLocaleDateString('gu-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/pages/edit/${page.id}`}
                        className="p-1.5 rounded-lg bg-[#061321] hover:bg-[#142B40] text-gold border border-[#1C3A52]"
                        title="સંપાદિત કરો"
                      >
                        <Edit2 size={13} />
                      </Link>
                      <a
                        href={getPageLiveUrl(page.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#061321] hover:bg-[#142B40] text-[#B9C6D6] hover:text-white border border-[#1C3A52]"
                        title="લાઈવ જુઓ"
                      >
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
