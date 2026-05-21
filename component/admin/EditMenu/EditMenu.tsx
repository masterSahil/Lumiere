'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import { 
  LuChartColumnIncreasing, LuReceipt, LuUtensils, LuPalette, LuSettings, 
  LuMenu, LuX, LuSave, LuTrash2, LuRefreshCw
} from 'react-icons/lu';
import Link from 'next/link';

const NAV_ITEMS = [
  { link: '/', label: 'Analytics', icon: LuChartColumnIncreasing, active: false },
  { link: '/orders', label: 'Orders', icon: LuReceipt, active: false },
  { link: '/menu', label: 'Menu CMS', icon: LuUtensils, active: true },
  { link: '/branding', label: 'Branding', icon: LuPalette, active: false },
  { link: '/settings', label: 'Settings', icon: LuSettings, active: false },
];

export default function EditFood() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Lumière | Edit Dish Details</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        html, body { max-width: 100vw; overflow-x: hidden; background: #131314 !important; background-image: none !important; color: #e5e2e3; font-family: 'Manrope', sans-serif; margin: 0; padding: 0; }
        body::before, body::after { display: none !important; }
        h1, h2, h3, h4, .font-serif { font-family: 'Playfair Display', serif; }
        .glass2 { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); }
      `}} />

      <div className="min-h-screen selection:bg-[#7ae749] selection:text-[#103900]">
        
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 inset-x-0 bg-[#131314]/80 backdrop-blur-md z-40 p-4 flex justify-between items-center border-b border-white/10">
          <h1 className="font-serif text-2xl text-[#7ae749]">Lumière</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl p-2 text-white outline-none">
            {isSidebarOpen ? <LuX /> : <LuMenu />}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#131314]/95 backdrop-blur-2xl border-r border-white/5 flex flex-col py-8 px-6 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="mb-10 mt-10 lg:mt-0">
            <h1 className="font-serif text-4xl text-[#7ae749] tracking-tight">Lumière</h1>
            <p className="text-[#d0c5af] text-xs uppercase tracking-widest mt-2 opacity-60">Admin Panel</p>
          </div>
          <nav className="flex-1 space-y-3">
            {NAV_ITEMS.map((item, idx) => (
              <Link key={idx} href={item.link} className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all font-medium text-sm group ${item.active ? 'bg-[#7ae749]/10 text-[#7ae749] shadow-[inset_4px_0_0_0_#7ae749]' : 'text-[#d0c5af] hover:bg-white/5 hover:text-white'}`}>
                <item.icon className={`text-xl transition-transform ${!item.active && 'group-hover:scale-110 group-hover:text-[#7ae749]'}`} />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-64 p-4 sm:p-8 lg:p-12 pt-24 lg:pt-12 min-h-screen flex flex-col">
          
          <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold">Edit Dish</h2>
                <span className="bg-white/10 px-3 py-1 rounded-md text-xs font-bold text-[#d0c5af] tracking-wider mt-2">#ITM-01</span>
              </div>
              <p className="text-[#d0c5af] text-base sm:text-lg opacity-80">Update details for "Signature Lobster Thermidor".</p>
            </div>
            <button className="px-5 py-3 border border-[#ffb4ab]/30 text-[#ffb4ab] rounded-xl hover:bg-[#ffb4ab]/10 transition-all text-sm font-bold flex items-center gap-2 w-fit">
              <LuTrash2 className="text-lg" /> Delete Dish
            </button>
          </header>

          <form className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            <div className="xl:col-span-2 space-y-8">
              <div className="glass2 p-8 rounded-2xl space-y-6">
                <h3 className="font-serif text-2xl text-white border-b border-white/10 pb-4">General Information</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#d0c5af] uppercase tracking-wider">Dish Name</label>
                  <input type="text" defaultValue="Signature Lobster Thermidor" className="w-full bg-[#131314] border border-[#7ae749]/30 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#7ae749] focus:ring-1 focus:ring-[#7ae749]/50 transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#d0c5af] uppercase tracking-wider">Category</label>
                    <select defaultValue="Main Course" className="w-full bg-[#131314] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#7ae749] transition-all appearance-none cursor-pointer">
                      <option>Main Course</option>
                      <option>Appetizers</option>
                      <option>Dessert</option>
                      <option>Beverages</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#d0c5af] uppercase tracking-wider">Price (USD)</label>
                    <input type="number" defaultValue="185.00" className="w-full bg-[#131314] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#7ae749] transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#d0c5af] uppercase tracking-wider">Description</label>
                  <textarea rows={4} defaultValue="A rich, creamy, and classic French dish consisting of a creamy mixture of cooked lobster meat, egg yolks, and cognac, stuffed into a lobster shell." className="w-full bg-[#131314] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#7ae749] transition-all resize-none"></textarea>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              
              <div className="glass2 p-3 rounded-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                  <button type="button" className="px-4 py-2 bg-white text-black font-bold text-sm rounded-lg flex items-center gap-2 hover:bg-[#7ae749] transition-colors"><LuRefreshCw /> Replace Image</button>
                </div>
                <img src="https://images.unsplash.com/photo-1599084942896-67b17eaf4125?w=600&q=80" alt="Lobster Thermidor" className="w-full h-64 object-cover rounded-xl" />
              </div>

              <div className="glass2 p-8 rounded-2xl space-y-6">
                <h3 className="font-serif text-xl text-white border-b border-white/10 pb-4">Inventory & Status</h3>
                
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-bold text-[#d0c5af] uppercase tracking-wider">Current Stock</label>
                  <input type="number" defaultValue="12" className="w-full bg-[#131314] border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[#7ae749] transition-all" />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="status" defaultChecked className="w-4 h-4 accent-[#7ae749] bg-[#131314]" />
                    <span className="text-sm font-medium text-white">Available</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="status" className="w-4 h-4 accent-[#7ae749] bg-[#131314]" />
                    <span className="text-sm font-medium text-[#ffd166]">Low Stock</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="status" className="w-4 h-4 accent-[#7ae749] bg-[#131314]" />
                    <span className="text-sm font-medium text-[#ffb4ab]">Sold Out</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Link href="/menu" className="flex-1 py-4 bg-white/5 text-center text-white font-bold rounded-xl hover:bg-white/10 transition-all">Cancel</Link>
                <button type="submit" className="flex-[2] py-4 bg-[#7ae749] text-[#103900] font-bold rounded-xl hover:bg-[#8dfc5b] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(122,231,73,0.15)]">
                  <LuSave className="text-lg" /> Update Dish
                </button>
              </div>

            </div>
          </form>
        </main>
      </div>
    </>
  );
}