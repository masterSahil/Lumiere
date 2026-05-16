import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="font-serif text-2xl font-bold tracking-wider text-slate-900">
              LUXE<span className="text-amber-600">BISTRO</span>
            </span>
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex space-x-8">
            {['Menu', 'Reservations', 'About', 'Offers'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Sign In
            </button>
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-amber-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Order Now
            </button>
            {/* Icons */}
            <div className="flex space-x-4 border-l pl-4 border-gray-200">
              <button className="text-slate-600 hover:text-amber-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </button>
              <button className="text-slate-600 hover:text-amber-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}