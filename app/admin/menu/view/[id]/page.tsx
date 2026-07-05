'use client'
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { ArrowLeft, Flame, Leaf, Utensils } from 'lucide-react';
import { toast } from 'sonner';

import Loading from '@/app/loading';

export default function AdminViewMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const { data } = await axios.get(`/api/menu/${id}`);
        if (data.success) {
          setFood(data.food);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load dish");
      } finally {
        setLoading(false);
      }
    };
    fetchDish();
  }, [id]);

  if (loading) return <Loading />;
  if (!food) return <div className="text-red-400 p-8">Dish not found.</div>;

  return (
    <div className="w-full text-white bg-transparent max-w-5xl mx-auto space-y-10 pb-20">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/menu" className="w-10 h-10 rounded-full bg-dark-surface border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-3xl font-serif tracking-tight">Dish Profile</h2>
        </div>
        <Link href={`/admin/menu/edit/${id}`}>
          <button className="bg-primary-500 text-dark-bg px-6 py-2 rounded-lg font-bold hover:brightness-110">Edit Dish</button>
        </Link>
      </div>

      <div className="bg-dark-surface p-8 rounded-3xl border border-white/10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Images */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
              <img src={food.primaryImage || '/api/placeholder/500/500'} alt={food.name} className="w-full h-full object-cover" />
              {food.isPopular && (
                <span className="absolute top-4 left-4 bg-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">SIGNATURE</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-4xl font-serif text-white">{food.name}</h1>
              <span className="text-2xl font-bold text-primary-400">${food.price.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-400 uppercase tracking-widest">{food.category?.name || 'General'}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Culinary Description</h4>
            <p className="text-gray-300 leading-relaxed">{food.description}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-400">Attributes & Status</h4>
            <div className="flex flex-wrap gap-3">
              {food.isVeg ? (
                <span className="px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-semibold flex items-center gap-2">
                  <Leaf className="w-4 h-4" /> Vegetarian
                </span>
              ) : (
                <span className="px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-semibold flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Non-Vegetarian
                </span>
              )}
              {food.isSpicy && (
                <span className="px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-semibold flex items-center gap-2">
                  <LuFlame /> Spicy
                </span>
              )}
              <span className={`px-4 py-1.5 rounded-full border text-sm font-semibold ${food.isAvailable ? 'border-primary-500/30 bg-primary-500/10 text-primary-400' : 'border-gray-500/30 bg-gray-500/10 text-gray-400'}`}>
                {food.isAvailable ? 'Available Now' : 'Currently Unavailable'}
              </span>
            </div>
          </div>

        </div>
        
        {/* Close the 2-column grid */}
        </div>

        {/* Full Width Gallery */}
        {food.galleryImages && food.galleryImages.length > 0 && (
          <div className="border-t border-white/10 pt-10 mt-10">
            <h4 className="text-2xl font-serif text-white mb-6">Visual Gallery</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {food.galleryImages.map((img: string, idx: number) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-white/10 group cursor-pointer">
                  <img src={img} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
