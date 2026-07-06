'use client'
import { useState } from 'react';
import { Save, ShieldAlert, Database, Globe } from 'lucide-react';
import { toast } from 'sonner';

export default function PlatformSettings() {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Platform settings updated successfully");
    }, 800);
  };

  return (
    <div className="max-w-4xl w-full">
      <div className="mb-10">
        <h1 className="font-serif text-[42px] font-semibold text-white mb-2">Platform Settings</h1>
        <p className="text-gray-400 font-sans text-[15px] leading-relaxed">
          Configure global system preferences and security protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-dark-surface p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2">
            <Globe className="w-5 h-5 text-primary-400" />
            <h3 className="font-serif text-xl text-white">Site Configuration</h3>
          </div>
          
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Maintenance Mode</label>
            <div className="flex items-center justify-between bg-dark-bg border border-white/10 rounded-lg p-4">
              <div>
                <p className="text-white text-sm font-medium">Enable Maintenance</p>
                <p className="text-xs text-gray-500 mt-1">Suspend customer access temporarily</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
          
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Global Tax Rate (%)</label>
            <input type="number" defaultValue="8.5" className="w-full bg-dark-bg border border-white/10 text-white rounded-md px-4 py-3 outline-none" />
          </div>
        </div>

        <div className="bg-dark-surface p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2">
            <ShieldAlert className="w-5 h-5 text-primary-400" />
            <h3 className="font-serif text-xl text-white">Security Policies</h3>
          </div>
          
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Session Timeout (Minutes)</label>
            <input type="number" defaultValue="120" className="w-full bg-dark-bg border border-white/10 text-white rounded-md px-4 py-3 outline-none" />
          </div>
          
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Strict IP Binding</label>
            <div className="flex items-center justify-between bg-dark-bg border border-white/10 rounded-lg p-4">
              <div>
                <p className="text-white text-sm font-medium">Require Static IP</p>
                <p className="text-xs text-gray-500 mt-1">For Admin & Super Admin accounts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2 bg-primary-400 text-[#0d1700] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-primary-300 hover:shadow-[0_0_25px_rgba(158,233,57,0.4)] transition-all duration-300"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
}
