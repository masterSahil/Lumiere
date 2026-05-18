import React, { useState } from 'react';
import Head from 'next/head';
import { 
  LuChartColumnIncreasing, LuReceipt, LuUtensils, LuPalette, LuSettings, 
  LuPlus, LuTrendingUp, LuTrendingDown, LuCircleDollarSign, 
  LuShoppingBag, LuUsers, LuClock, LuCalendar, LuSearch, 
  LuEllipsisVertical, LuStar, LuUser, LuMenu, LuX
} from 'react-icons/lu';
import Link from 'next/link';

// --- DATA CONFIGURATION ---
const NAV_ITEMS = [
  { link: '/', label: 'Analytics', icon: LuChartColumnIncreasing, active: true },
  { link: '/', label: 'Orders', icon: LuReceipt },
  { link: '/menu', label: 'Menu CMS', icon: LuUtensils },
  { link: '/', label: 'Branding', icon: LuPalette },
  { link: '/', label: 'Settings', icon: LuSettings },
];

const STATS = [
  { title: 'Total Revenue', value: '$142,850.00', trend: '12.5%', isUp: true, Icon: LuCircleDollarSign, color: 'text-[#7ae749]' },
  { title: 'Total Orders', value: '1,284', trend: '8.2%', isUp: true, Icon: LuShoppingBag, color: 'text-[#7ae749]' },
  { title: 'Active Users', value: '4,592', trend: '2.1%', isUp: false, Icon: LuUsers, color: 'text-[#ffb4ab]' },
  { title: 'Avg Delivery', value: '24m 12s', trend: '- 4m', isUp: true, Icon: LuClock, color: 'text-[#7ae749]' },
];

const TIMELINE = [
  { title: 'New Menu Item Added', desc: 'Black Truffle Risotto by Chef Marco', time: '2h ago', Icon: LuUtensils, color: 'text-[#7ae749]' },
  { title: 'Campaign Launched', desc: 'Autumn Gold Tasting Series', time: '5h ago', Icon: LuStar, color: 'text-[#7fc673]' },
  { title: 'Profile Updated', desc: 'Master Admin credentials rotated', time: '1d ago', Icon: LuUser, color: 'text-[#72df41]' },
];

