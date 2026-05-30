'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { LuSearch, LuBell, LuHandHelping, LuMenu, LuX, LuPlus, LuLayoutGrid, LuList, LuTrash2, LuFlame, LuLeaf, LuUtensils, LuStar, LuPen } from 'react-icons/lu';
import Sidebar from '@/component/Home/Sidebar';

// --- MOCK DATA ---
const MENU_ITEMS = [
  {
    id: '1',
    name: 'Truffle-Infused Ribeye',
    category: 'Signature Entrees',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    attributes: { spicy: false, veg: false, nonVeg: true },
    isPopular: true,
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Wild Mushroom Risotto',
    category: 'Signature Entrees',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1633337474563-1d01f582f3fb?w=600&q=80',
    attributes: { spicy: false, veg: true, nonVeg: false },
    isPopular: false,
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Spicy Wagyu Tartare',
    category: 'Appetizers',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    attributes: { spicy: true, veg: false, nonVeg: true },
    isPopular: true,
    isAvailable: false,
  },
  {
    id: '4',
    name: 'Artisanal Burrata Pizza',
    category: 'Artisanal Pizza',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
    attributes: { spicy: false, veg: true, nonVeg: false },
    isPopular: true,
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Dark Chocolate Lava Cake',
    category: 'Dessert Mastery',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    attributes: { spicy: false, veg: true, nonVeg: false },
    isPopular: false,
    isAvailable: true,
  },
  {
    id: '6',
    name: 'Fire-Roasted Lobster',
    category: 'Signature Entrees',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80',
    attributes: { spicy: true, veg: false, nonVeg: true },
    isPopular: true,
    isAvailable: true,
  }
];

