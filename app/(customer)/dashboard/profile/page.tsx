'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Dummy fetch for now
  useEffect(() => {
    // In prod: Fetch the current logged in user from /api/users/current
    setFormData({
      username: 'Guest User',
      phone: '+1 (555) 000-0000',
    });
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    
    // In prod: await axios.put(`/api/users/${userId}`, formData);
    setTimeout(() => {
      setLoading(false);
      setSuccess('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-12 max-w-2xl">
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="font-serif text-[48px] leading-tight font-semibold mb-2 text-white">Profile</h1>
            <p className="text-gray-400">Manage your personal details.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="bg-dark-surface p-8 rounded-2xl border border-white/10 space-y-6">
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Display Name</label>
            <input 
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-dark-bg border border-white/10 rounded-lg p-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-500 outline-none" 
              type="text" 
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
            <input 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-dark-bg border border-white/10 rounded-lg p-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-500 outline-none" 
              type="tel" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="bg-primary-500 text-dark-bg px-8 py-3 rounded-lg font-sans text-sm tracking-wider font-semibold hover:brightness-110 transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </section>
    </div>
  );
}
