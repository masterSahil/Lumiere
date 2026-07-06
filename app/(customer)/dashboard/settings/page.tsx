'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Camera, User } from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pwdData, setPwdData] = useState({ currentPassword: '', newPassword: '' });
  const [pwdLoading, setPwdLoading] = useState(false);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/verify');
        if (data.success) {
          setUser(data.data);
          setFormData({
            username: data.data.username || '',
            email: data.data.email || '',
            phone: data.data.phone || '',
          });
          if (data.data.avatar) {
            setImagePreview(data.data.avatar);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    
    try {
      let avatarUrl = user.avatar;

      if (imageFile) {
        setUploadingImage(true);
        const imgData = new FormData();
        imgData.append('file', imageFile);
        const uploadRes = await axios.post('/api/upload', imgData);
        
        if (uploadRes.data.success) {
          avatarUrl = uploadRes.data.url;
          // Delete old avatar if it exists
          if (user.avatar) {
            try {
              await axios.delete('/api/upload', { data: { url: user.avatar } });
            } catch (e) {
              console.error("Failed to delete old avatar", e);
            }
          }
        } else {
          throw new Error('Failed to upload image');
        }
        setUploadingImage(false);
      }

      const res = await axios.put(`/api/users/${user._id}`, { ...formData, avatar: avatarUrl });
      if (res.data.success) {
        toast.success('Account settings updated successfully!');
        setUser(res.data.user);
        window.location.reload(); // To update the layout profile avatar
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Failed to update settings');
      setUploadingImage(false);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    setPwdLoading(true);
    try {
      const res = await axios.put(`/api/users/${user._id}/password`, pwdData);
      if (res.data.success) {
        toast.success('Password updated successfully!');
        setShowPasswordModal(false);
        setPwdData({ currentPassword: '', newPassword: '' });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Failed to update password');
    } finally {
      setPwdLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setDeleteLoading(true);
    try {
      const res = await axios.delete(`/api/users/${user._id}`);
      if (res.data.success) {
        toast.success('Account deleted.');
        // Sign out by clearing cookie (you could redirect to a logout api route)
        window.location.href = '/api/auth/logout';
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Failed to delete account');
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <div className="text-gray-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-8">
          <h1 className="font-serif text-[48px] leading-tight font-semibold mb-2 text-white">Account Settings</h1>
          <p className="text-gray-400">Manage your personal information and account security.</p>
        </div>

        <form onSubmit={handleSave} className="bg-dark-surface rounded-2xl border border-white/10 p-8">
          <h2 className="text-2xl font-serif text-white mb-6">Personal Information</h2>
          
          <div className="space-y-6">
            {/* Row 1: Profile Image and Username */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer shrink-0">
                  <div className="w-20 h-20 rounded-full bg-[#112417] overflow-hidden flex items-center justify-center transition-transform hover:scale-105 border border-primary-500/20">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-primary-500" />
                    )}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Profile Picture</h3>
                  <p className="text-gray-400 text-[13px]">Click the avatar to update.</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange}
                  className="w-full bg-[#070b09] border border-white/5 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500/50 outline-none transition-all shadow-inner" required />
              </div>
            </div>

            {/* Row 2: Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full bg-[#070b09] border border-white/5 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500/50 outline-none transition-all shadow-inner" required />
              </div>
              <div className="space-y-2">
                <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full bg-[#070b09] border border-white/5 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500/50 outline-none transition-all shadow-inner" />
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
              <button type="button" onClick={() => window.location.reload()} className="px-5 py-2 border rounded-lg text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button disabled={saving || uploadingImage} type="submit" className="bg-primary-500 text-[#030605] px-8 py-3 rounded-lg font-sans text-[14px] font-bold tracking-wide hover:bg-primary-400 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.15)] disabled:opacity-50">
                {uploadingImage ? 'Uploading Image...' : saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>

        <div className="bg-dark-surface rounded-2xl border border-white/10 p-8 mt-8">
          <h2 className="text-2xl font-serif text-white mb-6">Security</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <p className="text-white font-medium mb-1">Change Password</p>
              <p className="text-sm text-gray-400">Update your password to keep your account secure.</p>
            </div>
            <button onClick={() => setShowPasswordModal(true)} className="px-6 py-2 rounded-lg border border-white/10 text-white hover:border-white/30 hover:bg-white/5 transition-all">
              Update Password
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6">
            <div>
              <p className="text-red-400 font-medium mb-1">Delete Account</p>
              <p className="text-sm text-gray-400">Permanently remove your account and all associated data.</p>
            </div>
            <button onClick={() => setShowDeleteModal(true)} className="px-6 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </section>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form onSubmit={handlePasswordUpdate} className="bg-dark-surface border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-serif text-white mb-4">Update Password</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Current Password</label>
                <input type="password" value={pwdData.currentPassword} onChange={e => setPwdData({...pwdData, currentPassword: e.target.value})} required className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">New Password</label>
                <input type="password" value={pwdData.newPassword} onChange={e => setPwdData({...pwdData, newPassword: e.target.value})} required className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 outline-none" />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setShowPasswordModal(false)} className="px-5 py-2 rounded-lg text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button type="submit" disabled={pwdLoading} className="bg-primary-500 text-dark-bg px-5 py-2 rounded-lg font-semibold hover:bg-primary-400 transition-colors disabled:opacity-50">
                {pwdLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-serif text-red-400 mb-4">Delete Account</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to permanently delete your account? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="px-5 py-2 rounded-lg text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={handleDeleteAccount} disabled={deleteLoading} className="bg-red-500/20 text-red-400 border border-red-500/50 px-5 py-2 rounded-lg font-semibold hover:bg-red-500/30 transition-colors disabled:opacity-50">
                {deleteLoading ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
