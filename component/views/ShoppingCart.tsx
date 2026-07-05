'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import { useCart } from '@/context/CartContext';
import axios from 'axios';
import { toast } from 'sonner';

export default function ShoppingCartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + tax;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map(i => ({ food: i._id, quantity: i.quantity, price: i.price })),
        totalAmount: grandTotal,
        paymentMethod: 'Credit Card',
        deliveryAddress: '123 Lumiere St', // Hardcoded for MVP
        customerName: 'Guest Customer',
        customerPhone: '555-0199',
        orderStatus: 'Pending'
      };

      const res = await axios.post('/api/orders', orderData);
      
      if (res.data.success) {
        toast.success("Order Placed Successfully!");
        clearCart();
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      toast.error("Order failed. Please ensure you are logged in if required.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,FILL@0..1&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-color: #131314;
          color: #e5e2e3;
          font-family: 'Manrope', sans-serif;
        }
        h1, h2, h3, h4 {
          font-family: 'Playfair Display', serif;
        }
      `}} />

      <div className="min-h-screen bg-[#131314] text-[#e5e2e3] font-sans selection:bg-[#84cc16] selection:text-[#103900]">
        
        {/* Navigation */}
        <nav className="border-b border-[#353436]/50 bg-[#0e0e0f] py-6">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-[#84cc16] tracking-widest uppercase font-serif cursor-pointer">Lumière</a>
            <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
              <a className="hover:text-[#84cc16] transition-colors" href="/menu">Menu</a>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="material-symbols-outlined cursor-pointer text-[#84cc16]">shopping_bag</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#84cc16] text-[#103900] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
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
              <div className="border-b border-[#353436]/50 pb-4">
                <h2 className="text-2xl text-[#84cc16] font-serif">Your Selection</h2>
              </div>
              
              <div className="space-y-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    Your cart is currently empty.
                    <br/>
                    <a href="/menu" className="text-[#84cc16] underline mt-2 inline-block">Return to Menu</a>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item._id} className="flex flex-col sm:flex-row items-start gap-6 p-4 rounded-xl hover:bg-[#1c1b1c] transition-colors group border border-white/5">
                      <div className="w-full sm:w-32 h-48 sm:h-32 bg-[#201f20] rounded-lg overflow-hidden shrink-0">
                        <img 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                          src={item.primaryImage || "/api/placeholder/150/150"}
                        />
                      </div>
                      <div className="grow w-full">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 sm:mb-0">
                          <div>
                            <h3 className="text-xl mb-1 font-serif">{item.name}</h3>
                          </div>
                          <p className="text-xl text-[#84cc16] font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 border border-[#353436] rounded-full px-3 py-1">
                            <button 
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="text-[#d0c5af] hover:text-[#84cc16] transition-colors flex items-center"
                            >
                              <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="text-[#d0c5af] hover:text-[#84cc16] transition-colors flex items-center"
                            >
                              <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item._id)}
                            className="text-[#d0c5af] hover:text-[#ffb4ab] transition-colors text-sm flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Order Summary Checkout */}
            <div className="lg:col-span-1">
              <div className="bg-[#1c1b1c] rounded-2xl p-8 sticky top-8 border border-white/5">
                <h2 className="text-2xl text-white font-serif mb-8 border-b border-[#353436]/50 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-8 text-[#d0c5af]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-green-400 font-medium">Complimentary</span>
                  </div>
                </div>

                <div className="border-t border-[#353436] pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg">Total</span>
                    <span className="text-3xl text-[#84cc16] font-semibold">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={loading || cartItems.length === 0}
                  className="w-full bg-[#84cc16] hover:bg-[#a3e635] text-[#103900] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Confirm Order'} <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                
                <p className="text-center text-xs text-[#d0c5af] mt-4">Taxes and additional fees may apply.</p>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </>
  );
}
