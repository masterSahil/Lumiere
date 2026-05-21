'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LuChartColumnIncreasing,
  LuShoppingBag,
  LuUtensils,
  LuLayoutGrid,
  LuStar,
  LuUsers,
  LuSettings,
  LuLogOut,
} from 'react-icons/lu';

const NAV_ITEMS = [
  { link: '/', label: 'Dashboard', icon: LuChartColumnIncreasing },
  { link: '/orders', label: 'Orders', icon: LuShoppingBag },
  { link: '/food', label: 'Food', icon: LuUtensils },
  { link: '/categories', label: 'Categories', icon: LuLayoutGrid },
  { link: '/promotions', label: 'Promotions', icon: LuStar },
  { link: '/customers', label: 'Customers', icon: LuUsers },
  { link: '/analytics', label: 'Analytics', icon: LuChartColumnIncreasing },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname() || '';

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#131314]/95 backdrop-blur-2xl border-r border-white/5 flex flex-col py-8 px-6 transform transition-transform duration-300 ${
          isSidebarOpen
            ? 'translate-x-0 mt-16 lg:mt-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="mb-10 hidden lg:block">
          <h1 className="font-serif text-4xl text-[#7ae749] tracking-tight">
            Lumière
          </h1>

          <p className="text-[#d0c5af] text-xs uppercase tracking-widest mt-2 opacity-60">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-3 overflow-y-auto overflow-x-hidden pr-2 -mr-2">
          {NAV_ITEMS.map((item, idx) => {
            const isActive =
              item.link === '/'
                ? pathname === '/'
                : pathname === item.link ||
                  pathname.startsWith(item.link + '/');

            return (
              <Link
                key={idx}
                href={item.link}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all font-medium text-sm group ${
                  isActive
                    ? 'bg-[#7ae749]/10 text-[#7ae749] shadow-[inset_4px_0_0_0_#7ae749]'
                    : 'text-[#d0c5af] hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon
                  className={`text-xl transition-transform ${
                    !isActive
                      ? 'group-hover:scale-110 group-hover:text-[#7ae749]'
                      : ''
                  }`}
                />

                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
          <Link
            href="/settings"
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all font-medium text-sm group ${
              pathname.startsWith('/settings')
                ? 'bg-[#7ae749]/10 text-[#7ae749] shadow-[inset_4px_0_0_0_#7ae749]'
                : 'text-[#d0c5af] hover:bg-white/5 hover:text-white'
            }`}
          >
            <LuSettings
              className={`text-xl transition-transform ${
                !pathname.startsWith('/settings')
                  ? 'group-hover:scale-110 group-hover:text-[#7ae749]'
                  : ''
              }`}
            />

            Settings
          </Link>

          {/* User */}
          <div className="flex items-center gap-3 px-4 py-2 mt-2">
            <div className="w-10 h-10 rounded-full bg-[#353436] overflow-hidden border border-white/10 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&q=80"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 truncate">
              <p className="text-white font-bold text-sm">
                Jean Luc
              </p>

              <p className="text-[#d0c5af] text-xs opacity-80 truncate">
                Executive Chef
              </p>
            </div>

            <button
              title="Logout"
              className="text-[#d0c5af] hover:text-[#ffb4ab] transition-colors p-2 rounded-lg hover:bg-white/5 outline-none"
            >
              <LuLogOut className="text-lg" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}