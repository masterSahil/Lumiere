import Head from 'next/head';

export default function ReservationsPage() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-color: #101415;
          color: #e0e3e5;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .glass-panel {
          background: rgba(29, 32, 34, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .text-glow {
          text-shadow: 0 0 10px rgba(132, 204, 22, 0.4);
        }
      `}} />

      <div className="bg-[#101415] text-[#e0e3e5] selection:bg-[#9ee939] selection:text-[#1f3700] min-h-screen">
        
        {/* TopAppBar */}
        <header className="fixed top-0 w-full z-50 bg-[#101415]/80 backdrop-blur-xl border-b border-white/10">
          <nav className="flex justify-between items-center px-5 md:px-16 py-2 max-w-full">
            <div className="font-['Playfair_Display'] text-[32px] leading-[1.3] font-semibold tracking-tighter text-[#9ee939]">
              LUMIÈRE
            </div>
            <div className="hidden md:flex gap-8 items-center">
              <a className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] hover:text-[#9ee939] transition-colors uppercase" href="#">Experience</a>
              <a className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] hover:text-[#9ee939] transition-colors uppercase" href="#">Menu</a>
              <a className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] hover:text-[#9ee939] transition-colors uppercase" href="#">Our Story</a>
              <a className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#9ee939] border-b border-[#9ee939] pb-1 uppercase" href="#">Reservations</a>
            </div>
            <button className="bg-[#84cc16] text-[#315200] px-6 py-2 rounded-full font-['Inter'] text-[12px] leading-none tracking-widest font-semibold uppercase hover:brightness-110 active:opacity-80 active:scale-95 transition-all">
              Book Table
            </button>
          </nav>
        </header>

        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative h-h-204.75 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                alt="Luxury Dining Room" 
                className="w-full h-full object-cover opacity-60" 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920" 
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#101415]/20 to-[#101415]"></div>
            </div>
            <div className="relative z-10 text-center px-5">
              <h1 className="font-['Playfair_Display'] text-10 md:text-[64px] leading-[1.2] md:leading-[1.1] tracking-[-0.02em] font-bold mb-4 text-glow text-[#e0e3e5]">
                Join Us at the Table
              </h1>
              <p className="font-['Inter'] text-[18px] leading-[1.6] text-[#c1cab0] max-w-2xl mx-auto">
                An avant-garde culinary journey where precision meets passion. Secure your experience at the intersection of light and flavor.
              </p>
            </div>
          </section>

          {/* Reservation & Contact Grid */}
          <section className="px-5 md:px-16 py-30 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Reservation Form (Bento Large) */}
              <div className="lg:col-span-8 glass-panel p-10 rounded-xl">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-[#9ee939]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                  <h2 className="font-['Playfair_Display'] text-[32px] leading-[1.3] font-semibold text-[#e0e3e5]">Secure Your Date</h2>
                </div>
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] uppercase">Guests</label>
                    <div className="relative">
                      <select className="w-full bg-[#1d2022] border border-white/10 text-[#e0e3e5] rounded-lg py-4 px-4 appearance-none focus:ring-1 focus:ring-[#9ee939] focus:border-[#9ee939] outline-none">
                        <option>2 Guests</option>
                        <option>4 Guests</option>
                        <option>6 Guests</option>
                        <option>Private Dining (8+)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#c1cab0]">expand_more</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] uppercase">Date</label>
                    <input 
                      className="w-full bg-[#1d2022] border border-white/10 text-[#e0e3e5] rounded-lg py-4 px-4 focus:ring-1 focus:ring-[#9ee939] focus:border-[#9ee939] outline-none" 
                      type="date" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] uppercase">Preferred Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="py-2 border border-[#9ee939] text-[#9ee939] rounded-lg text-sm hover:bg-[#9ee939]/10 transition-colors" type="button">18:30</button>
                      <button className="py-2 border border-white/10 text-[#c1cab0] rounded-lg text-sm hover:border-[#9ee939] hover:text-[#9ee939] transition-colors" type="button">20:00</button>
                      <button className="py-2 border border-white/10 text-[#c1cab0] rounded-lg text-sm hover:border-[#9ee939] hover:text-[#9ee939] transition-colors" type="button">21:30</button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] uppercase">Occasion (Optional)</label>
                    <input 
                      className="w-full bg-[#1d2022] border border-white/10 text-[#e0e3e5] rounded-lg py-4 px-4 focus:ring-1 focus:ring-[#9ee939] focus:border-[#9ee939] outline-none" 
                      placeholder="Anniversary, Birthday..." 
                      type="text" 
                    />
                  </div>
                  
                  <div className="md:col-span-2 pt-4">
                    <button className="w-full bg-[#9ee939] text-[#1f3700] font-['Inter'] text-[12px] leading-none tracking-widest font-semibold uppercase py-5 rounded-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(132,204,22,0.2)]">
                      Confirm Reservation Request
                    </button>
                    <p className="text-center text-xs text-[#c1cab0] mt-4 font-['Inter'] italic">Reservations are held for 15 minutes. Please notify us of any dietary restrictions.</p>
                  </div>
                </form>
              </div>

              {/* Contact Sidebar (Bento Small) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Location/Hours */}
                <div className="glass-panel p-8 rounded-xl flex-1">
                  <h3 className="font-['Playfair_Display'] text-6 leading-[1.4] font-semibold mb-6 text-[#9ee939]">Hours of Service</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="font-['Inter'] text-4 text-[#c1cab0]">Tuesday — Thursday</span>
                      <span className="font-['Inter'] text-4 text-[#e0e3e5]">18:00 – 23:00</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="font-['Inter'] text-4 text-[#c1cab0]">Friday — Saturday</span>
                      <span className="font-['Inter'] text-4 text-[#e0e3e5]">17:30 – 00:00</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="font-['Inter'] text-4 text-[#c1cab0]">Sunday — Monday</span>
                      <span className="font-['Inter'] text-4 text-[#e0e3e5]">Closed</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[#9ee939]">location_on</span>
                      <span className="font-['Inter'] text-4 text-[#e0e3e5]">127 Luminance Blvd, Arts District</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[#9ee939]">call</span>
                      <span className="font-['Inter'] text-4 text-[#e0e3e5]">+1 (555) 800-LUMI</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[#9ee939]">mail</span>
                      <span className="font-['Inter'] text-4 text-[#e0e3e5]">concierge@lumiere.dining</span>
                    </div>
                  </div>
                </div>
                
                {/* Social Bento */}
                <div className="glass-panel p-8 rounded-xl flex flex-col items-center justify-center gap-4">
                  <p className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] uppercase">Follow the Glow</p>
                  <div className="flex gap-6">
                    <a className="text-[#e0e3e5] hover:text-[#9ee939] transition-colors" href="#">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                    </a>
                    <a className="text-[#e0e3e5] hover:text-[#9ee939] transition-colors" href="#">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                    </a>
                    <a className="text-[#e0e3e5] hover:text-[#9ee939] transition-colors" href="#">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="h-125 w-full relative group">
            <div className="absolute inset-0 grayscale invert opacity-30">
              <img 
                alt="Map Location" 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-[#101415] via-transparent to-[#101415]/50 pointer-events-none"></div>
            <div className="absolute bottom-12 left-5 md:left-16 glass-panel px-8 py-6 rounded-lg max-w-sm">
              <p className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#9ee939] mb-2 uppercase">Find Us</p>
              <h4 className="font-['Playfair_Display'] text-6 leading-[1.4] font-semibold text-[#e0e3e5]">LUMIÈRE PARIS</h4>
              <p className="font-['Inter'] text-4 text-[#c1cab0] mt-2">Free valet parking available for all dinner guests.</p>
            </div>
          </section>

          {/* Private Events Inquiry */}
          <section className="px-5 md:px-16 py-30 bg-[#0b0f10]">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="font-['Playfair_Display'] text-10 md:text-[64px] leading-[1.2] md:leading-[1.1] tracking-[-0.02em] font-bold mb-6 text-[#e0e3e5]">
                Private Events & Inquiries
              </h2>
              <p className="font-['Inter'] text-[18px] leading-[1.6] text-[#c1cab0]">
                Host your next milestone in our exclusive private gallery. Our events team will curate every detail to perfection.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] uppercase">Full Name</label>
                  <input 
                    className="w-full bg-[#101415] border border-white/5 text-[#e0e3e5] rounded-lg py-3 px-4 focus:border-[#9ee939] outline-none" 
                    type="text" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] uppercase">Email Address</label>
                  <input 
                    className="w-full bg-[#101415] border border-white/5 text-[#e0e3e5] rounded-lg py-3 px-4 focus:border-[#9ee939] outline-none" 
                    type="email" 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] uppercase">Message</label>
                  <textarea 
                    className="w-full bg-[#101415] border border-white/5 text-[#e0e3e5] rounded-lg py-3 px-4 focus:border-[#9ee939] outline-none resize-none" 
                    rows={4}
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="bg-[#101415] text-[#9ee939] border border-[#9ee939] font-['Inter'] text-[12px] leading-none tracking-widest font-semibold uppercase px-10 py-4 rounded-full hover:bg-[#9ee939] hover:text-[#1f3700] transition-all mx-auto block">
                    Send Inquiry
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#0b0f10] border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 md:px-16 py-30">
            <div className="space-y-6">
              <div className="font-['Playfair_Display'] text-6 leading-[1.4] font-semibold text-[#9ee939]">
                LUMIÈRE
              </div>
              <p className="font-['Inter'] text-4 text-[#c1cab0] max-w-sm">
                A destination for those who seek the extraordinary. Experience the art of light through our culinary lens.
              </p>
              <p className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#c1cab0] opacity-60 uppercase">
                © {new Date().getFullYear()} LUMIÈRE CULINARY GROUP. ALL RIGHTS RESERVED.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <p className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#9ee939] uppercase">Explore</p>
                <a className="font-['Inter'] text-4 text-[#c1cab0] hover:text-[#9ee939] transition-colors" href="#">Privacy Policy</a>
                <a className="font-['Inter'] text-4 text-[#c1cab0] hover:text-[#9ee939] transition-colors" href="#">Terms of Service</a>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-['Inter'] text-[12px] leading-none tracking-widest font-semibold text-[#9ee939] uppercase">Company</p>
                <a className="font-['Inter'] text-4 text-[#c1cab0] hover:text-[#9ee939] transition-colors" href="#">Press Kit</a>
                <a className="font-['Inter'] text-4 text-[#c1cab0] hover:text-[#9ee939] transition-colors" href="#">Contact</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}