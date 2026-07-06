'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function VerifyOtpPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(54);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) return toast.error("Please enter the 6-digit code");
    
    setLoading(true);
    setTimeout(() => {
      toast.success("Identity verified!");
      setLoading(false);
      router.push('/reset-password');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col font-sans">
      
      {/* Top Nav */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-white/5 shrink-0 relative z-10">
        <Link href="/login" className="flex items-center gap-4 text-primary-400 hover:text-primary-300 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-serif text-[20px] tracking-[0.2em] font-bold uppercase">Lumière</span>
        </Link>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <span className="hover:text-white cursor-pointer transition-colors">Experience</span>
          <span className="hover:text-white cursor-pointer transition-colors">Menu</span>
          <span className="text-primary-400">Verification</span>
          <span className="border border-white/10 px-4 py-1.5 rounded-full hover:bg-white/5 cursor-pointer transition-colors">Help</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-5 relative">
        <div className="absolute inset-0 z-0 opacity-30 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] bg-primary-400/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-[480px] w-full">
          <div className="w-20 h-20 rounded-full border border-primary-400/20 bg-primary-400/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(158,233,57,0.15)]">
            <Lock className="w-8 h-8 text-primary-400" />
          </div>

          <h1 className="font-serif text-5xl font-bold text-white mb-4">Security Check</h1>
          <p className="text-gray-400 text-center text-[15px] leading-relaxed mb-10">
            We've sent a 6-digit code to your email. Please<br/>enter it below to confirm your identity.
          </p>

          <div className="flex justify-center gap-3 md:gap-4 mb-10 w-full">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={el => { inputRefs.current[idx] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(idx, e)}
                className="w-12 h-14 md:w-16 md:h-16 bg-[#070b09] border border-white/10 text-white text-center text-2xl font-bold rounded-xl focus:border-primary-400 focus:ring-1 focus:ring-primary-400 outline-none transition-all shadow-inner"
              />
            ))}
          </div>

          <div className="text-center mb-10 text-[13px]">
            <p className="text-gray-400 mb-2">Didn't receive the code?</p>
            <div className="flex items-center justify-center gap-4 text-xs font-bold tracking-widest uppercase">
              <span className="text-gray-500">RESEND IN 00:{timeLeft.toString().padStart(2, '0')}</span>
              <span className="text-white/20">|</span>
              <button disabled={timeLeft > 0} onClick={() => setTimeLeft(54)} className={`transition-colors ${timeLeft > 0 ? 'text-gray-600' : 'text-primary-400 hover:text-primary-300'}`}>
                RESEND NOW
              </button>
            </div>
          </div>

          <button 
            onClick={handleVerify}
            disabled={loading}
            className="w-full max-w-[400px] bg-primary-400 text-[#0d1700] py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-primary-300 transition-colors shadow-[0_0_30px_rgba(158,233,57,0.3)] disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Confirm Verification'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center px-8 py-6 border-t border-white/5 shrink-0 text-[12px] font-semibold text-gray-400">
        <span className="font-serif text-[18px] tracking-[0.2em] font-bold uppercase text-primary-400 mb-4 md:mb-0">Lumière</span>
        <div className="flex gap-6 mb-4 md:mb-0">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
        </div>
        <span className="text-[10px] tracking-wider">© 2026 Lumière Modern Gastronomy. All rights reserved.</span>
      </footer>
    </div>
  );
}
