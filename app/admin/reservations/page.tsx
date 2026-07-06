'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/app/loading';
import { toast } from 'sonner';
import { Check, X, CheckCheck } from 'lucide-react';

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const { data } = await axios.get('/api/reservations');
      if (data.success) {
        setReservations(data.reservations);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/api/reservations/${id}`, { status });
      toast.success(`Reservation ${status.toLowerCase()} successfully!`);
      fetchReservations();
    } catch (e) {
      console.error(e);
      toast.error('Failed to update reservation status.');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif text-white">Manage Reservations</h1>
      </div>

      <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-dark-bg text-xs uppercase text-gray-500 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Date/Time</th>
              <th className="px-6 py-4">Guest Info</th>
              <th className="px-6 py-4">Party Size</th>
              <th className="px-6 py-4">Requests</th>
              <th className="px-6 py-4">Status & Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res: any) => (
              <tr key={res._id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4">
                  <p className="font-bold text-white">{res.date}</p>
                  <p className="text-xs text-gray-500">{res.time}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-white">{res.customerName}</p>
                  <p className="text-xs text-gray-500">{res.customerEmail}</p>
                  <p className="text-xs text-gray-500">{res.phone}</p>
                </td>
                <td className="px-6 py-4 font-bold">{res.guests} Guests</td>
                <td className="px-6 py-4 text-xs max-w-[200px] truncate" title={res.specialRequests}>
                  {res.specialRequests || '-'}
                </td>
                <td className="px-6 py-4 w-48">
                  <div className="relative">
                    <select
                      value={res.status}
                      onChange={(e) => updateStatus(res._id, e.target.value)}
                      className={`w-full appearance-none px-4 py-2 pr-8 rounded-lg text-xs font-bold border outline-none cursor-pointer transition-colors ${
                        res.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20' :
                        res.status === 'Confirmed' ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20' :
                        res.status === 'Completed' ? 'bg-primary-500/10 text-primary-400 border-primary-500/20 hover:bg-primary-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'
                      }`}
                    >
                      <option value="Pending" className="bg-dark-surface text-white">Pending</option>
                      <option value="Confirmed" className="bg-dark-surface text-white">Confirm</option>
                      <option value="Completed" className="bg-dark-surface text-white">Mark Seated (Completed)</option>
                      <option value="Cancelled" className="bg-dark-surface text-white">Reject (Cancel)</option>
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
