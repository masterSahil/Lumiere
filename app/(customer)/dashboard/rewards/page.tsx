'use client'
import { useState } from 'react';
import { Gift, Award, ArrowRight, Sparkles } from 'lucide-react';

export default function Rewards() {
  const [points, setPoints] = useState(1250);

  return (
    <div className="max-w-4xl w-full">
      <div className="mb-8">
        <h1 className="font-serif text-[42px] font-semibold text-white mb-2">Lumière Rewards</h1>
        <p className="text-gray-400 font-sans text-[15px] leading-relaxed">Earn points with every reservation and order.</p>
      </div>

      <div className="bg-linear-to-br from-primary-950 to-dark-surface border border-primary-500/20 rounded-3xl p-10 text-white mb-10 relative overflow-hidden group">
        <div className="absolute -top-20 -right-20 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
          <Gift className="w-96 h-96 text-primary-400" />
        </div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-primary-500/20 blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3 text-primary-400 font-bold uppercase tracking-widest text-[11px]">
              <Sparkles className="w-4 h-4" /> Available Points
            </div>
            <h2 className="text-7xl font-serif font-bold text-white mb-2 tracking-tight">{points}</h2>
            <p className="text-gray-400 text-sm">You are 250 points away from the Platinum Tier!</p>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button className="w-full md:w-auto bg-primary-400 text-[#0d1700] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-primary-300 hover:shadow-[0_0_30px_rgba(158,233,57,0.3)] transition-all duration-300">
              Redeem Points
            </button>
            <button className="w-full md:w-auto bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-white/10 transition-colors duration-300">
              Reward History
            </button>
          </div>
        </div>
      </div>

      <h3 className="font-serif text-[28px] font-semibold text-white mb-6 flex items-center gap-3">
        <Award className="w-6 h-6 text-primary-400" /> Exclusive Offers
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-dark-surface border border-white/5 hover:border-primary-500/30 rounded-2xl p-6 transition-all duration-300 group cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-xl text-white mb-1 group-hover:text-primary-400 transition-colors">Free Signature Dessert</h4>
              <p className="text-[13px] text-gray-400">Redeem for any dessert on the menu.</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-primary-400 font-bold font-mono bg-primary-500/10 px-3 py-1 rounded-full text-sm border border-primary-500/20">500 pts</span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>

        <div className="bg-dark-surface border border-white/5 hover:border-primary-500/30 rounded-2xl p-6 transition-all duration-300 group cursor-pointer relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-xl text-white mb-1 group-hover:text-primary-400 transition-colors">$20 Off Total Bill</h4>
              <p className="text-[13px] text-gray-400">Valid on all orders over $100.</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-primary-400 font-bold font-mono bg-primary-500/10 px-3 py-1 rounded-full text-sm border border-primary-500/20">1000 pts</span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
