"use client";
import Loading from '@/app/loading';
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'Contact', href: '/contact' },
  ];

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const VerifyLogin = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return setLoggedIn(false);
    }

    try {
      setLoading(true);
      await axios.get("/api/auth/verify", {
        headers: {
          Authorization: `bearer ${token}`
        }
      })

      setLoggedIn(true);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    VerifyLogin();
  }, [])

  const logout = () => {
    sessionStorage.removeItem("token");
    setLoggedIn(false);
    router.push("/login");
  }

  if (loading) {
    return <Loading />
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl border-b border-white/10">
      <div className="flex justify-between items-center px-5 md:px-20 py-4 w-full max-w-360 mx-auto">
        
        {/* Logo */}
        <div className="font-serif text-[32px] md:text-[48px] leading-10 md:leading-14 font-bold text-[#72df41]">
          <Link href="/">
            Lumière Dining
          </Link>
        </div>

        {/* Desktop Navigation - Dynamic */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`font-sans text-[14px] leading-5 tracking-wider font-semibold transition-all duration-300 pb-1 border-b-2 ${
                  isActive 
                    ? "text-[#7ae749] border-[#7ae749]" 
                    : "text-[#e5e2e3]/70 border-transparent hover:text-[#7ae749]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Call to Action & Mobile Menu */}
        <div className="flex items-center gap-6">
          {
            loggedIn ? 
              <button onClick={logout} className="bg-[#5fca2d] text-[#1a5000] px-6 py-2.5 rounded-full font-sans text-[14px] leading-5 tracking-wider font-semibold hover:bg-[#7ae749] transition-all duration-300 shadow-lg shadow-[#7ae749]/20">
                Logout
              </button>
              :
              <button onClick={()=>router.push("/login")} className="bg-[#5fca2d] text-[#1a5000] px-6 py-2.5 rounded-full font-sans text-[14px] leading-5 tracking-wider font-semibold hover:bg-[#7ae749] transition-all duration-300 shadow-lg shadow-[#7ae749]/20">
                Sign In
              </button>
          }
          
          {/* Mobile Hamburger Icon */}
          <button className="md:hidden text-[#e5e2e3]" aria-label="Toggle Menu">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}