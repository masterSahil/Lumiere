'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, EyeOff, LayoutGrid } from 'lucide-react';

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', image: '', isActive: true });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        if (data.success) {
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const { data } = await axios.delete(`/api/category?id=${id}`);
      if (data.success) {
        toast.success("Category deleted");
        setCategories(categories.filter(c => c._id !== id));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleCreate = async () => {
    if (!newCategory.name) return toast.error("Category name is required");
    setSaving(true);
    try {
      const { data } = await axios.post('/api/categories', newCategory);
      if (data.success) {
        toast.success("Category created!");
        setCategories([data.category, ...categories]);
        setIsAdding(false);
        setNewCategory({ name: '', description: '', image: '', isActive: true });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create category");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be less than 5MB");
    
    setUploadingImage(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCategory({ ...newCategory, image: reader.result as string });
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 shrink-0">
        <div>
          <h1 className="font-serif text-[42px] leading-tight font-semibold text-white mb-2">Category Management</h1>
          <p className="text-gray-400 font-sans max-w-xl text-[15px] leading-relaxed">
            Curate your gastronomic landscape. Organize your menu into immersive collections that guide guests through the Lumière experience.
          </p>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-primary-400 text-[#0d1700] px-6 py-3 rounded-full font-bold tracking-wider uppercase text-[13px] hover:bg-primary-300 transition-colors shadow-[0_0_20px_rgba(158,233,57,0.3)]">
          <Plus className="w-4 h-4" /> Create New Category
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pb-24">
        {loading ? (
          <div className="text-gray-400 col-span-full">Loading categories...</div>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="bg-dark-surface rounded-2xl overflow-hidden border border-white/5 flex flex-col group relative">
              {/* Image Section */}
              <div className="h-48 relative overflow-hidden bg-black/40">
                {category.image ? (
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <LayoutGrid className="w-12 h-12 text-white/10" />
                  </div>
                )}
                {/* Active Pill */}
                <div className="absolute top-4 left-4 bg-primary-400/90 backdrop-blur text-[#0d1700] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  {category.isActive ? 'Active' : 'Hidden'}
                </div>
                {/* Inner Shadow overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-dark-surface to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif text-[22px] font-semibold text-white mb-1">{category.name}</h3>
                <p className="text-primary-400 text-[12px] tracking-wider mb-4 font-medium uppercase">
                  12 Dishes • Signature
                </p>
                <p className="text-gray-400 text-[13px] leading-relaxed line-clamp-3 mb-6">
                  {category.description || "No description provided for this collection."}
                </p>

                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(category._id)} className="w-8 h-8 rounded-full hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Add Category Card */}
        <div onClick={() => setIsAdding(true)} className="bg-dark-bg border border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[350px] text-center hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-400/20 group-hover:border-primary-400/50 group-hover:text-primary-400 transition-all text-gray-400">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-[20px] font-semibold text-white mb-2">Add Category</h3>
          <p className="text-gray-400 text-[13px] leading-relaxed max-w-[200px]">
            Expand your culinary horizons with a new theme.
          </p>
        </div>
      </div>

      {/* Footer Stats Bar */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 h-20 bg-dark-surface border-t border-white/5 flex items-center justify-between px-8 z-20">
        <div className="flex gap-12">
          <div>
            <p className="text-[10px] tracking-widest font-bold text-gray-500 uppercase mb-1">Total Categories</p>
            <p className="font-serif text-3xl text-primary-400 font-bold">{categories.length}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-widest font-bold text-gray-500 uppercase mb-1">Active Dishes</p>
            <p className="font-serif text-3xl text-white font-bold">245</p>
          </div>
          <div>
            <p className="text-[10px] tracking-widest font-bold text-gray-500 uppercase mb-1">Last Updated</p>
            <p className="font-serif text-3xl text-white font-bold">Today</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-400 shadow-[0_0_8px_rgba(158,233,57,0.8)]"></div>
            System Online
          </div>
          <span className="text-white/20">|</span>
          <span>v2.4.0-Enterprise</span>
        </div>
      </div>

      {/* Add Category Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsAdding(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="mb-8">
              <h2 className="text-2xl font-serif text-white">Create Category</h2>
              <p className="text-sm text-gray-400 mt-1">Add a new collection to your menu.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Category Name</label>
                <input 
                  type="text" 
                  value={newCategory.name}
                  onChange={e => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="e.g. Signature Mains"
                  className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-md px-4 py-3 outline-none transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Description</label>
                <textarea 
                  value={newCategory.description}
                  onChange={e => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Describe this category..."
                  rows={3}
                  className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-md px-4 py-3 outline-none transition-all resize-none" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Category Image</label>
                <label className="w-full h-32 rounded-lg border-2 border-dashed border-white/20 hover:border-primary-500/50 bg-dark-bg flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden">
                  {newCategory.image ? (
                     <img src={newCategory.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : uploadingImage ? (
                     <span className="text-primary-400 text-sm">Processing image...</span>
                  ) : (
                    <>
                      <LayoutGrid className="w-8 h-8 text-white/20 mb-2" />
                      <span className="text-gray-400 text-sm font-medium">Click to upload image</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                </label>
              </div>
              
              <button 
                onClick={handleCreate}
                disabled={saving || uploadingImage}
                className="w-full bg-primary-500 text-dark-bg py-3.5 rounded-lg font-bold shadow-[0_0_15px_rgba(132,204,22,0.2)] hover:shadow-[0_0_25px_rgba(132,204,22,0.4)] transition-all disabled:opacity-50 mt-4"
              >
                {saving ? 'Creating...' : 'Create Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
