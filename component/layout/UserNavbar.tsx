'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useBranding } from '@/component/BrandingProvider';

export default function UserNavbar() {
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCartStore();
  const router = useRouter();
  const pathname = usePathname();
  const branding = useBranding();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/verify');
        if (data.success) {
          setUser(data.data);
        }
      } catch (err) {
        // Not logged in, perfectly fine
      }
    };
    fetchUser();
  }, []);

  const totalQuantity = items.reduce((total: number, item: any) => total + item.quantity, 0);

  const isTransparentPage = pathname === '/' || pathname === '/about' || pathname === '/contact';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Reservations', path: '/dashboard/reservations' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`w-full z-50 border-b border-white/10 py-4 transition-all duration-300 ${isTransparentPage ? 'fixed top-0 bg-transparent backdrop-blur-md' : 'sticky top-0 bg-dark-bg backdrop-blur-xl'}`}>
      <div className="flex justify-between items-center px-5 md:px-20 w-full max-w-7xl mx-auto">
        <div 
          className="cursor-pointer flex items-center gap-3 z-50"
          onClick={() => router.push('/')}
        >
          {branding?.logo && (
            <img src={branding.logo} alt="Brand Logo" className="w-auto h-8 md:h-10 object-contain" />
          )}
          <span className="font-serif text-[24px] md:text-[32px] leading-10 font-bold text-primary-400">
            {branding?.restaurantName || 'Lumière'}
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
            return (
              <a 
                key={item.name}
                className={`${isActive ? 'text-primary-400 border-b-2 border-primary-400 pb-1 font-semibold' : 'text-gray-400 hover:text-white font-medium'} transition-colors duration-300 font-sans text-[14px] tracking-wide`} 
                href={item.path}
              >
                {item.name}
              </a>
            );
          })}
        </div>
        
        {/* Actions (Cart, Profile, Mobile Menu) */}
        <div className="flex items-center gap-4 md:gap-6 z-50">
          <div 
            className="relative cursor-pointer flex items-center justify-center p-2 rounded-full hover:bg-white/5 transition-colors"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="text-gray-300 w-5 h-5 md:w-6 md:h-6" />
            {totalQuantity > 0 && (
              <div className="absolute -top-1 -right-1 bg-primary-500 text-dark-bg font-bold text-[10px] w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </div>
            )}
          </div>
          
          <div className="hidden md:block">
            {user ? (
              <div 
                className="w-10 h-10 rounded-full border border-primary-500/30 overflow-hidden bg-dark-surface flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors"
                onClick={() => router.push('/dashboard')}
                title="Dashboard"
              >
                {user.avatar ? (
                  <img src={user.avatar} className="w-full h-full object-cover" alt="User" />
                ) : (
                  <User className="text-primary-400 w-6 h-6" />
                )}
              </div>
            ) : (
              <button 
                onClick={() => router.push('/login')}
                className="font-sans text-[14px] font-semibold tracking-wider text-primary-400 border border-primary-500/50 hover:bg-primary-500/10 px-5 py-2 rounded-full transition-colors"
              >
                Log In
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gray-300 p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-dark-surface border-b border-white/10 shadow-2xl z-40 flex flex-col py-4 px-5 gap-4">
          {navLinks.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
            return (
              <a 
                key={item.name}
                className={`${isActive ? 'text-primary-400 font-semibold' : 'text-gray-400 font-medium'} text-lg transition-colors duration-300 font-sans tracking-wide py-2 border-b border-white/5`} 
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            );
          })}
          
          <div className="pt-4 flex items-center gap-4">
            {user ? (
              <button
                className="flex items-center gap-3 w-full bg-primary-500/10 text-primary-400 py-3 rounded-lg justify-center border border-primary-500/20"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/dashboard');
                }}
              >
                {user.avatar ? (
                  <img src={user.avatar} className="w-6 h-6 rounded-full object-cover" alt="User" />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span className="font-semibold">Dashboard</span>
              </button>
            ) : (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/login');
                }}
                className="w-full font-sans text-lg font-semibold tracking-wider text-primary-400 border border-primary-500/50 hover:bg-primary-500/10 py-3 rounded-lg transition-colors"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
