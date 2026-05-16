import Head from 'next/head';
// Added LuUser and LuShieldCheck for the new registration fields
import { LuAtSign, LuLock, LuEye, LuUser, LuShieldCheck } from 'react-icons/lu';
import { FaGoogle, FaApple } from 'react-icons/fa';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-[#101415] text-[#e0e3e5]  overflow-x-hidden min-h-screen dark">
        
        {/* Atmospheric Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(132,204,22,0.05)_0%,rgba(132,204,22,0)_70%)] pointer-events-none -top-20 -left-20"></div>
          <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(132,204,22,0.05)_0%,rgba(132,204,22,0)_70%)] pointer-events-none bottom-0 right-0 opacity-40"></div>
        </div>

        {/* Main Layout Container */}
        <main className="relative min-h-screen grid grid-cols-1 md:grid-cols-12 overflow-hidden z-10">
          
          {/* Cinematic Visual Panel (Hidden on Mobile) */}
          <section className="hidden md:flex md:col-span-7 lg:col-span-8 relative items-center justify-center p-[64px] overflow-hidden">
            <div className="absolute inset-0 z-0">
              {/* Note: You can swap this src for a different image to distinguish it from the login page */}
              <img 
                alt="Chef meticulously plating a gourmet dish in a dark, moody kitchen" 
                className="w-full h-full object-cover opacity-60 scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3MVgQgvjzljAqjUUq32CAZUCTn54QO-gJYEKi5X9JFYsS8bI3Y9AYzPc_C0m1ToHzdiCNfv-MzZhM78jT_1KTjJGjqcuptuv4bpqx-DZaVHHjS8Yz6WZwWnK8N3ibd7GL7DO2DXZMHdfm3wVDYJoJetqrav8Sfrc5uR5ZOLoarW_jSlqH9f2M_ZxmkveVtu38hOWvtd8zScBXgesc6XEKFw8pcbJpXsrmonjCzIhzhPfVCxFSgReUdtlVnL7ryfRFgDTiB3QaxepX" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#101415] via-transparent to-transparent"></div>
            </div>
            
            <div className="relative z-10 w-full max-w-2xl">
              <h2 className="font-['Playfair_Display'] text-[64px] leading-[1.1] tracking-[-0.02em] font-bold text-white mb-6">
                Begin your <span className="text-[#9ee939]">culinary</span> journey.
              </h2>
              <p className=" text-[18px] leading-[1.6] text-[#c1cab0] max-w-lg">
                Join our exclusive community. Create an account to manage your reservations, tailor your dietary preferences, and receive priority booking access.
              </p>
            </div>
          </section>

          {/* Registration Panel */}
          <section className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col items-center justify-center p-[20px] md:p-[64px] bg-[#0b0f10] relative z-10 border-l border-white/5 py-24">
            
            {/* Header */}
            <header className="absolute top-0 left-0 w-full flex justify-between items-center px-[20px] md:px-[64px] h-20 z-50">
              <div className="font-['Playfair_Display'] text-[24px] leading-[1.4] font-semibold text-[#9ee939] uppercase tracking-widest">
                Lumière
              </div>
            </header>

            <div className="w-full max-w-md space-y-8">
              
              <div className="space-y-2">
                <h1 className="font-['Playfair_Display'] text-[32px] leading-[1.3] font-semibold text-[#e0e3e5]">Create Account</h1>
                <p className=" text-[16px] text-[#c1cab0]">Enter your details to register for Lumière.</p>
              </div>

              {/* Registration Form */}
              <form className="space-y-5">
                <div className="space-y-4">
                  
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label className=" text-[12px] leading-[1] tracking-[0.1em] font-semibold text-[#c1cab0] block uppercase" htmlFor="name">
                      Full Name
                    </label>
                    <div className="flex items-center bg-[#1d2022] rounded-lg border border-white/10 transition-all duration-300 overflow-hidden focus-within:border-[#84cc16] focus-within:shadow-[0_0_15px_rgba(132,204,22,0.15)]">
                      <LuUser className="mx-4 text-[#c1cab0] text-[20px] shrink-0" />
                      <input 
                        className="w-full py-4 bg-transparent border-none text-[#e0e3e5] focus:ring-0 placeholder:text-[#8b947d]/50 outline-none" 
                        id="name" 
                        placeholder="e.g. Jane Doe" 
                        type="text" 
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className=" text-[12px] leading-[1] tracking-[0.1em] font-semibold text-[#c1cab0] block uppercase" htmlFor="email">
                      Email Address
                    </label>
                    <div className="flex items-center bg-[#1d2022] rounded-lg border border-white/10 transition-all duration-300 overflow-hidden focus-within:border-[#84cc16] focus-within:shadow-[0_0_15px_rgba(132,204,22,0.15)]">
                      <LuAtSign className="mx-4 text-[#c1cab0] text-[20px] shrink-0" />
                      <input 
                        className="w-full py-4 bg-transparent border-none text-[#e0e3e5] focus:ring-0 placeholder:text-[#8b947d]/50 outline-none" 
                        id="email" 
                        placeholder="name@example.com" 
                        type="email" 
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className=" text-[12px] leading-[1] tracking-[0.1em] font-semibold text-[#c1cab0] block uppercase" htmlFor="password">
                      Password
                    </label>
                    <div className="flex items-center bg-[#1d2022] rounded-lg border border-white/10 transition-all duration-300 overflow-hidden focus-within:border-[#84cc16] focus-within:shadow-[0_0_15px_rgba(132,204,22,0.15)]">
                      <LuLock className="mx-4 text-[#c1cab0] text-[20px] shrink-0" />
                      <input 
                        className="w-full py-4 bg-transparent border-none text-[#e0e3e5] focus:ring-0 placeholder:text-[#8b947d]/50 outline-none" 
                        id="password" 
                        placeholder="Create a password" 
                        type="password" 
                      />
                      <button className="px-4 group" type="button" aria-label="Toggle password visibility">
                        <LuEye className="text-[#c1cab0] group-hover:text-[#9ee939] transition-colors text-[20px]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Primary Register Button */}
                <button 
                  className="w-full py-4 bg-[#9ee939] text-[#1f3700]  text-[12px] leading-[1] tracking-[0.1em] uppercase rounded-lg font-bold hover:bg-[#91db2a] transition-all duration-300 shadow-[0_0_20px_rgba(132,204,22,0.2)] active:scale-95" 
                  type="submit"
                >
                  Create Account
                </button>
              </form>

              {/* Social Login */}
              <div className="space-y-6">
                <div className="relative flex items-center gap-4">
                  <div className="flex-grow h-[1px] bg-white/10"></div>
                  <span className=" text-[12px] leading-[1] tracking-[0.1em] font-semibold text-[#c1cab0] uppercase">Or register with</span>
                  <div className="flex-grow h-[1px] bg-white/10"></div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <button className="flex items-center justify-center gap-3 py-3 px-4 bg-[#272a2c] border border-white/10 rounded-lg hover:bg-[#323537] transition-all duration-300 active:scale-[0.98]">
                    <FaGoogle className="text-[18px] text-[#e0e3e5]" />
                    <span className=" text-[16px] text-[#e0e3e5] font-semibold">Google</span>
                  </button>
                </div>
              </div>

              <p className="text-center  text-[16px] text-[#c1cab0]">
                Already have an account?{' '}
                <Link className="text-[#9ee939] font-semibold hover:underline" href="/login">Sign In</Link>
              </p>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-6 w-full px-[20px] md:px-[64px] text-center hidden md:block">
              <p className=" text-[12px] leading-[1] tracking-[0.1em] font-semibold text-[#c1cab0]/60 uppercase">
                © {new Date().getFullYear()} Lumière Modern Gastronomy. All rights reserved.
              </p>
            </footer>

          </section>
        </main>
      </div>
    </>
  );
}