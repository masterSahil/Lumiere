import Head from 'next/head';

export default function AdminDashboard() {
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
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid transparent;
            border-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(212, 175, 55, 0.3)) 1;
        }
        .amber-glow {
            box-shadow: 0 0 40px 0 rgba(255, 140, 0, 0.15);
        }
        ::-webkit-scrollbar {
            width: 4px;
        }
        ::-webkit-scrollbar-track {
            background: #131314;
        }
        ::-webkit-scrollbar-thumb {
            background: #d4af37;
            border-radius: 10px;
        }
      `}} />

      <div className="bg-[#131314] text-[#e5e2e3] font-sans text-[16px] leading-[24px] selection:bg-[#7ae749] selection:text-[#103900] min-h-screen">
        
        {/* SideNavBar */}
        <aside className="h-screen w-64 fixed left-0 top-0 bg-[#1c1b1c] backdrop-blur-2xl border-r border-white/5 flex flex-col py-8 px-4 z-50">
          <div className="mb-12 px-4">
            <h1 className="font-serif text-[32px] leading-[40px] text-[#7ae749] tracking-tight">Lumière</h1>
            <p className="text-[#d0c5af] text-[12px] leading-[16px] uppercase tracking-widest mt-1 opacity-60">Admin Panel</p>
          </div>
          <nav className="flex-1 space-y-2">
            {/* Active State: Analytics */}
            <a className="flex items-center gap-3 py-3 px-4 rounded-lg bg-[#09530d]/20 text-[#7ae749] border-r-4 border-[#7ae749] transition-all" href="#">
              <span className="material-symbols-outlined">monitoring</span>
              <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Analytics</span>
            </a>
            <a className="flex items-center gap-3 py-3 px-4 rounded-lg text-[#d0c5af] hover:bg-[#2a2a2b] transition-all group" href="#">
              <span className="material-symbols-outlined group-hover:text-[#7ae749]">receipt_long</span>
              <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Orders</span>
            </a>
            <a className="flex items-center gap-3 py-3 px-4 rounded-lg text-[#d0c5af] hover:bg-[#2a2a2b] transition-all group" href="#">
              <span className="material-symbols-outlined group-hover:text-[#7ae749]">restaurant_menu</span>
              <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Menu CMS</span>
            </a>
            <a className="flex items-center gap-3 py-3 px-4 rounded-lg text-[#d0c5af] hover:bg-[#2a2a2b] transition-all group" href="#">
              <span className="material-symbols-outlined group-hover:text-[#7ae749]">palette</span>
              <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Branding</span>
            </a>
            <a className="flex items-center gap-3 py-3 px-4 rounded-lg text-[#d0c5af] hover:bg-[#2a2a2b] transition-all group" href="#">
              <span className="material-symbols-outlined group-hover:text-[#7ae749]">settings</span>
              <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Settings</span>
            </a>
          </nav>
          <div className="mt-auto pt-8 border-t border-white/5 px-4">
            <button className="w-full py-3 px-4 bg-[#7ae749] text-[#103900] font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold rounded-lg hover:bg-[#8dfc5b] transition-colors flex items-center justify-center gap-2 mb-6">
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add New Item
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#353436] overflow-hidden border border-[#7ae749]/20">
                <img 
                  alt="Admin Profile" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU56hqBNcZJavr5p19TreAdIAoYNFTidkofhx8nRDsoRUN-QqA5qLpk2015mH-TczMps-PnO43MGpl8Bwy7uHrFbFASe1qi4iNRdb2PYDz_DVkFveqVGEG1tvd7RAbMr8Q9c_8KYVZJPlkzOLLyAkC7NJW4svXRWD2unV6l8ZNBCQWcSduzDVYOM9u8tOGktyLzxdcPCCHaTHkv4BF56tinc6YMHVUA-1oU69jdmPh848bO8bNp-vg7N4fLd6MplziZwyeGXUVG_P4" 
                />
              </div>
              <div>
                <p className="text-[14px] leading-[20px] tracking-[0.05em] font-bold text-[#e5e2e3]">Alexandre L.</p>
                <p className="text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#d0c5af]">Master Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="ml-64 min-h-screen p-[40px] md:p-[80px]">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-6">
            <div>
              <h2 className="font-serif text-[48px] leading-[56px] font-semibold text-[#e5e2e3] mb-2">Executive Overview</h2>
              <p className="text-[#d0c5af] font-sans text-[18px] leading-[28px]">Real-time performance metrics for Lumière Dining.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="glass-card flex items-center px-4 py-2 gap-2 text-[#7ae749] border border-[#7ae749]/20">
                <span className="material-symbols-outlined">calendar_today</span>
                <span className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Oct 24, 2024 - Oct 31, 2024</span>
              </div>
              <button className="glass-card px-6 py-2 text-[#7ae749] hover:bg-[#7ae749]/10 transition-colors font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold border border-[#7ae749]/30">
                Export Report
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[24px]">
            {/* Card 1 */}
            <div className="glass-card p-6 amber-glow flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#7ae749]/10 rounded-lg text-[#7ae749]">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="text-[#7ae749] text-[12px] leading-[16px] tracking-[0.03em] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> 12.5%
                </span>
              </div>
              <div>
                <p className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#d0c5af] opacity-70 mb-1">Total Revenue</p>
                <h3 className="font-serif text-[32px] leading-[40px] font-medium text-[#e5e2e3]">$142,850.00</h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-6 flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#7ae749]/10 rounded-lg text-[#7ae749]">
                  <span className="material-symbols-outlined">shopping_bag</span>
                </div>
                <span className="text-[#7ae749] text-[12px] leading-[16px] tracking-[0.03em] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> 8.2%
                </span>
              </div>
              <div>
                <p className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#d0c5af] opacity-70 mb-1">Total Orders</p>
                <h3 className="font-serif text-[32px] leading-[40px] font-medium text-[#e5e2e3]">1,284</h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-6 flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#7ae749]/10 rounded-lg text-[#7ae749]">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <span className="text-[#ffb4ab] text-[12px] leading-[16px] tracking-[0.03em] font-medium flex items-center gap-1 bg-[#ffb4ab]/20 px-2 rounded">
                  <span className="material-symbols-outlined text-[14px]">trending_down</span> 2.1%
                </span>
              </div>
              <div>
                <p className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#d0c5af] opacity-70 mb-1">Active Users</p>
                <h3 className="font-serif text-[32px] leading-[40px] font-medium text-[#e5e2e3]">4,592</h3>
              </div>
            </div>

            {/* Card 4 */}
            <div className="glass-card p-6 flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#7ae749]/10 rounded-lg text-[#7ae749]">
                  <span className="material-symbols-outlined">timer</span>
                </div>
                <span className="text-[#7ae749] text-[12px] leading-[16px] tracking-[0.03em] font-medium flex items-center gap-1">
                  - 4m
                </span>
              </div>
              <div>
                <p className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#d0c5af] opacity-70 mb-1">Avg Delivery Time</p>
                <h3 className="font-serif text-[32px] leading-[40px] font-medium text-[#e5e2e3]">24m 12s</h3>
              </div>
            </div>
          </section>

          {/* Analytics & Timeline */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] mb-[24px]">
            
            {/* Large Line Chart Placeholder */}
            <div className="lg:col-span-2 glass-card p-8 min-h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h4 className="font-serif text-[24px] font-medium text-[#e5e2e3]">Sales Performance Trend</h4>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-[#7ae749] text-[#103900] font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium rounded-full">Weekly</button>
                  <button className="px-3 py-1 text-[#d0c5af] font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium hover:text-[#7ae749] transition-colors">Monthly</button>
                </div>
              </div>
              <div className="flex-1 relative border-l border-b border-white/10 mt-4 flex items-end justify-between px-4 pb-4">
                {/* Faux Line Chart using SVG */}
                <div className="absolute inset-0 p-8">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                    <defs>
                      <linearGradient id="line-grad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8"></stop>
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <path d="M0,180 Q100,160 200,120 T400,100 T600,60 T800,40" fill="none" stroke="#D4AF37" strokeLinecap="round" strokeWidth="3"></path>
                    <path d="M0,180 Q100,160 200,120 T400,100 T600,60 T800,40 V200 H0 Z" fill="url(#line-grad)" opacity="0.2"></path>
                    {/* Nodes */}
                    <circle cx="200" cy="120" fill="#D4AF37" r="4"></circle>
                    <circle cx="400" cy="100" fill="#D4AF37" r="4"></circle>
                    <circle cx="600" cy="60" fill="#D4AF37" r="4"></circle>
                    <circle className="animate-pulse" cx="800" cy="40" fill="#D4AF37" r="6"></circle>
                  </svg>
                </div>
                {/* Axis Labels */}
                <span className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#d0c5af] opacity-40">Mon</span>
                <span className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#d0c5af] opacity-40">Tue</span>
                <span className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#d0c5af] opacity-40">Wed</span>
                <span className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#d0c5af] opacity-40">Thu</span>
                <span className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#d0c5af] opacity-40">Fri</span>
                <span className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#d0c5af] opacity-40">Sat</span>
                <span className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-bold text-[#7ae749]">Sun</span>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="glass-card p-8 flex flex-col">
              <h4 className="font-serif text-[24px] font-medium text-[#e5e2e3] mb-8">Recent Activity</h4>
              <div className="space-y-6">
                
                <div className="flex gap-4 relative">
                  <div className="absolute left-3 top-8 bottom-[-16px] w-[1px] bg-white/10"></div>
                  <div className="w-6 h-6 rounded-full bg-[#7ae749]/20 border border-[#7ae749] flex items-center justify-center z-10 shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-[#7ae749]">restaurant</span>
                  </div>
                  <div>
                    <p className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#e5e2e3]">New Menu Item Added</p>
                    <p className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#d0c5af]">Black Truffle Risotto by Chef Marco</p>
                    <p className="text-[10px] text-[#7ae749] mt-1 uppercase">2 hours ago</p>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="absolute left-3 top-8 bottom-[-16px] w-[1px] bg-white/10"></div>
                  <div className="w-6 h-6 rounded-full bg-[#09530d]/20 border border-[#09530d] flex items-center justify-center z-10 shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-[#7fc673]">star</span>
                  </div>
                  <div>
                    <p className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#e5e2e3]">Campaign Launched</p>
                    <p className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#d0c5af]">Autumn Gold Tasting Series</p>
                    <p className="text-[10px] text-[#7ae749] mt-1 uppercase">5 hours ago</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#72df41]/20 border border-[#72df41] flex items-center justify-center z-10 shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-[#72df41]">person</span>
                  </div>
                  <div>
                    <p className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#e5e2e3]">Profile Updated</p>
                    <p className="font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium text-[#d0c5af]">Master Admin credentials rotated</p>
                    <p className="text-[10px] text-[#7ae749] mt-1 uppercase">Yesterday</p>
                  </div>
                </div>

              </div>
              <button className="mt-auto w-full py-2 border border-white/10 text-[#d0c5af] font-sans text-[12px] leading-[16px] tracking-[0.03em] font-medium hover:text-[#7ae749] hover:border-[#7ae749]/50 transition-all rounded">View All Logs</button>
            </div>
          </section>

          {/* Recent Orders Table */}
          <section className="glass-card overflow-hidden">
            <div className="p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5">
              <h4 className="font-serif text-[24px] font-medium text-[#e5e2e3]">Live Order Stream</h4>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#d0c5af]">search</span>
                  <input 
                    className="bg-[#2a2a2b] border-none rounded-lg pl-10 pr-4 py-2 font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold focus:ring-1 focus:ring-[#7ae749] w-full sm:w-64 text-[#e5e2e3]" 
                    placeholder="Filter orders..." 
                    type="text" 
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-8 py-4 font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#d0c5af] opacity-50 uppercase">Order ID</th>
                    <th className="px-8 py-4 font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#d0c5af] opacity-50 uppercase">Customer</th>
                    <th className="px-8 py-4 font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#d0c5af] opacity-50 uppercase">Item</th>
                    <th className="px-8 py-4 font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#d0c5af] opacity-50 uppercase">Status</th>
                    <th className="px-8 py-4 font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#d0c5af] opacity-50 uppercase">Total</th>
                    <th className="px-8 py-4 font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#d0c5af] opacity-50 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  
                  <tr className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5 font-sans text-[14px] leading-[20px] tracking-[0.05em] font-bold text-[#7ae749]">#LM-9021</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#353436] overflow-hidden">
                          <img className="w-full h-full object-cover" alt="Julianne Moore" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjVyOlcrQMllBz80Zws5yfqWyrsx048ld0V0CfrJZVheg6cAhMrfPkKLit-sbN0G5A00jBlidG7-d-F--L_hu1v2eSzLUSEt-NBrnIcASXLqmYhai8ouhsiVpj9zHGwICc0Adzs8q1nlS55sAHmdBxcwfqsWFJSvSdTuAE1qSAAU-KkZ05YIOpbp4Y9LJHZo8xlfOUV_4XzmoBrjvkb3aGTK_EVZProFb7mOH4Z5saBBQO1dHtR2EKtuL_KANwaEBxDRDZPmLbKiXm" />
                        </div>
                        <span className="text-[#e5e2e3]">Julianne Moore</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[#d0c5af]">Signature Lobster Thermidor</td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-[#7ae749]/20 text-[#7ae749] text-[11px] font-bold rounded-full border border-[#7ae749]/30 uppercase">Preparing</span>
                    </td>
                    <td className="px-8 py-5 font-bold">$185.00</td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:text-[#7ae749] transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5 font-sans text-[14px] leading-[20px] tracking-[0.05em] font-bold text-[#7ae749]">#LM-9020</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#353436] overflow-hidden">
                          <img className="w-full h-full object-cover" alt="Robert Sterling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBogZ_QaxHYsFtSR5dVYxvBUOAR8AyOMIiRAt4IgIul-uBh9WJG5SFS_hUXR7TRhuT87LMuRwrTQ4Z4NtOIj4GBXGfDKnDhll9nKrpXMyxvPTte6zAsn93-zkDnb-nUd_QawfcSzAuM74TcbNt7CX8pjuuQ5sO-cz-SBa3lTm-NcDmfP92MRuJlHWccg8U8VR14eMomCyxsjgxWxLVXphtMdE4cnYF5zBpWe2in2DGs4Sce0-lCyKKSdYd0-2fbSJnkTZv1MjYw9_xg" />
                        </div>
                        <span className="text-[#e5e2e3]">Robert Sterling</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[#d0c5af]">Vintage Wine Selection (3)</td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-[#09530d]/20 text-[#7fc673] text-[11px] font-bold rounded-full border border-[#09530d]/30 uppercase">Out for Delivery</span>
                    </td>
                    <td className="px-8 py-5 font-bold">$420.00</td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:text-[#7ae749] transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5 font-sans text-[14px] leading-[20px] tracking-[0.05em] font-bold text-[#7ae749]">#LM-9019</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#353436] overflow-hidden flex items-center justify-center">
                          <span className="text-[10px] font-bold text-[#e5e2e3]">SM</span>
                        </div>
                        <span className="text-[#e5e2e3]">Sienna Miller</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[#d0c5af]">Wagyu Beef Wellington</td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-[#353436] text-[#d0c5af] text-[11px] font-bold rounded-full border border-white/10 uppercase">Pending</span>
                    </td>
                    <td className="px-8 py-5 font-bold">$125.00</td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:text-[#7ae749] transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5 font-sans text-[14px] leading-[20px] tracking-[0.05em] font-bold text-[#7ae749]">#LM-9018</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#353436] overflow-hidden">
                          <img className="w-full h-full object-cover" alt="David Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4mkzp4qKgZzk3Q3abiRZywSw-_9cVu4M9nQp3E5LhITAF5hklQaGSReDsqHpTN8XzpyfJWl-kTlbTmguMwb8koMpA4xc6tF6a-fyKEsBDf90RbT7H6lcFymTQOsOF6AfEccbXmgOHFBgp5mXBTNh7ChbXFNQPeaJXABr4CuE51Y6yYe8mNDvB33rnH-x_PKulmWZE-EwDtG_1XjtpCbN1n-MhULPQUhF86RC2nWFThk_5ZqFnq_KRZySbxJcPi7k5_nh47GrKuMy3" />
                        </div>
                        <span className="text-[#e5e2e3]">David Chen</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[#d0c5af]">Omakase Experience Set</td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[11px] font-bold rounded-full border border-green-500/30 uppercase">Delivered</span>
                    </td>
                    <td className="px-8 py-5 font-bold">$295.00</td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:text-[#7ae749] transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <div className="p-4 bg-white/5 flex justify-center">
              <button className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#7ae749] hover:underline">View Transaction History</button>
            </div>
          </section>

          {/* Footer Integration */}
          <footer className="mt-[80px] py-12 px-0 border-t border-white/5 grid grid-cols-1 md:grid-cols-4 gap-[24px]">
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-serif text-[32px] leading-[40px] font-medium text-[#72df41] mb-4">Lumière Dining</h3>
              <p className="text-[#d0c5af] font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold max-w-sm mb-6 opacity-70">
                The control center for global culinary excellence. Manage orders, analyze trends, and curate the ultimate dining experience.
              </p>
              <p className="font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-[#d0c5af] opacity-50">© 2024 Lumière Dining. All Rights Reserved.</p>
            </div>
            
            <div>
              <h4 className="text-[#7ae749] font-sans text-[12px] leading-[16px] tracking-[0.03em] font-bold mb-4 uppercase">System</h4>
              <ul className="space-y-2">
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-colors font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold" href="#">Privacy Policy</a></li>
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-colors font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold" href="#">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#7ae749] font-sans text-[12px] leading-[16px] tracking-[0.03em] font-bold mb-4 uppercase">Company</h4>
              <ul className="space-y-2">
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-colors font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold" href="#">Sustainability</a></li>
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-colors font-sans text-[14px] leading-[20px] tracking-[0.05em] font-semibold" href="#">Careers</a></li>
              </ul>
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}