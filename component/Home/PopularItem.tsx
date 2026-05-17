import React from 'react';

const categories = ['All Menu', 'Signature Rolls', 'Artisan Wraps', 'Power Bowls', 'Craft Drinks'];

const menuItems = [
  {
    id: 1,
    name: 'Truffle Salmon Roll',
    price: '$24',
    description: 'Fresh wild-caught salmon, avocado, cucumber, topped with black truffle caviar and delicate gold leaf flakes.',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop',
    tag: 'Popular'
  },
  {
    id: 2,
    name: 'Citrus Ahi Bowl',
    price: '$28',
    description: 'Seared ahi tuna, organic quinoa, edamame, mango, and micro-greens drizzled with a yuzu ponzu dressing.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Smoked Amber',
    price: '$18',
    description: 'Aged bourbon, smoked maple syrup, orange bitters, served over a hand-carved clear ice sphere.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop'
  }
];

export default function PopularItems() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 justify-start md:justify-center space-x-3 md:space-x-4 no-scrollbar mb-16">
          {categories.map((cat, index) => (
            <button 
              key={cat} 
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                index === 0 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-gray-200 hover:border-amber-500 hover:text-amber-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-amber-600 text-xs font-bold tracking-widest uppercase mb-2 block">Curated Selection</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Popular Items</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                {item.tag && (
                  <span className="absolute top-4 right-4 z-10 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {item.tag}
                  </span>
                )}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                  <span className="text-lg font-bold text-amber-600">{item.price}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 grow">{item.description}</p>
                <button className="w-full py-3 bg-gray-50 hover:bg-slate-900 hover:text-white text-slate-800 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 border border-gray-100 group-hover:border-slate-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#menu" className="inline-block border-b-2 border-amber-500 text-slate-900 font-medium hover:text-amber-600 transition-colors pb-1">
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
}