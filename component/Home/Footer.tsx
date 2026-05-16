import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-2">
            <span className="font-serif text-2xl font-bold tracking-wider text-white mb-6 block">
              LUXE<span className="text-amber-600">BISTRO</span>
            </span>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Redefining the modern culinary landscape through precision, minimalism, and extraordinary flavors.
            </p>
          </div>
          
          {/* Links Col 1 */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">Connect</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Locations</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Luxe Bistro. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social Icons placeholders */}
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-slate-900 transition-all">
              IN
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-600 hover:text-slate-900 transition-all">
              FB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}