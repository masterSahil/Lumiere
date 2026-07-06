'use client'
import axios from 'axios';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import UserNavbar from '@/component/layout/UserNavbar';
import { Truck, CheckCircle, Wallet, Lock, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const { items, getSubtotal, getTax, getDeliveryFee, getTotal, clearCart } = useCartStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    shippingAddress: '',
    deliveryInstructions: '',
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (!formData.customerName || !formData.customerEmail || !formData.shippingAddress || !formData.customerPhone) {
      toast.error("Please fill in all required delivery details.");
      return;
    }

    setLoading(true);

    const orderData = {
      ...formData,
      items: items.map((i: { id: any; name: any; price: any; quantity: any; image: any; }) => ({ food: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
      subtotal: getSubtotal(),
      tax: getTax(),
      deliveryFee: getDeliveryFee(),
      totalAmount: getTotal(),
      paymentMethod: 'Razorpay'
    };

    try {
      const res = await loadRazorpay();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      // 1. Create order in our backend & Razorpay
      const { data } = await axios.post('/api/checkout/razorpay', { orderData });

      if (!data.success) {
        toast.error(data.message || data.error || "Failed to create order");
        setLoading(false);
        return;
      }

      // 2. Open Razorpay modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummykey', // Use your public key
        amount: data.amount,
        currency: data.currency,
        name: "Lumière Fine Dining",
        description: "Order Checkout",
        order_id: data.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await axios.post('/api/checkout/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              dbOrderId: data.dbOrderId
            });

            if (verifyRes.data.success) {
              clearCart();
              toast.success("Payment successful! Your order is being prepared.");
              router.push('/menu'); // or an order success page
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            console.error(err);
            toast.error("Error verifying payment.");
          }
        },
        prefill: {
          name: formData.customerName,
          email: formData.customerEmail,
          contact: formData.customerPhone,
        },
        theme: {
          color: "#84cc16", // var(--color-primary-500)
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      console.error(error);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || "Checkout failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return null; // Avoid flicker before redirect

  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-primary-500 selection:text-dark-bg">
      
      <UserNavbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Progress Stepper */}
        <nav aria-label="Progress" className="mb-16">
          <ol className="flex items-center justify-center space-x-8 md:space-x-12" role="list">
            <li className="flex items-center space-x-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-950 text-primary-400 text-sm font-bold">
                <CheckCircle className="w-5 h-5" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-300">Cart</span>
            </li>
            <li className="w-12 h-px bg-white/10"></li>
            <li className="flex items-center space-x-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-dark-bg text-sm font-bold">2</span>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-400">Checkout</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Delivery Details */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Delivery Section */}
            <section>
              <div className="flex items-center space-x-4 mb-8">
                <Truck className="text-primary-400 w-6 h-6" />
                <h2 className="text-2xl font-serif font-medium tracking-tight text-white">Delivery Details</h2>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Full Name *</label>
                  <input 
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="w-full bg-dark-surface border border-white/10 rounded-lg p-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-500 outline-none transition-shadow" 
                    placeholder="Julianne Moore" 
                    type="text" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Phone Number *</label>
                  <input 
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className="w-full bg-dark-surface border border-white/10 rounded-lg p-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-500 outline-none transition-shadow" 
                    placeholder="+1 (555) 000-0000" 
                    type="tel" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Email *</label>
                  <input 
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className="w-full bg-dark-surface border border-white/10 rounded-lg p-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-500 outline-none transition-shadow" 
                    placeholder="julianne@example.com" 
                    type="email" 
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Shipping Address *</label>
                  <textarea 
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    className="w-full bg-dark-surface border border-white/10 rounded-lg p-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-500 outline-none transition-shadow" 
                    placeholder="Apartment, suite, or unit number" 
                    rows={3} 
                    required
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Delivery Instructions (Optional)</label>
                  <input 
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleChange}
                    className="w-full bg-dark-surface border border-white/10 rounded-lg p-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-500 outline-none transition-shadow" 
                    placeholder="e.g. Leave by the front gate" 
                    type="text" 
                  />
                </div>
              </form>
            </section>

            <hr className="border-white/10" />

            {/* Payment Section */}
            <section>
              <div className="flex items-center space-x-4 mb-8">
                <Wallet className="text-primary-400 w-6 h-6" />
                <h2 className="text-2xl font-serif font-medium tracking-tight text-white">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                {/* Razorpay (Selected by default) */}
                <label className="relative cursor-pointer">
                  <input defaultChecked className="peer sr-only" name="payment" type="radio" value="Razorpay" />
                  <div className="p-6 rounded-xl flex flex-col items-center justify-center space-y-3 transition-all ring-2 ring-primary-500 bg-primary-500/10 h-full border border-white/5">
                    <CreditCard className="text-white w-8 h-8" />
                    <div>
                      <h3 className="text-xl font-serif text-white text-center">Razorpay</h3>
                      <p className="text-[10px] text-gray-400 tracking-widest font-bold uppercase mt-1">Credit Card / UPI / Netbanking via Razorpay</p>
                    </div>
                  </div>
                </label>
              </div>

            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-12 bg-dark-surface p-8 rounded-2xl border border-white/10 shadow-lg">
              <h2 className="text-2xl font-serif font-medium tracking-tight mb-8 text-white">Order Summary</h2>
              
              {/* Item List */}
              <div className="space-y-6 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item: any) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-dark-bg">
                      <img alt={item.name || "Menu item"} className="h-full w-full object-cover" src={item.image || "/api/placeholder/400/300"} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white line-clamp-1">{item.name}</h4>
                      <p className="text-sm font-semibold mt-1 text-primary-400">{item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <hr className="border-white/10 mb-8" />
              
              {/* Price Breakdown */}
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
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-primary-400 font-bold">${getTotal().toFixed(2)}</span>
                </div>
              </div>
              
              {/* Place Order Button */}
              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-primary-500 disabled:opacity-50 hover:bg-primary-400 text-dark-bg font-bold py-5 rounded-lg text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all active:scale-[0.98]">
                {loading ? "Processing..." : "Place Order & Pay"}
              </button>
              
              <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-400">
                <Lock className="w-4 h-4" />
                <span className="uppercase tracking-widest">End-to-end encrypted secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
