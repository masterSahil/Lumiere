'use client'
import { useState } from 'react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@lumiere.com',
    phone: '+1 (555) 123-4567'
  });

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-8">
          <h1 className="font-serif text-[48px] leading-tight font-semibold mb-2 text-white">Account Settings</h1>
          <p className="text-gray-400">Manage your personal information and account security.</p>
        </div>

        <div className="bg-dark-surface rounded-2xl border border-white/10 p-8">
          <h2 className="text-2xl font-serif text-white mb-6">Personal Information</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">First Name</label>
                <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">Last Name</label>
                <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">Email Address</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
              <button type="button" className="bg-primary-500 text-dark-bg px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors shadow-[0_0_15px_rgba(132,204,22,0.3)]">
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="bg-dark-surface rounded-2xl border border-white/10 p-8 mt-8">
          <h2 className="text-2xl font-serif text-white mb-6">Security</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <p className="text-white font-medium mb-1">Change Password</p>
              <p className="text-sm text-gray-400">Update your password to keep your account secure.</p>
            </div>
            <button className="px-6 py-2 rounded-lg border border-white/10 text-white hover:border-white/30 hover:bg-white/5 transition-all">
              Update Password
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6">
            <div>
              <p className="text-red-400 font-medium mb-1">Delete Account</p>
              <p className="text-sm text-gray-400">Permanently remove your account and all associated data.</p>
            </div>
            <button className="px-6 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
