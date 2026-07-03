'use client'
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCartStore } from '@/store/cartStore';

const CardWrapper = ({ children, index }: { children: React.ReactNode, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-[var(--color-dark-surface)] rounded-2xl overflow-hidden border border-[var(--color-primary-900)] flex flex-col group hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:border-[var(--color-primary-500)] transition-all"
  >
    {children}
  </motion.div>
);

export default function MenuPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state: any) => state.addItem);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('/api/menu');
        if (res.data.success) {
          setFoods(res.data.foods);
        }
      } catch (error) {
        console.error("Failed to fetch menu", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-[var(--color-dark-bg)] text-white">
      {/* Top Navigation Bar */}
      <nav className="w-full z-50 bg-[var(--color-dark-bg)] border-b border-[var(--color-primary-950)] py-4 sticky top-0">
        <div className="flex justify-between items-center px-5 md:px-20 w-full max-w-7xl mx-auto">
          <a href="/">
            <div className="font-serif text-2xl font-bold text-[var(--color-primary-400)]">
              Lumière Dining
            </div>
          </a>
          <div className="hidden lg:flex items-center gap-10">
            <a className="text-[var(--color-primary-400)] border-b-2 border-[var(--color-primary-400)] pb-1 font-sans text-[14px] tracking-wide font-semibold" href="/menu">Menu</a>
            <a className="text-gray-400 hover:text-white transition-colors duration-300 font-sans text-[14px] tracking-wide font-medium" href="/">Home</a>
          </div>
        </div>
      </nav>

      <main className="px-5 md:px-20 max-w-7xl mx-auto py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12"
        >
          <h4 className="text-[var(--color-primary-400)] text-[12px] font-bold tracking-widest uppercase mb-4">Exquisite Flavors</h4>
          <h1 className="font-serif text-[48px] md:text-[64px] leading-tight font-bold text-white mb-6">
            Our Culinary Canvas
          </h1>
          <p className="text-gray-400 text-[18px] leading-relaxed max-w-2xl">
            Where avant-garde technique meets heritage ingredients.
          </p>
        </motion.div>

        {/* Menu Grid */}
        {loading ? (
          <div className="flex justify-center py-20 text-[var(--color-primary-500)]">Loading Menu...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {foods.map((food: any, idx) => (
              <CardWrapper key={food._id} index={idx}>
                <a href={`/menu/${food._id}`} className="block relative h-64 overflow-hidden">
                  <img src={food.primaryImage || "/api/placeholder/400/300"} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </a>
                <div className="p-6 flex flex-col grow">
                  <div className="flex justify-between items-start mb-2">
                    <a href={`/menu/${food._id}`}>
                      <h3 className="font-serif text-[22px] font-semibold text-white hover:text-[var(--color-primary-300)] transition-colors">{food.name}</h3>
                    </a>
                    <span className="text-[var(--color-primary-400)] font-bold text-[18px]">${food.price}</span>
                  </div>
                  <p className="text-gray-400 text-[14px] leading-relaxed mb-6 grow line-clamp-3">
                    {food.description}
                  </p>
                  <button 
                    onClick={() => addItem({ id: food._id, name: food.name, price: food.price, image: food.primaryImage, quantity: 1 })}
                    className="w-full bg-[var(--color-primary-500)] text-[var(--color-dark-bg)] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-primary-400)] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </CardWrapper>
            ))}
            
            {foods.length === 0 && !loading && (
              <div className="col-span-full text-center text-gray-400 py-20 bg-[var(--color-dark-surface)] rounded-2xl border border-[var(--color-primary-900)]">No menu items found. Please add foods from the admin panel.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}