const ORDERS = [
  { id: '#LM-9021', name: 'Julianne Moore', item: 'Signature Lobster Thermidor', status: 'Preparing', total: '$185.00', img: 'https://i.pravatar.cc/150?img=1' },
  { id: '#LM-9020', name: 'Robert Sterling', item: 'Vintage Wine Selection (3)', status: 'Out for Delivery', total: '$420.00', img: 'https://i.pravatar.cc/150?img=11' },
  { id: '#LM-9019', name: 'Sienna Miller', item: 'Wagyu Beef Wellington', status: 'Pending', total: '$125.00', initials: 'SM' },
  { id: '#LM-9018', name: 'David Chen', item: 'Omakase Experience Set', status: 'Delivered', total: '$295.00', img: 'https://i.pravatar.cc/150?img=68' },
];

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Lumière | Admin</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Strict overflow & background prevention */
        html, body { 
            max-width: 100vw; 
            overflow-x: hidden; 
            
            /* The Fix: Force solid background and kill Next.js default gradients */
            background: #131314 !important; 
            background-image: none !important; 
            
            color: #e5e2e3; 
            font-family: 'Manrope', sans-serif; 
            margin: 0;
            padding: 0;
        }
        
        /* Kills any weird Next.js pseudo-element glows */
        body::before, body::after {
            display: none !important;
        }

        h1, h2, h3, h4, .font-serif { font-family: 'Playfair Display', serif; }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); }
        .glass2 { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); }
        
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(122, 231, 73, 0.5); }
      `}} />

      <div className="min-h-screen selection:bg-[#7ae749] selection:text-[#103900]">
        
        {/* Mobile Header Overlay */}
        <div className="lg:hidden fixed top-0 inset-x-0 glass z-40 p-4 flex justify-between items-center border-b border-white/10">
          <h1 className="font-serif text-2xl text-[#7ae749]">Lumière</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl p-2 text-white outline-none">
            {isSidebarOpen ? <LuX /> : <LuMenu />}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#131314]/95 backdrop-blur-2xl border-r border-white/5 flex flex-col py-8 px-6 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="mb-10 mt-10 lg:mt-0">
            <h1 className="font-serif text-4xl text-[#7ae749] tracking-tight">Lumière</h1>
            <p className="text-[#d0c5af] text-xs uppercase tracking-widest mt-2 opacity-60">Admin Panel</p>
          </div>

          <nav className="flex-1 space-y-3">
            {NAV_ITEMS.map((item, idx) => (
              <Link key={idx} href={item.link} className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all font-medium text-sm ${item.active ? 'bg-[#7ae749]/10 text-[#7ae749]' : 'text-[#d0c5af] hover:bg-white/5 hover:text-white'}`}>
                <item.icon className="text-xl" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
            <button className="w-full py-3 bg-[#7ae749] text-[#103900] text-sm font-bold rounded-xl hover:bg-[#8dfc5b] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(122,231,73,0.2)]">
              <LuPlus className="text-lg" /> Add New Item
            </button>
            <div className="flex items-center gap-4">
              <img alt="Admin" src="https://i.pravatar.cc/150?img=33" className="w-10 h-10 rounded-full border-2 border-white/10 object-cover" />
              <div>
                <p className="text-sm font-bold">Alexandre L.</p>
                <p className="text-xs text-[#d0c5af] opacity-80">Master Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:ml-64 p-4 sm:p-8 lg:p-12 pt-24 lg:pt-12 min-h-screen flex flex-col">
          
          {/* Header */}
          <header className="flex flex-col xl:flex-row justify-between xl:items-end gap-6 mb-10">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-2">Executive Overview</h2>
              <p className="text-[#d0c5af] text-base sm:text-lg opacity-80">Real-time performance metrics for Lumière Dining.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="glass2 flex items-center px-5 py-3 gap-3 rounded-xl text-sm font-medium text-[#d0c5af]">
                <LuCalendar className="text-[#7ae749]" /> Oct 24 - Oct 31, 2024
              </div>
              <button className="px-6 py-3 border border-[#7ae749]/30 text-[#7ae749] rounded-xl hover:bg-[#7ae749]/10 transition-all text-sm font-semibold">
                Export Report
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {STATS.map((stat, idx) => (
              <div key={idx} className="glass2 p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-xl"><stat.Icon className={`text-xl ${stat.color}`} /></div>
                  <span className={`text-xs font-bold flex items-center gap-1 px-2 py-1 rounded-md ${stat.isUp ? 'bg-[#7ae749]/10 text-[#7ae749]' : 'bg-[#ffb4ab]/10 text-[#ffb4ab]'}`}>
                    {stat.isUp ? <LuTrendingUp /> : <LuTrendingDown />} {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#d0c5af] mb-1">{stat.title}</p>
                  <h3 className="font-serif text-3xl font-semibold">{stat.value}</h3>
                </div>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
            {/* Minimal Chart Placeholder */}
            <div className="xl:col-span-2 glass2 p-6 sm:p-8 rounded-2xl flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <h4 className="font-serif text-2xl font-medium">Sales Trend</h4>
                <div className="flex gap-2 bg-white/5 p-1 rounded-lg w-fit">
                  <button className="px-4 py-1.5 bg-[#7ae749] text-[#103900] text-xs font-bold rounded-md">Weekly</button>
                  <button className="px-4 py-1.5 text-[#d0c5af] text-xs font-bold hover:text-white transition-colors">Monthly</button>
                </div>
              </div>
              <div className="flex-1 flex items-end gap-2 sm:gap-4 h-48 mt-4">
                {/* Simulated Bar Chart */}
                {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end group h-full">
                    <div className="w-full bg-white/5 rounded-t-sm group-hover:bg-[#7ae749]/50 transition-all" style={{ height: `${h}%` }}></div>
                    <span className="text-center text-[10px] sm:text-xs mt-3 text-[#d0c5af] opacity-50">Day {i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="glass2 p-6 sm:p-8 rounded-2xl flex flex-col">
              <h4 className="font-serif text-2xl font-medium mb-8">Recent Logs</h4>
              <div className="space-y-6 flex-1">
                {TIMELINE.map((log, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {idx !== TIMELINE.length - 1 && <div className="absolute left-3 top-8 bottom-6 w-px bg-white/10"></div>}
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center z-10 shrink-0 mt-1">
                      <log.Icon className={`text-xs ${log.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{log.title}</p>
                      <p className="text-xs text-[#d0c5af] opacity-80 mt-1">{log.desc}</p>
                      <p className="text-[10px] text-[#7ae749] mt-2 uppercase font-bold">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Orders Table */}
          <section className="glass2 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 w-full">
              <h4 className="font-serif text-2xl font-medium">Live Order Stream</h4>
              <div className="relative w-full md:w-auto">
                <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d0c5af]" />
                <input type="text" placeholder="Search orders..." className="w-full md:w-72 bg-black/20 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#7ae749]/50 transition-all" />
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap min-w-200">
                <thead className="bg-black/20 text-xs uppercase tracking-wider text-[#d0c5af] opacity-70">
                  <tr>
                    <th className="px-6 sm:px-8 py-5 font-medium">Order ID</th>
                    <th className="px-6 sm:px-8 py-5 font-medium">Customer</th>
                    <th className="px-6 sm:px-8 py-5 font-medium">Item</th>
                    <th className="px-6 sm:px-8 py-5 font-medium">Status</th>
                    <th className="px-6 sm:px-8 py-5 font-medium">Total</th>
                    <th className="px-6 sm:px-8 py-5 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {ORDERS.map((order, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 sm:px-8 py-5 font-bold text-[#7ae749]">{order.id}</td>
                      <td className="px-6 sm:px-8 py-5">
                        <div className="flex items-center gap-3">
                          {order.img ? (
                            <img src={order.img} alt={order.name} className="w-8 h-8 rounded-full border border-white/10 object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{order.initials}</div>
                          )}
                          <span className="font-medium">{order.name}</span>
                        </div>
                      </td>
                      <td className="px-6 sm:px-8 py-5 text-[#d0c5af]">{order.item}</td>
                      <td className="px-6 sm:px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${order.status === 'Preparing' ? 'bg-[#7ae749]/10 text-[#7ae749] border-[#7ae749]/20' : order.status === 'Out for Delivery' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : order.status === 'Pending' ? 'bg-white/5 text-white border-white/10' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 sm:px-8 py-5 font-bold">{order.total}</td>
                      <td className="px-6 sm:px-8 py-5 text-right">
                        <button className="p-2 text-[#d0c5af] hover:text-[#7ae749] transition-colors outline-none"><LuEllipsisVertical /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-auto pt-16 pb-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#d0c5af] opacity-60 font-medium">
            <p>© {new Date().getFullYear()} Lumière Dining. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}