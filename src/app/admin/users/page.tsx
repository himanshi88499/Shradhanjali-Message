import React from 'react';
import { getUsers } from '@/lib/db';
import { Users as UsersIcon, Shield, CheckCircle } from 'lucide-react';

export default function AdminUsersPage() {
  const users = getUsers();

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="pb-5 border-b border-[#1C3A52]">
        <h1 className="text-2xl font-extrabold text-white">યુઝર્સ અને રોલ (User & Role Management)</h1>
        <p className="text-xs text-[#8495A9] mt-1">
          એડમિનિસ્ટ્રેટર, એડિટર, લેખક અને સબ્સ્ક્રાઇબર રોલ્સનું સંચાલન.
        </p>
      </div>

      <div className="bg-[#0B1D2D] border border-[#1C3A52] rounded-2xl overflow-hidden card-glow">
        <div className="p-4 border-b border-[#1C3A52] flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <UsersIcon size={16} className="text-gold" />
            <span>નોંધાયેલા વપરાશકર્તાઓ ({users.length})</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#061321]/60 text-[#8495A9] border-b border-[#1C3A52]">
                <th className="py-3 px-4 font-semibold">નામ</th>
                <th className="py-3 px-4 font-semibold">ઇમેઇલ</th>
                <th className="py-3 px-4 font-semibold">રોલ (Role)</th>
                <th className="py-3 px-4 font-semibold">નોંધણી તારીખ</th>
                <th className="py-3 px-4 font-semibold text-right">સ્થિતિ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C3A52]/40">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#10263B]/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#142B40] text-gold border border-gold/30 flex items-center justify-center font-bold text-xs">
                      {u.name.charAt(0)}
                    </div>
                    <span>{u.name}</span>
                  </td>
                  <td className="py-3 px-4 text-[#B9C6D6] font-mono">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/15 text-gold border border-gold/30">
                      <Shield size={10} />
                      <span>{u.role.toUpperCase()}</span>
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
                    <span className="inline-flex items-center gap-1 text-[#22C55E] text-[11px] font-semibold">
                      <CheckCircle size={12} /> સક્રિય (Active)
                    </span>
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
