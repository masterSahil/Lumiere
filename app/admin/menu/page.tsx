'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Edit, Trash2, Eye } from 'lucide-react';
import Loading from '@/app/loading';
import { toast } from 'sonner';

export default function AdminMenuPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const { data } = await axios.get('/api/menu');
      if (data.success) {
        setFoods(data.foods);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dish?')) return;
    try {
      const res = await axios.delete(`/api/menu/${id}`);
      if (res.data.success) {
        fetchFoods(); // Refetch after delete
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      console.error("Delete Error", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  if (loading) return <div className="text-primary-400">Loading menu...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif text-white">Manage Menu</h1>
        <Link href="/admin/menu/add">
          <button className="bg-primary-500 text-dark-bg px-4 py-2 rounded-lg font-bold hover:brightness-110">
            + Add Food Item
          </button>
        </Link>
      </div>

      <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-dark-bg text-xs uppercase text-gray-500 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food: any) => (
              <tr key={food._id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img src={food.primaryImage || '/api/placeholder/100/100'} alt={food.name} className="w-12 h-12 rounded object-cover" />
                  <div>
                    <p className="font-bold text-white text-base">{food.name}</p>
                    <p className="text-xs text-gray-500 max-w-[200px] truncate">{food.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-white/10 px-2 py-1 rounded text-xs">{food.category?.name || 'General'}</span>
                </td>
                <td className="px-6 py-4 font-bold text-primary-400">${food.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${food.isAvailable ? 'bg-primary-500/20 text-primary-400' : 'bg-red-500/20 text-red-500'}`}>
                    {food.isAvailable ? 'Available' : 'Sold Out'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/menu/view/${food._id}`}>
                      <button className="text-gray-400 hover:text-white transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                    </Link>
                    <Link href={`/admin/menu/edit/${food._id}`}>
                      <button className="text-gray-400 hover:text-white transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(food._id)} className="text-gray-400 hover:text-red-400 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
