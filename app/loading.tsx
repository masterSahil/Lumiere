'use client'
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-dark-bg min-h-screen w-full">
      <div className="flex flex-col items-center gap-8">
        
        {/* Simple elegant fast-spinning loader */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[3px] border-primary-500/20 border-t-primary-500"
          />
          {/* Inner pulse */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 bg-primary-400 rounded-full shadow-[0_0_10px_rgba(132,204,22,0.8)]"
          />
        </div>

        {/* Brand Text */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-serif text-[20px] tracking-[0.3em] text-white font-semibold uppercase">
            Lumière
          </span>
          <p className="font-sans text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">
            Curating Experience
          </p>
        </div>

      </div>
    </div>
  );
}