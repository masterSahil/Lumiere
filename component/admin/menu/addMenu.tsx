'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { LuUtensils, LuArrowLeft, LuUpload, LuChevronDown, LuFlame, LuLeaf, LuCheck, LuPlus } from 'react-icons/lu';

export default function AddMenu() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // State for toggles and attributes
  const [attributes, setAttributes] = useState({ spicy: false, veg: false, nonVeg: true });
  const [toggles, setToggles] = useState({ popular: false, availability: true });

  // Categories State
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState(''); // Stores the ObjectId
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // Image State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories');
      if (data.success && data.categories.length > 0) {
        setCategories(data.categories);
        setCategory(data.categories[0]._id);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName) return;
    try {
      const res = await axios.post('/api/categories', { name: newCategoryName });
      if (res.data.success) {
        setCategories([...categories, res.data.category]);
        setCategory(res.data.category._id);
        setNewCategoryName('');
        setIsAddingCategory(false);
      }
    } catch (error) {
      alert("Failed to add category");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setGalleryFiles(prev => [...prev, ...files]);
      const newPreviews = files.map(f => URL.createObjectURL(f));
      setGalleryPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const handlePublish = async () => {
    if (!name || !price || !description || !category) {
      alert("Please fill all required fields and ensure a category is selected.");
      return;
    }
    
    setLoading(true);
    try {
      let imageUrl = '';
      let galleryUrls: string[] = [];

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        
        const uploadRes = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        
        if (uploadRes.data.success) {
          imageUrl = uploadRes.data.url;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          const formData = new FormData();
          formData.append("file", file);
          const uploadRes = await axios.post("/api/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
          if (uploadRes.data.success) galleryUrls.push(uploadRes.data.url);
        }
      }

      const foodData = {
        name,
        description,
        price: Number(price),
        primaryImage: imageUrl,
        galleryImages: galleryUrls,
        isAvailable: toggles.availability,
        isPopular: toggles.popular,
        isSpicy: attributes.spicy,
        isVeg: attributes.veg,
        category: category // This is now the ObjectId
      };

      const res = await axios.post('/api/menu', foodData);

      if (res.data.success) {
        router.push('/admin/menu');
      } else {
        alert("Failed to publish: " + res.data.message);
      }
    } catch (error: any) {
      console.error(error);
      alert("Error publishing food: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-white bg-transparent">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="flex items-center gap-4">
          <Link href="/admin/menu" className="w-10 h-10 shrink-0 rounded-full bg-dark-surface border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 transition-colors">
            <LuArrowLeft className="text-[20px]" />
          </Link>
          <div>
            <h2 className="text-3xl text-white font-serif tracking-tight">Create Culinary Masterpiece</h2>
            <p className="text-primary-400 text-[12px] font-medium uppercase tracking-widest mt-1">Lumière Gastronomy • New Entry</p>
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Link href="/admin/menu">
            <button className="px-8 py-3 rounded-full border border-white/10 text-gray-300 font-bold hover:bg-white/5 transition-all text-[15px]">Discard</button>
          </Link>
          <button 
            onClick={handlePublish}
            disabled={loading}
            className="bg-primary-500 text-dark-bg px-8 py-3 rounded-full font-bold transition-all hover:brightness-110 text-[15px] disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish to Menu'}
          </button>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column (Images) */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[14px] font-semibold text-gray-400 tracking-wide">Primary Cover</label>
              <span className="text-[12px] text-gray-500">1080x1080px</span>
            </div>
            
            <div className="relative group aspect-square border-2 border-dashed border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:border-primary-500/50 transition-colors">
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <LuUpload className="text-4xl text-primary-400 mb-4" />
                  <p className="text-[16px] font-bold text-white">Upload Cover</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[14px] font-semibold text-gray-400 tracking-wide">Gallery Images</label>
              <span className="text-[12px] text-gray-500">Optional</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {galleryPreviews.map((preview, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                  <img src={preview} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="relative group aspect-square border-2 border-dashed border-white/10 rounded-xl overflow-hidden bg-white/5 hover:border-primary-500/50 transition-colors flex flex-col items-center justify-center cursor-pointer">
                <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                <LuUpload className="text-2xl text-primary-400 mb-2" />
                <p className="text-[12px] font-bold text-white">Add More</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Form Details) */}
        <div className="lg:col-span-7 space-y-8 bg-dark-surface p-6 sm:p-10 rounded-3xl border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            <div className="sm:col-span-2 space-y-2 group">
              <label className="text-[14px] font-semibold text-gray-400 tracking-wide group-focus-within:text-primary-400 transition-colors">Food Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Truffle-Infused Ribeye" 
                className="w-full bg-transparent border-0 border-b border-white/20 focus:border-primary-500 focus:ring-0 text-2xl sm:text-3xl text-white px-0 py-2 transition-all placeholder:text-white/20 outline-none font-medium" 
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-[14px] font-semibold text-gray-400 tracking-wide group-focus-within:text-primary-400 transition-colors">Category</label>
              <div className="relative">
                {!isAddingCategory ? (
                  <div className="flex gap-2">
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-dark-bg border border-white/20 focus:border-primary-500 focus:ring-0 text-[16px] text-white py-3 px-4 rounded-lg outline-none appearance-none cursor-pointer transition-all"
                    >
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => setIsAddingCategory(true)}
                      className="px-4 py-2 border border-white/20 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-colors"
                      title="Add New Category"
                    >
                      <LuPlus />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="New category name"
                      className="w-full bg-dark-bg border border-white/20 focus:border-primary-500 text-[16px] text-white py-3 px-4 rounded-lg outline-none"
                    />
                    <button onClick={handleAddCategory} className="px-4 py-2 bg-primary-500 text-dark-bg rounded-lg font-bold">Save</button>
                    <button onClick={() => setIsAddingCategory(false)} className="px-4 py-2 border border-white/20 rounded-lg text-gray-400 hover:text-white">Cancel</button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[14px] font-semibold text-gray-400 tracking-wide group-focus-within:text-primary-400 transition-colors">Base Price ($)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00" 
                className="w-full bg-transparent border-0 border-b border-white/20 focus:border-primary-500 focus:ring-0 text-[18px] text-white px-0 py-3 transition-all outline-none placeholder:text-white/20" 
              />
            </div>

            <div className="sm:col-span-2 space-y-2 group">
              <label className="text-[14px] font-semibold text-gray-400 tracking-wide group-focus-within:text-primary-400 transition-colors">Culinary Description</label>
              <textarea 
                rows={5} 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the flavors, textures, and origins..." 
                className="w-full bg-transparent border-0 border-b border-white/20 focus:border-primary-500 focus:ring-0 text-[16px] text-white px-0 py-2 resize-none transition-all outline-none placeholder:text-white/20"
              ></textarea>
            </div>

            <div className="sm:col-span-2 space-y-4">
              <label className="text-[14px] font-semibold text-gray-400 tracking-wide">Attributes</label>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setAttributes({...attributes, spicy: !attributes.spicy})} className={`px-6 py-2.5 rounded-full border text-[14px] font-semibold flex items-center gap-2 transition-all ${attributes.spicy ? 'bg-primary-500/15 border-primary-500 text-primary-400' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>
                  <LuFlame className="text-[18px]" /> Spicy
                </button>
                <button type="button" onClick={() => setAttributes({...attributes, veg: !attributes.veg})} className={`px-6 py-2.5 rounded-full border text-[14px] font-semibold flex items-center gap-2 transition-all ${attributes.veg ? 'bg-primary-500/15 border-primary-500 text-primary-400' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>
                  <LuLeaf className="text-[18px]" /> Veg
                </button>
                <button type="button" onClick={() => setAttributes({...attributes, nonVeg: !attributes.nonVeg})} className={`px-6 py-2.5 rounded-full border text-[14px] font-semibold flex items-center gap-2 transition-all ${attributes.nonVeg ? 'bg-primary-500/15 border-primary-500 text-primary-400' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>
                  <LuUtensils className="text-[18px]" /> Non-Veg
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
            
            <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setToggles({...toggles, popular: !toggles.popular})}>
              <div>
                <p className="text-white font-bold text-[15px]">Mark Popular</p>
                <p className="text-gray-400 text-[12px] mt-0.5">Featured in top picks</p>
              </div>
              <div className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${toggles.popular ? 'bg-primary-500' : 'bg-white/10'}`}>
                <div className={`absolute top-1 left-1 w-5 h-5 bg-dark-bg rounded-full transition-transform duration-300 flex items-center justify-center ${toggles.popular ? 'translate-x-7' : 'translate-x-0'}`}>
                  {toggles.popular && <LuCheck className="text-primary-400 text-[14px] font-bold" />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setToggles({...toggles, availability: !toggles.availability})}>
              <div>
                <p className="text-white font-bold text-[15px]">Availability</p>
                <p className="text-gray-400 text-[12px] mt-0.5">In stock & ready</p>
              </div>
              <div className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${toggles.availability ? 'bg-primary-500' : 'bg-white/10'}`}>
                <div className={`absolute top-1 left-1 w-5 h-5 bg-dark-bg rounded-full transition-transform duration-300 flex items-center justify-center ${toggles.availability ? 'translate-x-7' : 'translate-x-0'}`}>
                  {toggles.availability && <LuCheck className="text-primary-400 text-[14px] font-bold" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}