'use client'
import { LuChevronLeft, LuChevronRight, LuPlus } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import Image from 'next/image';

export default function FeaturedDishes({ dishes }: { dishes: any[] }) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (dish: any) => {
    addItem({
      id: dish._id,
      name: dish.name,
      price: dish.price,
      image: dish.primaryImage || '/api/placeholder/100/100',
      quantity: 1
    });
    toast.success(`${dish.name} added to cart!`);
  };

  if (!dishes || dishes.length === 0) return null;

  return (
    <section className="py-24 px-5 md:px-20 bg-dark-bg">
      <div className="max-w-360 mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-[32px] md:text-[48px] leading-10 md:leading-14 font-semibold text-white">Curated Selection</h2>
            <p className="text-primary-500 font-sans text-[14px] leading-5 tracking-wider font-semibold mt-2 uppercase">Chef's Signature Creations</p>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all">
              <LuChevronLeft className="text-2xl" />
            </button>
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all">
              <LuChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
        
        {/* Slider */}
        <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar snap-x">
          {dishes.map((dish: any) => (
            <div key={dish._id} className="min-w-[320px] md:min-w-100 bg-dark-surface p-6 rounded-2xl border border-white/5 snap-start group cursor-pointer hover:border-white/10 transition-colors flex flex-col">
              <div className="relative overflow-hidden aspect-4/5 h-[300px] w-full mb-6 rounded-lg bg-dark-bg shrink-0">
                <Image alt={dish.name} src={dish.primaryImage || '/api/placeholder/400/500'} 
                  width={400} height={500} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-primary-400 font-sans text-[12px] leading-4 tracking-[0.03em] font-medium">
                  {dish.category?.name || 'Signature'}
                </div>
              </div>
              <h3 className="font-serif text-[32px] leading-10 font-medium text-white mb-2">{dish.name}</h3>
              <p className="text-gray-400 font-sans text-base leading-6 line-clamp-2 mb-6">{dish.description}</p>
              <div className="flex justify-between items-center mt-auto pt-4">
                <span className="text-primary-400 font-serif text-[32px] leading-10 font-medium">${dish.price.toFixed(2)}</span>
                
                {(() => {
                  const cartItem = useCartStore(state => state.items.find(i => i.id === dish._id));
                  const updateQuantity = useCartStore(state => state.updateQuantity);
                  const removeItem = useCartStore(state => state.removeItem);

                  if (cartItem) {
                    return (
                      <div className="flex items-center gap-3 bg-dark-bg border border-primary-500/30 rounded-full px-2 py-1">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (cartItem.quantity > 1) updateQuantity(cartItem.id, cartItem.quantity - 1);
                            else removeItem(cartItem.id);
                          }}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-primary-400 hover:bg-white/10 transition-colors"
                        >-</button>
                        <span className="text-white font-sans font-medium w-4 text-center">{cartItem.quantity}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(cartItem.id, cartItem.quantity + 1);
                          }}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-primary-400 hover:bg-white/10 transition-colors"
                        >+</button>
                      </div>
                    );
                  }

                  return (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(dish); }}
                      className="bg-primary-500 text-dark-bg w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 hover:bg-primary-400 transition-all">
                      <LuPlus className="text-2xl" />
                    </button>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}