export default function ManageMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Signature Entrees', 'Appetizers', 'Artisanal Pizza', 'Dessert Mastery'];

  // Filter items based on category
  const filteredItems = MENU_ITEMS.filter(item => 
    activeCategory === 'All' ? true : item.category === activeCategory
  );

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
        <header className="hidden lg:flex fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-[#131314]/90 backdrop-blur-md border-b border-white/5 items-center justify-between px-8 xl:px-12 z-30">
          <div className="flex items-center bg-[#2a2a2b] rounded-full px-4 py-1.5 w-96 border border-transparent focus-within:border-white/10 transition-colors">
            <LuSearch className="text-[#99907c] text-[18px]" />
            <input type="text" placeholder="Search menu items..." className="bg-transparent border-none outline-none focus:ring-0 text-sm w-full text-[#e5e2e3] ml-2 placeholder:text-[#99907c]" />
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
        <main className="lg:ml-64 pt-24 lg:pt-32 px-6 lg:px-12 pb-20 min-h-screen relative">
          <div className="max-w-7xl mx-auto w-full">
            
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h2 className="text-3xl sm:text-4xl text-[#e5e2e3] font-semibold tracking-tight">Manage Menu</h2>
                <p className="text-[#90d883] text-[12px] font-medium uppercase tracking-widest mt-1">Lumière Gastronomy • {MENU_ITEMS.length} Items</p>
              </div>
              <Link href="/menu/add">
                <button className="flex items-center gap-2 bg-[#7ae749] text-[#062100] px-6 py-3 rounded-full font-bold transition-all hover:bg-[#4abe15] text-[15px]">
                  <LuPlus className="text-lg" /> Add New Item
                </button>
              </Link>
            </div>

            {/* Controls Bar (Filters & Toggle) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-[#1c1b1c] p-2 rounded-2xl border border-white/5">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar pl-2">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-semibold transition-all ${
                      activeCategory === cat 
                      ? 'bg-[#7ae749]/15 text-[#7ae749] border border-[#7ae749]/30' 
                      : 'text-[#d0c5af] hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-[#131314] p-1 rounded-xl border border-white/5 shrink-0 mx-2 sm:mx-0">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#2a2a2b] text-[#7ae749] shadow-sm' : 'text-[#d0c5af] hover:text-white'}`}
                >
                  <LuLayoutGrid className="text-[18px]" />
                </button>
                <button 
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-[#2a2a2b] text-[#7ae749] shadow-sm' : 'text-[#d0c5af] hover:text-white'}`}
                >
                  <LuList className="text-[18px]" />
                </button>
              </div>
            </div>

            {/* --- GRID VIEW --- */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <div key={item.id} className="bg-[#1c1b1c] rounded-3xl border border-white/5 overflow-hidden group hover:border-white/15 transition-all flex flex-col">
                    {/* Image Area */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-linear-to-t from-[#1c1b1c] via-transparent to-transparent opacity-80"></div>
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {item.isPopular && (
                          <span className="bg-yellow-500/90 text-black px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-md shadow-lg">
                            <LuStar className="text-[12px]" /> Popular
                          </span>
                        )}
                      </div>
                      
                      {/* Availability Overlay (if out of stock) */}
                      {!item.isAvailable && (
                         <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-red-400/50">Sold Out</span>
                         </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-[#90d883] text-[11px] font-bold uppercase tracking-widest mb-1">{item.category}</p>
                      <h3 className="text-[#e5e2e3] font-semibold text-lg leading-tight mb-3 line-clamp-1">{item.name}</h3>
                      
                      {/* Attributes */}
                      <div className="flex gap-2 mb-4">
                        {item.attributes.spicy && <span title="Spicy" className="w-7 h-7 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500"><LuFlame className="text-[14px]" /></span>}
                        {item.attributes.veg && <span title="Vegetarian" className="w-7 h-7 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500"><LuLeaf className="text-[14px]" /></span>}
                        {item.attributes.nonVeg && <span title="Non-Veg" className="w-7 h-7 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500"><LuUtensils className="text-[14px]" /></span>}
                      </div>

                      {/* Footer: Price & Actions */}
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[#7ae749] font-bold text-xl">${item.price.toFixed(2)}</span>
                        <div className="flex gap-1">
                          <button className="p-2 text-[#d0c5af] hover:text-[#7ae749] hover:bg-white/5 rounded-lg transition-colors"><LuPen className="text-[16px]" /></button>
                          <button className="p-2 text-[#d0c5af] hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"><LuTrash2 className="text-[16px]" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* --- TABLE VIEW --- */}
            {viewMode === 'table' && (
              <div className="bg-[#1c1b1c] rounded-3xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-black/20 text-[11px] uppercase tracking-widest text-[#d0c5af] opacity-80 border-b border-white/5">
                      <tr>
                        <th className="px-6 py-5 font-semibold">Food Item</th>
                        <th className="px-6 py-5 font-semibold">Category</th>
                        <th className="px-6 py-5 font-semibold">Attributes</th>
                        <th className="px-6 py-5 font-semibold">Status</th>
                        <th className="px-6 py-5 font-semibold">Price</th>
                        <th className="px-6 py-5 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                          {/* Image & Name */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                {item.isPopular && <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-500 rounded-bl-lg"></div>}
                              </div>
                              <div>
                                <p className="text-[#e5e2e3] font-semibold text-[15px]">{item.name}</p>
                                {item.isPopular && <p className="text-yellow-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">Popular</p>}
                              </div>
                            </div>
                          </td>
                          
                          {/* Category */}
                          <td className="px-6 py-4">
                            <span className="text-[#d0c5af] text-[14px]">{item.category}</span>
                          </td>

                          {/* Attributes */}
                          <td className="px-6 py-4">
                            <div className="flex gap-1.5">
                              {item.attributes.spicy && <span title="Spicy" className="w-6 h-6 rounded-md bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500"><LuFlame className="text-[12px]" /></span>}
                              {item.attributes.veg && <span title="Vegetarian" className="w-6 h-6 rounded-md bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500"><LuLeaf className="text-[12px]" /></span>}
                              {item.attributes.nonVeg && <span title="Non-Veg" className="w-6 h-6 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500"><LuUtensils className="text-[12px]" /></span>}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            {item.isAvailable ? (
                              <span className="px-3 py-1 bg-[#7ae749]/10 text-[#7ae749] border border-[#7ae749]/20 rounded-full text-[11px] font-bold uppercase tracking-wider">Available</span>
                            ) : (
                              <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-[11px] font-bold uppercase tracking-wider">Sold Out</span>
                            )}
                          </td>

                          {/* Price */}
                          <td className="px-6 py-4">
                            <span className="text-[#e5e2e3] font-bold">${item.price.toFixed(2)}</span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 bg-white/5 hover:bg-white/10 text-[#d0c5af] hover:text-white rounded-lg transition-colors"><LuPen className="text-[16px]" /></button>
                              <button className="p-2 bg-white/5 hover:bg-red-500/20 text-[#d0c5af] hover:text-red-400 rounded-lg transition-colors"><LuTrash2 className="text-[16px]" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty State Fallback (If filter results in 0 items) */}
            {filteredItems.length === 0 && (
              <div className="w-full bg-[#1c1b1c] border border-white/5 rounded-3xl py-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <LuSearch className="text-3xl text-[#d0c5af] opacity-50" />
                </div>
                <h3 className="text-xl text-white font-semibold mb-2">No items found</h3>
                <p className="text-[#d0c5af] text-sm">We couldn't find any menu items in this category.</p>
                <button onClick={() => setActiveCategory('All')} className="mt-6 text-[#7ae749] hover:underline text-sm font-semibold">Clear Filters</button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}