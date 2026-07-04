'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="text-primary-400">Loading orders...</div>;

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
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    order.orderStatus === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    order.orderStatus === 'Preparing' ? 'bg-blue-500/20 text-blue-400' :
                    order.orderStatus === 'Out for Delivery' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-green-500/20 text-green-500'
                  }`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={order.orderStatus} 
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="bg-dark-bg border border-white/20 text-white rounded p-1 outline-none focus:border-primary-500 text-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
