'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function DashboardReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data } = await axios.get('/api/reservations');
        if (data.success) {
          setReservations(data.reservations);
        }
      } catch (error) {
        console.error("Failed to fetch reservations", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReservations();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Confirmed': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Completed': return 'text-primary-400 bg-primary-500/10 border-primary-500/20';
      case 'Cancelled': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  if (loading) {
    return <div className="text-primary-400 animate-pulse">Loading reservations...</div>;
  }

  return (
    <div className="space-y-12">
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="font-serif text-[48px] leading-tight font-semibold mb-2 text-white">Reservations</h1>
            <p className="text-gray-400">Manage your upcoming and past dining experiences.</p>
          </div>
          <button onClick={() => router.push('/reservations')} className="bg-primary-500/10 text-primary-400 border border-primary-500/30 px-6 py-2 rounded-lg font-sans text-sm tracking-wider font-semibold hover:bg-primary-500/20 transition-all">
            + Book Table
          </button>
        </div>

        {reservations.length === 0 ? (
          <div className="bg-dark-surface p-8 rounded-2xl border border-white/10 text-center">
            <span className="material-symbols-outlined text-4xl text-gray-500 mb-4 block">event_busy</span>
            <p className="text-gray-400">You have no reservations right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map((res: any) => (
              <div key={res._id} className="bg-dark-surface p-6 rounded-xl border border-white/10 relative hover:border-white/20 transition-all cursor-pointer group">
                
                <div className={`absolute top-4 right-4 text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-bold border ${getStatusColor(res.status)}`}>
                  {res.status}
                </div>
                
                <span className="material-symbols-outlined text-3xl text-primary-400 mb-4 block group-hover:scale-110 transition-transform">restaurant</span>
                <p className="font-sans text-[20px] text-white font-medium mb-1">{res.date}</p>
                <p className="font-sans text-[16px] text-gray-300 mb-6">{res.time} • {res.guests} Guests</p>
                
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="text-sm font-semibold text-gray-500">{res.customerName}</span>
                  {res.status === 'Pending' || res.status === 'Confirmed' ? (
                    <button className="text-sm font-semibold text-red-400 hover:underline">Cancel</button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
