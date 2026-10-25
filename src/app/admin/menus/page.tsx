'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Save, CheckCircle2 } from 'lucide-react';
import { MenuItem } from '@/lib/types';

export default function AdminMenusPage() {
  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
  const [footerMenu, setFooterMenu] = useState<MenuItem[]>([]);
  const [newLabel, setNewLabel] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [targetMenu, setTargetMenu] = useState<'header' | 'footer'>('header');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/menus')
      .then((res) => res.json())
      .then((data) => {
        if (data.header) setHeaderMenu(data.header);
        if (data.footer) setFooterMenu(data.footer);
      });
  }, []);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newUrl) return;

    const newItem: MenuItem = {
      id: `m-${Date.now()}`,
      label: newLabel.trim(),
      url: newUrl.trim(),
      order: (targetMenu === 'header' ? headerMenu.length : footerMenu.length) + 1,
    };

    if (targetMenu === 'header') {
      setHeaderMenu([...headerMenu, newItem]);
    } else {
      setFooterMenu([...footerMenu, newItem]);
    }

    setNewLabel('');
    setNewUrl('');
  };

  const handleRemove = (id: string, type: 'header' | 'footer') => {
    if (type === 'header') {
      setHeaderMenu(headerMenu.filter((m) => m.id !== id));
    } else {
      setFooterMenu(footerMenu.filter((m) => m.id !== id));
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down', type: 'header' | 'footer') => {
    const list = type === 'header' ? [...headerMenu] : [...footerMenu];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    // re-index order
    const updated = list.map((item, i) => ({ ...item, order: i + 1 }));

    if (type === 'header') setHeaderMenu(updated);
    else setFooterMenu(updated);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ header: headerMenu, footer: footerMenu }),
      });
      if (res.ok) {
        setMessage('મેનુ સેટિંગ્સ સફળતાપૂર્વક સેવ થઈ ગઈ!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C3A52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white">મેનુ મેનેજમેન્ટ (Menu Editor)</h1>
          <p className="text-xs text-[#8495A9] mt-1">
            હેડર અને ફૂટર નેવિગેશન લિંક્સનું સંચાલન કરો.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-[#ffd782] disabled:opacity-50 text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md self-start sm:self-auto"
        >
          <Save size={15} />
          <span>{saving ? 'સેવ થઈ રહ્યું છે...' : 'તમામ ફેરફારો સેવ કરો'}</span>
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </div>
      )}

      {/* Add Item Form */}
      <form
        onSubmit={handleAddItem}
        className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow flex flex-col md:flex-row items-center gap-3 text-xs"
      >
        <div className="w-full md:w-40">
          <select
            value={targetMenu}
            onChange={(e) => setTargetMenu(e.target.value as any)}
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2.5 text-white focus:outline-none"
          >
            <option value="header">હેડર મેનુ (Header)</option>
            <option value="footer">ફૂટર મેનુ (Footer)</option>
          </select>
        </div>

        <div className="w-full md:flex-1">
          <input
            type="text"
            required
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="લિંકનું નામ (દા.ત. શ્રદ્ધાંજલિ સંદેશ)..."
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2.5 text-white focus:outline-none"
          />
        </div>

        <div className="w-full md:flex-1">
          <input
            type="text"
            required
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="URL (દા.ત. /category/shradhanjali)..."
            className="w-full bg-[#061321] border border-[#1C3A52] focus:border-gold rounded-xl px-3 py-2.5 text-white focus:outline-none font-mono"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2.5 bg-[#142B40] hover:bg-[#1A3854] text-gold border border-gold/40 rounded-xl font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus size={14} />
          <span>લિંક ઉમેરો</span>
        </button>
      </form>

      {/* 2-Columns: Header Menu & Footer Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Header Menu List */}
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
          <h2 className="text-sm font-bold text-white mb-3">હેડર મેનુ લિંક્સ ({headerMenu.length})</h2>
          <div className="space-y-2">
            {headerMenu.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 bg-[#061321] border border-[#1C3A52] rounded-xl text-xs"
              >
                <div>
                  <span className="font-semibold text-white mr-2">{item.label}</span>
                  <span className="text-[10px] text-gold font-mono">{item.url}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up', 'header')}
                    className="p-1 text-[#8495A9] hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    type="button"
                    disabled={idx === headerMenu.length - 1}
                    onClick={() => handleMove(idx, 'down', 'header')}
                    className="p-1 text-[#8495A9] hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id, 'header')}
                    className="p-1 text-[#8495A9] hover:text-[#EF4444]"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Menu List */}
        <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-5 card-glow">
          <h2 className="text-sm font-bold text-white mb-3">ફૂટર મેનુ લિંક્સ ({footerMenu.length})</h2>
          <div className="space-y-2">
            {footerMenu.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 bg-[#061321] border border-[#1C3A52] rounded-xl text-xs"
              >
                <div>
                  <span className="font-semibold text-white mr-2">{item.label}</span>
                  <span className="text-[10px] text-gold font-mono">{item.url}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up', 'footer')}
                    className="p-1 text-[#8495A9] hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    type="button"
                    disabled={idx === footerMenu.length - 1}
                    onClick={() => handleMove(idx, 'down', 'footer')}
                    className="p-1 text-[#8495A9] hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id, 'footer')}
                    className="p-1 text-[#8495A9] hover:text-[#EF4444]"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
