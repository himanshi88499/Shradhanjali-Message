'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
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
        throw new Error(data.error || 'Failed to submit contact message.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-theme-card border border-theme rounded-2xl p-6 sm:p-8 card-glow transition-colors">
      <h3 className="text-xl font-bold text-theme-primary mb-2">Send a Message</h3>
      <p className="text-xs sm:text-sm text-theme-secondary mb-6">
        Please share your message or inquiry below. We will get back to you promptly.
      </p>

      {status === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-green-500/15 border border-green-500/30 text-green-500 flex items-center gap-3">
          <CheckCircle2 size={20} className="shrink-0" />
          <p className="text-sm">
            Your message has been sent successfully! Our team will respond shortly.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-500 flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-theme-secondary mb-1.5">
            Your Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full bg-theme-main border border-theme focus:border-gold rounded-xl px-4 py-3 text-sm text-theme-primary placeholder-theme-muted focus:outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-theme-secondary mb-1.5">
            Email Address <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full bg-theme-main border border-theme focus:border-gold rounded-xl px-4 py-3 text-sm text-theme-primary placeholder-theme-muted focus:outline-none transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-theme-secondary mb-1.5">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full bg-theme-main border border-theme focus:border-gold rounded-xl px-4 py-3 text-sm text-theme-primary placeholder-theme-muted focus:outline-none transition-colors"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-xs font-medium text-theme-secondary mb-1.5">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-theme-main border border-theme focus:border-gold rounded-xl px-4 py-3 text-sm text-theme-primary focus:outline-none transition-colors"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Memorial Message Suggestion">Memorial Message Suggestion</option>
            <option value="Correction or Update">Correction or Update</option>
            <option value="Editorial Contribution">Editorial Contribution</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-medium text-theme-secondary mb-1.5">
            Your Message <span className="text-gold">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            className="w-full bg-theme-main border border-theme focus:border-gold rounded-xl px-4 py-3 text-sm text-theme-primary placeholder-theme-muted focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Submit Button: Crisp black text on gold */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 bg-gold hover:bg-[#ffd782] disabled:opacity-50 text-black font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Send size={16} />
          <span>{loading ? 'Sending...' : 'Send Message'}</span>
        </button>
      </form>
    </div>
  );
};
