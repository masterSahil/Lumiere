'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/app/loading';
import { toast } from 'sonner';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders');
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Live poll every 10s
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/api/orders/${id}`, { orderStatus: status });
      fetchOrders();
      toast.success("Order status updated!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update order status");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif text-white">Live Orders</h1>
      </div>

      <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-dark-bg text-xs uppercase text-gray-500 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status & Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 font-mono text-primary-400">#{order._id.slice(-6).toUpperCase()}</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-white">{order.customerName}</p>
                  <p className="text-xs text-gray-500">{order.customerPhone}</p>
                </td>
                <td className="px-6 py-4">
                  {order.items.length} items
                </td>
                <td className="px-6 py-4 font-bold">${order.totalAmount.toFixed(2)}</td>
                <td className="px-6 py-4 w-48">
                  <div className="relative">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`w-full appearance-none px-4 py-2 pr-8 rounded-lg text-xs font-bold border outline-none cursor-pointer transition-colors ${
                        order.orderStatus === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20' :
                        order.orderStatus === 'Preparing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20' :
                        order.orderStatus === 'Out for Delivery' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20' :
                        order.orderStatus === 'Delivered' ? 'bg-primary-500/10 text-primary-400 border-primary-500/20 hover:bg-primary-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'
                      }`}
                    >
                      <option value="Pending" className="bg-dark-surface text-white">Pending</option>
                      <option value="Preparing" className="bg-dark-surface text-white">Start Preparing</option>
                      <option value="Out for Delivery" className="bg-dark-surface text-white">Dispatch (Out for Delivery)</option>
                      <option value="Delivered" className="bg-dark-surface text-white">Mark Delivered</option>
                      <option value="Cancelled" className="bg-dark-surface text-white">Cancel Order</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                       <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
