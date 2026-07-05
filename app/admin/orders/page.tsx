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

      <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-dark-bg text-xs uppercase text-gray-500 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
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
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center w-max gap-2 ${
                    order.orderStatus === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                    order.orderStatus === 'Preparing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    order.orderStatus === 'Out for Delivery' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    'bg-green-500/10 text-green-500 border border-green-500/20'
                  }`}>
                    {order.orderStatus === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                    {order.orderStatus === 'Preparing' && <Package className="w-3.5 h-3.5" />}
                    {order.orderStatus === 'Out for Delivery' && <Truck className="w-3.5 h-3.5" />}
                    {order.orderStatus === 'Delivered' && <CheckCircle className="w-3.5 h-3.5" />}
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {order.orderStatus === 'Pending' && (
                      <button onClick={() => updateStatus(order._id, 'Preparing')} className="bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">Start Preparing</button>
                    )}
                    {order.orderStatus === 'Preparing' && (
                      <button onClick={() => updateStatus(order._id, 'Out for Delivery')} className="bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">Dispatch</button>
                    )}
                    {order.orderStatus === 'Out for Delivery' && (
                      <button onClick={() => updateStatus(order._id, 'Delivered')} className="bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">Mark Delivered</button>
                    )}
                    {order.orderStatus !== 'Delivered' && order.orderStatus !== 'Cancelled' && (
                      <button onClick={() => updateStatus(order._id, 'Cancelled')} className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">Cancel</button>
                    )}
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
