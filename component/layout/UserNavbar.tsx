'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, User } from 'lucide-react';

export default function UserNavbar() {
  const [user, setUser] = useState<any>(null);
  const { items } = useCartStore();
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <nav className={`w-full z-50 border-b border-white/10 py-4 backdrop-blur-xl transition-all duration-300 ${isTransparentPage ? 'fixed top-0 bg-transparent' : 'sticky top-0 bg-dark-bg'}`}>
      <div className="flex justify-between items-center px-5 md:px-20 w-full max-w-7xl mx-auto">
        <span 
          className="font-serif text-[32px] leading-10 font-bold text-primary-400 cursor-pointer"
          onClick={() => router.push('/')}
        >
          Lumière
        </span>
        <div className="hidden lg:flex items-center gap-10">
          {[
            { name: 'Home', path: '/' },
            { name: 'Menu', path: '/menu' },
            { name: 'About', path: '/about' },
            { name: 'Reservations', path: '/dashboard/reservations' },
            { name: 'Contact', path: '/contact' }
          ].map((item) => {
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
        <div className="flex items-center gap-6">
          <div 
            className="relative cursor-pointer flex items-center justify-center p-2 rounded-full hover:bg-white/5 transition-colors"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="text-gray-300 w-6 h-6" />
            {totalQuantity > 0 && (
              <div className="absolute -top-1 -right-1 bg-primary-500 text-dark-bg font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </div>
            )}
          </div>
          
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
      </div>
    </nav>
  );
}
