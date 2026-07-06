'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export default function GalleryManagement() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', category: 'general', image: '' });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data } = await axios.get('/api/gallery');
      if (data.success) {
        setGallery(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch gallery", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const { data } = await axios.delete(`/api/gallery/${id}`);
      if (data.success) {
        toast.success("Image deleted");
        setGallery(gallery.filter(g => g._id !== id));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleCreate = async () => {
    if (!newItem.image) return toast.error("Image is required");
    setSaving(true);
    try {
      const { data } = await axios.post('/api/gallery', newItem);
      if (data.success) {
        toast.success("Image added to gallery!");
        setGallery([data.data, ...gallery]);
        setIsAdding(false);
        setNewItem({ title: '', category: 'general', image: '' });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add image");
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
      setNewItem({ ...newItem, image: reader.result as string });
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 shrink-0">
        <div>
          <h1 className="font-serif text-[42px] leading-tight font-semibold text-white mb-2">Gallery Management</h1>
          <p className="text-gray-400 font-sans max-w-xl text-[15px] leading-relaxed">
            Curate photos for your restaurant's visual showcase.
          </p>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-primary-400 text-[#0d1700] px-6 py-3 rounded-full font-bold tracking-wider uppercase text-[13px] hover:bg-primary-300 transition-colors shadow-[0_0_20px_rgba(158,233,57,0.3)]">
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="text-gray-400">Loading gallery...</div>
        ) : gallery.map((item) => (
          <div key={item._id} className="bg-dark-surface rounded-xl overflow-hidden border border-white/5 relative group">
            <div className="h-48 bg-black/40 relative group-hover:scale-105 transition-transform">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-white/10 m-auto mt-20" />
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center">
                <button onClick={() => handleDelete(item._id)} className="bg-red-500/80 text-white p-3 rounded-full hover:bg-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            {item.title && (
              <div className="p-3 absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent">
                <h3 className="text-white text-sm">{item.title}</h3>
              </div>
            )}
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white">✕</button>
            <h2 className="text-2xl font-serif text-white mb-6">Add Photo to Gallery</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Image</label>
                <label className="w-full h-40 rounded-lg border-2 border-dashed border-white/20 bg-dark-bg flex flex-col items-center justify-center cursor-pointer mt-2 overflow-hidden relative">
                  {newItem.image ? (
                    <img src={newItem.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-sm">Upload Photo</span>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                </label>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Title (Optional)</label>
                <input type="text" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} className="w-full bg-dark-bg border border-white/10 text-white rounded-md px-4 py-3 outline-none mt-2" />
              </div>
              
              <button onClick={handleCreate} disabled={saving || uploadingImage} className="w-full bg-primary-500 text-dark-bg py-3.5 rounded-lg font-bold mt-4">
                {saving ? 'Adding...' : 'Add to Gallery'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
