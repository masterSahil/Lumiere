'use client'
import { useState } from 'react';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, street: '123 Michelin Ave', city: 'New York', state: 'NY', zip: '10001', isDefault: true },
    { id: 2, street: '456 Culinary Blvd', city: 'San Francisco', state: 'CA', zip: '94105', isDefault: false },
  ]);

  return (
    <div className="space-y-12">
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="font-serif text-[48px] leading-tight font-semibold mb-2 text-white">Addresses</h1>
            <p className="text-gray-400">Manage your saved delivery locations.</p>
          </div>
          <button className="bg-primary-500/10 text-primary-400 border border-primary-500/30 px-6 py-2 rounded-lg font-sans text-sm tracking-wider font-semibold hover:bg-primary-500/20 transition-all">
            + Add New
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="bg-dark-surface p-6 rounded-xl border border-white/10 relative hover:border-primary-500/50 transition-all cursor-pointer">
              {address.isDefault && (
                <div className="absolute top-4 right-4 bg-primary-950 text-primary-400 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold border border-primary-500/20">
                  Default
                </div>
              )}
              <span className="material-symbols-outlined text-3xl text-gray-500 mb-4 block">location_on</span>
              <p className="font-sans text-[16px] text-white font-medium mb-1">{address.street}</p>
              <p className="font-sans text-[14px] text-gray-400 mb-6">{address.city}, {address.state} {address.zip}</p>
              
              <div className="flex gap-4 border-t border-white/5 pt-4">
                <button className="text-sm font-semibold text-primary-400 hover:underline">Edit</button>
                <button className="text-sm font-semibold text-red-400 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
