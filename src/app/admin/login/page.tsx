'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LotusLogo } from '@/components/LotusLogo';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@shradhanjali.in');
  const [password, setPassword] = useState('Admin@12345');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'લૉગિન નિષ્ફળ ગયું.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'અમાન્ય પ્રમાણપત્ર');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#061321] px-4 py-12">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <LotusLogo size="lg" />
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-4">
            વ્યવસ્થાપક લૉગિન
          </h1>
          <p className="text-xs text-[#8495A9] mt-1">
            શ્રદ્ધાંજલિ પોર્ટલ CMS એડમિન પેનલ
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-3xl p-7 sm:p-8 card-glow shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                ઇમેઇલ એડ્રેસ
              </label>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-3.5 text-[#8495A9]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  placeholder="admin@shradhanjali.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
                પાસવર્ડ
              </label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-3.5 text-[#8495A9]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-gold hover:bg-[#ffd782] disabled:opacity-50 text-[#061321] font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>{loading ? 'ચકાસણી ચાલુ છે...' : 'લૉગિન કરો'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Initial Demo Credentials Info */}
          <div className="mt-6 pt-5 border-t border-[#1C3A52]/70 text-center">
            <p className="text-[11px] text-[#8495A9] mb-1 font-medium">પ્રારંભિક એડમિન વિગતો (Demo Credentials):</p>
            <div className="bg-[#061321] p-2 rounded-lg text-xs font-mono text-[#FFD782] border border-[#1C3A52]">
              <div>ઇમેઇલ: admin@shradhanjali.in</div>
              <div>પાસવર્ડ: Admin@12345</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-xs text-[#8495A9] hover:text-gold transition-colors">
            ← વેબસાઇટ પર પાછા જાઓ
          </a>
        </div>
      </div>
    </div>
  );
}
