'use client'
import { LuCreditCard, LuPlus, LuMoveHorizontal } from 'react-icons/lu';
import Image from 'next/image';

export default function PaymentsPage() {
  const cards = [
    { id: 1, brand: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, brand: 'Mastercard', last4: '8888', expiry: '09/24', isDefault: false },
  ];

  return (
    <div className="space-y-12">
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-serif text-[48px] leading-tight font-semibold mb-2 text-white">Payment Methods</h1>
            <p className="text-gray-400">Manage your saved cards and payment preferences.</p>
          </div>
          <button className="flex items-center gap-2 bg-primary-500 text-dark-bg px-6 py-3 rounded-xl font-sans text-sm tracking-wider font-semibold hover:bg-primary-400 transition-all shadow-[0_0_15px_rgba(132,204,22,0.3)]">
            <LuPlus className="text-lg" />
            Add New Card
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="bg-linear-to-br from-dark-surface to-dark-bg p-8 rounded-2xl border border-white/10 relative hover:border-primary-500/40 transition-all group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary-500/10 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-12">
                <LuCreditCard className="text-4xl text-gray-300" />
                <div className="flex items-center gap-4">
                  {card.isDefault && (
                    <span className="bg-primary-950 text-primary-400 text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold border border-primary-500/20">
                      Default
                    </span>
                  )}
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <LuMoveHorizontal className="text-2xl" />
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
      </section>
    </div>
  );
}
