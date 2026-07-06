'use client'
import { Heart, Search, ShoppingBag } from 'lucide-react';

export default function Wishlist() {
  return (
    <div className="max-w-4xl w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="font-serif text-[42px] font-semibold text-white mb-2">Your Wishlist</h1>
          <p className="text-gray-400 font-sans text-[15px] leading-relaxed">Dishes you've saved for later.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search wishlist..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-primary-500 bg-dark-surface text-white placeholder:text-gray-500 transition-colors" 
          />
        </div>
      </div>

      <div className="bg-dark-surface rounded-3xl border border-white/5 p-16 flex flex-col items-center justify-center text-center relative overflow-hidden group">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors duration-700 pointer-events-none"></div>

        <div className="w-20 h-20 bg-primary-500/10 text-primary-400 rounded-full flex items-center justify-center mb-6 border border-primary-500/20 relative z-10 shadow-[0_0_30px_rgba(158,233,57,0.15)] group-hover:scale-110 transition-transform duration-500">
          <Heart className="w-10 h-10 fill-current" />
        </div>
        
        <h2 className="text-2xl font-serif font-semibold text-white mb-3 relative z-10">Your wishlist is empty</h2>
        <p className="text-gray-400 max-w-md mb-8 leading-relaxed relative z-10 text-[15px]">
          You haven't saved any dishes to your wishlist yet. Explore our curated menu and save your favorite culinary experiences for later!
        </p>
        
        <button className="relative z-10 flex items-center gap-2 bg-primary-400 text-[#0d1700] px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-primary-300 hover:shadow-[0_0_25px_rgba(158,233,57,0.4)] transition-all duration-300">
          <ShoppingBag className="w-4 h-4" /> Explore Menu
        </button>
      </div>
    </div>
  );
}
