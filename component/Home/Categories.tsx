'use client'
import { LuUtensils, LuFish, LuUtensilsCrossed, LuWine, LuArrowRight, LuCoffee } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Fallback icons map based on category name
const getIconForCategory = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('steak') || lower.includes('meat')) return LuUtensils;
  if (lower.includes('sushi') || lower.includes('seafood')) return LuFish;
  if (lower.includes('pasta') || lower.includes('italian')) return LuUtensilsCrossed;
  if (lower.includes('wine') || lower.includes('drink') || lower.includes('beverage')) return LuWine;
  return LuCoffee;
};

export default function Categories({ categories }: { categories: any[] }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-24 px-5 md:px-20 bg-dark-bg relative overflow-hidden">
      {/* Optional: Ambient background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-primary-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-360 mx-auto relative z-10">
        
        {/* Enhanced Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-[32px] md:text-[48px] leading-10 md:leading-14 font-semibold text-white">
            Exquisite Categories
          </h2>
          <p className="text-gray-400 font-sans text-base max-w-2xl mx-auto">
            Explore our curated menus, where culinary mastery meets the finest seasonal ingredients.
          </p>
        </div>

        {/* Upgraded Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat: any) => {
            const Icon = getIconForCategory(cat.name);
            return (
              <div key={cat._id} 
                className="relative overflow-hidden group rounded-2xl bg-white/5 border border-white/5 hover:border-primary-500/30 transition-all duration-500 p-8 flex flex-col items-center justify-center gap-6 hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(132,204,22,0.15)] cursor-pointer backdrop-blur-sm" >
                
                {/* Card Hover Glow Effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>

                {/* Icon Container with Inner Shadow & Border */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-linear-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary-500/50 transition-all duration-500 shadow-lg">
                  <Icon className="text-4xl text-primary-400 group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_8px_rgba(132,204,22,0.4)] group-hover:drop-shadow-none" />
                </div>

                {/* Text Layout */}
                <div className="relative z-10 text-center space-y-2 transform transition-transform duration-500 group-hover:-translate-y-1">
                  <h3 className="text-white font-serif text-[24px] tracking-wide font-medium group-hover:text-primary-400 transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                    {cat.description || "Curated Selection"}
                  </p>
                </div>

                {/* Animated Action Arrow */}
                <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 delay-75">
                  <LuArrowRight className="text-primary-400 text-xl" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}