"use client"

import { LuAtSign, LuLock, LuEye, LuUser, LuEyeClosed } from 'react-icons/lu';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import Image from 'next/image';
import dish from "@/assets/images/auth/dish.png"
import { useRouter } from 'next/navigation';

export default function RegisterPage() {

  const [formData, setFormData] = useState({
    username: '', email: '', password: ''
  });
  const [inpPwd, setInpPwd] = useState(true);
  const EYEIcon = inpPwd ? LuEye : LuEyeClosed;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const router = useRouter();

  const Register = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await axios.post("/api/auth/register", formData);
      setFormData({
        username: '', email: '', password: ''
      });
      const role = res.data.data.role;
      if (role === 'admin' || role === 'superadmin') {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log("FULL ERROR:", error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <div className="bg-dark-bg text-white overflow-x-hidden min-h-screen dark">
        
        {/* Atmospheric Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute w-150 h-150 bg-[radial-gradient(circle,rgba(132,204,22,0.05)_0%,rgba(132,204,22,0)_70%)] pointer-events-none -top-20 -left-20"></div>
          <div className="absolute w-150 h-150 bg-[radial-gradient(circle,rgba(132,204,22,0.05)_0%,rgba(132,204,22,0)_70%)] pointer-events-none bottom-0 right-0 opacity-40"></div>
        </div>

        {/* Main Layout Container */}
        <main className="relative min-h-screen grid grid-cols-1 md:grid-cols-12 overflow-hidden z-10">
          
          {/* Cinematic Visual Panel (Hidden on Mobile) */}
          <section className="hidden md:flex md:col-span-7 lg:col-span-8 relative items-center justify-center p-16 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image src={dish} alt='Chef meticulously plating a gourmet dish in a dark, moody kitchen'
                      className="w-full h-full object-cover opacity-60 scale-105" />
              <div className="absolute inset-0 bg-linear-to-r from-dark-bg via-transparent to-transparent"></div>
            </div>
            
            <div className="relative z-10 w-full max-w-2xl">
              <h2 className="text-[64px] leading-[1.1] tracking-[-0.02em] font-bold text-white mb-6">
                Begin your <span className="font-serif text-primary-400">culinary</span> journey.
              </h2>
              <p className="text-[18px] leading-[1.6] text-gray-300 max-w-lg">
                Join our exclusive community. Create an account to manage your reservations, tailor your dietary preferences, and receive priority booking access.
              </p>
            </div>
          </section>

          {/* Registration Panel */}
          <section className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col items-center justify-center p-5 md:p-16 bg-dark-surface relative z-10 border-l border-white/5 md:py-24">
            
            {/* Header */}
            <header className="absolute top-0 left-0 w-full flex justify-between items-center px-5 md:px-16 h-20 z-50">
              <Link href="/" className="font-serif text-xl leading-[1.4] font-semibold text-primary-400 uppercase tracking-widest">
                Lumière
              </Link>
            </header>

            <div className="w-full max-w-md space-y-8">
              
              <div className="space-y-2">
                <h1 className="text-[32px] leading-[1.3] font-semibold text-white">Create Account</h1>
                <p className="text-sm text-gray-400">Enter your details to register for Lumière.</p>
              </div>

              {/* Registration Form */}
              <form className="space-y-5" onSubmit={Register}>
                <div className="space-y-4">
                  
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label className="text-[12px] leading-none tracking-widest font-semibold text-gray-400 block uppercase" htmlFor="name">
                      Full Name
                    </label>
                    <div className="flex items-center bg-dark-bg rounded-lg border border-white/10 transition-all duration-300 overflow-hidden focus-within:border-primary-500 focus-within:shadow-[0_0_15px_rgba(132,204,22,0.15)]">
                      <LuUser className="mx-4 text-gray-400 text-5 shrink-0" />
                      <input name="username" value={formData.username} placeholder="e.g. Jane Doe" type="text" 
                        className="w-full py-3 bg-transparent border-none text-white focus:ring-0 placeholder:text-gray-500 outline-none" onChange={handleChange} />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-[12px] leading-none tracking-widest font-semibold text-gray-400 block uppercase" htmlFor="email">
                      Email Address
                    </label>
                    <div className="flex items-center bg-dark-bg rounded-lg border border-white/10 transition-all duration-300 overflow-hidden focus-within:border-primary-500 focus-within:shadow-[0_0_15px_rgba(132,204,22,0.15)]">
                      <LuAtSign className="mx-4 text-gray-400 text-5 shrink-0" />
                      <input 
                        className="w-full py-3 bg-transparent border-none text-white focus:ring-0 placeholder:text-gray-500 outline-none" 
                        name="email" 
                        placeholder="name@example.com" 
                        type="email" value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-[12px] leading-none tracking-widest font-semibold text-gray-400 block uppercase" htmlFor="password">
                      Password
                    </label>
                    <div className="flex items-center bg-dark-bg rounded-lg border border-white/10 transition-all duration-300 overflow-hidden focus-within:border-primary-500 focus-within:shadow-[0_0_15px_rgba(132,204,22,0.15)]">
                      <LuLock className="mx-4 text-gray-400 text-5 shrink-0" />
                      <input 
                        className="w-full py-4 bg-transparent border-none text-white focus:ring-0 placeholder:text-gray-500 outline-none" 
                        name="password" placeholder="Create a password" onChange={handleChange}
                        type={inpPwd ? "password" : "text"} value={formData.password} />
                      <button className="px-4 group" type="button" aria-label="Toggle password visibility">
                        <EYEIcon onClick={()=>setInpPwd(!inpPwd)} className="text-gray-400 group-hover:text-primary-400 transition-colors text-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Primary Register Button */}
                <button className="w-full py-4 bg-primary-500 text-dark-bg text-[12px] leading-none tracking-widest uppercase rounded-lg font-bold hover:bg-primary-400 transition-all duration-300 shadow-[0_0_20px_rgba(132,204,22,0.2)] active:scale-95" 
                  type="submit">
                  Create Account
                </button>
              </form>

              {/* Social Login */}
              <div className="space-y-6">
                <div className="relative flex items-center gap-4">
                  <div className="grow h-px bg-white/10"></div>
                  <span className="text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Or register with</span>
                  <div className="grow h-px bg-white/10"></div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <button className="flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 active:scale-[0.98]">
                    <FaGoogle className="text-[18px] text-white" />
                    <span className="text-sm text-white font-semibold">Google</span>
                  </button>
                </div>
              </div>

              <p className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link className="text-primary-400 font-semibold hover:underline" href="/login">Sign In</Link>
              </p>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-6 w-full px-5 md:px-16 text-center hidden md:block">
              <p className="text-[12px] leading-none tracking-widest font-semibold text-gray-500 uppercase">
                © {new Date().getFullYear()} Lumière Modern Gastronomy.
              </p>
            </footer>
          </section>
        </main>
      </div>
    </>
  );
}