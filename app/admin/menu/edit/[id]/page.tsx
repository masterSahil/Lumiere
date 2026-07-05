'use client'
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { LuUtensils, LuUpload, LuArrowLeft, LuChevronDown, LuFlame, LuLeaf, LuCheck, LuTrash2 } from 'react-icons/lu';

export default function AdminEditMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // State for toggles and attributes
  const [attributes, setAttributes] = useState({ spicy: false, veg: false, nonVeg: true });
  const [toggles, setToggles] = useState({ popular: false, availability: true });

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Main Course');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // Image State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const { data } = await axios.get(`/api/menu/${id}`);
        if (data.success) {
          const food = data.food;
          setName(food.name || '');
          setCategory(food.category?.name || food.categoryName || 'Main Course');
          setPrice(food.price?.toString() || '');
          setDescription(food.description || '');
          setExistingImageUrl(food.primaryImage || '');
          setImagePreview(food.primaryImage || '');
          
          setAttributes({
            spicy: !!food.isSpicy,
            veg: !!food.isVeg,
            nonVeg: !food.isVeg
          });
          
          setToggles({
            popular: !!food.isPopular,
            availability: food.isAvailable !== undefined ? food.isAvailable : true
          });
        }
      } catch (error) {
        console.error("Failed to fetch food details", error);
        alert("Failed to load dish details.");
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    if (!name || !price || !description) {
      alert("Please fill all required fields.");
      return;
    }
    
    setSaving(true);
    try {
      let imageUrl = existingImageUrl;

      // 1. Upload new Image to Cloudinary if selected
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

      // 2. Save Food to Database
      const foodData = {
        name,
        description,
        price: Number(price),
        primaryImage: imageUrl,
        isAvailable: toggles.availability,
        isPopular: toggles.popular,
        isSpicy: attributes.spicy,
        isVeg: attributes.veg,
        categoryName: category
      };

      const res = await axios.put(`/api/menu/${id}`, foodData);

      if (res.data.success) {
        router.push('/admin/menu');
      } else {
        alert("Failed to update: " + res.data.message);
      }
    } catch (error: any) {
      console.error(error);
      alert("Error updating food: " + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-primary-400">Loading dish details...</div>;

  return (
    <div className="w-full text-white bg-transparent">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="flex items-center gap-4">
          <Link href="/admin/menu" className="w-10 h-10 shrink-0 rounded-full bg-dark-surface border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 transition-colors">
            <LuArrowLeft className="text-[20px]" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl text-white font-serif tracking-tight">Edit Dish</h2>
              <span className="bg-white/10 px-3 py-1 rounded-md text-xs font-bold text-gray-400 tracking-wider">#{id.slice(-6).toUpperCase()}</span>
            </div>
            <p className="text-primary-400 text-[12px] font-medium uppercase tracking-widest mt-1">Update details for "{name}"</p>
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Link href="/admin/menu">
            <button className="px-8 py-3 rounded-full border border-white/10 text-gray-300 font-bold hover:bg-white/5 transition-all text-[15px]">Discard</button>
          </Link>
          <button 
            onClick={handleUpdate}
            disabled={saving}
            className="bg-primary-500 text-dark-bg px-8 py-3 rounded-full font-bold transition-all hover:brightness-110 text-[15px] disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
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
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-dark-bg border-0 border-b border-white/20 focus:border-primary-500 focus:ring-0 text-[16px] text-white py-3 px-4 rounded-t-lg outline-none appearance-none cursor-pointer transition-all"
                >
                  <option>Signature Entrees</option>
                  <option>Artisanal Pizza</option>
                  <option>Gourmet Burgers</option>
                  <option>Vintage Wines</option>
                  <option>Dessert Mastery</option>
                  <option>Main Course</option>
                  <option>Appetizers</option>
                </select>
                <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[20px]" />
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
            
            {/* Toggle 1 */}
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

            {/* Toggle 2 */}
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
