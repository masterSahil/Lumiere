'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Flame, UtensilsCrossed } from 'lucide-react';
import axios from 'axios';

export default function LiveStatusWidget() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data } = await axios.get('/api/restaurant/status');
        if (data.success) {
          setStatus(data.data);
        }
      } catch (err) {
        console.error("Live status error", err);
      }
    };
    
    fetchStatus();
    // Poll every 60 seconds
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return null; // Don't show skeleton to keep UI clean, just fade in when ready

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12 w-full max-w-7xl mx-auto"
    >
      {/* Wait Time */}
      <div className="bg-dark-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Clock className="w-24 h-24 text-primary-400" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
            <Clock className="w-4 h-4 text-primary-400" />
          </div>
          <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-400">Current Wait</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-serif text-white">{status.waitTime}</span>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Mins</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          <span className="text-[10px] text-primary-400 uppercase tracking-widest font-bold">Live ETA</span>
        </div>
      </div>

      {/* Occupancy */}
      <div className="bg-dark-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Users className="w-24 h-24 text-primary-400" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
            <Users className="w-4 h-4 text-primary-400" />
          </div>
          <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-400">Occupancy</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-serif text-white">{status.occupancyPercent}%</span>
        </div>
        <div className="mt-4 w-full h-1.5 bg-dark-bg rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${status.occupancyPercent}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-primary-500"
          />
        </div>
      </div>

      {/* Kitchen Load */}
      <div className="bg-dark-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Flame className="w-24 h-24 text-primary-400" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
            <Flame className="w-4 h-4 text-primary-400" />
          </div>
          <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-400">Kitchen Load</h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-serif text-white">{status.activeOrders}</span>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Orders</span>
        </div>
        <div className="mt-4">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            {status.activeOrders > 15 ? 'High Volume' : status.activeOrders > 5 ? 'Steady Flow' : 'Relaxed Pace'}
          </span>
        </div>
      </div>

      {/* Top Pick */}
      {status.topPick && (
        <div className="bg-dark-surface/40 backdrop-blur-md border border-primary-500/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <UtensilsCrossed className="w-24 h-24 text-primary-400" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
              <UtensilsCrossed className="w-4 h-4 text-primary-400" />
            </div>
            <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-400">Chef's Pick</h3>
          </div>
          <div>
            <h4 className="text-lg font-serif text-white truncate pr-6">{status.topPick.name}</h4>
            <p className="text-primary-400 font-bold text-sm mt-1">${status.topPick.price}</p>
          </div>
          <div className="mt-4">
            <span className="text-[10px] bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full uppercase tracking-widest font-bold">
              Trending Now
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
