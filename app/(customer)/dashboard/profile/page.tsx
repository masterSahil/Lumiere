'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, User } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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
          if (data.data.avatar) {
            setImagePreview(data.data.avatar);
          }
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
    
    setLoading(true);
    
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
        toast.success('Profile updated successfully!');
        setUser(res.data.user);
        window.location.reload(); // To update the layout profile avatar
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Failed to update profile');
      setUploadingImage(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 max-w-2xl">
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-serif text-[48px] leading-tight font-bold mb-2 text-white">Profile</h1>
            <p className="text-gray-400">Manage your personal details.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="bg-dark-surface p-8 md:p-10 rounded-[20px] border border-white/5 space-y-8">
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-[#112417] overflow-hidden flex items-center justify-center transition-transform hover:scale-105">
                {imagePreview ? (
                  <img src={imagePreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-primary-500" />
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Camera className="w-6 h-6 text-white" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <p className="text-gray-400 text-[13px]">Click to change avatar</p>
          </div>
          
          <div className="space-y-3">
            <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">Display Name</label>
            <input 
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-[#070b09] border border-white/5 rounded-xl p-4 focus:ring-1 focus:ring-primary-500/50 focus:border-primary-500/50 text-white placeholder-gray-600 outline-none transition-all shadow-inner" 
              type="text" 
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">Phone Number</label>
            <input 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#070b09] border border-white/5 rounded-xl p-4 focus:ring-1 focus:ring-primary-500/50 focus:border-primary-500/50 text-white placeholder-gray-600 outline-none transition-all shadow-inner" 
              type="tel" 
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              disabled={loading || uploadingImage}
              className="bg-primary-500 text-[#030605] px-6 py-3 rounded-lg font-sans text-[14px] font-bold tracking-wide hover:bg-primary-400 transition-all shadow-[0_0_15px_rgba(34,197,94,0.15)] disabled:opacity-50"
            >
              {uploadingImage ? 'Uploading Image...' : loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
