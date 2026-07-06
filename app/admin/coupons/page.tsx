'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Ticket, Plus, Trash2, Edit } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountPercentage: 10,
    validUntil: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchCoupons = async () => {
    try {
      const { data } = await axios.get('/api/coupons');
      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { data } = await axios.put(`/api/coupons/${editingId}`, newCoupon);
        if (data.success) {
          toast.success('Promo code updated successfully');
        }
      } else {
        const { data } = await axios.post('/api/coupons', newCoupon);
        if (data.success) {
          toast.success('Promo code created successfully');
        }
      }
      setIsAdding(false);
      setEditingId(null);
      setNewCoupon({ code: '', discountPercentage: 10, validUntil: '' });
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.response?.data?.error || 'Failed to save promo code');
    }
  };

  const handleEditClick = (coupon: any) => {
    setEditingId(coupon._id);
    setNewCoupon({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      validUntil: new Date(coupon.validUntil).toISOString().split('T')[0]
    });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewCoupon({ code: '', discountPercentage: 10, validUntil: '' });
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axios.put(`/api/coupons/${id}`, { isActive: !currentStatus });
      toast.success('Status updated');
      fetchCoupons();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this promo code?')) return;
    try {
      await axios.delete(`/api/coupons/${id}`);
      toast.success('Promo code deleted');
      fetchCoupons();
    } catch (err) {
      toast.error('Failed to delete promo code');
    }
  };

  if (loading) return <div className="text-primary-400">Loading promos...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-serif text-white">Promo Codes</h1>
          <p className="text-gray-400 text-sm mt-1">Create and manage discount codes for your customers.</p>
        </div>
        <button 
          onClick={() => isAdding ? handleCancel() : setIsAdding(true)}
          className="bg-primary-500 text-dark-bg px-4 py-2 rounded-lg font-bold hover:brightness-110 flex items-center gap-2"
        >
          {isAdding ? 'Cancel' : <><Plus className="w-4 h-4" /> Create Promo</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-dark-surface p-6 rounded-2xl border border-white/10 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Code</label>
            <input 
              type="text" 
              required
              value={newCoupon.code}
              onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
              placeholder="e.g. LUMIERE50"
              className="w-full bg-dark-bg border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Discount %</label>
            <input 
              type="number" 
              required
              min="1"
              max="100"
              value={newCoupon.discountPercentage}
              onChange={(e) => setNewCoupon({...newCoupon, discountPercentage: parseInt(e.target.value)})}
              className="w-full bg-dark-bg border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Valid Until</label>
            <input 
              type="date" 
              required
              value={newCoupon.validUntil}
              onChange={(e) => setNewCoupon({...newCoupon, validUntil: e.target.value})}
              className="w-full bg-dark-bg border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary-500 scheme-dark"
            />
          </div>
          <button type="submit" className="bg-primary-500 text-dark-bg font-bold py-3 px-4 rounded-xl hover:brightness-110 h-[50px]">
            {editingId ? 'Update Promo' : 'Save Promo'}
          </button>
        </form>
      )}

      <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-dark-bg text-xs uppercase text-gray-500 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Promo Code</th>
              <th className="px-6 py-4">Discount</th>
              <th className="px-6 py-4">Valid Until</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No promo codes found</td>
              </tr>
            ) : coupons.map((coupon: any) => (
              <tr key={coupon._id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4">
                  <span className="font-mono text-primary-400 font-bold px-2 py-1 bg-primary-500/10 rounded border border-primary-500/20">{coupon.code}</span>
                </td>
                <td className="px-6 py-4 font-bold text-white">
                  {coupon.discountPercentage}% OFF
                </td>
                <td className="px-6 py-4">
                  {new Date(coupon.validUntil).toLocaleDateString()}
                  {new Date(coupon.validUntil) < new Date() && <span className="ml-2 text-xs text-red-500">(Expired)</span>}
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleStatus(coupon._id, coupon.isActive)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      coupon.isActive ? 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30' : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                    }`}
                  >
                    {coupon.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button 
                    onClick={() => handleEditClick(coupon)} 
                    className="text-gray-500 hover:text-blue-400 transition-colors p-2"
                    title="Edit Promo"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(coupon._id)} 
                    className="text-gray-500 hover:text-red-400 transition-colors p-2"
                    title="Delete Promo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
