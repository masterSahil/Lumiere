'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/verify');
        if (data.success) {
          setUser(data.data);
          setFormData({
            username: data.data.username || '',
            phone: data.data.phone || '',
          });
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setSuccess('');
    setError('');
    
    try {
      const res = await axios.put(`/api/users/${user._id}`, formData);
      if (res.data.success) {
        setSuccess('Profile updated successfully!');
        setUser(res.data.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
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
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
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
