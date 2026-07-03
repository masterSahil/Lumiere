'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

export default function FoodDetail() {
  const { id }: any = useParams();
  const router = useRouter();
  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!id) return;
    const fetchFood = async () => {
      try {
        const res = await axios.get(`/api/menu/${id}`);
        if (res.data.success) {
          setFood(res.data.food);
        }
      } catch (error) {
        console.error("Error fetching food:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-dark-bg flex justify-center items-center text-primary-500">Loading...</div>;
  if (!food) return <div className="min-h-screen bg-dark-bg flex flex-col justify-center items-center text-white">Food not found <button onClick={() => router.push('/menu')} className="mt-4 text-primary-400">Back to menu</button></div>;

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Top Nav */}
      <nav className="w-full z-50 bg-dark-bg border-b border-primary-950 py-4">
        <div className="flex justify-between items-center px-5 md:px-20 w-full max-w-7xl mx-auto">
          <div className="font-serif text-2xl font-bold text-primary-400 cursor-pointer" onClick={() => router.push('/')}>
            Lumière Dining
          </div>
          <button onClick={() => router.push('/menu')} className="text-gray-400 hover:text-white transition-colors duration-300">← Back to Menu</button>
        </div>
      </nav>

      <main className="px-5 md:px-20 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 relative rounded-3xl overflow-hidden border border-primary-900 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
          >
            <img src={food.primaryImage || "/api/placeholder/800/600"} alt={food.name} className="w-full h-auto object-cover aspect-square" />
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 flex flex-col justify-center"
          >
            <h4 className="text-primary-400 text-[14px] font-bold tracking-widest uppercase mb-4">{food.category?.name || 'Signature'}</h4>
            <h1 className="font-serif text-[42px] font-bold text-white mb-6 leading-tight">{food.name}</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {food.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {food.attributes?.map((attr: string, i: number) => (
                <span key={i} className="bg-dark-surface border border-primary-800 text-primary-200 text-[12px] font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                  {attr}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-8 mt-auto border-t border-primary-950 pt-8">
              <span className="font-serif text-4xl text-primary-400 font-bold">${food.price}</span>
              <motion.button 
                onClick={() => addItem({ id: food._id, name: food.name, price: food.price, image: food.primaryImage, quantity: 1 })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--color-primary-500)] text-[var(--color-dark-bg)] px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-primary-400)] transition-colors grow text-center shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
