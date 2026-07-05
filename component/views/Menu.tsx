'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export default function MenuPage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartCount } = useCart();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get('/api/menu');
        if (data.success) {
          setFoods(data.foods);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleAddToCart = (food: any) => {
    addToCart({
      _id: food._id,
      name: food.name,
      price: food.price,
      primaryImage: food.primaryImage,
      quantity: 1
    });
    toast.success(`Added ${food.name} to cart`);
  };

  const filteredFoods = filter === 'All' 
    ? foods 
    : foods.filter(f => f.category?.name === filter || (filter === 'Signature' && f.isPopular));

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-color: #121212;
          color: #f3f4f6;
          overflow-x: hidden;
        }
        .toggle-checkbox:checked {
          right: 0;
          border-color: #bcfb4b;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #bcfb4b;
        }
      `}} />

      <div className="font-sans text-4 leading-6 selection:bg-[#bcfb4b] selection:text-[#0a1f00] min-h-screen bg-[#121212]">
        
        {/* Top Navigation Bar */}
        <nav className="w-full z-50 bg-[#121212] border-b border-white/5 py-4">
          <div className="flex justify-between items-center px-5 md:px-20 w-full max-w-360 mx-auto">
            <div className="font-serif text-3xl font-bold text-[#bcfb4b]">
              Lumière Dining
            </div>
            <div className="hidden lg:flex items-center gap-10">
              <a className="text-[#bcfb4b] border-b-2 border-[#bcfb4b] pb-1 font-sans text-[14px] tracking-wide font-semibold" href="#">Menu</a>
              <a className="text-gray-400 hover:text-white transition-colors duration-300 font-sans text-[14px] tracking-wide font-medium" href="#">About</a>
              <a className="text-gray-400 hover:text-white transition-colors duration-300 font-sans text-[14px] tracking-wide font-medium" href="#">Reservations</a>
              <a className="text-gray-400 hover:text-white transition-colors duration-300 font-sans text-[14px] tracking-wide font-medium" href="#">Contact</a>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-5">search</span>
                <input 
                  type="text" 
                  placeholder="Search our canvas..." 
                  className="bg-[#1e1e1e] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#bcfb4b] text-white w-64 transition-colors"
                />
              </div>
              <a href="/cart" className="relative cursor-pointer group">
                <span className="material-symbols-outlined text-gray-300 group-hover:text-[#bcfb4b] transition-colors">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#bcfb4b] text-[#121212] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>
              <button className="text-gray-300 hover:text-white transition-colors text-[14px] font-medium">Sign In</button>
            </div>
            <button className="lg:hidden text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </nav>

        <main className="px-5 md:px-20 max-w-360 mx-auto py-12">
          
          <div className="max-w-3xl mb-12">
            <h4 className="text-[#bcfb4b] text-[12px] font-bold tracking-widest uppercase mb-4">Exquisite Flavors</h4>
            <h1 className="font-serif text-[48px] md:text-[64px] leading-tight font-bold text-white mb-6">
              Our Culinary Canvas
            </h1>
            <p className="text-gray-400 text-[18px] leading-relaxed max-w-2xl">
              Where avant-garde technique meets heritage ingredients. Each dish is a brushstroke of passion, meticulously plated to transform your dining experience into a moment of pure, luminous artistry.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-3">
              {['All', 'Signature', 'Main Course', 'Appetizers', 'Dessert', 'Beverages'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`${filter === f ? 'bg-[#bcfb4b] text-[#0a1f00]' : 'border border-white/20 text-gray-300 hover:border-[#bcfb4b] hover:text-white'} px-6 py-2 rounded-full text-[14px] font-semibold transition-colors`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-[#bcfb4b] py-20 text-center text-xl font-serif">Curating menu...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {filteredFoods.map(food => (
                <div key={food._id} className="bg-[#161616] rounded-2xl overflow-hidden border border-white/5 flex flex-col group">
                  <div className="relative h-64 overflow-hidden">
                    <img src={food.primaryImage || '/api/placeholder/400/300'} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {food.isPopular && (
                      <div className="absolute top-4 left-4 bg-[#0a1f00]/80 backdrop-blur-sm border border-[#bcfb4b]/30 text-[#bcfb4b] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Signature Dish
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-[22px] font-semibold text-white">{food.name}</h3>
                      <span className="text-[#bcfb4b] font-bold text-[18px]">${food.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      {food.isVeg && <span className="text-xs border border-green-500 text-green-500 px-2 rounded-full">Veg</span>}
                      {food.isSpicy && <span className="text-xs border border-red-500 text-red-500 px-2 rounded-full">Spicy</span>}
                    </div>

                    <p className="text-gray-400 text-[14px] leading-relaxed mb-6 grow">
                      {food.description}
                    </p>
                    <button 
                      onClick={() => handleAddToCart(food)}
                      className="w-full bg-[#bcfb4b] text-[#0a1f00] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#a2dd3b] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">shopping_cart</span> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredFoods.length === 0 && (
                <div className="col-span-3 text-center py-20 text-gray-500 text-lg">No dishes found in this category.</div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
