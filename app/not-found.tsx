"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LuArrowLeft, LuUtensils } from 'react-icons/lu';

export default function page() {

  const router = useRouter()
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-[#101415] text-[#e0e3e5] overflow-hidden min-h-screen flex flex-col dark relative">
        
        {/* Atmospheric Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute w-200 h-200 bg-[radial-gradient(circle,rgba(132,204,22,0.03)_0%,rgba(132,204,22,0)_70%)] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Header */}
        <header className="w-full flex justify-between items-center px-5 md:px-16 h-20 z-50 relative">
          <Link href="/" className=" text-6 leading-[1.4] font-semibold text-[#9ee939] uppercase tracking-widest hover:opacity-80 transition-opacity">
            Lumière
          </Link>
        </header>

        {/* Main 404 Content */}
        <main className="grow flex flex-col items-center justify-center relative z-10 px-5 text-center w-full">
          
          {/* Massive Background 404 Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none select-none overflow-hidden z-0">
             <span className=" text-[200px] md:text-[350px] leading-none font-bold text-[#9ee939] opacity-[0.03]">
               404
             </span>
          </div>

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h1 className=" text-[48px] md:text-[64px] leading-[1.1] tracking-[-0.02em] font-bold text-white">
              The plate is <span className="text-[#9ee939]">empty</span>.
            </h1>
            
            <p className="font-['Inter'] text-[18px] leading-[1.6] text-[#c1cab0] max-w-lg mx-auto">
              It seems the page you are looking for has been removed from our tasting menu, or the URL was entered incorrectly. 
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <button onClick={()=>router.back()}
                className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-8 bg-[#9ee939] text-[#1f3700] text-[12px] leading-none tracking-widest uppercase rounded-lg font-bold hover:bg-[#91db2a] transition-all duration-300 shadow-[0_0_20px_rgba(132,204,22,0.2)] active:scale-95">
                <LuArrowLeft className="text-[18px]" /> Return Back
              </button>
              
              <Link href="/menu" 
                className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-8 bg-[#272a2c] border border-white/10 text-[#e0e3e5] text-[12px] leading-none tracking-widest uppercase rounded-lg font-bold hover:bg-[#323537] transition-all duration-300 active:scale-[0.98]">
                <LuUtensils className="text-[18px]" /> View Current Menu
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full px-5 md:px-16 pb-6 text-center z-50 relative">
          <p className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0]/60 uppercase">
            © {new Date().getFullYear()} Lumière Modern Gastronomy. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}