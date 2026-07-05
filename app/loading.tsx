'use client'
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-dark-bg)] min-h-screen w-full overflow-hidden">

      {/* Atmospheric ambient background glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(132,204,22,0.08)_0%,rgba(132,204,22,0)_70%)] rounded-full blur-3xl pointer-events-none" 
      />

      <div className="relative z-10 flex flex-col items-center gap-12">
        
        {/* Interactive Culinary Element - The Morphing Cloche/Plate */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          
          {/* Outer Rotating Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-[var(--color-primary-500)]/30"
          />

          {/* Morphing Inner Shape */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              borderRadius: ["50%", "30%", "50%"],
              rotate: [0, 90, 180]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 bg-[var(--color-primary-500)]/10 border border-[var(--color-primary-500)]/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(132,204,22,0.3)]"
          >
            {/* Core dot */}
            <motion.div 
              animate={{ scale: [1, 0.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 bg-[var(--color-primary-400)] rounded-full"
            />
          </motion.div>
        </div>

        {/* Typography & Subtext */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-1 overflow-hidden"
          >
            {['L', 'U', 'M', 'I', 'È', 'R', 'E'].map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                className="font-serif text-[28px] tracking-[0.2em] text-white font-semibold"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Subtle pulsating subtext */}
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-500)]" 
            />
            <motion.p 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="font-sans text-[11px] tracking-[0.3em] text-gray-400 uppercase font-medium"
            >
              Curating experience
            </motion.p>
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-500)]" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}