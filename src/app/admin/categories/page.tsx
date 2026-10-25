'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, FolderOpen, Save, CheckCircle2 } from 'lucide-react';
import { Category } from '@/lib/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCat, setEditingCat] = useState<Partial<Category> | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    slug: '',
    description: '',
    image: '/images/hero-candle.jpg',
    icon: 'Heart',
    order: 1,
  });
  const [message, setMessage] = useState('');

  const fetchCats = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleNameChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: prev.slug || val.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-'),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('કેટેગરી સફળતાપૂર્વક સેવ થઈ!');
        setFormData({
          name: '',
          slug: '',
          description: '',
          image: '/images/hero-candle.jpg',
          icon: 'Heart',
          order: categories.length + 1,
        });
        setEditingCat(null);
        fetchCats();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`શું તમે "${name}" કેટેગરી ડિલીટ કરવા માંગો છો?`)) return;
    try {
      await fetch('/api/admin/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchCats();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (cat: Category) => {
    setEditingCat(cat);
    setFormData(cat);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-5 border-b border-[#1C3A52]">
        <h1 className="text-2xl font-extrabold text-white">કેટેગરી મેનેજમેન્ટ (Categories)</h1>
        <p className="text-xs text-[#8495A9] mt-1">
          વેબસાઇટની મુખ્ય કેટેગરીઓ ઉમેરો અથવા સંપાદિત કરો.
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form: Add / Edit (5 cols) */}
        <div className="lg:col-span-5 bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 card-glow">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <FolderOpen size={16} className="text-gold" />
            <span>{editingCat ? 'કેટેગરી સંપાદિત કરો' : 'નવી કેટેગરી ઉમેરો'}</span>
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#B9C6D6] font-medium mb-1">
                કેટેગરીનું નામ (Name) <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="દા.ત. શ્રદ્ધાંજલિ સંદેશ..."
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#B9C6D6] font-medium mb-1">
                સ્લગ (Slug)
              </label>
              <input
                type="text"
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="shradhanjali"
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-gold font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#B9C6D6] font-medium mb-1">
                વર્ણન (Description)
              </label>
              <textarea
                rows={2}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="ટૂંકું વિવરણ..."
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl p-3 text-white focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[#B9C6D6] font-medium mb-1">
                ઇમેજ URL (Image)
              </label>
              <input
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#B9C6D6] font-medium mb-1">
                  આઇકન (Icon)
                </label>
                <select
                  value={formData.icon || 'Heart'}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="Heart">Heart</option>
                  <option value="Sparkles">Sparkles</option>
                  <option value="Feather">Feather</option>
                  <option value="BookOpen">BookOpen</option>
                  <option value="Scroll">Scroll</option>
                  <option value="Users">Users</option>
                </select>
              </div>

              <div>
                <label className="block text-[#B9C6D6] font-medium mb-1">
                  ક્રમ (Display Order)
                </label>
                <input
                  type="number"
                  value={formData.order || 1}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-gold hover:bg-[#ffd782] text-[#061321] font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Save size={14} />
                <span>{editingCat ? 'અપડેટ કરો' : 'કેટેગરી સેવ કરો'}</span>
              </button>

              {editingCat && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCat(null);
                    setFormData({
                      name: '',
                      slug: '',
                      description: '',
                      image: '/images/hero-candle.jpg',
                      icon: 'Heart',
                      order: categories.length + 1,
                    });
                  }}
                  className="px-3 py-2.5 bg-[#061321] border border-[#1C3A52] text-[#8495A9] rounded-xl hover:text-white"
                >
                  રદ કરો
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Categories Table (7 cols) */}
        <div className="lg:col-span-7 bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl overflow-hidden card-glow">
          <div className="p-4 border-b border-[#1C3A52] flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">હાલની કેટેગરીઝ ({categories.length})</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#061321]/60 text-[#8495A9] border-b border-[#1C3A52]">
                  <th className="py-3 px-4 font-semibold">ક્રમ</th>
                  <th className="py-3 px-4 font-semibold">નામ (Name)</th>
                  <th className="py-3 px-4 font-semibold">સ્લગ</th>
                  <th className="py-3 px-4 font-semibold text-right">ક્રિયા</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C3A52]/40">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#10263B]/50 transition-colors">
                    <td className="py-3 px-4 text-[#8495A9] font-mono">{cat.order}</td>
                    <td className="py-3 px-4 font-bold text-white">
                      {cat.name}
                      <span className="block text-[10px] text-[#8495A9] font-normal truncate max-w-[200px]">
                        {cat.description}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gold font-mono">{cat.slug}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(cat)}
                          className="p-1.5 rounded-lg bg-[#061321] hover:bg-[#142B40] text-gold border border-[#1C3A52]"
                          title="સંપાદિત કરો"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-1.5 rounded-lg bg-[#061321] hover:bg-[#EF4444]/20 text-[#EF4444] border border-[#1C3A52]"
                          title="ડિલીટ કરો"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
