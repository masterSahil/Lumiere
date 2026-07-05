'use client'
import { useState } from 'react';
import { LuMapPin, LuPlus, LuX, LuCheck } from 'react-icons/lu';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Home', street: '123 Michelin Ave', city: 'New York', state: 'NY', zip: '10001', isDefault: true },
    { id: 2, name: 'Work', street: '456 Culinary Blvd', city: 'San Francisco', state: 'CA', zip: '94105', isDefault: false },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', street: '', city: '', state: '', zip: '', isDefault: false });

  const handleOpenForm = (address?: any) => {
    if (address) {
      setEditingId(address.id);
      setFormData(address);
    } else {
      setEditingId(null);
      setFormData({ name: '', street: '', city: '', state: '', zip: '', isDefault: false });
    }
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAddresses(addresses.map(a => a.id === editingId ? { ...formData, id: editingId } : (formData.isDefault ? { ...a, isDefault: false } : a)));
    } else {
      const newAddress = { ...formData, id: Date.now() };
      setAddresses([...(formData.isDefault ? addresses.map(a => ({...a, isDefault: false})) : addresses), newAddress]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="space-y-12">
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-serif text-[48px] leading-tight font-semibold mb-2 text-white">Addresses</h1>
            <p className="text-gray-400">Manage your saved delivery locations.</p>
          </div>
          <button 
            onClick={() => handleOpenForm()}
            className="flex items-center gap-2 bg-primary-500 text-dark-bg px-6 py-3 rounded-xl font-sans text-sm tracking-wider font-semibold hover:bg-primary-400 transition-all shadow-[0_0_15px_rgba(132,204,22,0.3)]">
            <LuPlus className="text-lg" />
            Add New
          </button>
        </div>

        {isFormOpen ? (
          <div className="bg-dark-surface p-8 rounded-2xl border border-primary-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-white">{editingId ? 'Edit Address' : 'Add New Address'}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <LuX className="text-2xl" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">Label (e.g. Home, Work)</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">Street Address</label>
                  <input required type="text" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})}
                    className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">City</label>
                  <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">State</label>
                  <input required type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}
                    className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-[12px] tracking-widest font-semibold text-gray-400 uppercase">ZIP Code</label>
                  <input required type="text" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})}
                    className="w-full bg-dark-bg border border-white/10 text-white rounded-lg py-3 px-4 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <input type="checkbox" id="default-address" checked={formData.isDefault} onChange={e => setFormData({...formData, isDefault: e.target.checked})} 
                  className="w-4 h-4 accent-primary-500 bg-dark-bg border-white/20 rounded" />
                <label htmlFor="default-address" className="text-gray-300 text-sm">Set as default delivery address</label>
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 rounded-lg text-gray-300 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-primary-500 text-dark-bg px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors">Save Address</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {addresses.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-dark-surface rounded-2xl border border-white/5 border-dashed">
                <LuMapPin className="text-6xl text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">No saved addresses found.</p>
              </div>
            ) : addresses.map((address) => (
              <div key={address.id} className="bg-dark-surface p-8 rounded-2xl border border-white/10 relative hover:border-primary-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                        <LuMapPin className="text-primary-400 text-xl" />
                      </div>
                      <h3 className="text-xl font-serif font-medium text-white">{address.name || 'Address'}</h3>
                    </div>
                    {address.isDefault && (
                      <div className="flex items-center gap-1 bg-primary-950 text-primary-400 text-[11px] px-3 py-1.5 rounded-full uppercase tracking-widest font-bold border border-primary-500/30">
                        <LuCheck className="text-sm" /> Default
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 mb-8">
                    <p className="font-sans text-base text-gray-300">{address.street}</p>
                    <p className="font-sans text-base text-gray-400">{address.city}, {address.state} {address.zip}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 border-t border-white/10 pt-6 mt-auto">
                  <button onClick={() => handleOpenForm(address)} className="text-sm font-semibold tracking-wide text-primary-400 hover:text-primary-300 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(address.id)} className="text-sm font-semibold tracking-wide text-red-400 hover:text-red-300 transition-colors">Delete</button>
                  {!address.isDefault && (
                    <button onClick={() => handleSetDefault(address.id)} className="ml-auto text-sm font-medium tracking-wide text-gray-400 hover:text-white transition-colors">Set as Default</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
