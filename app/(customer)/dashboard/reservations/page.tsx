'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CalendarX, Utensils } from 'lucide-react';

export default function DashboardReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: auth } = await axios.get('/api/auth/verify');
        if (auth.success && auth.data) {
          const { data } = await axios.get(`/api/reservations?userId=${auth.data._id}`);
          if (data.success) {
            setReservations(data.reservations);
          }
        }
      } catch (error) {
        console.error("Failed to fetch reservations", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    try {
      const { data } = await axios.put(`/api/reservations/${id}`, { status: 'Cancelled' });
      if (data.success) {
        setReservations((prev: any) => 
          prev.map((r: any) => r._id === id ? { ...r, status: 'Cancelled' } : r)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Confirmed': return 'text-primary-400 bg-primary-500/10 border-primary-500/20';
      case 'Completed': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
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
          <div className="bg-dark-surface p-8 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center py-20">
            <CalendarX className="w-12 h-12 text-gray-500 mb-4" />
            <p className="text-gray-400">You have no reservations right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map((res: any) => {
              const resDate = new Date(res.date);
              const formattedDate = resDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
              
              return (
                <div key={res._id} className="bg-dark-surface p-6 rounded-[20px] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col justify-between min-h-[160px]">
                  
                  {/* Status Badge */}
                  <div className={`absolute top-5 right-5 text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-bold border ${getStatusColor(res.status)}`}>
                    {res.status}
                  </div>
                  
                  {/* Background Icon */}
                  <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
                    <Utensils className="w-32 h-32 text-primary-400" />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20 shrink-0">
                        <Utensils className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="font-serif text-[18px] text-white leading-tight">{formattedDate}</p>
                        <p className="text-sm font-medium text-primary-400 mt-1">{res.time} • {res.guests} Guests</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-4 relative z-10">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Booked By</span>
                      <span className="text-sm font-medium text-white">{res.customerName}</span>
                    </div>
                    {(res.status === 'Pending' || res.status === 'Confirmed') && (
                      <button 
                        onClick={() => handleCancel(res._id)}
                        className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
