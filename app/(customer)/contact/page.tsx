'use client';
import Navbar from '@/component/Home/Navbar';
import Footer from '@/component/Home/Footer';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  return (
    <div className="bg-[var(--color-dark-bg)] text-white min-h-screen">
      <Navbar />

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
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-dark-bg)]/20 to-[var(--color-dark-bg)]"></div>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Reservation Form (Bento Large) */}
            <motion.div variants={fadeInUp} className="lg:col-span-8 bg-[var(--color-dark-surface)] p-10 rounded-xl border border-white/5 shadow-xl hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-[var(--color-primary-500)]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                <h2 className="font-serif text-[32px] leading-[1.3] font-semibold text-white">Secure Your Date</h2>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Guests</label>
                  <div className="relative">
                    <select className="w-full bg-[var(--color-dark-bg)] border border-white/10 text-white rounded-lg py-4 px-4 appearance-none focus:ring-1 focus:ring-[var(--color-primary-500)] focus:border-[var(--color-primary-500)] outline-none">
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests</option>
                      <option>Private Dining (8+)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">expand_more</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Date</label>
                  <input 
                    className="w-full bg-[var(--color-dark-bg)] border border-white/10 text-white rounded-lg py-4 px-4 focus:ring-1 focus:ring-[var(--color-primary-500)] focus:border-[var(--color-primary-500)] outline-none" 
                    type="date" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Preferred Time</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="py-2 border border-[var(--color-primary-500)] text-[var(--color-primary-500)] rounded-lg text-sm hover:bg-[var(--color-primary-500)]/10 transition-colors" type="button">18:30</button>
                    <button className="py-2 border border-white/10 text-gray-400 rounded-lg text-sm hover:border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] transition-colors" type="button">20:00</button>
                    <button className="py-2 border border-white/10 text-gray-400 rounded-lg text-sm hover:border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] transition-colors" type="button">21:30</button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Occasion (Optional)</label>
                  <input 
                    className="w-full bg-[var(--color-dark-bg)] border border-white/10 text-white rounded-lg py-4 px-4 focus:ring-1 focus:ring-[var(--color-primary-500)] focus:border-[var(--color-primary-500)] outline-none" 
                    placeholder="Anniversary, Birthday..." 
                    type="text" 
                  />
                </div>
                
                <div className="md:col-span-2 pt-4">
                  <button className="w-full bg-[var(--color-primary-500)] text-[var(--color-dark-bg)] font-sans text-[12px] leading-none tracking-widest font-semibold uppercase py-5 rounded-lg hover:bg-[var(--color-primary-400)] transition-all shadow-[0_0_20px_rgba(132,204,22,0.2)]">
                    Confirm Reservation Request
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4 font-sans italic">Reservations are held for 15 minutes. Please notify us of any dietary restrictions.</p>
                </div>
              </form>
            </motion.div>

            {/* Contact Sidebar (Bento Small) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Location/Hours */}
              <motion.div variants={fadeInUp} className="bg-[var(--color-dark-surface)] border border-white/5 p-8 rounded-xl flex-1 shadow-xl hover:border-white/10 transition-colors">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-[var(--color-primary-400)]">Hours of Service</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="font-sans text-sm text-gray-400">Tuesday — Thursday</span>
                    <span className="font-sans text-sm text-white">18:00 – 23:00</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="font-sans text-sm text-gray-400">Friday — Saturday</span>
                    <span className="font-sans text-sm text-white">17:30 – 00:00</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="font-sans text-sm text-gray-400">Sunday — Monday</span>
                    <span className="font-sans text-sm text-white">Closed</span>
                  </div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4 group">
                    <span className="material-symbols-outlined text-[var(--color-primary-500)] group-hover:scale-110 transition-transform">location_on</span>
                    <span className="font-sans text-sm text-white">127 Luminance Blvd, Arts District</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <span className="material-symbols-outlined text-[var(--color-primary-500)] group-hover:scale-110 transition-transform">call</span>
                    <span className="font-sans text-sm text-white">+1 (555) 800-LUMI</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <span className="material-symbols-outlined text-[var(--color-primary-500)] group-hover:scale-110 transition-transform">mail</span>
                    <span className="font-sans text-sm text-white">concierge@lumiere.dining</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Social Bento */}
              <motion.div variants={fadeInUp} className="bg-[var(--color-dark-surface)] border border-white/5 p-8 rounded-xl flex flex-col items-center justify-center gap-4 shadow-xl hover:border-white/10 transition-colors">
                <p className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Follow the Glow</p>
                <div className="flex gap-6">
                  <a className="text-white hover:text-[var(--color-primary-400)] hover:-translate-y-1 transition-all" href="#">
                    Instagram
                  </a>
                  <a className="text-white hover:text-[var(--color-primary-400)] hover:-translate-y-1 transition-all" href="#">
                    Twitter
                  </a>
                  <a className="text-white hover:text-[var(--color-primary-400)] hover:-translate-y-1 transition-all" href="#">
                    Facebook
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.section>

        {/* Private Events Inquiry */}
        <section className="px-5 md:px-16 py-30 bg-black/30 border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif text-[40px] md:text-[64px] leading-[1.2] md:leading-[1.1] tracking-[-0.02em] font-bold mb-6 text-white">
              Private Events & Inquiries
            </h2>
            <p className="font-sans text-[18px] leading-[1.6] text-gray-300">
              Host your next milestone in our exclusive private gallery. Our events team will curate every detail to perfection.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Full Name</label>
                <input 
                  className="w-full bg-[var(--color-dark-surface)] border border-white/5 text-white rounded-lg py-3 px-4 focus:border-[var(--color-primary-500)] outline-none" 
                  type="text" 
                />
              </div>
              <div className="space-y-2">
                <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Email Address</label>
                <input 
                  className="w-full bg-[var(--color-dark-surface)] border border-white/5 text-white rounded-lg py-3 px-4 focus:border-[var(--color-primary-500)] outline-none" 
                  type="email" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-sans text-[12px] leading-none tracking-widest font-semibold text-gray-400 uppercase">Message</label>
                <textarea 
                  className="w-full bg-[var(--color-dark-surface)] border border-white/5 text-white rounded-lg py-3 px-4 focus:border-[var(--color-primary-500)] outline-none resize-none" 
                  rows={4}
                ></textarea>
              </div>
              <div className="md:col-span-2 mt-4 text-center">
                <button className="bg-[var(--color-dark-bg)] text-[var(--color-primary-500)] border border-[var(--color-primary-500)] font-sans text-[12px] leading-none tracking-widest font-semibold uppercase px-10 py-4 rounded-full hover:bg-[var(--color-primary-500)] hover:text-[var(--color-dark-bg)] transition-all mx-auto inline-block">
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
