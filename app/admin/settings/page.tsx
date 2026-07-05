'use client'
import { useState } from 'react';
import { User, Lock, Bell, Users } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif text-white">Settings</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <User className="w-5 h-5" /> Profile
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Lock className="w-5 h-5" /> Security
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('staff')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'staff' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Users className="w-5 h-5" /> Manage Staff
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-dark-surface rounded-2xl border border-white/10 p-8">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-white border-b border-white/10 pb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                  <input type="text" defaultValue="Manager" className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                  <input type="email" defaultValue="admin@lumiere.com" className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500" />
                </div>
                <button className="bg-primary-500 text-dark-bg px-6 py-2 rounded-lg font-bold hover:brightness-110">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-white border-b border-white/10 pb-4">Security</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500" />
                </div>
                <button className="bg-primary-500 text-dark-bg px-6 py-2 rounded-lg font-bold hover:brightness-110">Update Password</button>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-white border-b border-white/10 pb-4">Notifications</h2>
              <div className="space-y-4">
                <p className="text-gray-400">Notification settings will be available soon.</p>
              </div>
            </div>
          )}

          {activeTab === 'staff' && (
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-white border-b border-white/10 pb-4">Manage Staff</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-dark-bg p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-bold">Jean Luc</p>
                      <p className="text-gray-500 text-xs">Executive Chef</p>
                    </div>
                  </div>
                  <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded">Admin</span>
                </div>
                <button className="w-full border border-dashed border-white/20 text-gray-400 py-3 rounded-lg hover:border-primary-500 hover:text-primary-500 transition-colors">
                  + Add New Staff Member
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
