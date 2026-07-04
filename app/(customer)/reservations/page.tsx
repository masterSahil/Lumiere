'use client'
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReservationsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/reservations', formData);
      if (data.success) {
        setSuccess(true);
      } else {
        alert(data.error || 'Failed to book reservation');
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-dark-surface p-12 rounded-3xl border border-white/10 max-w-md w-full shadow-2xl shadow-primary-500/10"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </motion.div>
          <h2 className="font-serif text-3xl text-white mb-4">Table Requested!</h2>
          <p className="text-gray-400 mb-8">We have received your reservation request for <strong className="text-white">{formData.date}</strong> at <strong className="text-white">{formData.time}</strong>. Our maitre d' will confirm shortly.</p>
          <button 
            onClick={() => router.push('/')}
            className="w-full bg-primary-500 text-dark-bg font-bold py-4 rounded-xl uppercase tracking-widest hover:brightness-110 transition-all"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-primary-500 selection:text-dark-bg">
      <header className="absolute top-0 w-full z-50 py-6 border-b border-white/10 bg-dark-bg/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-widest text-primary-400 uppercase font-serif cursor-pointer" onClick={() => router.push('/')}>Lumière</div>
          <button onClick={() => router.push('/dashboard/reservations')} className="text-sm uppercase tracking-widest text-gray-300 hover:text-primary-400">My Bookings</button>
        </div>
      </header>

      <main className="relative pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 text-primary-400 text-xs font-bold uppercase tracking-widest mb-6 bg-primary-500/10">
              <span className="material-symbols-outlined text-sm">restaurant</span>
              Reservations
            </div>
            <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">Secure Your<br/><span className="text-primary-400 italic">Experience</span></h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md">Join us for an unforgettable culinary journey. Due to high demand, we recommend booking at least two weeks in advance.</p>
            
            <div className="flex gap-6 items-center">
              <div className="flex -space-x-4">
                <img className="w-12 h-12 rounded-full border-2 border-dark-bg object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" alt="Guest" />
                <img className="w-12 h-12 rounded-full border-2 border-dark-bg object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="Guest" />
                <img className="w-12 h-12 rounded-full border-2 border-dark-bg object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Guest" />
              </div>
              <p className="text-sm text-gray-500">Over <strong className="text-white">10,000+</strong> 5-star evenings.</p>
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="bg-dark-surface p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
            
            <h3 className="font-serif text-2xl mb-8">Booking Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Full Name</label>
                <input required type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="w-full bg-dark-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Email</label>
                <input required type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} className="w-full bg-dark-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Phone</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-dark-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Guests</label>
                <input required type="number" min="1" max="20" name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-dark-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Date</label>
                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-dark-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all scheme-dark" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Time</label>
                <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-dark-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all scheme-dark" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Special Requests (Optional)</label>
                <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} className="w-full bg-dark-bg border border-white/10 rounded-xl p-4 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all min-h-[100px]" placeholder="Anniversary, allergies, etc."></textarea>
              </div>
            </div>
            
            <button disabled={loading} type="submit" className="w-full bg-primary-500 text-dark-bg font-bold py-4 rounded-xl uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50">
              {loading ? 'Requesting...' : 'Request Table'}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">By booking, you agree to our cancellation policy.</p>
          </motion.form>
        </div>
      </main>
    </div>
  );
}
