'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import Loading from '@/app/loading';
import { toast } from 'sonner';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get('/api/users');
      if (data.success) {
        const filtered = data.users.filter((u: any) => u.role === 'customer');
        setCustomers(filtered);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (id: string) => {
    if (!confirm("Are you sure you want to toggle this customer's status?")) return;
    try {
      // Assuming API supports toggling, but current code sets isActive: false. 
      // Let's just find the customer to toggle
      const customer = customers.find((c: any) => c._id === id) as any;
      const res = await axios.put(`/api/users/${id}`, { isActive: !customer?.isActive });
      if (res.data.success) {
        fetchCustomers();
        toast.success(`Customer ${!customer?.isActive ? 'activated' : 'deactivated'}!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update customer status");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif text-white">Manage Customers</h1>
      </div>

      <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-dark-bg text-xs uppercase text-gray-500 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer: any) => (
              <tr key={customer._id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-base">{customer.username || 'Unknown'}</p>
                    <p className="text-xs text-gray-500 capitalize">{customer.role || 'Customer'}</p>
                  </div>
                </td>
                <td className="px-6 py-4 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <Mail className="w-3 h-3" />
                    <span>{customer.email}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="w-3 h-3" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${customer.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {customer.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(customer.createdAt).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors">View</button>
                  <button onClick={() => handleBlock(customer._id)} className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                    {customer.isActive ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
