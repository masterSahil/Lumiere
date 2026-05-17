import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQp_iECOITatzF6j1rr5LXkxwNjNiD0dp-khBveT3Dg78hzX87AtGRJJ3xCl_7fI_D08g67yL2V-RK0n6bIzXUW5EA2rOmPLKzOEWSnsGlEVnzaqY14TSfwzZ1yCXf9cArUy_oT8w-P_ThBUxyGRWwk6BojK09dzoGj49eOJzB1uUniv-7bLb1S8AUN8SF4l5OPiMBO8XPjoKdFhv9xvheC39QkQ5-EZpyqUFcIP-GIi-CnfFdnKMl39XCZ3TzIn4qJ_SKGlWQ10LQ')" }}
      >
        <div className="absolute inset-0 bg-slate-900/60 bg-linear-to-t from-slate-900/90 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Elevate Your <br/> <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">Culinary Senses</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Experience the intersection of masterful technique and pristine ingredients. A curated menu designed for the discerning palate, delivered with clinical precision.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 text-slate-900 font-semibold rounded-full hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] transform hover:-translate-y-1">
            Order Now
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium rounded-full hover:bg-white/20 transition-all transform hover:-translate-y-1">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}