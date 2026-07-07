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
  Grid,
  Palette,
  Ticket,
  LogOut,
  Bell,
  BarChart3,
  Image as ImageIcon,
  Images,
  HelpCircle,
  MessageSquare,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const branding = useBranding();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    { name: 'Menu', icon: Utensils, path: '/admin/menu' },
    { name: 'Categories', icon: Grid, path: '/admin/categories' },
    { name: 'Reservations', icon: CalendarCheck, path: '/admin/reservations' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Promos', icon: Ticket, path: '/admin/coupons' },
    { name: 'Banners', icon: ImageIcon, path: '/admin/banners' },
    { name: 'Gallery', icon: Images, path: '/admin/gallery' },
    { name: 'FAQ', icon: HelpCircle, path: '/admin/content/faq' },
    { name: 'Notifications', icon: MessageSquare, path: '/admin/notifications' },
    { name: 'Branding', icon: Palette, path: '/admin/branding' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  if (currentUser?.role === 'superadmin') {
    navItems.splice(1, 0, { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' });
  }

  return (
    <div className="font-sans text-gray-300 min-h-screen bg-dark-bg flex relative">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SideNavBar */}
      <aside className={`w-64 shrink-0 bg-dark-surface border-r border-white/10 flex flex-col h-screen fixed lg:sticky top-0 z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="cursor-pointer max-w-[140px] flex items-center gap-3" onClick={() => router.push('/')}>
            {branding?.logo && (
              <img src={branding.logo} alt="Brand Logo" className="w-auto h-8 object-contain" />
            )}
            <span className="font-serif text-[24px] font-bold text-primary-400 truncate">
              {branding?.restaurantName || 'Lumière'}
            </span>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
          <span className="hidden lg:inline-block text-[10px] bg-primary-500/20 text-primary-400 px-2 py-1 rounded uppercase tracking-widest font-bold">Admin</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (pathname === '/admin' && item.path === '/admin/dashboard');
            return (
              <button 
                key={item.name}
                onClick={() => {
                  router.push(item.path);
                  setIsMobileMenuOpen(false);
                }}
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
            <div className="w-10 h-10 shrink-0 rounded-full bg-primary-500/20 flex items-center justify-center overflow-hidden">
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Shield className="w-5 h-5 text-primary-400" />
              )}
            </div>
            <div className="flex flex-col items-start overflow-hidden">
              <h3 className="text-sm font-bold text-white w-full truncate">{currentUser?.username || 'Loading...'}</h3>
              <div className="flex gap-2 mt-1">
                <button onClick={() => router.push('/dashboard')} className="text-[10px] text-gray-400 hover:text-white uppercase tracking-wider font-bold">App</button>
                {currentUser?.role === 'superadmin' && (
                  <>
                    <span className="text-gray-600">|</span>
                    <button onClick={() => router.push('/superadmin/dashboard')} className="text-[10px] text-primary-400 hover:text-primary-300 uppercase tracking-wider font-bold">Root</button>
                  </>
                )}
                <span className="text-gray-600">|</span>
                <button onClick={handleLogout} className="text-[10px] text-red-400 hover:text-red-300 uppercase tracking-wider font-bold flex items-center gap-1">
                  <LogOut className="w-3 h-3" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-dark-bg flex flex-col h-screen overflow-hidden min-w-0">
        <header className="h-20 border-b border-white/10 bg-dark-surface flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="font-serif text-xl lg:text-2xl text-white truncate">
              {navItems.find(i => i.path === pathname)?.name || 'Admin Panel'}
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-white"><Bell className="w-5 h-5" /></button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
