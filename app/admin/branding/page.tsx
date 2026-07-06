'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { CloudUpload, Utensils, Edit2, Globe, Monitor, Smartphone, Tablet, EyeOff, Plus, Check, Trash2, Palette } from 'lucide-react';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';

const PRESET_COLORS = [
  '#9EE939', '#22c55e', '#0ea5e9', '#f59e0b', '#f43f5e', '#a855f7',
];

const DEFAULT_THEME_DATA = {
  themeName: 'New Theme',
  isActiveTheme: false,
  logo: '',
  favicon: '',
  primaryColor: '#9EE939',
  surfaceBackdrop: '#101415',
  accentGlow: '#9EE939',
  footerText: '',
  instagramUrl: '',
  twitterUrl: ''
};

export default function BrandingManagement() {
  const [themes, setThemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  const fetchThemes = async () => {
    try {
      const { data } = await axios.get('/api/branding?all=true');
      if (data.success) {
        setThemes(data.data);
        if (!formData && data.data.length > 0) {
          // Select the active theme by default, or the first one
          const active = data.data.find((t: any) => t.isActiveTheme) || data.data[0];
          setFormData(active);
        }
      }
    } catch (err) {
      console.error("Failed to fetch themes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let res;
      if (formData._id) {
        res = await axios.put(`/api/branding/${formData._id}`, formData);
      } else {
        res = await axios.post('/api/branding', formData);
      }
      
      if (res.data.success) {
        toast.success("Theme saved successfully!");
        setFormData(res.data.data);
        fetchThemes();
      }
    } catch (err) {
      toast.error("Failed to save theme");
    } finally {
      setSaving(false);
    }
  };

  const handleActivate = async () => {
    if (!formData._id) {
      toast.error("Save the theme first before activating.");
      return;
    }
    setSaving(true);
    try {
      const res = await axios.put(`/api/branding/${formData._id}`, { ...formData, isActiveTheme: true });
      if (res.data.success) {
        toast.success("Theme activated! Changes are now live globally.");
        setFormData(res.data.data);
        fetchThemes();
      }
    } catch (err) {
      toast.error("Failed to activate theme");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this theme?")) return;
    try {
      const res = await axios.delete(`/api/branding/${id}`);
      if (res.data.success) {
        toast.success("Theme deleted");
        if (formData._id === id) {
          setFormData(null); // Clear selection so it re-selects on fetch
        }
        fetchThemes();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete theme");
    }
  };

  const handleUpload = (e: any, field: 'logo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return toast.error("Image must be less than 2MB");
    
    if (field === 'logo') setUploadingLogo(true);
    else setUploadingFavicon(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, [field]: reader.result as string });
      if (field === 'logo') setUploadingLogo(false);
      else setUploadingFavicon(false);
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <div className="text-gray-400">Loading branding configuration...</div>;

  return (
    <div className="flex flex-col h-full max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 shrink-0">
        <div>
          <h1 className="font-serif text-[42px] leading-tight font-semibold text-white mb-2">Theme Engine</h1>
          <p className="text-gray-400 font-sans text-[15px]">
            Manage and instantly switch between luxury digital storefront themes.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setFormData(DEFAULT_THEME_DATA)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-white font-semibold text-[13px] tracking-widest hover:bg-white/5 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Theme
          </button>
          
          {formData && formData._id && !formData.isActiveTheme && (
            <button disabled={saving} onClick={handleActivate} className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-6 py-3 rounded-lg font-bold tracking-wider text-[13px] hover:bg-blue-500/20 transition-colors disabled:opacity-50 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Publish as Active
            </button>
          )}

          <button disabled={saving || !formData} onClick={handleSave} className="bg-primary-400 text-[#0d1700] px-6 py-3 rounded-lg font-bold tracking-wider text-[13px] hover:bg-primary-300 transition-colors shadow-[0_0_20px_rgba(158,233,57,0.2)] disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Theme'}
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 pb-20">
        
        {/* Left Side: Controls */}
        <div className="w-full xl:w-2/3 space-y-6">
          
          {/* Theme Selector */}
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {themes.map(theme => (
              <div 
                key={theme._id}
                onClick={() => setFormData(theme)}
                className={`flex-shrink-0 w-64 p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between
                  ${formData?._id === theme._id ? 'bg-primary-500/10 border-primary-500/50' : 'bg-dark-surface border-white/5 hover:border-white/20'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                    <span className="text-white font-bold text-sm truncate">{theme.themeName}</span>
                  </div>
                  {theme.isActiveTheme && (
                    <span className="bg-primary-500 text-black text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                      <Check className="w-3 h-3" /> Live
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-gray-500 font-mono">{theme._id.slice(-6)}</span>
                  {!theme.isActiveTheme && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(theme._id); }}
                      className="text-red-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {formData && (
            <>
              {/* Theme Settings Card */}
              <div className="bg-dark-surface border border-white/5 rounded-2xl p-8">
                <div className="mb-8">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Theme Name</label>
                  <input 
                    type="text" 
                    name="themeName" 
                    value={formData.themeName} 
                    onChange={handleChange} 
                    className="w-full bg-[#0a0d0e] border border-white/5 text-white font-serif text-2xl rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-400 outline-none" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Main Wordmark</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl h-40 flex flex-col items-center justify-center gap-3 hover:border-primary-400/50 hover:bg-white/5 transition-all relative overflow-hidden group">
                      {formData.logo ? (
                         <>
                           <img src={formData.logo} alt="Logo" className="w-full h-full object-contain p-4" />
                           <button 
                             onClick={() => setFormData({ ...formData, logo: '' })}
                             className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-500/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
                           >✕</button>
                         </>
                      ) : uploadingLogo ? (
                         <span className="text-primary-400 text-sm">Uploading...</span>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                          <CloudUpload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-[12px] text-gray-400">Drop SVG or PNG</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'logo')} disabled={uploadingLogo} />
                        </label>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Favicon (32x32)</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl h-40 flex flex-col items-center justify-center gap-3 hover:border-primary-400/50 hover:bg-white/5 transition-all relative overflow-hidden group">
                      {formData.favicon ? (
                         <>
                           <img src={formData.favicon} alt="Favicon" className="w-16 h-16 object-contain" />
                           <button 
                             onClick={() => setFormData({ ...formData, favicon: '' })}
                             className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-500/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
                           >✕</button>
                         </>
                      ) : uploadingFavicon ? (
                         <span className="text-primary-400 text-sm">Uploading...</span>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                          <Utensils className="w-8 h-8 text-primary-400 mb-2" />
                          <span className="text-[12px] text-gray-400">Update Icon</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'favicon')} disabled={uploadingFavicon} />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Palette Card */}
              <div className="bg-dark-surface border border-white/5 rounded-2xl p-8">
                <h2 className="flex items-center gap-3 text-white font-serif text-[20px] mb-8">
                  <span className="w-6 h-6 rounded bg-primary-400/20 flex items-center justify-center">
                    <Palette className="w-3.5 h-3.5 text-primary-400" />
                  </span>
                  Theme Palette
                </h2>
                
                <div className="mb-8">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Core Primary Color</label>
                  <div className="flex flex-wrap gap-4 items-center">
                    {PRESET_COLORS.map(color => (
                      <button 
                        key={color}
                        onClick={() => setFormData({ ...formData, primaryColor: color })}
                        className={`w-12 h-12 rounded-full transition-transform ${formData.primaryColor === color ? 'scale-110 ring-2 ring-white ring-offset-4 ring-offset-dark-surface' : 'hover:scale-110'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/5 relative overflow-hidden">
                      <Edit2 className="w-4 h-4 text-gray-400 relative z-10 pointer-events-none" />
                      <input type="color" className="absolute inset-[-10px] w-20 h-20 opacity-0 cursor-pointer" name="primaryColor" value={formData.primaryColor} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Surface Backdrop</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded border border-white/20" style={{ backgroundColor: formData.surfaceBackdrop }}></div>
                      <input type="text" name="surfaceBackdrop" value={formData.surfaceBackdrop} onChange={handleChange} className="w-full bg-[#0a0d0e] border border-white/5 text-white rounded-lg py-3 pl-10 pr-4 focus:ring-1 focus:ring-primary-400 outline-none font-mono text-[13px]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Accent Glow</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded border border-white/20" style={{ backgroundColor: formData.accentGlow }}></div>
                      <input type="text" name="accentGlow" value={formData.accentGlow} onChange={handleChange} className="w-full bg-[#0a0d0e] border border-white/5 text-white rounded-lg py-3 pl-10 pr-4 focus:ring-1 focus:ring-primary-400 outline-none font-mono text-[13px]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital Presence Card */}
              <div className="bg-dark-surface border border-white/5 rounded-2xl p-8">
                <h2 className="flex items-center gap-3 text-white font-serif text-[20px] mb-8">
                  <span className="w-6 h-6 rounded bg-primary-400/20 flex items-center justify-center">
                    <Globe className="w-3.5 h-3.5 text-primary-400" />
                  </span>
                  Digital Presence
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Global Footer Text</label>
                    <textarea rows={3} name="footerText" value={formData.footerText} onChange={handleChange}
                      className="w-full bg-[#0a0d0e] border border-white/5 text-gray-300 rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-400 outline-none resize-none text-[14px]"
                      placeholder="e.g. © 2026 Lumière Gastronomy..."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400"><FaInstagram /></div>
                      <input type="text" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} placeholder="Instagram URL" className="w-full bg-[#0a0d0e] border border-white/5 text-white rounded-lg py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary-400 outline-none text-[13px]" />
                    </div>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400"><FaXTwitter /></div>
                      <input type="text" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} placeholder="X (Twitter) URL" className="w-full bg-[#0a0d0e] border border-white/5 text-white rounded-lg py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary-400 outline-none text-[13px]" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Side: Live Preview */}
        <div className="w-full xl:w-1/3 flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-400 flex items-center gap-2">
              <EyeOff className="w-3.5 h-3.5" /> Live Preview
            </span>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>

          {formData && (
            <div className="flex justify-center flex-1">
              <div 
                className="border border-white/10 rounded-2xl overflow-hidden relative transition-all duration-300"
                style={{ 
                  backgroundColor: formData.surfaceBackdrop,
                  width: previewMode === 'mobile' ? '320px' : previewMode === 'tablet' ? '480px' : '100%',
                  height: previewMode === 'mobile' ? '568px' : previewMode === 'tablet' ? '700px' : '100%',
                  minHeight: '500px',
                  boxShadow: `0 0 40px ${formData.accentGlow}15`
                }}
              >
                {/* Fake Website content using selected colors */}
                <div className="p-6">
                  <header className="flex justify-between items-center mb-16">
                    <div className="font-serif font-bold text-xl" style={{ color: formData.primaryColor }}>
                      {formData.logo ? 'Logo Uploaded' : 'Lumière'}
                    </div>
                    <div className="gap-4 text-[9px] tracking-widest font-bold uppercase text-gray-400 hidden sm:flex">
                      <span>Menu</span><span>Reserve</span><span>Contact</span>
                    </div>
                  </header>

                  <div className="space-y-4">
                    <div 
                      className="inline-block px-2 py-1 text-[8px] font-bold tracking-widest uppercase rounded" 
                      style={{ backgroundColor: `${formData.primaryColor}20`, color: formData.primaryColor }}
                    >
                      EST. 2024
                    </div>
                    <h1 className="font-serif text-4xl leading-tight text-white font-bold max-w-[200px]">
                      Artistry in Every Bite.
                    </h1>
                    <p className="text-[11px] text-gray-400 leading-relaxed max-w-[220px]">
                      Experience the symphony of flavors curated by our master chefs in an atmosphere of pure obsidian elegance.
                    </p>
                    <div className="pt-4">
                      <button 
                        className="px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-transform hover:scale-105"
                        style={{ backgroundColor: formData.primaryColor, color: '#0d1700', boxShadow: `0 0 20px ${formData.accentGlow}80` }}
                      >
                        Book Experience
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Device Toggles */}
          <div className="flex justify-center gap-6 mt-4">
            <button onClick={() => setPreviewMode('desktop')} className={`flex flex-col items-center gap-2 ${previewMode === 'desktop' ? 'text-primary-400' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${previewMode === 'desktop' ? 'border-primary-400 bg-primary-400/10' : 'border-white/10'}`}>
                <Monitor className="w-4 h-4" />
              </div>
              <span className="text-[9px] uppercase tracking-widest font-bold">Desktop</span>
            </button>
            <button onClick={() => setPreviewMode('mobile')} className={`flex flex-col items-center gap-2 ${previewMode === 'mobile' ? 'text-primary-400' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${previewMode === 'mobile' ? 'border-primary-400 bg-primary-400/10' : 'border-white/10'}`}>
                <Smartphone className="w-4 h-4" />
              </div>
              <span className="text-[9px] uppercase tracking-widest font-bold">Mobile</span>
            </button>
            <button onClick={() => setPreviewMode('tablet')} className={`flex flex-col items-center gap-2 ${previewMode === 'tablet' ? 'text-primary-400' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${previewMode === 'tablet' ? 'border-primary-400 bg-primary-400/10' : 'border-white/10'}`}>
                <Tablet className="w-4 h-4" />
              </div>
              <span className="text-[9px] uppercase tracking-widest font-bold">Tablet</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
