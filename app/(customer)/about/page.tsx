'use client';

import UserNavbar from '@/component/layout/UserNavbar';
import Footer from '@/component/Home/Footer';
import bannerImg from '@/assets/images/about/banner.png';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

export default function AboutPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  return (
    <div className="bg-dark-bg text-white min-h-screen">
      <UserNavbar />
      
      <main>
        {/* Hero Banner Section */}
        <section className="relative pt-48 pb-32 flex flex-col items-center text-center border-b border-white/5 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.9 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image src={bannerImg} 
              alt="Lumiere Banner Background" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-dark-bg via-dark-bg/80 to-transparent"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto"
          >
            <motion.h4 variants={fadeInUp} className="text-primary-500 text-xs font-bold uppercase tracking-[0.3em] mb-6 drop-shadow-md">Discover Our Essence</motion.h4>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-white drop-shadow-xl">
              A Symphony of <br className="hidden md:block"/> Light & Flavor
            </motion.h1>
            <motion.p variants={fadeInUp} className="max-w-2xl text-gray-300 text-lg leading-relaxed mx-auto">
              Lumière was born from a singular vision: to illuminate the finest ingredients through masterful technique, creating an unforgettable sensory journey.
            </motion.p>
          </motion.div>
        </section>

        {/* Restaurant Story & Mission */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="relative h-125 w-full rounded-2xl overflow-hidden group border border-white/5">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzGiD3zEp6PP5Lr3YA3g-YT2Cg4PH5UkF4zfFA4tREoEAVRjJafxRmAP2l5aIckKQmolYjq1LIU7kBpZ0BdaXpiab_MWRvM61meQYTD3cMYM8ZhjcVsbFHV_DzFmTjbZMefUPHC2cDq3rznAgNCszqhS4aBMGq-6kwdj2IZNOktl-qT9JXsp45HOZforDMbdHytcXtEcHsWQsUoxmQbO4m4EweXsU4bLL7em23Rg66T_HT7xfJFCqVZ7SCG3g8cJic8eR0_U2WDlSi" 
              alt="Our Culinary Story" 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-dark-bg via-transparent to-transparent opacity-80"></div>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-8">
            <div>
              <h2 className="text-4xl font-serif font-medium mb-4 text-white">Our Story</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Founded in 2018 in the heart of the culinary district, Lumière started as an intimate 12-seat chef's counter. Our founders, driven by a relentless pursuit of perfection, sought to strip away the pretense of fine dining while elevating the artistry of the plate.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Today, Lumière stands as a beacon of modern gastronomy, blending heritage recipes with avant-garde execution. Every dish tells a story of local terroir and global inspiration.
              </p>
            </div>
            
            <div className="bg-dark-surface border border-white/5 p-8 rounded-2xl border-l-4 border-l-primary-500 hover:bg-dark-surface-hover transition-colors">
              <h3 className="text-xl font-serif font-medium mb-3 text-white">Our Mission</h3>
              <p className="text-gray-300 italic">
                "To curate profound dining experiences that honor the earth's bounty, champion culinary innovation, and leave a luminous, lasting memory for every guest who walks through our doors."
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Brand Values */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 bg-dark-surface border-y border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl font-serif font-medium text-white">Our Core Values</h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto mt-6 rounded-full opacity-50"></div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp} className="bg-linear-to-br from-dark-surface to-dark-bg border border-white/5 p-10 rounded-3xl text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_10px_30px_-10px_rgba(132,204,22,0.2)] group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary-500/10 transition-colors duration-500"></div>
                <div className="w-20 h-20 rounded-full bg-primary-500/10 flex items-center justify-center mb-6 border border-primary-500/20 group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                </div>
                <h4 className="text-2xl font-serif font-medium mb-4 text-white group-hover:text-primary-400 transition-colors">Sustainable Sourcing</h4>
                <p className="text-gray-400 text-sm leading-relaxed">We partner exclusively with ethical fisheries, regenerative farms, and local foragers to ensure every ingredient honors the ecosystem.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-linear-to-br from-dark-surface to-dark-bg border border-white/5 p-10 rounded-3xl text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_10px_30px_-10px_rgba(132,204,22,0.2)] group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary-500/10 transition-colors duration-500"></div>
                <div className="w-20 h-20 rounded-full bg-primary-500/10 flex items-center justify-center mb-6 border border-primary-500/20 group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
                </div>
                <h4 className="text-2xl font-serif font-medium mb-4 text-white group-hover:text-primary-400 transition-colors">Artistic Precision</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Cooking is our canvas. We approach every plating with meticulous attention to color, texture, and architectural balance.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-linear-to-br from-dark-surface to-dark-bg border border-white/5 p-10 rounded-3xl text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_10px_30px_-10px_rgba(132,204,22,0.2)] group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary-500/10 transition-colors duration-500"></div>
                <div className="w-20 h-20 rounded-full bg-primary-500/10 flex items-center justify-center mb-6 border border-primary-500/20 group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/></svg>
                </div>
                <h4 className="text-2xl font-serif font-medium mb-4 text-white group-hover:text-primary-400 transition-colors">Unrivaled Hospitality</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Service should be invisible yet omnipresent. We strive to anticipate needs and craft an atmosphere of profound warmth and luxury.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}