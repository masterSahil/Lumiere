'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, Shield, ShieldCheck } from 'lucide-react';
import Loader from '@/app/loading';
import { toast } from 'sonner';

export default function ManageAdmins() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from an API route protected by superadmin role
    // For now, we simulate the UI
    setAdmins([
      { _id: '1', username: 'System Admin', email: 'admin@lumiere.com', role: 'superadmin', createdAt: new Date().toISOString() },
      { _id: '2', username: 'Store Manager', email: 'manager@lumiere.com', role: 'admin', createdAt: new Date().toISOString() },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 shrink-0">
        <div>
          <h1 className="font-serif text-[42px] leading-tight font-semibold text-white mb-2">Manage Admins</h1>
          <p className="text-gray-400 font-sans max-w-xl text-[15px] leading-relaxed">
            Control access and assign roles to platform administrators.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary-500 text-dark-bg px-6 py-3 rounded-full font-bold tracking-wider uppercase text-[13px] hover:bg-primary-400 transition-colors shadow-[0_0_20px_rgba(132,204,22,0.3)]">
          <Plus className="w-4 h-4" /> Add Admin
        </button>
      </div>

      <div className="bg-dark-surface rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-white/5 text-white uppercase font-semibold text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Admin</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center py-8"><Loader /></td></tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin._id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        {admin.role === 'superadmin' ? <ShieldCheck className="w-5 h-5 text-primary-400" /> : <Shield className="w-5 h-5 text-gray-400" />}
                      </div>
                      <div>
                        <p className="text-white font-medium">{admin.username}</p>
                        <p className="text-xs text-gray-500">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${admin.role === 'superadmin' ? 'bg-primary-500/20 text-primary-400' : 'bg-white/10 text-gray-300'}`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
