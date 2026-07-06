'use client'
import Head from 'next/head';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { ReceiptText, Utensils, User, MapPin, CreditCard, Bell, Settings, LogOut } from 'lucide-react';
import UserNavbar from '@/component/layout/UserNavbar';
import Footer from '@/component/Home/Footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();  
  const [user, setUser] = useState<any>(null);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (e) {
      // Ignore if endpoint doesn't exist
    }
    sessionStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/verify');
        if (data.success) {
          setUser(data.data);
        }
      } catch (e: any) {
        console.error("Failed to fetch user in layout", e);
        const errorMsg = e.response?.data?.message || e.response?.data?.error || "Session expired or user inactive";
        toast.error(errorMsg);
        
        if (e.response?.status === 401 || e.response?.status === 403) {
            router.push('/login');
        }
      }
    };
    fetchUser();
  }, []);

  const navItems = [
    { name: 'Dining Passport', icon: User, path: '/dashboard/profile' },
    { name: 'Orders', icon: ReceiptText, path: '/dashboard/orders' },
    { name: 'Reservations', icon: Utensils, path: '/dashboard/reservations' },
    { name: 'Addresses', icon: MapPin, path: '/dashboard/addresses' },
    { name: 'Payment Methods', icon: CreditCard, path: '/dashboard/payments' },
    { name: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="font-sans text-gray-300 leading-6 selection:bg-primary-500 selection:text-dark-bg min-h-screen bg-dark-bg">
      {/* Top Navigation Bar */}
      <UserNavbar />

      <main className="pt-32 pb-20 px-5 md:px-10 max-w-400 mx-auto min-h-screen">
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
                  
                  <div className="my-2 border-t border-white/5"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span className="font-sans text-[14px] leading-5 tracking-wider font-semibold">Log Out</span>
                  </button>
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
      <Footer />
    </div>
  );
}
