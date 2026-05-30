'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { LuSearch, LuBell, LuHandHelping, LuMenu, LuX, LuLayoutGrid, LuList, LuTrash2, LuRotateCcw, LuArrowLeft } from 'react-icons/lu';
import Sidebar from '@/component/Home/Sidebar';
import { AlertTriangle } from 'lucide-react';

// --- MOCK DELETED DATA ---
const INITIAL_TRASH_ITEMS = [
  {
    id: '3',
    name: 'Spicy Wagyu Tartare',
    category: 'Appetizers',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    deletedAt: '2023-10-24',
  },
  {
    id: '5',
    name: 'Dark Chocolate Lava Cake',
    category: 'Dessert Mastery',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    deletedAt: '2023-10-22',
  }
];

export default function TrashMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [trashItems, setTrashItems] = useState(INITIAL_TRASH_ITEMS);

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // --- Handlers ---
  const handleRestore = (id: string) => {
    // In a real app, make an API call to restore here
    setTrashItems(prev => prev.filter(item => item.id !== id));
  };

  const openDeleteModal = (id: string) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      // In a real app, make an API call to permanently delete here
      setTrashItems(prev => prev.filter(item => item.id !== itemToDelete));
      closeDeleteModal();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#131314] selection:bg-[#7ae749] selection:text-[#062100] relative">
        
        {/* Mobile Sidebar Toggle Overlay */}
        <div className="lg:hidden fixed top-0 inset-x-0 bg-[#131314]/90 backdrop-blur-md z-40 p-4 flex justify-between items-center border-b border-white/10">
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
            <input type="text" placeholder="Search deleted items..." className="bg-transparent border-none outline-none focus:ring-0 text-sm w-full text-[#e5e2e3] ml-2 placeholder:text-[#99907c]" />
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
        <main className="lg:ml-64 pt-24 lg:pt-32 px-6 lg:px-12 pb-20 min-h-screen relative z-10">
          <div className="max-w-7xl mx-auto w-full">
            
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div className="flex items-center gap-4">
                <Link href="/menu" className="w-10 h-10 shrink-0 rounded-full bg-[#201f20] flex items-center justify-center text-[#e5e2e3] hover:bg-white/10 transition-colors">
                  <LuArrowLeft className="text-[20px]" />
                </Link>
                <div>
                  <h2 className="text-3xl sm:text-4xl text-[#e5e2e3] font-semibold tracking-tight">Trash Menu</h2>
                  <p className="text-red-400 text-[12px] font-medium uppercase tracking-widest mt-1">Deleted Items • {trashItems.length}</p>
                </div>
              </div>
            </div>

            {/* Controls Bar (View Toggle) */}
            {trashItems.length > 0 && (
              <div className="flex justify-end mb-6 bg-[#1c1b1c] p-2 rounded-2xl border border-white/5 w-fit ml-auto">
                <div className="flex items-center bg-[#131314] p-1 rounded-xl border border-white/5">
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
            )}

            {/* --- GRID VIEW --- */}
            {viewMode === 'grid' && trashItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trashItems.map((item) => (
                  <div key={item.id} className="bg-[#1c1b1c] rounded-3xl border border-white/5 overflow-hidden group hover:border-red-500/20 transition-all flex flex-col grayscale hover:grayscale-0">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-linear-to-t from-[#1c1b1c] via-transparent to-transparent opacity-90"></div>
                      <div className="absolute top-4 left-4 bg-red-500/80 backdrop-blur-md text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        Deleted: {item.deletedAt}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col relative z-10 -mt-8">
                      <p className="text-[#90d883] text-[11px] font-bold uppercase tracking-widest mb-1">{item.category}</p>
                      <h3 className="text-[#e5e2e3] font-semibold text-lg leading-tight mb-3 line-clamp-1">{item.name}</h3>
                      
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[#d0c5af] font-bold text-xl">${item.price.toFixed(2)}</span>
                        <div className="flex gap-2">
                          <button onClick={() => handleRestore(item.id)} title="Restore Item" className="px-3 py-2 bg-[#7ae749]/10 text-[#7ae749] hover:bg-[#7ae749]/20 rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold">
                            <LuRotateCcw className="text-[16px]" /> Restore
                          </button>
                          <button onClick={() => openDeleteModal(item.id)} title="Permanently Delete" className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                            <LuTrash2 className="text-[16px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* --- TABLE VIEW --- */}
            {viewMode === 'table' && trashItems.length > 0 && (
              <div className="bg-[#1c1b1c] rounded-3xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-black/20 text-[11px] uppercase tracking-widest text-[#d0c5af] opacity-80 border-b border-white/5">
                      <tr>
                        <th className="px-6 py-5 font-semibold">Food Item</th>
                        <th className="px-6 py-5 font-semibold">Category</th>
                        <th className="px-6 py-5 font-semibold">Deleted Date</th>
                        <th className="px-6 py-5 font-semibold">Price</th>
                        <th className="px-6 py-5 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {trashItems.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors group grayscale hover:grayscale-0">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-[#e5e2e3] font-semibold text-[15px]">{item.name}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#d0c5af] text-[14px]">{item.category}</td>
                          <td className="px-6 py-4 text-red-400 text-[14px]">{item.deletedAt}</td>
                          <td className="px-6 py-4 text-[#e5e2e3] font-bold">${item.price.toFixed(2)}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleRestore(item.id)} className="px-4 py-1.5 bg-[#7ae749]/10 hover:bg-[#7ae749]/20 text-[#7ae749] font-semibold text-sm rounded-lg transition-colors flex items-center gap-2">
                                <LuRotateCcw className="text-[14px]" /> Restore
                              </button>
                              <button onClick={() => openDeleteModal(item.id)} className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-colors">
                                <LuTrash2 className="text-[16px]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty State Fallback (If Trash is empty) */}
            {trashItems.length === 0 && (
              <div className="w-full bg-[#1c1b1c] border border-white/5 rounded-3xl py-24 flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <LuTrash2 className="text-4xl text-[#d0c5af] opacity-40" />
                </div>
                <h3 className="text-2xl text-white font-semibold mb-2">Trash is empty</h3>
                <p className="text-[#d0c5af] text-[15px] max-w-md">There are currently no deleted items. Items deleted from the main menu will appear here.</p>
                <Link href="/menu">
                  <button className="mt-8 bg-[#2a2a2b] hover:bg-[#7ae749] text-white hover:text-[#062100] px-6 py-3 rounded-full font-bold transition-all text-[14px]">
                    Back to Main Menu
                  </button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* --- CONFIRMATION MODAL POP-UP --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={closeDeleteModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-[#1c1b1c] border border-white/10 rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
              <AlertTriangle className="text-3xl text-red-500" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Permanently Delete?</h3>
            <p className="text-[#d0c5af] mb-8 leading-relaxed">
              Are you sure you want to delete this item permanently? This action cannot be undone and all data will be lost.
            </p>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={closeDeleteModal}
                className="flex-1 px-6 py-3 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}