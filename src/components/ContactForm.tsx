'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'સામાન્ય પૂછપરછ',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'સંદેશ મોકલવામાં નિષ્ફળતા મળી.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'સામાન્ય પૂછપરછ',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'કંઈક ખોટું થયું.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 sm:p-8 card-glow">
      <h3 className="text-xl font-bold text-white mb-2">સંદેશ મોકલો</h3>
      <p className="text-xs sm:text-sm text-[#B9C6D6] mb-6">
        તમારો સંદેશ અહીં લખો, અમે જરૂર સંપર્ક કરીશું.
      </p>

      {status === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] flex items-center gap-3">
          <CheckCircle2 size={20} className="shrink-0" />
          <p className="text-sm">
            તમારો સંદેશ સફળતાપૂર્વક મોકલવામાં આવ્યો છે! અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/40 text-[#EF4444] flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
            તમારું નામ <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="તમારું નામ લખો"
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-3 text-sm text-white placeholder-[#8495A9] focus:outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
            ઇમેઇલ એડ્રેસ <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="તમારી ઇમેઇલ એડ્રેસ લખો"
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-3 text-sm text-white placeholder-[#8495A9] focus:outline-none transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
            મોબાઇલ નંબર (વૈકલ્પિક)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="તમારો મોબાઇલ નંબર લખો"
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-3 text-sm text-white placeholder-[#8495A9] focus:outline-none transition-colors"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
            વિષય પસંદ કરો
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-3 text-sm text-white placeholder-[#8495A9] focus:outline-none transition-colors"
          >
            <option value="સામાન્ય પૂછપરછ">સામાન્ય પૂછપરછ</option>
            <option value="કન્ટેન્ટ સંબંધિત સૂચન">કન્ટેન્ટ સંબંધિત સૂચન</option>
            <option value="ટેકનિકલ સહાય">ટેકનિકલ સહાય</option>
            <option value="અન્ય">અન્ય</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-medium text-[#B9C6D6] mb-1.5">
            તમારો સંદેશ <span className="text-gold">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="તમારો સંદેશ લખો..."
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-4 py-3 text-sm text-white placeholder-[#8495A9] focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 bg-gold hover:bg-[#ffd782] disabled:opacity-50 text-[#061321] font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Send size={16} />
          <span>{loading ? 'મોકલી રહ્યાં છીએ...' : 'સંદેશ મોકલો'}</span>
        </button>
      </form>
    </div>
  );
};
