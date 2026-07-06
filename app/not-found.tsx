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

      <div className="bg-dark-bg text-gray-300 overflow-hidden min-h-screen flex flex-col relative font-sans">
        
        {/* Atmospheric Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Header */}
        <header className="w-full flex justify-between items-center px-5 md:px-20 h-24 z-50 relative border-b border-white/5">
          <Link href="/" className="font-serif text-3xl font-bold text-primary-400 hover:text-primary-300 transition-colors">
            Lumière
          </Link>
        </header>

        {/* Main 404 Content */}
        <main className="grow flex flex-col items-center justify-center relative z-10 px-5 text-center w-full">
          
          {/* Massive Background 404 Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none select-none overflow-hidden z-0">
             <span className="font-serif text-[200px] md:text-[350px] leading-none font-bold text-primary-500/5">
               404
             </span>
          </div>

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h1 className="font-serif text-[48px] md:text-[64px] leading-tight font-bold text-white">
              The plate is <span className="text-primary-400">empty</span>.
            </h1>
            
            <p className="font-sans text-[16px] leading-[1.6] text-gray-400 max-w-lg mx-auto">
              It seems the page you are looking for has been removed from our tasting menu, or the URL was entered incorrectly. 
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <button onClick={()=>router.back()}
                className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-8 bg-primary-500 text-dark-bg text-[12px] leading-none tracking-widest uppercase rounded-lg font-bold hover:bg-primary-400 transition-all duration-300 shadow-[0_0_20px_rgba(132,204,22,0.2)] active:scale-95">
                <LuArrowLeft className="text-[18px]" /> Return Back
              </button>
              
              <Link href="/menu" 
                className="w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-8 bg-dark-surface border border-white/10 text-white text-[12px] leading-none tracking-widest uppercase rounded-lg font-bold hover:bg-white/5 transition-all duration-300 active:scale-[0.98]">
                <LuUtensils className="text-[18px]" /> View Current Menu
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full px-5 md:px-20 py-8 border-t border-white/5 text-center z-50 relative bg-dark-bg">
          <p className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-500 uppercase">
            © {new Date().getFullYear()} Lumière Dining. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}