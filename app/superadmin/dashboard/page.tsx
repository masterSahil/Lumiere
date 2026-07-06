'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, Activity, Users, DollarSign } from 'lucide-react';

export default function SuperAdminDashboard() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-10">
        <h1 className="font-serif text-[42px] leading-tight font-semibold text-white mb-2">Platform Overview</h1>
        <p className="text-gray-400 font-sans max-w-xl text-[15px] leading-relaxed">
          High-level metrics and system health for the entire Lumière platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-dark-surface p-6 rounded-2xl border border-white/5 relative group overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Total Users</p>
              <h3 className="text-3xl font-serif text-white">12,450</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-surface p-6 rounded-2xl border border-white/5 relative group overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-500">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Total Revenue</p>
              <h3 className="text-3xl font-serif text-white">$142,300</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-surface p-6 rounded-2xl border border-white/5 relative group overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Active Admins</p>
              <h3 className="text-3xl font-serif text-white">8</h3>
            </div>
          </div>
        </div>

        <div className="bg-dark-surface p-6 rounded-2xl border border-white/5 relative group overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-500">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">System Health</p>
              <h3 className="text-3xl font-serif text-white">100%</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-surface rounded-2xl p-6 border border-white/5 h-80 flex flex-col justify-center items-center text-gray-500">
          <Activity className="w-10 h-10 mb-4 opacity-50" />
          <p>Revenue Growth Chart</p>
        </div>
        <div className="bg-dark-surface rounded-2xl p-6 border border-white/5 h-80 flex flex-col justify-center items-center text-gray-500">
          <Users className="w-10 h-10 mb-4 opacity-50" />
          <p>User Sign-ups Over Time</p>
        </div>
      </div>
    </div>
  );
}
