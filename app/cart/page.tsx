'use client'
import Head from 'next/head';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ShoppingCartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTax, getDeliveryFee, getTotal } = useCartStore();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-white font-sans">
      {/* Navigation */}
      <nav className="border-b border-[var(--color-primary-950)] bg-[var(--color-dark-bg)] py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-[var(--color-primary-400)] tracking-widest uppercase font-serif cursor-pointer" onClick={() => router.push('/')}>Lumière</div>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
            <a className="hover:text-[var(--color-primary-400)] transition-colors" href="/menu">Menu</a>
            <a className="hover:text-[var(--color-primary-400)] transition-colors" href="#">Reservations</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer">
              <span className="material-symbols-outlined hover:text-[var(--color-primary-400)] transition-colors">shopping_bag</span>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-primary-500)] text-[var(--color-dark-bg)] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl mb-12 font-serif">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Your Selection List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl text-[var(--color-primary-400)] font-serif">Your Selection</h2>
            </div>
            
            {items.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <p className="mb-4">Your cart is currently empty.</p>
                <button onClick={() => router.push('/menu')} className="text-[var(--color-primary-400)] border border-[var(--color-primary-400)] px-6 py-2 rounded-full hover:bg-[var(--color-primary-400)] hover:text-[var(--color-dark-bg)] transition-colors">
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id} 
                    className="flex flex-col sm:flex-row items-start gap-6 p-4 rounded-xl bg-[var(--color-dark-surface)] border border-white/5 hover:border-[var(--color-primary-900)] transition-colors"
                  >
                    <div className="w-full sm:w-32 h-48 sm:h-32 bg-[var(--color-dark-bg)] rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                        src={item.image || "/api/placeholder/400/300"}
                      />
                    </div>
                    <div className="grow w-full flex flex-col h-full justify-between">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 sm:mb-0">
                        <div>
                          <h3 className="text-xl mb-1 font-serif text-white">{item.name}</h3>
                        </div>
                        <p className="text-xl text-[var(--color-primary-400)] font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 border border-white/20 rounded-full px-3 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-[var(--color-primary-400)] transition-colors flex items-center">
                            -
                          </button>
                          <span className="text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-[var(--color-primary-400)] transition-colors flex items-center">
                            +
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center gap-1">
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--color-dark-surface)] p-8 rounded-2xl sticky top-8 border border-white/10">
              <h2 className="text-2xl text-[var(--color-primary-400)] font-serif mb-8 border-b border-white/10 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (8%)</span>
                  <span>${getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Delivery Fee</span>
                  <span>{getDeliveryFee() === 0 ? "Free" : `$${getDeliveryFee().toFixed(2)}`}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-xl">Total</span>
                  <span className="text-3xl text-[var(--color-primary-400)] font-bold tracking-tight">${getTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => router.push('/checkout')}
                  disabled={items.length === 0}
                  className="w-full bg-[var(--color-primary-500)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-primary-400)] text-[var(--color-dark-bg)] font-bold py-4 rounded-lg uppercase tracking-widest transition-all">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
