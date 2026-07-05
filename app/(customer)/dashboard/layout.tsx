'use client'
import Head from 'next/head';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ReceiptText, Utensils, User, MapPin, CreditCard, Bell, Settings } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/verify');
        if (data.success) {
          setUser(data.data);
        }
      } catch (e) {
        console.error("Failed to fetch user in layout", e);
      }
    };
    fetchUser();
  }, []);

  const navItems = [
    { name: 'Orders', icon: ReceiptText, path: '/dashboard/orders' },
    { name: 'Reservations', icon: Utensils, path: '/dashboard/reservations' },
    { name: 'Profile', icon: User, path: '/dashboard/profile' },
    { name: 'Addresses', icon: MapPin, path: '/dashboard/addresses' },
    { name: 'Payment Methods', icon: CreditCard, path: '/dashboard/payments' },
    { name: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="font-sans text-gray-300 leading-6 selection:bg-primary-500 selection:text-dark-bg min-h-screen bg-dark-bg">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-dark-bg/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex justify-between items-center px-5 md:px-20 py-4 w-full max-w-7xl mx-auto">
          <span 
            className="font-serif text-[32px] leading-10 font-bold text-primary-400 cursor-pointer"
            onClick={() => router.push('/')}
          >
            Lumière
          </span>
          <div className="hidden md:flex items-center gap-6">
            <a className="font-serif text-[14px] leading-5 font-medium text-gray-300 hover:text-primary-400 transition-colors duration-300" href="/menu">Menu</a>
            <a className="font-serif text-[14px] leading-5 font-medium text-gray-300 hover:text-primary-400 transition-colors duration-300" href="/cart">Cart</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-primary-500/30 overflow-hidden bg-dark-surface flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} className="w-full h-full object-cover" alt="User" />
              ) : (
                <User className="text-primary-400 w-6 h-6" />
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-5 md:px-20 max-w-7xl mx-auto min-h-screen">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* SideNavBar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-32 flex flex-col gap-6">
              <div className="bg-dark-surface p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 overflow-hidden flex items-center justify-center border border-primary-500/20">
                    {user?.avatar ? (
                      <img src={user.avatar} className="w-full h-full object-cover" alt="User" />
                    ) : (
                      <User className="text-primary-400 w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-sans text-[14px] leading-5 tracking-wider font-semibold text-primary-400">{user?.username || 'Guest User'}</h3>
                    <p className="font-sans text-[12px] leading-4 tracking-[0.03em] font-medium text-gray-400 capitalize">{user?.role === 'customer' ? 'Lumière Member' : (user?.role || 'Guest')}</p>
                  </div>
                </div>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <button 
                        key={item.name}
                        onClick={() => router.push(item.path)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          isActive 
                          ? "bg-primary-950 text-primary-400 border-r-4 border-primary-500" 
                          : "text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                        <span className="font-sans text-[14px] leading-5 tracking-wider font-semibold">{item.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="grow flex flex-col gap-12">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-5 md:px-20 border-t border-white/5 bg-dark-bg">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-sans text-[14px] leading-5 tracking-wider font-semibold text-gray-500">© {new Date().getFullYear()} Lumière Dining. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
