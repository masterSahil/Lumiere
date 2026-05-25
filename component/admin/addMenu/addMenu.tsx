'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  LuChartColumnIncreasing, LuShoppingBag, LuUtensils, LuPalette, LuSettings, 
  LuPlus, LuSearch, LuStar, LuUsers, LuMenu, LuX, LuArrowLeft, LuUpload,
  LuBell, LuHandHelping, LuChevronDown, LuFlame, LuLeaf, LuCheck, LuLayoutGrid
} from 'react-icons/lu';
import Sidebar from '@/component/Home/Sidebar';

export default function AddMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for toggles and attributes to make them interactive
  const [attributes, setAttributes] = useState({ spicy: false, veg: false, nonVeg: true });
  const [toggles, setToggles] = useState({ popular: false, availability: true });

  return (
    <>
      <div className="min-h-screen bg-[#131314] selection:bg-[#7ae749] selection:text-[#062100]">
        
        {/* Mobile Sidebar Toggle Overlay */}
        <div className="lg:hidden fixed top-0 inset-x-0 bg-[#131314]/90 backdrop-blur-md z-50 p-4 flex justify-between items-center border-b border-white/10">
          <h1 className="font-bold text-2xl text-[#7ae749]">Lumière Admin</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl p-2 text-white outline-none">
            {isSidebarOpen ? <LuX /> : <LuMenu />}
          </button>
        </div>

        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Top Navigation */}
        <header className="hidden lg:flex fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-[#131314]/90 backdrop-blur-md border-b border-white/5 items-center justify-between px-8 xl:px-20 z-30">
          <div className="flex items-center bg-[#2a2a2b] rounded-full px-4 py-1.5 w-96 border border-transparent focus-within:border-white/10 transition-colors">
            <LuSearch className="text-[#99907c] text-[18px]" />
            <input type="text" placeholder="Search menu, orders, or customers..." className="bg-transparent border-none outline-none focus:ring-0 text-sm w-full text-[#e5e2e3] ml-2 placeholder:text-[#99907c]" />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-[#90d883] hover:text-[#7ae749] transition-transform scale-95 active:scale-90 outline-none">
              <LuBell className="text-[20px]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#7ae749] rounded-full border border-[#131314]"></span>
            </button>
            <button className="text-[#90d883] hover:text-[#7ae749] transition-transform scale-95 active:scale-90 outline-none">
              <LuHandHelping className="text-[20px]" />
            </button>
            <div className="h-8 w-px bg-white/10"></div>
            <button className="bg-[#7ae749] text-[#103900] font-bold px-6 py-2 rounded-full text-[14px] hover:brightness-110 transition-all outline-none">
              View Live Site
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="lg:ml-64 pt-24 lg:pt-32 px-6 lg:px-12 xl:px-20 pb-20 min-h-screen relative">
          <div className="max-w-6xl mx-auto w-full">
            
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div className="flex items-center gap-4">
                <Link href="/menu" className="w-10 h-10 shrink-0 rounded-full bg-[#201f20] flex items-center justify-center text-[#e5e2e3] hover:bg-white/10 transition-colors">
                  <LuArrowLeft className="text-[20px]" />
                </Link>
                <div>
                  <h2 className="text-3xl sm:text-4xl text-[#e5e2e3] font-semibold tracking-tight">Create Culinary Masterpiece</h2>
                  <p className="text-[#90d883] text-[12px] font-medium uppercase tracking-widest mt-1">Lumière Gastronomy • New Entry</p>
                </div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-8 py-3 rounded-full border border-white/10 text-[#e5e2e3] font-bold hover:bg-white/5 transition-all text-[15px]">Discard</button>
                <button className="flex-1 md:flex-none bg-[#7ae749] text-[#062100] px-8 py-3 rounded-full font-bold transition-all hover:bg-[#4abe15] text-[15px]">Publish to Menu</button>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column (Images) */}
              <div className="col-span-12 lg:col-span-5 space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[14px] font-semibold text-[#d0c5af] tracking-wide">Primary Cover</label>
                    <span className="text-[12px] text-[#d0c5af] opacity-60">1080x1080px</span>
                  </div>
                  <div className="relative group cursor-pointer h-100 border-2 border-dashed border-white/10 rounded-2xl overflow-hidden bg-white/5 flex flex-col items-center justify-center transition-all hover:border-[#7ae749]/50">
                    <img className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" src="https://images.unsplash.com/photo-1599084942896-67b17eaf4125?w=600&q=80" alt="Cover Preview" />
                    <div className="relative z-10 flex flex-col items-center">
                      <LuUpload className="text-4xl text-[#7ae749] mb-4 group-hover:scale-110 transition-transform" />
                      <p className="text-[16px] font-bold text-white shadow-sm">Replace Cover</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-[14px] font-semibold text-[#d0c5af] tracking-wide">Secondary Gallery</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="aspect-square border-2 border-dashed border-white/10 rounded-xl bg-white/5 flex items-center justify-center hover:border-[#7ae749]/50 hover:bg-[#7ae749]/5 transition-all cursor-pointer group">
                        <LuPlus className="text-[24px] text-[#90d883] group-hover:text-[#7ae749] group-hover:scale-110 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (Form Details) */}
              <div className="col-span-12 lg:col-span-7 space-y-8 bg-[#1c1b1c] p-6 sm:p-10 rounded-3xl border border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  
                  <div className="sm:col-span-2 space-y-2 group">
                    <label className="text-[14px] font-semibold text-[#d0c5af] tracking-wide group-focus-within:text-[#7ae749] transition-colors">Food Name</label>
                    <input type="text" placeholder="e.g., Truffle-Infused Ribeye" className="w-full bg-transparent border-0 border-b border-white/20 focus:border-[#7ae749] focus:ring-0 text-2xl sm:text-3xl text-[#e5e2e3] px-0 py-2 transition-all placeholder:text-white/20 outline-none font-medium" />
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[14px] font-semibold text-[#d0c5af] tracking-wide group-focus-within:text-[#7ae749] transition-colors">Category</label>
                    <div className="relative">
                      <select className="w-full bg-[#2a2a2b] border-0 border-b border-white/20 focus:border-[#7ae749] focus:ring-0 text-[16px] text-[#e5e2e3] py-3 px-4 rounded-t-lg outline-none appearance-none cursor-pointer transition-all">
                        <option>Signature Entrees</option>
                        <option>Artisanal Pizza</option>
                        <option>Gourmet Burgers</option>
                        <option>Vintage Wines</option>
                        <option>Dessert Mastery</option>
                      </select>
                      <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d0c5af] pointer-events-none text-[20px]" />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[14px] font-semibold text-[#d0c5af] tracking-wide group-focus-within:text-[#7ae749] transition-colors">Base Price ($)</label>
                    <input type="number" placeholder="0.00" className="w-full bg-transparent border-0 border-b border-white/20 focus:border-[#7ae749] focus:ring-0 text-[18px] text-[#e5e2e3] px-0 py-3 transition-all outline-none placeholder:text-white/20" />
                  </div>

                  <div className="sm:col-span-2 space-y-2 group">
                    <label className="text-[14px] font-semibold text-[#d0c5af] tracking-wide group-focus-within:text-[#7ae749] transition-colors">Culinary Description</label>
                    <textarea rows={5} placeholder="Describe the flavors, textures, and origins..." className="w-full bg-transparent border-0 border-b border-white/20 focus:border-[#7ae749] focus:ring-0 text-[16px] text-[#e5e2e3] px-0 py-2 resize-none transition-all outline-none placeholder:text-white/20"></textarea>
                  </div>

                  <div className="sm:col-span-2 space-y-4">
                    <label className="text-[14px] font-semibold text-[#d0c5af] tracking-wide">Attributes</label>
                    <div className="flex flex-wrap gap-3">
                      <button type="button" onClick={() => setAttributes({...attributes, spicy: !attributes.spicy})} className={`px-6 py-2.5 rounded-full border text-[14px] font-semibold flex items-center gap-2 transition-all ${attributes.spicy ? 'bg-[#7ae749]/15 border-[#7ae749] text-[#7ae749]' : 'border-white/10 text-[#d0c5af] hover:border-white/30 hover:text-white'}`}>
                        <LuFlame className="text-[18px]" /> Spicy
                      </button>
                      <button type="button" onClick={() => setAttributes({...attributes, veg: !attributes.veg})} className={`px-6 py-2.5 rounded-full border text-[14px] font-semibold flex items-center gap-2 transition-all ${attributes.veg ? 'bg-[#7ae749]/15 border-[#7ae749] text-[#7ae749]' : 'border-white/10 text-[#d0c5af] hover:border-white/30 hover:text-white'}`}>
                        <LuLeaf className="text-[18px]" /> Veg
                      </button>
                      <button type="button" onClick={() => setAttributes({...attributes, nonVeg: !attributes.nonVeg})} className={`px-6 py-2.5 rounded-full border text-[14px] font-semibold flex items-center gap-2 transition-all ${attributes.nonVeg ? 'bg-[#7ae749]/15 border-[#7ae749] text-[#7ae749]' : 'border-white/10 text-[#d0c5af] hover:border-white/30 hover:text-white'}`}>
                        <LuUtensils className="text-[18px]" /> Non-Veg
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/5">
                  
                  {/* Toggle 1 */}
                  <div className="flex items-center justify-between p-5 bg-[rgb(254,250,250)]/5 rounded-2xl cursor-pointer" onClick={() => setToggles({...toggles, popular: !toggles.popular})}>
                    <div>
                      <p className="text-[#e5e2e3] font-bold text-[15px]">Mark Popular</p>
                      <p className="text-[#90d883] text-[12px] mt-0.5">Featured in top picks</p>
                    </div>
                    <div className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${toggles.popular ? 'bg-[#7ae749]' : 'bg-white/10'}`}>
                      <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 flex items-center justify-center ${toggles.popular ? 'translate-x-7' : 'translate-x-0'}`}>
                        {toggles.popular && <LuCheck className="text-[#131314] text-[14px] font-bold" />}
                      </div>
                    </div>
                  </div>

                  {/* Toggle 2 */}
                  <div className="flex items-center justify-between p-5 bg-[rgb(254,250,250)]/5 rounded-2xl cursor-pointer" onClick={() => setToggles({...toggles, availability: !toggles.availability})}>
                    <div>
                      <p className="text-[#e5e2e3] font-bold text-[15px]">Availability</p>
                      <p className="text-[#90d883] text-[12px] mt-0.5">In stock & ready</p>
                    </div>
                    <div className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${toggles.availability ? 'bg-[#7ae749]' : 'bg-white/10'}`}>
                      <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 flex items-center justify-center ${toggles.availability ? 'translate-x-7' : 'translate-x-0'}`}>
                        {toggles.availability && <LuCheck className="text-[#131314] text-[14px] font-bold" />}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              
            </div>
          </div>
        </main>
      </div>
    </>
  );
}