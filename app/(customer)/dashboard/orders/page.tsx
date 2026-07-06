'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ReceiptText } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch all orders for now (since we don't have auth completely hooked up). 
    // In prod, this would pass userId=currentUserId
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders');
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
    
    // Simulate real-time updates by polling every 5 seconds
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeOrders = orders.filter((o: any) => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled');
  const pastOrders = orders.filter((o: any) => o.orderStatus === 'Delivered' || o.orderStatus === 'Cancelled');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-500';
      case 'Preparing': return 'text-blue-400';
      case 'Out for Delivery': return 'text-purple-400';
      case 'Delivered': return 'text-primary-400';
      case 'Cancelled': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/api/orders/${id}`, { orderStatus: status });
      // The polling will pick up the change in a few seconds, or we can optimistic update:
      setOrders(orders.map((o: any) => o._id === id ? { ...o, orderStatus: status } : o));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="text-primary-400 animate-pulse">Loading orders...</div>;
  }

  return (
    <div className="space-y-12">
      
      {/* Active Orders Section */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="font-serif text-[48px] leading-tight font-semibold mb-2 text-white">My Orders</h1>
            <p className="text-gray-400">Manage your culinary journeys and live deliveries.</p>
          </div>
        </div>

        {activeOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-dark-surface p-8 rounded-2xl border border-white/10 text-center">
            <ReceiptText className="w-12 h-12 text-gray-500 mb-4" />
            <h2 className="text-2xl font-serif text-white mb-2">No active orders</h2>
            <p className="text-gray-400">You have no active orders right now.</p>
            <button onClick={() => router.push('/menu')} className="mt-4 text-primary-400 font-bold uppercase text-sm tracking-wider hover:underline">Browse Menu</button>
          </div>
        ) : (
          <div className="space-y-6">
            {activeOrders.map((order: any) => (
              <div key={order._id} className="bg-dark-surface p-8 rounded-2xl border border-primary-500/20 shadow-[0_0_40px_rgba(132,204,22,0.05)] overflow-hidden relative">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-950 text-primary-400 font-sans text-[12px] leading-4 tracking-[0.03em] font-bold mb-4 border border-primary-500/20">
                      <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
                      LIVE TRACKING
                    </div>
                    <h2 className="font-serif text-[28px] font-medium mb-2 text-white">Order #{order._id.substring(order._id.length - 6).toUpperCase()}</h2>
                    <p className="text-gray-400 mb-4">Payment: <span className={order.paymentStatus === 'Paid' ? 'text-primary-400' : 'text-yellow-400'}>{order.paymentStatus}</span></p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-sans text-[14px] font-medium ${getStatusColor(order.orderStatus)}`}>{order.orderStatus}</span>
                    </div>
                    
                    {/* Progress Bar (Simulated based on status) */}
                    <div className="w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
                      <div 
                        className="h-full bg-primary-500 relative transition-all duration-1000"
                        style={{
                          width: order.orderStatus === 'Pending' ? '25%' : 
                                 order.orderStatus === 'Preparing' ? '50%' : 
                                 order.orderStatus === 'Out for Delivery' ? '85%' : '100%'
                        }}
                      ></div>
                    </div>
                    
                    {/* Simulator Controls (For testing phase only) */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      <p className="w-full text-xs text-gray-500 uppercase tracking-widest mb-1">Simulator Controls</p>
                      <button onClick={() => updateOrderStatus(order._id, 'Preparing')} className="text-[10px] bg-white/10 px-2 py-1 rounded hover:bg-primary-500 hover:text-dark-bg">Set Preparing</button>
                      <button onClick={() => updateOrderStatus(order._id, 'Out for Delivery')} className="text-[10px] bg-white/10 px-2 py-1 rounded hover:bg-primary-500 hover:text-dark-bg">Set Out for Delivery</button>
                      <button onClick={() => updateOrderStatus(order._id, 'Delivered')} className="text-[10px] bg-white/10 px-2 py-1 rounded hover:bg-primary-500 hover:text-dark-bg">Set Delivered</button>
                    </div>
                  </div>
                  
                  <div className="bg-dark-bg/50 p-6 rounded-xl border border-white/5">
                    <h4 className="font-sans text-[14px] tracking-wider font-semibold mb-4 text-gray-400 uppercase">Order Summary</h4>
                    <ul className="space-y-4">
                      {order.items.map((item: any) => (
                        <li key={item._id} className="flex justify-between items-center">
                          <span className="font-sans text-sm text-gray-300">{item.name} x {item.quantity}</span>
                          <span className="text-primary-400">${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                      <li className="flex justify-between items-center border-t border-white/10 pt-4 mt-4">
                        <span className="font-bold text-white">Total</span>
                        <span className="font-serif text-[24px] font-medium text-primary-400">${order.totalAmount.toFixed(2)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* History Section */}
      {pastOrders.length > 0 && (
        <section>
          <h3 className="font-serif text-[32px] leading-10 font-medium mb-8 text-white">Order History</h3>
          <div className="grid grid-cols-1 gap-6">
            {pastOrders.map((order: any) => (
              <div key={order._id} className="bg-dark-surface p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/5 hover:border-white/10 transition-all">
                <div className="flex gap-6 items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-dark-bg flex items-center justify-center">
                    <ReceiptText className="text-gray-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-sans text-[14px] leading-5 tracking-wider font-semibold text-primary-400">#{order._id.substring(order._id.length - 6).toUpperCase()}</span>
                      <span className="font-sans text-[12px] leading-4 font-medium text-gray-500">•</span>
                      <span className="font-sans text-[12px] leading-4 font-medium text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="font-sans text-[16px] leading-7 font-medium text-white">{order.items.map((i: any) => i.name).join(', ')}</p>
                    <p className="font-sans text-[12px] leading-4 font-medium text-gray-500">{order.items.length} items • Delivered to {order.shippingAddress.substring(0, 15)}...</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 justify-between md:justify-end">
                  <div className="text-right">
                    <p className="font-serif text-[24px] leading-10 font-medium text-primary-400">${order.totalAmount.toFixed(2)}</p>
                    <span className={`font-sans text-[12px] leading-4 font-medium ${getStatusColor(order.orderStatus)}`}>{order.orderStatus}</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer group">
                    <ReceiptText className="w-4 h-4 text-gray-500 group-hover:text-primary-400 transition-colors" />
                    <span className="text-xs uppercase tracking-widest font-bold text-gray-500 group-hover:text-primary-400 transition-colors">Receipt</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
