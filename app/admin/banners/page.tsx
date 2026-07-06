'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export default function BannersManagement() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newBanner, setNewBanner] = useState({ title: '', subtitle: '', image: '', type: 'homepage', link: '' });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const { data } = await axios.get('/api/banners');
      if (data.success) {
        setBanners(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch banners", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    try {
      const { data } = await axios.delete(`/api/banners/${id}`);
      if (data.success) {
        toast.success("Banner deleted");
        setBanners(banners.filter(b => b._id !== id));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleCreate = async () => {
    if (!newBanner.title || !newBanner.image) return toast.error("Title and Image are required");
    setSaving(true);
    try {
      const { data } = await axios.post('/api/banners', newBanner);
      if (data.success) {
        toast.success("Banner created!");
        setBanners([data.data, ...banners]);
        setIsAdding(false);
        setNewBanner({ title: '', subtitle: '', image: '', type: 'homepage', link: '' });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create banner");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewBanner({ ...newBanner, image: reader.result as string });
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 shrink-0">
        <div>
          <h1 className="font-serif text-[42px] leading-tight font-semibold text-white mb-2">Banner Management</h1>
          <p className="text-gray-400 font-sans max-w-xl text-[15px] leading-relaxed">
            Manage promotional and homepage banners.
          </p>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-primary-400 text-[#0d1700] px-6 py-3 rounded-full font-bold tracking-wider uppercase text-[13px] hover:bg-primary-300 transition-colors shadow-[0_0_20px_rgba(158,233,57,0.3)]">
          <Plus className="w-4 h-4" /> Create Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-gray-400">Loading banners...</div>
        ) : banners.map((banner) => (
          <div key={banner._id} className="bg-dark-surface rounded-2xl overflow-hidden border border-white/5 relative group">
            <div className="h-40 bg-black/40 relative">
              {banner.image ? (
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover opacity-80" />
              ) : (
                <ImageIcon className="w-8 h-8 text-white/10 m-auto mt-16" />
              )}
            </div>
            <div className="p-5">
              <h3 className="font-serif text-xl text-white mb-1">{banner.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{banner.type}</p>
              <button onClick={() => handleDelete(banner._id)} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white">✕</button>
            <h2 className="text-2xl font-serif text-white mb-6">Create Banner</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Title</label>
                <input type="text" value={newBanner.title} onChange={e => setNewBanner({...newBanner, title: e.target.value})} className="w-full bg-dark-bg border border-white/10 text-white rounded-md px-4 py-3 outline-none mt-2" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Type</label>
                <select value={newBanner.type} onChange={e => setNewBanner({...newBanner, type: e.target.value})} className="w-full bg-dark-bg border border-white/10 text-white rounded-md px-4 py-3 outline-none mt-2">
                  <option value="homepage">Homepage</option>
                  <option value="promotional">Promotional</option>
                  <option value="seasonal">Seasonal</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Image</label>
                <label className="w-full h-32 rounded-lg border-2 border-dashed border-white/20 bg-dark-bg flex flex-col items-center justify-center cursor-pointer mt-2 overflow-hidden relative">
                  {newBanner.image ? (
                    <img src={newBanner.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-sm">Upload Image</span>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                </label>
              </div>
              
              <button onClick={handleCreate} disabled={saving || uploadingImage} className="w-full bg-primary-500 text-dark-bg py-3.5 rounded-lg font-bold mt-4">
                {saving ? 'Saving...' : 'Create Banner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
