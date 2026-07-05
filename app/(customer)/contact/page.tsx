'use client';
import UserNavbar from '@/component/layout/UserNavbar';
import Footer from '@/component/Home/Footer';
import { motion, Variants } from 'framer-motion';

export default function ContactPage() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  return (
    <div className="bg-dark-bg text-white min-h-screen">
      <UserNavbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              alt="Luxury Dining Room" 
              className="w-full h-full object-cover opacity-60" 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920" 
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-dark-bg/20 to-dark-bg"></div>
          </motion.div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10 text-center px-5"
          >
            <motion.h1 variants={fadeInUp} className="font-serif text-[40px] md:text-[64px] leading-[1.2] md:leading-[1.1] tracking-[-0.02em] font-bold mb-4 text-glow text-white">
              Join Us at the Table
            </motion.h1>
            <motion.p variants={fadeInUp} className="font-sans text-[18px] leading-[1.6] text-gray-300 max-w-2xl mx-auto">
              An avant-garde culinary journey where precision meets passion. Secure your experience at the intersection of light and flavor.
            </motion.p>
          </motion.div>
        </section>

        {/* Reservation & Contact Grid */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="px-5 md:px-16 py-30 max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Reservation Form (Bento Large) */}
            <motion.div variants={fadeInUp} className="lg:col-span-8 bg-linear-to-br from-dark-surface to-dark-bg p-10 rounded-3xl border border-white/5 shadow-2xl hover:border-primary-500/30 transition-colors duration-500">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                </div>
                <h2 className="font-serif text-[32px] leading-[1.3] font-medium text-white">Secure Your Date</h2>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Guests</label>
                  <div className="relative">
                    <select className="w-full bg-dark-bg border border-white/10 text-white rounded-xl py-4 px-5 appearance-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all cursor-pointer shadow-inner">
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests</option>
                      <option>Private Dining (8+)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">expand_more</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Date</label>
                  <input 
                    className="w-full bg-dark-bg border border-white/10 text-white rounded-xl py-4 px-5 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-inner" 
                    type="date" 
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Preferred Time</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="py-3 border border-primary-500 bg-primary-500/10 text-primary-400 rounded-xl text-sm font-semibold transition-colors shadow-inner" type="button">18:30</button>
                    <button className="py-3 border border-white/10 text-gray-400 rounded-xl text-sm hover:border-primary-500 hover:text-primary-500 hover:bg-primary-500/5 transition-colors" type="button">20:00</button>
                    <button className="py-3 border border-white/10 text-gray-400 rounded-xl text-sm hover:border-primary-500 hover:text-primary-500 hover:bg-primary-500/5 transition-colors" type="button">21:30</button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Occasion (Optional)</label>
                  <input 
                    className="w-full bg-dark-bg border border-white/10 text-white rounded-xl py-4 px-5 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-inner placeholder:text-gray-600" 
                    placeholder="Anniversary, Birthday..." 
                    type="text" 
                  />
                </div>
                
                <div className="md:col-span-2 pt-6">
                  <button className="w-full bg-primary-500 text-dark-bg font-sans text-[14px] leading-none tracking-widest font-bold uppercase py-5 rounded-xl hover:bg-primary-400 transition-all shadow-[0_0_30px_rgba(132,204,22,0.3)] hover:shadow-[0_0_40px_rgba(132,204,22,0.5)]">
                    Confirm Reservation Request
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-5 font-sans italic">Reservations are held for 15 minutes. Please notify us of any dietary restrictions.</p>
                </div>
              </form>
            </motion.div>

            {/* Contact Sidebar (Bento Small) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Location/Hours */}
              <motion.div variants={fadeInUp} className="bg-dark-surface border border-white/5 p-8 rounded-3xl flex-1 shadow-xl hover:border-white/10 transition-colors">
                <h3 className="font-serif text-2xl font-medium mb-6 text-primary-400">Hours of Service</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="font-sans text-sm text-gray-400">Tuesday — Thursday</span>
                    <span className="font-sans text-sm text-white font-medium">18:00 – 23:00</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="font-sans text-sm text-gray-400">Friday — Saturday</span>
                    <span className="font-sans text-sm text-white font-medium">17:30 – 00:00</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="font-sans text-sm text-gray-400">Sunday — Monday</span>
                    <span className="font-sans text-sm text-white font-medium">Closed</span>
                  </div>
                </div>
                
                <div className="mt-8 space-y-5 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <span className="font-sans text-sm text-gray-300">127 Luminance Blvd, Arts District</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <span className="font-sans text-sm text-gray-300">+1 (555) 800-LUMI</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <span className="font-sans text-sm text-gray-300">concierge@lumiere.dining</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Social Bento */}
              <motion.div variants={fadeInUp} className="bg-primary-500/5 border border-primary-500/20 p-8 rounded-3xl flex flex-col items-center justify-center gap-5 shadow-xl hover:border-primary-500/40 transition-colors">
                <p className="font-sans text-[12px] leading-none tracking-widest font-semibold text-primary-400 uppercase">Follow the Glow</p>
                <div className="flex gap-8">
                  <a className="text-gray-300 hover:text-primary-400 hover:-translate-y-1 transition-all" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a className="text-gray-300 hover:text-primary-400 hover:-translate-y-1 transition-all" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </a>
                  <a className="text-gray-300 hover:text-primary-400 hover:-translate-y-1 transition-all" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.section>

        {/* Private Events Inquiry */}
        <section className="px-5 md:px-16 py-30 bg-black/40 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-primary-500/20 to-transparent"></div>
          
          <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
            <h2 className="font-serif text-[40px] md:text-[64px] leading-[1.2] md:leading-[1.1] tracking-[-0.02em] font-medium mb-6 text-white">
              Private Events & Inquiries
            </h2>
            <p className="font-sans text-[18px] leading-[1.6] text-gray-300">
              Host your next milestone in our exclusive private gallery. Our events team will curate every detail to perfection.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <form className="bg-dark-surface p-10 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Full Name</label>
                  <input 
                    className="w-full bg-dark-bg border border-white/5 text-white rounded-xl py-4 px-5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all shadow-inner placeholder:text-gray-600" 
                    placeholder="Your Name"
                    type="text" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Email Address</label>
                  <input 
                    className="w-full bg-dark-bg border border-white/5 text-white rounded-xl py-4 px-5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all shadow-inner placeholder:text-gray-600" 
                    placeholder="you@example.com"
                    type="email" 
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Message</label>
                  <textarea 
                    className="w-full bg-dark-bg border border-white/5 text-white rounded-xl py-4 px-5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all resize-none shadow-inner placeholder:text-gray-600" 
                    placeholder="Tell us about your event..."
                    rows={5}
                  ></textarea>
                </div>
                <div className="md:col-span-2 mt-4 text-center">
                  <button className="bg-dark-bg text-primary-500 border border-primary-500 font-sans text-[14px] leading-none tracking-widest font-bold uppercase px-12 py-5 rounded-full hover:bg-primary-500 hover:text-dark-bg transition-all mx-auto inline-flex shadow-[0_0_20px_rgba(132,204,22,0.1)] hover:shadow-[0_0_30px_rgba(132,204,22,0.3)]">
                    Send Inquiry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
