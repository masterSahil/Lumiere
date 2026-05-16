import React from 'react';

export default function Promo() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl flex flex-col md:flex-row">
          
          {/* Text Content Area */}
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900 to-transparent z-0 hidden md:block"></div>
            <div className="relative z-10">
              <span className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-3 block">Limited Time Experience</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                The Executive <br/> Lunch Tasting
              </h2>
              <p className="text-slate-300 mb-8 max-w-md text-sm md:text-base leading-relaxed">
                Elevate your midday break. A masterfully curated three-course experience designed to be served precisely within 45 minutes. Efficiency meets uncompromising quality.
              </p>
              <button className="self-start px-8 py-3.5 bg-amber-500 text-slate-900 font-semibold rounded-full hover:bg-amber-400 transition-all shadow-lg transform hover:-translate-y-1">
                Reserve a Table
              </button>
            </div>
          </div>

          {/* Image Area */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            {/* Soft gradient blend for desktop */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 hidden md:block"></div>
            <img 
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop" 
              alt="Executive Lunch" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}