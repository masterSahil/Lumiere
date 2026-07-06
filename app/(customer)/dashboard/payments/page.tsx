'use client'
import { useState, useEffect } from 'react';
import { LuCreditCard, LuPlus, LuMoveHorizontal, LuTrash2 } from 'react-icons/lu';
import axios from 'axios';
import { toast } from 'sonner';

export default function PaymentsPage() {
  const [user, setUser] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCard, setNewCard] = useState({ brand: 'Visa', last4: '', expiry: '', isDefault: false });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/verify');
        if (data.success) {
          setUser(data.data);
          // Wait to fetch user again to get full user with payment methods
          const userRes = await axios.get(`/api/users/${data.data._id}`);
          if (userRes.data.success) {
             setCards(userRes.data.user.paymentMethods || []);
          }
        }
      } catch (err) {
        console.error("Failed to fetch payments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleAddCard = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    setAdding(true);
    try {
      const res = await axios.post(`/api/users/${user._id}/payments`, newCard);
      if (res.data.success) {
        toast.success("Card added successfully");
        setCards(res.data.paymentMethods);
        setShowAddModal(false);
        setNewCard({ brand: 'Visa', last4: '', expiry: '', isDefault: false });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Failed to add card");
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!user) return;
    if (!confirm("Are you sure you want to remove this card?")) return;
    try {
      const res = await axios.delete(`/api/users/${user._id}/payments/${cardId}`);
      if (res.data.success) {
        toast.success("Card removed");
        setCards(res.data.paymentMethods);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Failed to remove card");
    }
  };

  if (loading) {
     return <div className="text-gray-400">Loading payment methods...</div>;
  }

  return (
    <div className="space-y-12">
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-serif text-[48px] leading-tight font-semibold mb-2 text-white">Payment Methods</h1>
            <p className="text-gray-400">Manage your saved cards and payment preferences.</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-primary-500 text-dark-bg px-6 py-3 rounded-xl font-sans text-sm tracking-wider font-semibold hover:bg-primary-400 transition-all shadow-[0_0_15px_rgba(132,204,22,0.3)]">
            <LuPlus className="text-lg" />
            Add New Card
          </button>
        </div>

        {cards.length === 0 ? (
           <div className="bg-dark-surface p-12 rounded-2xl border border-white/10 text-center">
              <LuCreditCard className="text-6xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">No payment methods found</h3>
              <p className="text-gray-400 mb-6">Add a credit or debit card to complete your reservations quickly.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cards.map((card) => (
              <div key={card._id} className="bg-linear-to-br from-dark-surface to-dark-bg p-8 rounded-2xl border border-white/10 relative hover:border-primary-500/40 transition-all group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary-500/10 transition-colors"></div>
                
                <div className="flex justify-between items-start mb-12">
                  <LuCreditCard className="text-4xl text-gray-300" />
                  <div className="flex items-center gap-4">
                    {card.isDefault && (
                      <span className="bg-primary-950 text-primary-400 text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold border border-primary-500/20">
                        Default
                      </span>
                    )}
                    <button onClick={() => handleDeleteCard(card._id)} className="text-gray-500 hover:text-red-400 transition-colors" title="Remove Card">
                      <LuTrash2 className="text-xl" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="font-mono text-2xl tracking-[0.2em] text-white">
                    **** **** **** {card.last4}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Expires</p>
                      <p className="text-sm font-medium text-gray-300">{card.expiry}</p>
                    </div>
                    <p className="font-serif text-lg font-medium text-white italic">{card.brand}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form onSubmit={handleAddCard} className="bg-dark-surface border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-serif text-white mb-4">Add New Card</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Card Brand</label>
                <select value={newCard.brand} onChange={e => setNewCard({...newCard, brand: e.target.value})} className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 outline-none">
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Amex">Amex</option>
                  <option value="Discover">Discover</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Last 4 Digits</label>
                  <input type="text" maxLength={4} pattern="\d{4}" placeholder="e.g. 4242" value={newCard.last4} onChange={e => setNewCard({...newCard, last4: e.target.value})} required className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Expiry</label>
                  <input type="text" placeholder="MM/YY" pattern="\d{2}/\d{2}" value={newCard.expiry} onChange={e => setNewCard({...newCard, expiry: e.target.value})} required className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isDefault" checked={newCard.isDefault} onChange={e => setNewCard({...newCard, isDefault: e.target.checked})} className="accent-primary-500 w-4 h-4" />
                <label htmlFor="isDefault" className="text-sm text-gray-300 cursor-pointer">Set as default payment method</label>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2 rounded-lg text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button type="submit" disabled={adding} className="bg-primary-500 text-dark-bg px-5 py-2 rounded-lg font-semibold hover:bg-primary-400 transition-colors disabled:opacity-50">
                {adding ? 'Saving...' : 'Save Card'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
