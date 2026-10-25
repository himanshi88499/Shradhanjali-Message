'use client';

import React, { useState, useEffect } from 'react';
import {
  Users as UsersIcon,
  Shield,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  X,
  Search,
  Lock,
  Mail,
  User as UserIcon,
  AlertCircle,
} from 'lucide-react';
import { User } from '@/lib/types';

type SafeUser = Omit<User, 'passwordHash'>;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SafeUser | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'author' as 'admin' | 'editor' | 'author' | 'subscriber',
    bio: '',
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setUsers(data);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'author',
      bio: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user: SafeUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      bio: user.bio || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (!editingUser && (!formData.password || formData.password.length < 6)) {
      setMessage({ text: 'નવા યુઝર માટે ઓછામાં ઓછો 6 અક્ષરનો પાસવર્ડ જરૂરી છે.', type: 'error' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        bio: formData.bio,
      };

      if (editingUser) {
        payload.id = editingUser.id;
      }
      if (formData.password) {
        payload.password = formData.password;
      }

      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ text: data.message || 'સફળતાપૂર્વક સાચવવામાં આવ્યું!', type: 'success' });
        closeModal();
        fetchUsers();
        setTimeout(() => setMessage(null), 3500);
      } else {
        setMessage({ text: data.error || 'સેવ કરવામાં ભૂલ આવી.', type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'સર્વર એરર આવી.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user: SafeUser) => {
    if (!window.confirm(`શું તમે ખરેખર "${user.name}" (${user.email}) યુઝરને ડિલીટ કરવા માંગો છો?`)) {
      return;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ text: data.message || 'યુઝર ડિલીટ થયો.', type: 'success' });
        fetchUsers();
        setTimeout(() => setMessage(null), 3500);
      } else {
        alert(data.error || 'ડિલીટ નિષ્ફળ ગયું.');
      }
    } catch (err) {
      console.error(err);
      alert('ડિલીટ કરવામાં એરર આવી.');
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-gold/15 text-gold border-gold/40';
      case 'editor':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'author':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      default:
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1C3A52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            યુઝર્સ અને રોલ (User & Role Management)
          </h1>
          <p className="text-xs text-[#8495A9] mt-1">
            એડમિનિસ્ટ્રેટર, એડિટર, લેખક અને સબ્સ્ક્રાઇબર રોલ્સનું સંપૂર્ણ સંચાલન.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold hover:bg-[#ffd782] text-[#061321] text-xs font-bold rounded-xl transition-all shadow-md self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>નવો યુઝર ઉમેરો</span>
        </button>
      </div>

      {/* Toast Notification */}
      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs font-medium flex items-center justify-between animate-fade-in ${
            message.type === 'success'
              ? 'bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E]'
              : 'bg-red-500/15 border border-red-500/30 text-red-400'
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="p-1 hover:opacity-75">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Search and Table Box */}
      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl overflow-hidden card-glow">
        <div className="p-4 border-b border-[#1C3A52] flex flex-col sm:flex-row items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 self-start sm:self-auto">
            <UsersIcon size={16} className="text-gold" />
            <span>નોંધાયેલા વપરાશકર્તાઓ ({filteredUsers.length})</span>
          </h2>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8495A9]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="શોધો નામ, ઇમેઇલ, રોલ..."
              className="w-full bg-[#061321] text-white text-xs pl-8 pr-3 py-1.5 rounded-xl border border-[#1C3A52] focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#061321]/60 text-[#8495A9] border-b border-[#1C3A52]">
                <th className="py-3 px-4 font-semibold">વપરાશકર્તા</th>
                <th className="py-3 px-4 font-semibold">ઇમેઇલ</th>
                <th className="py-3 px-4 font-semibold">રોલ (Role)</th>
                <th className="py-3 px-4 font-semibold">નોંધણી તારીખ</th>
                <th className="py-3 px-4 font-semibold text-right">ક્રિયા</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C3A52]/40">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#10263B]/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#142B40] text-gold border border-gold/30 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{u.name}</div>
                      {u.bio && (
                        <div className="text-[10px] text-[#8495A9] line-clamp-1 max-w-xs font-normal">
                          {u.bio}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#B9C6D6] font-mono text-xs">{u.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getRoleBadge(
                        u.role
                      )}`}
                    >
                      <Shield size={10} />
                      <span className="uppercase">{u.role}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#8495A9]">
                    {new Date(u.createdAt).toLocaleDateString('gu-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      <button
                        type="button"
                        onClick={() => openEditModal(u)}
                        className="p-1.5 rounded-lg bg-[#061321] hover:bg-[#10263B] text-gold border border-[#1C3A52] hover:border-gold/40 transition-colors"
                        title="એડિટ કરો"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(u)}
                        className="p-1.5 rounded-lg bg-[#061321] hover:bg-red-500/20 text-red-400 border border-[#1C3A52] hover:border-red-500/40 transition-colors"
                        title="ડિલીટ કરો"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#8495A9]">
                    કોઈ વપરાશકર્તા મળ્યો નથી.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1C3A52]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserIcon size={18} className="text-gold" />
                <span>{editingUser ? 'યુઝર એડિટ કરો' : 'નવો યુઝર ઉમેરો'}</span>
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-lg text-[#8495A9] hover:text-white hover:bg-[#10263B]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              {/* Name */}
              <div>
                <label className="block text-[#B9C6D6] font-semibold mb-1">પૂરું નામ *</label>
                <div className="relative">
                  <UserIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8495A9]" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="દા.ત. રમેશભાઈ પટેલ"
                    className="w-full bg-[#061321] text-white pl-9 pr-3 py-2 rounded-xl border border-[#1C3A52] focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#B9C6D6] font-semibold mb-1">ઇમેઇલ એડ્રેસ *</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8495A9]" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@shradhanjali.in"
                    className="w-full bg-[#061321] text-white pl-9 pr-3 py-2 rounded-xl border border-[#1C3A52] focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-[#B9C6D6] font-semibold mb-1">રોલ (Role / પરમિશન) *</label>
                <div className="relative">
                  <Shield size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8495A9]" />
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as 'admin' | 'editor' | 'author' | 'subscriber',
                      })
                    }
                    className="w-full bg-[#061321] text-white pl-9 pr-3 py-2 rounded-xl border border-[#1C3A52] focus:outline-none focus:border-gold cursor-pointer"
                  >
                    <option value="admin">Administrator (સંપૂર્ણ સંચાલન)</option>
                    <option value="editor">Editor (લેખો અને કેટેગરીઝ સંચાલન)</option>
                    <option value="author">Author (પોતાના લેખો લખવા)</option>
                    <option value="subscriber">Subscriber (માત્ર વાંચક)</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[#B9C6D6] font-semibold mb-1">
                  પાસવર્ડ {editingUser ? '(બદલવો હોય તો જ દાખલ કરો)' : '*'}
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8495A9]" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={editingUser ? 'નવો પાસવર્ડ (ઓપ્શનલ)' : 'ન્યૂનતમ 6 અક્ષર'}
                    minLength={editingUser ? 0 : 6}
                    required={!editingUser}
                    className="w-full bg-[#061321] text-white pl-9 pr-3 py-2 rounded-xl border border-[#1C3A52] focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-[#B9C6D6] font-semibold mb-1">ટૂંકો પરિચય (Bio)</label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="યુઝર વિશે ટૂંકી નોંધ..."
                  className="w-full bg-[#061321] text-white p-2.5 rounded-xl border border-[#1C3A52] focus:outline-none focus:border-gold resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C3A52]">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl border border-[#1C3A52] text-[#B9C6D6] hover:bg-[#10263B] transition-colors"
                >
                  રદ કરો
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-gold hover:bg-[#ffd782] disabled:opacity-50 text-[#061321] font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  {saving ? 'સાચવી રહ્યું છે...' : editingUser ? 'અપડેટ કરો' : 'ઉમેરો'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
