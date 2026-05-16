import Head from 'next/head';

export default function MyOrders() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #131314;
            color: #e5e2e3;
            overflow-x: hidden;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid transparent;
            border-image: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(212, 175, 55, 0.3) 100%) 1;
        }
        .amber-glow {
            box-shadow: 0 0 40px rgba(255, 140, 0, 0.15);
        }
      `}} />

      <div className="font-sans text-[16px] leading-[24px] selection:bg-[#7ae749] selection:text-[#062100] min-h-screen bg-[#131314]">
        
        {/* Top Navigation Bar */}
        <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl border-b border-white/10">
          <div className="flex justify-between items-center px-[20px] md:px-[80px] py-4 w-full max-w-[1440px] mx-auto">
            <span className="font-serif text-[48px] leading-[56px] font-bold text-[#72df41]">
              Lumière Dining
            </span>
            <div className="hidden md:flex items-center gap-[24px]">
              <a className="font-serif text-[14px] leading-[20px] font-medium text-[#e5e2e3]/70 hover:text-[#7ae749] transition-colors duration-300" href="#">Menu</a>
              <a className="font-serif text-[14px] leading-[20px] font-medium text-[#e5e2e3]/70 hover:text-[#7ae749] transition-colors duration-300" href="#">About</a>
              <a className="font-serif text-[14px] leading-[20px] font-medium text-[#7ae749] border-b-2 border-[#7ae749] pb-1 transition-colors duration-300" href="#">Reservations</a>
              <a className="font-serif text-[14px] leading-[20px] font-medium text-[#e5e2e3]/70 hover:text-[#7ae749] transition-colors duration-300" href="#">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-[#7ae749] text-[#103900] px-6 py-2 rounded-full font-sans text-[14px] leading-[20px] font-semibold tracking-[0.05em] hover:brightness-110 transition-all">
                Order Now
              </button>
              <div className="w-10 h-10 rounded-full border border-[#7ae749]/30 overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Julian Vane Profile" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDug2KO8aoapksbNiSWJCQ1_yl5_OCJ_lt2WRr2wlYnVbb0coevR6ZKqfdTqClgPOHRARk3nkNc57Dl6czdnBG_mzKHCuwRRgMPzkFvdvLs2H1HLAK8l_4M5AdHzG5_GaAuWfFo2uu-8sg4XZnsnZssrj8362omJmxMdBsNF1zfOdPz8ufskQps1p2Dcw-psTeqXnBlOYFtQ12-0C3IMiYgA8l4BrwaDqMT6xRZh_tWY6Ns3kZ2kn5rFYV1aJvleI0RAghCJjqmhvsP" 
                />
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-32 pb-20 px-[20px] md:px-[80px] max-w-[1440px] mx-auto min-h-screen">
          <div className="flex flex-col lg:flex-row gap-[24px]">
            
            {/* SideNavBar (SaaS Sidebar Style) */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-32 flex flex-col gap-6">
                <div className="glass-panel p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-[#5fca2d]/20 flex items-center justify-center border border-[#7ae749]/20">
                      <span className="material-symbols-outlined text-[#7ae749]">person</span>
                    </div>
                    <div>
                      <h3 className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#7ae749]">Julian Vane</h3>
                      <p className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#e5e2e3]/50">Lumière Gold Member</p>
                    </div>
                  </div>
                  <nav className="flex flex-col gap-1">
                    <a className="flex items-center gap-3 p-3 rounded-lg bg-[#09530d]/20 text-[#7ae749] border-r-4 border-[#7ae749] transition-all" href="#">
                      <span className="material-symbols-outlined">receipt_long</span>
                      <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Orders</span>
                    </a>
                    <a className="flex items-center gap-3 p-3 rounded-lg text-[#d0c5af] hover:bg-[#2a2a2b] transition-all" href="#">
                      <span className="material-symbols-outlined">person</span>
                      <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Profile</span>
                    </a>
                    <a className="flex items-center gap-3 p-3 rounded-lg text-[#d0c5af] hover:bg-[#2a2a2b] transition-all" href="#">
                      <span className="material-symbols-outlined">location_on</span>
                      <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Addresses</span>
                    </a>
                    <a className="flex items-center gap-3 p-3 rounded-lg text-[#d0c5af] hover:bg-[#2a2a2b] transition-all" href="#">
                      <span className="material-symbols-outlined">payments</span>
                      <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Payment Methods</span>
                    </a>
                    <a className="flex items-center gap-3 p-3 rounded-lg text-[#d0c5af] hover:bg-[#2a2a2b] transition-all" href="#">
                      <span className="material-symbols-outlined">notifications</span>
                      <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Notifications</span>
                    </a>
                    <a className="flex items-center gap-3 p-3 rounded-lg text-[#d0c5af] hover:bg-[#2a2a2b] transition-all" href="#">
                      <span className="material-symbols-outlined">settings</span>
                      <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Settings</span>
                    </a>
                  </nav>
                </div>
                <button className="w-full glass-panel p-4 flex items-center justify-center gap-2 hover:bg-[#5fca2d]/10 transition-all border-[#7ae749]/20">
                  <span className="material-symbols-outlined text-[#7ae749]">add_circle</span>
                  <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#7ae749]">New Reservation</span>
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col gap-12">
              
              {/* Section: Active Order */}
              <section>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h1 className="font-serif text-[48px] leading-[56px] font-semibold mb-2">My Orders</h1>
                    <p className="text-[#d0c5af]">Manage your culinary journeys and live deliveries.</p>
                  </div>
                </div>

                {/* Live Order Tracking Widget */}
                <div className="glass-panel p-8 rounded-2xl amber-glow overflow-hidden relative mb-12">
                  {/* Map Background Simulation */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200')] bg-cover grayscale contrast-125"></div>
                  </div>
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09530d] text-[#abf59c] font-sans text-[12px] leading-[16px] tracking-[0.03em] font-bold mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#abf59c] animate-pulse"></span>
                        LIVE TRACKING
                      </div>
                      <h2 className="font-serif text-[32px] leading-[40px] font-medium mb-2">Order #LM-8821</h2>
                      <p className="text-[#d0c5af] mb-8">Estimated Arrival: <span className="text-[#7ae749] font-bold">18:45 (12 mins)</span></p>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#7ae749]">Chef is plating</span>
                        <span className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#e5e2e3]/50">Out for delivery</span>
                      </div>
                      
                      <div className="w-full h-1 bg-white/10 rounded-full mb-8">
                        <div className="w-2/3 h-full bg-[#7ae749] relative rounded-full">
                          <div className="absolute -right-2 -top-1.5 w-4 h-4 bg-[#7ae749] rounded-full ring-4 ring-[#7ae749]/20"></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        <button className="bg-[#7ae749] text-[#103900] px-6 py-3 rounded-lg font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Track on Map</button>
                        <button className="glass-panel border border-[#7ae749]/30 px-6 py-3 rounded-lg font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#7ae749]">Contact Courier</button>
                      </div>
                    </div>
                    
                    <div className="glass-panel bg-white/5 p-6 rounded-xl border border-white/5">
                      <h4 className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold mb-4 text-[#e5e2e3]/70 uppercase">Order Summary</h4>
                      <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                          <span className="font-sans text-[16px] leading-[24px]">Wagyu Beef Tartare x 1</span>
                          <span className="text-[#7ae749]">$42.00</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="font-sans text-[16px] leading-[24px]">Black Truffle Risotto x 2</span>
                          <span className="text-[#7ae749]">$84.00</span>
                        </li>
                        <li className="flex justify-between items-center border-t border-white/10 pt-4 mt-4">
                          <span className="font-bold">Total</span>
                          <span className="font-serif text-[32px] leading-[40px] font-medium text-[#7ae749]">$126.00</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: History */}
              <section>
                <h3 className="font-serif text-[32px] leading-[40px] font-medium mb-8">Order History</h3>
                <div className="grid grid-cols-1 gap-6">
                  
                  {/* Order Card 1 */}
                  <div className="glass-panel p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 shrink-0">
                        <img className="w-full h-full object-cover" alt="Pan-Seared Scallops" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzGiD3zEp6PP5Lr3YA3g-YT2Cg4PH5UkF4zfFA4tREoEAVRjJafxRmAP2l5aIckKQmolYjq1LIU7kBpZ0BdaXpiab_MWRvM61meQYTD3cMYM8ZhjcVsbFHV_DzFmTjbZMefUPHC2cDq3rznAgNCszqhS4aBMGq-6kwdj2IZNOktl-qT9JXsp45HOZforDMbdHytcXtEcHsWQsUoxmQbO4m4EweXsU4bLL7em23Rg66T_HT7xfJFCqVZ7SCG3g8cJic8eR0_U2WDlSi" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#7ae749]">#LM-7740</span>
                          <span className="font-sans text-[12px] leading-[16px] font-medium text-[#e5e2e3]/40">•</span>
                          <span className="font-sans text-[12px] leading-[16px] font-medium text-[#e5e2e3]/60">Oct 24, 2024</span>
                        </div>
                        <p className="font-sans text-[18px] leading-[28px] font-medium text-white">Pan-Seared Scallops, Vintage Chardonnay...</p>
                        <p className="font-sans text-[12px] leading-[16px] font-medium text-[#d0c5af]">3 items • Delivered to Home</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 justify-between md:justify-end">
                      <div className="text-right">
                        <p className="font-serif text-[32px] leading-[40px] font-medium text-[#7ae749]">$215.50</p>
                        <span className="font-sans text-[12px] leading-[16px] font-medium text-[#93000b]">Completed</span>
                      </div>
                      <button className="p-3 rounded-full border border-white/10 hover:border-[#7ae749]/50 hover:bg-[#7ae749]/10 transition-all">
                        <span className="material-symbols-outlined text-[#e5e2e3]/50">chevron_right</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Card 2 */}
                  <div className="glass-panel p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 shrink-0">
                        <img className="w-full h-full object-cover" alt="Dry-Aged Ribeye" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbN92NWQVAYpDSs4qWUuYyOatYRshmiXdXlq5KbRWAULxsKGcrym70Rlk-1fzJzD3WiXWfFnin1zCOaGxR_wSD5TeJLScpP156BX4gYBlv5ZfGlvqBNksDsYqQwkiWnlsDt6DNIiy-wOfx822R7EiJL-0o9ps-oHFR5SoxpJtWVlFD5AudYJPDJFvthAR9pSrtBDLE8k_3rsUtv8-qIc7BgP6dSvqAD-WZo3c0tflRR_vY4jajbew0In_kv8f8-6W_UOkyYvoKVjtN" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#7ae749]">#LM-7592</span>
                          <span className="font-sans text-[12px] leading-[16px] font-medium text-[#e5e2e3]/40">•</span>
                          <span className="font-sans text-[12px] leading-[16px] font-medium text-[#e5e2e3]/60">Oct 12, 2024</span>
                        </div>
                        <p className="font-sans text-[18px] leading-[28px] font-medium text-white">Dry-Aged Ribeye, Bone Marrow, Reserve...</p>
                        <p className="font-sans text-[12px] leading-[16px] font-medium text-[#d0c5af]">2 items • Delivered to Office</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 justify-between md:justify-end">
                      <div className="text-right">
                        <p className="font-serif text-[32px] leading-[40px] font-medium text-[#7ae749]">$188.00</p>
                        <span className="font-sans text-[12px] leading-[16px] font-medium text-[#93000b]">Completed</span>
                      </div>
                      <button className="p-3 rounded-full border border-white/10 hover:border-[#7ae749]/50 hover:bg-[#7ae749]/10 transition-all">
                        <span className="material-symbols-outlined text-[#e5e2e3]/50">chevron_right</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Card 3 */}
                  <div className="glass-panel p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 shrink-0">
                        <img className="w-full h-full object-cover" alt="Chocolate Delice" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuz6wdPPbY66BKgjdYEJZGSYHeOW3HpLe93U1PQP_f358aQxC6RCyRqh0OZxaC4YSh78C5Hjk83WpcOu_3olhf4O7x2j4KPD4Z7yVjLfqn2tERfHHImbVzHoCLMJdDEgkDVbTtN8VL7qWrm1UkNQrOthtONgHjuMsfet6k69Qh8mvSUCqNwcMLjzSc5nHrFq0UBcxz8r07LzYhMvVZFY1i1nSn94LHyNkmV_BDHVKilxG96AtM4I_tQzQ53dQ5EChuvN-vZX2a8Zym" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#7ae749]">#LM-6120</span>
                          <span className="font-sans text-[12px] leading-[16px] font-medium text-[#e5e2e3]/40">•</span>
                          <span className="font-sans text-[12px] leading-[16px] font-medium text-[#e5e2e3]/60">Sep 28, 2024</span>
                        </div>
                        <p className="font-sans text-[18px] leading-[28px] font-medium text-white">Chocolate Delice, Gold Leaf, Vanilla Bean...</p>
                        <p className="font-sans text-[12px] leading-[16px] font-medium text-[#d0c5af]">4 items • Delivered to Home</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 justify-between md:justify-end">
                      <div className="text-right">
                        <p className="font-serif text-[32px] leading-[40px] font-medium text-[#7ae749]">$94.20</p>
                        <span className="font-sans text-[12px] leading-[16px] font-medium text-[#93000b]">Completed</span>
                      </div>
                      <button className="p-3 rounded-full border border-white/10 hover:border-[#7ae749]/50 hover:bg-[#7ae749]/10 transition-all">
                        <span className="material-symbols-outlined text-[#e5e2e3]/50">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <button className="glass-panel px-8 py-3 rounded-full text-[#e5e2e3]/70 hover:text-[#7ae749] hover:border-[#7ae749]/30 transition-all font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">
                    View Older Orders
                  </button>
                </div>
              </section>

            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-12 px-[20px] md:px-[80px] border-t border-white/5 bg-[#0e0e0f]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px] max-w-[1440px] mx-auto">
            <div className="col-span-1 md:col-span-2">
              <span className="font-serif text-[32px] leading-[40px] font-medium text-[#72df41] mb-4 block">Lumière Dining</span>
              <p className="text-[#d0c5af] max-w-xs mb-8">Elevating the digital culinary experience to Michelin standards, one plate at a time.</p>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:text-[#7ae749] transition-all" href="#">
                  <span className="material-symbols-outlined">share</span>
                </a>
                <a className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:text-[#7ae749] transition-all" href="#">
                  <span className="material-symbols-outlined">star</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#7ae749] mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-colors" href="#">Terms of Service</a></li>
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-colors" href="#">Sustainability</a></li>
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-colors" href="#">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#7ae749] mb-6">Contact</h4>
              <p className="text-[#d0c5af] mb-2">concierge@lumieredining.com</p>
              <p className="text-[#d0c5af]">1-800-LUMIERE</p>
            </div>
          </div>
          
          <div className="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-white/5 text-center">
            <p className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#e5e2e3]/30">© 2024 Lumière Dining. All Rights Reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}