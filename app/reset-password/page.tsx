'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RotateCcw, Eye, EyeOff, ShieldCheck, BadgeCheck, Fingerprint } from 'lucide-react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function ResetPasswordPage() {
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const handleReset = async (e: any) => {
    e.preventDefault();
    if (!pwd || !confirmPwd) return toast.error("Please fill in all fields");
    if (pwd !== confirmPwd) return toast.error("Passwords do not match");
    if (pwd.length < 8) return toast.error("Password must be at least 8 characters");
    if (!email || !token) return toast.error("Missing reset token. Please restart the process.");
    
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/reset-password', {
        email,
        token,
        newPassword: pwd
      });
      if (data.success) {
        toast.success("Password successfully reset!");
        router.push('/login');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // Simple strength calc
  const getStrength = () => {
    let score = 0;
    if (pwd.length > 7) score++;
    if (pwd.length > 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength();
  const strengthLabels = ['WEAK', 'FAIR', 'GOOD', 'STRONG', 'OPTIMAL', 'OPTIMAL'];

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col font-sans">
      
      {/* Top Nav */}
      <header className="flex justify-between items-center px-8 py-6 shrink-0 relative z-10">
        <Link href="/login" className="flex items-center gap-4 text-primary-400 hover:text-primary-300 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-serif text-[20px] tracking-[0.2em] font-bold uppercase">Lumière</span>
        </Link>
        <span className="text-[11px] font-medium text-gray-400 hover:text-white cursor-pointer transition-colors">Help</span>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-5 relative z-10">
        
        {/* Background glow behind form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="w-full max-w-[460px] bg-dark-surface border border-white/5 rounded-2xl p-10 mb-12 relative overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-primary-400/10 border border-primary-400/20 flex items-center justify-center mb-6">
              <RotateCcw className="w-5 h-5 text-primary-400" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-white mb-3">Reset Password</h1>
            <p className="text-gray-400 text-[14px] leading-relaxed max-w-[300px]">
              Secure your account with a new sophisticated passphrase for your Lumière experience.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">New Password</label>
              <div className="relative">
                <input 
                  type={showPwd ? "text" : "password"} 
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="w-full bg-[#070b09] border border-white/10 text-white rounded-lg py-3.5 px-4 focus:ring-1 focus:ring-primary-400 outline-none transition-all text-[24px] tracking-widest font-mono"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Strength Meter */}
              {pwd.length > 0 && (
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1 text-[9px] font-bold tracking-widest uppercase">
                    <span className="text-primary-400">Security Strength: {strengthLabels[strength] || 'WEAK'}</span>
                  </div>
                  <div className="flex gap-1 h-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`flex-1 rounded-full ${i < strength ? 'bg-primary-400' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Confirm New Password</label>
              <input 
                type={showPwd ? "text" : "password"} 
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                className="w-full bg-[#070b09] border border-white/10 text-white rounded-lg py-3.5 px-4 focus:ring-1 focus:ring-primary-400 outline-none transition-all text-[24px] tracking-widest font-mono"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary-400 text-[#0d1700] py-4 rounded-lg font-serif text-[18px] hover:bg-primary-300 transition-colors shadow-[0_0_20px_rgba(158,233,57,0.2)] disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Reset Password'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors text-[13px]">
              Return to member sign-in
            </Link>
          </div>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1000px]">
          <div className="bg-dark-surface/50 border border-white/5 rounded-2xl p-8 hover:bg-dark-surface transition-colors">
            <ShieldCheck className="w-5 h-5 text-primary-400 mb-4" />
            <h3 className="font-serif text-[18px] text-white mb-3">Advanced Encryption</h3>
            <p className="text-gray-400 text-[13px] leading-relaxed">
              Your credentials are protected by state-of-the-art cryptographic protocols, ensuring your Lumière profile remains exclusive.
            </p>
          </div>
          <div className="bg-dark-surface/50 border border-white/5 rounded-2xl p-8 hover:bg-dark-surface transition-colors">
            <BadgeCheck className="w-5 h-5 text-primary-400 mb-4" />
            <h3 className="font-serif text-[18px] text-white mb-3">Identity Assurance</h3>
            <p className="text-gray-400 text-[13px] leading-relaxed">
              Multi-factor validation checks ensure that every password reset request is authenticated against your unique digital footprint.
            </p>
          </div>
          <div className="bg-dark-surface/50 border border-white/5 rounded-2xl p-8 hover:bg-dark-surface transition-colors">
            <Fingerprint className="w-5 h-5 text-primary-400 mb-4" />
            <h3 className="font-serif text-[18px] text-white mb-3">Biometric Sync</h3>
            <p className="text-gray-400 text-[13px] leading-relaxed">
              Once updated, your new passphrase seamlessly synchronizes with your device's biometric security for effortless future access.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center px-12 py-8 shrink-0 text-[13px] text-gray-400 bg-[#0a0d0e] border-t border-white/5">
        <span className="font-serif text-[24px] font-bold text-primary-400 mb-4 md:mb-0">Lumière</span>
        <div className="flex gap-8 mb-4 md:mb-0">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
        </div>
        <span className="text-[11px] tracking-wider">© 2026 Lumière Modern Gastronomy. All rights reserved.</span>
      </footer>
    </div>
  );
}
