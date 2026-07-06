'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendCode = async (e: any) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/forgot-password', { email });
      if (data.success) {
        toast.success("Recovery code sent to your email!");
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-400/5 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-5">
        
        <div className="w-full max-w-[440px] bg-[#0c120e]/80 backdrop-blur-2xl border border-white/5 rounded-2xl p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary-400/50 to-transparent" />

          {/* Logo & Header */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-[24px] tracking-[0.3em] font-bold text-primary-400 uppercase mb-8">
              LUMIÈRE
            </h1>
            <h2 className="font-serif text-3xl text-white font-bold mb-3">Reset Password</h2>
            <p className="text-gray-400 text-[14px] leading-relaxed max-w-[280px] mx-auto">
              Enter your email to receive a recovery code.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSendCode} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gourmet@lumiere.com"
                  className="w-full bg-[#070b09] border border-white/10 text-white rounded-lg py-4 pl-12 pr-4 focus:ring-1 focus:ring-primary-400 focus:border-primary-400 outline-none transition-all shadow-inner text-[14px]"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-400 text-[#0d1700] py-4 rounded-lg font-bold uppercase tracking-widest text-[12px] hover:bg-primary-300 transition-colors shadow-[0_0_20px_rgba(158,233,57,0.2)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Code'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-[13px]">
              <ArrowLeft className="w-4 h-4" /> Return to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 p-6 text-center text-gray-500 text-[10px] tracking-[0.2em] font-bold uppercase">
        © {new Date().getFullYear()} LUMIÈRE MODERN GASTRONOMY
      </div>
    </div>
  );
}
