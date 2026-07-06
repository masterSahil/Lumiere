'use client'
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { useBranding } from '@/component/BrandingProvider';
import { 
  LayoutDashboard, 
  ClipboardList, 
  CalendarCheck, 
  Utensils, 
  Users, 
  Settings, 
  Shield, 
  Bell,
  Grid,
  Palette
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const branding = useBranding();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/verify');
        if (data.success) {
          setCurrentUser(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    { name: 'Menu', icon: Utensils, path: '/admin/menu' },
    { name: 'Categories', icon: Grid, path: '/admin/categories' },
    { name: 'Reservations', icon: CalendarCheck, path: '/admin/reservations' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Branding', icon: Palette, path: '/admin/branding' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="font-sans text-gray-300 min-h-screen bg-dark-bg flex">
      {/* SideNavBar */}
      <aside className="w-64 shrink-0 bg-dark-surface border-r border-white/10 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="cursor-pointer max-w-[140px] flex items-center gap-3" onClick={() => router.push('/')}>
            {branding?.logo && (
              <img src={branding.logo} alt="Brand Logo" className="w-auto h-8 object-contain" />
            )}
            <span className="font-serif text-[24px] font-bold text-primary-400">Lumière</span>
          </div>
          <span className="text-[10px] bg-primary-500/20 text-primary-400 px-2 py-1 rounded uppercase tracking-widest font-bold">Admin</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (pathname === '/admin' && item.path === '/admin/dashboard');
            return (
              <button 
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive 
                  ? "bg-primary-950 text-primary-400 border-l-4 border-primary-500" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="font-sans text-[14px] font-medium tracking-wider">{item.name}</span>
              </button>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center overflow-hidden">
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Shield className="w-5 h-5 text-primary-400" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white max-w-[100px] truncate">{currentUser?.username || 'Loading...'}</h3>
              <button onClick={() => router.push('/')} className="text-xs text-red-400 hover:underline">Exit Admin</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-dark-bg flex flex-col h-screen overflow-hidden">
        <header className="h-20 border-b border-white/10 bg-dark-surface flex items-center justify-between px-8 shrink-0">
          <h2 className="font-serif text-2xl text-white">
            {navItems.find(i => i.path === pathname)?.name || 'Admin Panel'}
          </h2>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-white"><Bell className="w-5 h-5" /></button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
