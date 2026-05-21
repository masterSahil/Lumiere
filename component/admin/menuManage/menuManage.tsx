'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import { 
  LuChartColumnIncreasing, LuReceipt, LuUtensils, LuPalette, LuSettings, 
  LuPlus, LuSearch, LuEllipsisVertical, LuUser, LuMenu, LuX, LuFilter, 
   LuTrash2
} from 'react-icons/lu';
import Link from 'next/link';
import { Edit } from 'lucide-react';

const NAV_ITEMS = [
  { link: '/', label: 'Analytics', icon: LuChartColumnIncreasing, active: false },
  { link: '/orders', label: 'Orders', icon: LuReceipt, active: false },
  { link: '/menu', label: 'Menu CMS', icon: LuUtensils, active: true },
  { link: '/branding', label: 'Branding', icon: LuPalette, active: false },
  { link: '/settings', label: 'Settings', icon: LuSettings, active: false },
];

const MENU_ITEMS = [
  { id: '#ITM-01', name: 'Signature Lobster Thermidor', category: 'Main Course', price: '$185.00', status: 'Available', img: 'https://images.unsplash.com/photo-1599084942896-67b17eaf4125?w=150&q=80', stock: 12 },
  { id: '#ITM-02', name: 'Black Truffle Risotto', category: 'Main Course', price: '$85.00', status: 'Available', img: 'https://images.unsplash.com/photo-1633337474564-1d9e7235284f?w=150&q=80', stock: 24 },
  { id: '#ITM-03', name: 'Vintage Wine Selection (3)', category: 'Beverage', price: '$420.00', status: 'Low Stock', img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=150&q=80', stock: 4 },
  { id: '#ITM-04', name: 'Wagyu Beef Wellington', category: 'Main Course', price: '$125.00', status: 'Available', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=150&q=80', stock: 18 },
  { id: '#ITM-05', name: 'Autumn Gold Tasting Series', category: 'Dessert', price: '$45.00', status: 'Sold Out', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=150&q=80', stock: 0 },
];

export default function FoodManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Lumière | Menu Management</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        html, body { max-width: 100vw; overflow-x: hidden; background: #131314 !important; background-image: none !important; color: #e5e2e3; font-family: 'Manrope', sans-serif; margin: 0; padding: 0; }
        body::before, body::after { display: none !important; }
        h1, h2, h3, h4, .font-serif { font-family: 'Playfair Display', serif; }
        .glass2 { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(122, 231, 73, 0.5); }
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
          <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
            <div className="flex items-center gap-4">
              <img alt="Admin" src="https://i.pravatar.cc/150?img=33" className="w-10 h-10 rounded-full border-2 border-white/10 object-cover" />
              <div>
                <p className="text-sm font-bold">Alexandre L.</p>
                <p className="text-xs text-[#d0c5af] opacity-80">Master Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-64 p-4 sm:p-8 lg:p-12 pt-24 lg:pt-12 min-h-screen flex flex-col">
          
          <header className="flex flex-col xl:flex-row justify-between xl:items-end gap-6 mb-10">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-2">Menu Management</h2>
              <p className="text-[#d0c5af] text-base sm:text-lg opacity-80">Curate and oversee your culinary offerings.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/menu/add" className="px-6 py-3 bg-[#7ae749] text-[#103900] rounded-xl hover:bg-[#8dfc5b] transition-all text-sm font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(122,231,73,0.15)]">
                <LuPlus className="text-lg" /> Add New Dish
              </Link>
            </div>
          </header>

          <section className="glass2 rounded-2xl flex flex-col w-full overflow-hidden shadow-2xl">
            <div className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-72">
                  <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d0c5af]" />
                  <input type="text" placeholder="Search dishes..." className="w-full bg-[#131314] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#7ae749]/50 transition-all text-white placeholder:text-white/30" />
                </div>
                <button className="p-3 bg-[#131314] border border-white/10 rounded-xl text-[#d0c5af] hover:text-[#7ae749] hover:border-[#7ae749]/30 transition-all flex-shrink-0">
                  <LuFilter className="text-lg" />
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap min-w-[800px]">
                <thead className="bg-[#131314]/50 text-[11px] uppercase tracking-widest text-[#d0c5af] font-bold border-b border-white/5">
                  <tr>
                    <th className="px-8 py-5">Item Details</th>
                    <th className="px-8 py-5">Category</th>
                    <th className="px-8 py-5">Price</th>
                    <th className="px-8 py-5">Stock</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {MENU_ITEMS.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg border border-white/10 object-cover shadow-lg" />
                          <div>
                            <p className="font-bold text-white text-base group-hover:text-[#7ae749] transition-colors">{item.name}</p>
                            <p className="text-[11px] text-[#d0c5af] mt-1 tracking-wider">{item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-[#d0c5af]">{item.category}</td>
                      <td className="px-8 py-5 font-bold font-serif text-lg text-white">{item.price}</td>
                      <td className="px-8 py-5 font-medium">{item.stock} Units</td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                          item.status === 'Available' ? 'bg-[#7ae749]/10 text-[#7ae749] border-[#7ae749]/20' : 
                          item.status === 'Sold Out' ? 'bg-[#ffb4ab]/10 text-[#ffb4ab] border-[#ffb4ab]/20' : 
                          'bg-[#ffd166]/10 text-[#ffd166] border-[#ffd166]/20'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/menu/edit/${item.id}`} className="p-2 bg-white/5 hover:bg-[#7ae749]/20 hover:text-[#7ae749] rounded-lg transition-all text-[#d0c5af]">
                            <Edit className="text-lg" />
                          </Link>
                          <button className="p-2 bg-white/5 hover:bg-[#ffb4ab]/20 hover:text-[#ffb4ab] rounded-lg transition-all text-[#d0c5af]">
                            <LuTrash2 className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Placeholder */}
            <div className="p-6 border-t border-white/5 flex justify-between items-center text-sm text-[#d0c5af]">
              <p>Showing 1 to 5 of 24 items</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-all">Prev</button>
                <button className="px-4 py-2 border border-[#7ae749]/30 text-[#7ae749] bg-[#7ae749]/10 rounded-lg transition-all">Next</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}