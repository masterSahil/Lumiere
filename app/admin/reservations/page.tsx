'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

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
      fetchReservations();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="text-primary-400">Loading...</div>;

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
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
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
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    res.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    res.status === 'Confirmed' ? 'bg-green-500/20 text-green-500' :
                    res.status === 'Completed' ? 'bg-primary-500/20 text-primary-400' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {res.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  {res.status === 'Pending' && (
                    <>
                      <button onClick={() => updateStatus(res._id, 'Confirmed')} className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs font-bold hover:bg-green-500 hover:text-white transition-all">Confirm</button>
                      <button onClick={() => updateStatus(res._id, 'Cancelled')} className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-xs font-bold hover:bg-red-500 hover:text-white transition-all">Reject</button>
                    </>
                  )}
                  {res.status === 'Confirmed' && (
                     <button onClick={() => updateStatus(res._id, 'Completed')} className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded text-xs font-bold hover:bg-primary-500 hover:text-dark-bg transition-all">Mark Seated</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
