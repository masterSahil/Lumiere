'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuChartColumnIncreasing, LuShoppingBag, LuUtensils, LuLayoutGrid, LuStar, LuUsers, LuSettings, LuLogOut, LuChevronDown } from 'react-icons/lu';

// Define the types for our navigation items
interface SubItem {
  link: string;
  label: string;
}

interface NavItem {
  link?: string; // Optional because items with submenus might not have a direct link
  label: string;
  icon: React.ElementType;
  subItems?: SubItem[];
}

const NAV_ITEMS: NavItem[] = [
  { link: '/', label: 'Dashboard', icon: LuLayoutGrid },
  {
    label: 'Menu',
    icon: LuUtensils,
    subItems: [
      { link: '/adminsPages/addMenu', label: '1. Add Menu' },
      { link: '/adminsPages/manageMenu', label: '2. Manage Menu' },
      { link: '/adminsPages/trashMenu', label: '3. Trash Menu' },
    ],
  },
  { link: '/customers', label: 'Customers', icon: LuUsers },
  { link: '/orders', label: 'Orders', icon: LuShoppingBag },
  { link: '/promotions', label: 'Promotions', icon: LuStar },
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

  // State to track which menus are expanded
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#131314]/95 backdrop-blur-2xl border-r border-white/5 flex flex-col py-8 px-6 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0 mt-16 lg:mt-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        {/* Logo */}
        <div className="mb-10 hidden lg:block">
          <h1 className="font-serif text-4xl text-[#7ae749] tracking-tight">Lumière</h1>
          <p className="text-[#d0c5af] text-xs uppercase tracking-widest mt-2 opacity-60"> Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto overflow-x-hidden pr-2 -mr-2 custom-scrollbar">
          {NAV_ITEMS.map((item, idx) => {
            const hasSubItems = !!item.subItems && item.subItems.length > 0;
            const isExpanded = expandedMenus[item.label];

            // Check if parent or any sub-item is active
            const isItemActive = item.link
              ? pathname === item.link || pathname.startsWith(item.link + '/')
              : item.subItems?.some(
                (sub) => pathname === sub.link || pathname.startsWith(sub.link + '/')
              );

            const activeParentStyles = 'bg-[#7ae749]/10 text-[#7ae749] shadow-[inset_4px_0_0_0_#7ae749]';
            const inactiveParentStyles = 'text-[#d0c5af] hover:bg-white/5 hover:text-white';

            return (
              <div key={idx} className="flex flex-col">
                {hasSubItems ? (
                  // PARENT BUTTON (If it has sub-items)
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all font-medium text-sm group w-full ${isItemActive ? activeParentStyles : inactiveParentStyles
                      }`} >
                    <div className="flex items-center gap-4">
                      <item.icon
                        className={`text-xl transition-transform ${!isItemActive ? 'group-hover:scale-110 group-hover:text-[#7ae749]' : ''
                          }`}
                      />
                      {item.label}
                    </div>
                    <LuChevronDown
                      className={`text-lg transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#7ae749]' : 'opacity-50'
                        }`}
                    />
                  </button>
                ) : (
                  // STANDARD LINK (If no sub-items)
                  <Link
                    href={item.link!}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all font-medium text-sm group ${isItemActive ? activeParentStyles : inactiveParentStyles
                      }`} >
                    <item.icon
                      className={`text-xl transition-transform ${!isItemActive ? 'group-hover:scale-110 group-hover:text-[#7ae749]' : ''
                        }`}
                    />
                    {item.label}
                  </Link>
                )}

                {/* SUB-ITEMS ACCORDION */}
                {hasSubItems && (
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] mt-1' : 'grid-rows-[0fr]'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col space-y-1 ml-6 pl-4 border-l border-white/10 relative mt-1 mb-2">
                        {item.subItems!.map((subItem, subIdx) => {
                          const isSubActive =
                            pathname === subItem.link ||
                            pathname.startsWith(subItem.link + '/');

                          return (
                            <Link
                              key={subIdx}
                              href={subItem.link}
                              onClick={() => setIsSidebarOpen(false)}
                              className={`py-2 px-3 rounded-lg text-sm transition-all duration-200 relative group ${isSubActive
                                  ? 'text-[#7ae749] font-medium bg-[#7ae749]/5'
                                  : 'text-[#d0c5af]/80 hover:text-white hover:bg-white/5'
                                }`}
                            >
                              {/* Horizontal branch line effect on hover/active */}
                              <span
                                className={`absolute -left-4.25 top-1/2 -translate-y-1/2 w-3 h-px transition-colors ${isSubActive ? 'bg-[#7ae749]' : 'bg-transparent group-hover:bg-white/20'
                                  }`}
                              />
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
          <Link
            href="/settings"
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all font-medium text-sm group ${pathname.startsWith('/settings')
                ? 'bg-[#7ae749]/10 text-[#7ae749] shadow-[inset_4px_0_0_0_#7ae749]'
                : 'text-[#d0c5af] hover:bg-white/5 hover:text-white'
              }`}
          >
            <LuSettings
              className={`text-xl transition-transform ${!pathname.startsWith('/settings')
                  ? 'group-hover:scale-110 group-hover:text-[#7ae749]'
                  : ''
                }`}
            />
            Settings
          </Link>

          {/* User Profile Card */}
          <div className="flex items-center gap-3 px-4 py-2 mt-2">
            <div className="w-10 h-10 rounded-full bg-[#353436] overflow-hidden border border-white/10 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&q=80"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 truncate">
              <p className="text-white font-bold text-sm">Jean Luc</p>
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