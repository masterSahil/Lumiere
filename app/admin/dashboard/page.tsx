'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ReceiptText, CircleDollarSign, CalendarCheck } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingReservations: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, resRes] = await Promise.all([
          axios.get('/api/orders'),
          axios.get('/api/reservations?status=Pending')
        ]);
        
        if (ordersRes.data.success) {
          const orders = ordersRes.data.orders;
          const revenue = orders.reduce((acc: number, o: any) => acc + (o.totalAmount || 0), 0);
          setStats(s => ({ ...s, totalOrders: orders.length, totalRevenue: revenue }));
        }
        
        if (resRes.data.success) {
          setStats(s => ({ ...s, pendingReservations: resRes.data.reservations.length }));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-surface p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 font-medium">Total Orders</h3>
            <ReceiptText className="w-10 h-10 text-primary-400 bg-primary-500/10 p-2 rounded-lg" />
          </div>
          <p className="text-4xl font-serif text-white">{stats.totalOrders}</p>
        </div>

        <div className="bg-dark-surface p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 font-medium">Total Revenue</h3>
            <CircleDollarSign className="w-10 h-10 text-green-400 bg-green-500/10 p-2 rounded-lg" />
          </div>
          <p className="text-4xl font-serif text-white">${stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-dark-surface p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 font-medium">Pending Reservations</h3>
            <CalendarCheck className="w-10 h-10 text-yellow-400 bg-yellow-500/10 p-2 rounded-lg" />
          </div>
          <p className="text-4xl font-serif text-white">{stats.pendingReservations}</p>
        </div>
      </div>

      <div className="bg-dark-surface p-8 rounded-2xl border border-white/10">
        <h3 className="text-xl text-white font-serif mb-6">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="bg-primary-500 text-dark-bg px-6 py-3 rounded-lg font-bold hover:brightness-110">Add New Menu Item</button>
          <button className="bg-white/10 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/20">Manage Staff</button>
        </div>
      </div>
    </div>
  );
}
