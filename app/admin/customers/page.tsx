'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';
import Loading from '@/app/loading';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [viewingCustomer, setViewingCustomer] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleBlockConfirm = async () => {
    if (!selectedCustomer) return;
    setIsUpdating(true);
    
    try {
      const res = await axios.put(`/api/users/${selectedCustomer._id}`, { isActive: !selectedCustomer.isActive });
      if (res.data.success) {
        fetchCustomers();
        toast.success(`Customer successfully ${!selectedCustomer.isActive ? 'activated' : 'deactivated'}!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update customer status");
    } finally {
      setIsUpdating(false);
      setSelectedCustomer(null);
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

      <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-dark-bg text-xs uppercase tracking-widest font-semibold text-gray-500 border-b border-white/10">
            <tr>
              <th className="px-6 py-5">Customer</th>
              <th className="px-6 py-5">Contact</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Joined</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer: any) => (
              <tr key={customer._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-primary-500/10 flex items-center justify-center shrink-0 border border-primary-500/20">
                    <User className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-base tracking-wide">{customer.username || 'Unknown'}</p>
                    <p className="text-xs text-gray-500 capitalize tracking-wider font-medium">{customer.role || 'Customer'}</p>
                  </div>
                </td>
                <td className="px-6 py-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span>{customer.email}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                      <Phone className="w-3.5 h-3.5 text-gray-500" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${customer.isActive ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${customer.isActive ? 'bg-primary-400' : 'bg-red-400'}`}></span>
                    {customer.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>{new Date(customer.createdAt).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => setViewingCustomer(customer)} className="text-gray-400 hover:text-white font-semibold text-sm transition-colors">View</button>
                  <button 
                    onClick={() => setSelectedCustomer(customer)} 
                    className={`px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${
                      customer.isActive 
                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white' 
                        : 'bg-primary-500/10 text-primary-400 hover:bg-primary-500 hover:text-dark-bg'
                    }`}
                  >
                    {customer.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <User className="w-10 h-10 text-gray-600 mb-3" />
                    <p className="text-base font-medium">No customers found.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Confirmation Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"
              onClick={() => !isUpdating && setSelectedCustomer(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-dark-surface border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className={`absolute top-0 left-0 w-full h-1.5 ${selectedCustomer.isActive ? 'bg-red-500' : 'bg-primary-500'}`} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${selectedCustomer.isActive ? 'bg-red-500/20 text-red-400' : 'bg-primary-500/20 text-primary-400'}`}>
                  {selectedCustomer.isActive ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                </div>
                <h3 className="text-2xl font-serif text-white">
                  {selectedCustomer.isActive ? 'Deactivate User?' : 'Activate User?'}
                </h3>
              </div>
              
              <p className="text-gray-400 mb-8 leading-relaxed">
                Are you sure you want to {selectedCustomer.isActive ? 'deactivate' : 'activate'} <span className="text-white font-semibold">{selectedCustomer.username}</span>? 
                {selectedCustomer.isActive 
                  ? ' They will be blocked from logging in and placing new orders until reactivated.' 
                  : ' They will instantly regain full access to the platform and their account.'}
              </p>
              
              <div className="flex gap-4 justify-end">
                <button 
                  disabled={isUpdating}
                  onClick={() => setSelectedCustomer(null)}
                  className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  disabled={isUpdating}
                  onClick={handleBlockConfirm}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center min-w-[140px] ${
                    selectedCustomer.isActive 
                      ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20 hover:shadow-red-500/40' 
                      : 'bg-primary-500 text-dark-bg hover:bg-primary-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                  }`}
                >
                  {isUpdating ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    selectedCustomer.isActive ? 'Yes, Deactivate' : 'Yes, Activate'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Customer Details Modal */}
      <AnimatePresence>
        {viewingCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"
              onClick={() => setViewingCustomer(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-dark-surface border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary-500" />
              
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0 border border-primary-500/30">
                  <User className="w-8 h-8 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white tracking-wide">{viewingCustomer.username}</h3>
                  <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${viewingCustomer.isActive ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {viewingCustomer.isActive ? 'Active Member' : 'Inactive User'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-6 bg-black/20 p-6 rounded-xl border border-white/5">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Email Address</label>
                  <p className="text-sm font-medium text-gray-300 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary-500" />
                    {viewingCustomer.email}
                  </p>
                </div>

                {viewingCustomer.phone && (
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Phone Number</label>
                    <p className="text-sm font-medium text-gray-300 flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary-500" />
                      {viewingCustomer.phone}
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Account Role</label>
                    <p className="text-sm font-medium text-gray-300 flex items-center gap-2 capitalize">
                      <ShieldCheck className="w-4 h-4 text-primary-500" />
                      {viewingCustomer.role}
                    </p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Joined Date</label>
                    <p className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      {new Date(viewingCustomer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setViewingCustomer(null)}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold bg-white/5 text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
