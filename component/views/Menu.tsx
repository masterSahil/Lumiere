import Head from 'next/head';

export default function MenuPage() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-color: #121212;
          color: #f3f4f6;
          overflow-x: hidden;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .toggle-checkbox:checked {
          right: 0;
          border-color: #bcfb4b;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #bcfb4b;
        }
      `}} />

      <div className="font-sans text-4 leading-6 selection:bg-[#bcfb4b] selection:text-[#0a1f00] min-h-screen bg-[#121212]">
        
        {/* Top Navigation Bar */}
        <nav className="w-full z-50 bg-[#121212] border-b border-white/5 py-4">
          <div className="flex justify-between items-center px-5 md:px-20 w-full max-w-360 mx-auto">
            <div className="font-serif text-7 font-bold text-[#bcfb4b]">
              Lumière Dining
            </div>
            <div className="hidden lg:flex items-center gap-10">
              <a className="text-[#bcfb4b] border-b-2 border-[#bcfb4b] pb-1 font-sans text-[14px] tracking-wide font-semibold" href="#">Menu</a>
              <a className="text-gray-400 hover:text-white transition-colors duration-300 font-sans text-[14px] tracking-wide font-medium" href="#">About</a>
              <a className="text-gray-400 hover:text-white transition-colors duration-300 font-sans text-[14px] tracking-wide font-medium" href="#">Reservations</a>
              <a className="text-gray-400 hover:text-white transition-colors duration-300 font-sans text-[14px] tracking-wide font-medium" href="#">Contact</a>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-5">search</span>
                <input 
                  type="text" 
                  placeholder="Search our canvas..." 
                  className="bg-[#1e1e1e] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#bcfb4b] text-white w-64 transition-colors"
                />
              </div>
              <button className="text-gray-300 hover:text-white transition-colors text-[14px] font-medium">Sign In</button>
              <button className="bg-[#bcfb4b] text-[#0a1f00] px-6 py-2 rounded-full text-[14px] font-bold hover:bg-[#a2dd3b] transition-all">
                Order Now
              </button>
            </div>
            <button className="lg:hidden text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </nav>

        <main className="px-5 md:px-20 max-w-360 mx-auto py-12">
          
          {/* Header Section */}
          <div className="max-w-3xl mb-12">
            <h4 className="text-[#bcfb4b] text-[12px] font-bold tracking-widest uppercase mb-4">Exquisite Flavors</h4>
            <h1 className="font-serif text-[48px] md:text-[64px] leading-tight font-bold text-white mb-6">
              Our Culinary Canvas
            </h1>
            <p className="text-gray-400 text-[18px] leading-relaxed max-w-2xl">
              Where avant-garde technique meets heritage ingredients. Each dish is a brushstroke of passion, meticulously plated to transform your dining experience into a moment of pure, luminous artistry.
            </p>
          </div>

          {/* Filters & Toggles */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-3">
              <button className="bg-[#bcfb4b] text-[#0a1f00] px-6 py-2 rounded-full text-[14px] font-semibold">All</button>
              <button className="border border-white/20 text-gray-300 hover:border-[#bcfb4b] hover:text-white px-6 py-2 rounded-full text-[14px] transition-colors">Signature</button>
              <button className="border border-white/20 text-gray-300 hover:border-[#bcfb4b] hover:text-white px-6 py-2 rounded-full text-[14px] transition-colors">Appetizers</button>
              <button className="border border-white/20 text-gray-300 hover:border-[#bcfb4b] hover:text-white px-6 py-2 rounded-full text-[14px] transition-colors">Main Course</button>
              <button className="border border-white/20 text-gray-300 hover:border-[#bcfb4b] hover:text-white px-6 py-2 rounded-full text-[14px] transition-colors">Desserts</button>
              <button className="border border-white/20 text-gray-300 hover:border-[#bcfb4b] hover:text-white px-6 py-2 rounded-full text-[14px] transition-colors">Drinks</button>
            </div>
            <div className="flex items-center gap-6 border-l border-white/10 pl-6">
              {/* Veg Toggle */}
              <div className="flex items-center gap-2">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="veg-toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#1e1e1e] appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out" />
                  <label htmlFor="veg-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-[#1e1e1e] cursor-pointer"></label>
                </div>
                <span className="text-[12px] font-bold tracking-wider text-gray-400">VEG</span>
              </div>
              {/* GF Toggle */}
              <div className="flex items-center gap-2">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="gf-toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-[#1e1e1e] appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out" />
                  <label htmlFor="gf-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-[#1e1e1e] cursor-pointer"></label>
                </div>
                <span className="text-[12px] font-bold tracking-wider text-gray-400">GF</span>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            
            {/* Card 1 */}
            <div className="bg-[#161616] rounded-2xl overflow-hidden border border-white/5 flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <img src="/api/placeholder/400/300" alt="Saffron Gold Tagliatelle" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-[#0a1f00]/80 backdrop-blur-sm border border-[#bcfb4b]/30 text-[#bcfb4b] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Signature Dish
                </div>
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-[22px] font-semibold text-white">Saffron Gold Tagliatelle</h3>
                  <span className="text-[#bcfb4b] font-bold text-[18px]">$42</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-[#bcfb4b] text-[14px] fill-current">star</span>
                  <span className="text-gray-400 text-[12px]">4.9 (124)</span>
                </div>
                <p className="text-gray-400 text-[14px] leading-relaxed mb-6 grow">
                  Hand-rolled pasta infused with Iranian saffron, finished with a 24k gold leaf and truffle-infused emulsion.
                </p>
                <button className="w-full bg-[#bcfb4b] text-[#0a1f00] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#a2dd3b] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span> Add to Cart
                </button>
              </div>
            </div>

            {/* Card 2 (Active State) */}
            <div className="bg-[#161616] rounded-2xl overflow-hidden border border-white/5 flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <img src="/api/placeholder/400/300" alt="A5 Wagyu Obsidian" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Seasonal Special
                </div>
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-[22px] font-semibold text-white">A5 Wagyu Obsidian</h3>
                  <span className="text-[#bcfb4b] font-bold text-[18px]">$128</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-[#bcfb4b] text-[14px] fill-current">star</span>
                  <span className="text-gray-400 text-[12px]">5.0 (86)</span>
                </div>
                <p className="text-gray-400 text-[14px] leading-relaxed mb-6 grow">
                  Charcoal-grilled Wagyu served with fermented garlic purée and a reduction of aged balsamic and forest berries.
                </p>
                {/* Quantity Selector State */}
                <div className="w-full border border-[#bcfb4b] bg-[#121212] py-2 px-4 rounded-xl flex items-center justify-between">
                  <button className="text-[#bcfb4b] hover:text-white transition-colors"><span className="material-symbols-outlined">remove</span></button>
                  <span className="text-[#bcfb4b] font-bold">1</span>
                  <button className="text-[#bcfb4b] hover:text-white transition-colors"><span className="material-symbols-outlined">add</span></button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#161616] rounded-2xl overflow-hidden border border-white/5 flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <img src="/api/placeholder/400/300" alt="Zen Matcha Clouds" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-[22px] font-semibold text-white">Zen Matcha Clouds</h3>
                  <span className="text-[#bcfb4b] font-bold text-[18px]">$18</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-[#bcfb4b] text-[14px] fill-current">star</span>
                  <span className="text-gray-400 text-[12px]">4.8 (210)</span>
                </div>
                <p className="text-gray-400 text-[14px] leading-relaxed mb-6 grow">
                  Deconstructed ceremonial matcha tiramisu with white chocolate pearls and yuzu-infused mascarpone.
                </p>
                <button className="w-full bg-[#bcfb4b] text-[#0a1f00] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#a2dd3b] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span> Add to Cart
                </button>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#161616] rounded-2xl overflow-hidden border border-white/5 flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <img src="/api/placeholder/400/300" alt="Lumière Elixir" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-[22px] font-semibold text-white">Lumière Elixir</h3>
                  <span className="text-[#bcfb4b] font-bold text-[18px]">$22</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-[#bcfb4b] text-[14px] fill-current">star</span>
                  <span className="text-gray-400 text-[12px]">4.9 (340)</span>
                </div>
                <p className="text-gray-400 text-[14px] leading-relaxed mb-6 grow">
                  Gin infused with cucumber and basil, clarified through milk, and finished with a citrus-mint vapor cloud.
                </p>
                <button className="w-full bg-[#bcfb4b] text-[#0a1f00] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#a2dd3b] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span> Add to Cart
                </button>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-[#161616] rounded-2xl overflow-hidden border border-white/5 flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <img src="/api/placeholder/400/300" alt="Heirloom Prism Salad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-[22px] font-semibold text-white">Heirloom Prism Salad</h3>
                  <span className="text-[#bcfb4b] font-bold text-[18px]">$28</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-[#bcfb4b] text-[14px] fill-current">star</span>
                  <span className="text-gray-400 text-[12px]">4.7 (94)</span>
                </div>
                <p className="text-gray-400 text-[14px] leading-relaxed mb-6 grow">
                  Shaved heritage roots, compressed melon, and wildflower honey-lime drizzle over organic wild greens.
                </p>
                <button className="w-full bg-[#bcfb4b] text-[#0a1f00] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#a2dd3b] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span> Add to Cart
                </button>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-[#161616] rounded-2xl overflow-hidden border border-white/5 flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <img src="/api/placeholder/400/300" alt="Veridian Atlantic Salmon" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-[22px] font-semibold text-white">Veridian Atlantic Salmon</h3>
                  <span className="text-[#bcfb4b] font-bold text-[18px]">$48</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <span className="material-symbols-outlined text-[#bcfb4b] text-[14px] fill-current">star</span>
                  <span className="text-gray-400 text-[12px]">4.9 (182)</span>
                </div>
                <p className="text-gray-400 text-[14px] leading-relaxed mb-6 grow">
                  Sustainably sourced salmon with a pea and mint velouté, accompanied by charred seasonal greens.
                </p>
                <button className="w-full bg-[#bcfb4b] text-[#0a1f00] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#a2dd3b] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span> Add to Cart
                </button>
              </div>
            </div>

          </div>

          {/* Dish Spotlight */}
          <div className="glass-card rounded-3xl overflow-hidden flex flex-col lg:flex-row mb-12">
            <div className="lg:w-1/2 relative h-80 lg:h-auto">
              <img src="/api/placeholder/800/600" alt="Dish Spotlight" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <h4 className="text-[#bcfb4b] text-[12px] font-bold tracking-widest uppercase mb-4">Dish Spotlight</h4>
              <h2 className="font-serif text-[36px] font-bold text-white mb-6">Saffron Gold Tagliatelle</h2>
              <p className="text-gray-400 text-4 leading-relaxed mb-8">
                Our master chef's magnum opus. This dish explores the delicate balance between the earthiness of Iranian saffron and the ethereal lightness of hand-pulled silk pasta. Every bite is an evolution of flavor.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <span className="bg-[#1e1e1e] border border-white/10 text-gray-300 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider">Gluten-Free Optional</span>
                <span className="bg-[#1e1e1e] border border-white/10 text-gray-300 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider">Chef's Favorite</span>
              </div>
              <div className="flex items-center gap-8 mt-auto">
                <span className="font-serif text-10 text-[#bcfb4b] font-bold">$42.00</span>
                <button className="bg-[#bcfb4b] text-[#0a1f00] px-8 py-4 rounded-xl font-bold hover:bg-[#a2dd3b] transition-colors grow text-center">
                  Reserve Selection
                </button>
              </div>
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="w-full bg-[#0a0a0a] pt-16 pb-8 border-t border-white/5">
          <div className="px-5 md:px-20 max-w-360 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="space-y-6">
                <div className="font-serif text-7 font-bold text-[#bcfb4b]">Lumière Dining</div>
                <p className="text-gray-400 text-[14px] leading-relaxed">Experience the convergence of light, art, and the world's finest culinary traditions.</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#bcfb4b] hover:text-[#bcfb4b] transition-all">
                    <span className="material-symbols-outlined text-5">public</span>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#bcfb4b] hover:text-[#bcfb4b] transition-all">
                    <span className="material-symbols-outlined text-5">share</span>
                  </a>
                </div>
              </div>
              
              <div className="space-y-6">
                <h5 className="text-white text-[14px] font-bold uppercase tracking-wider">Explore</h5>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-[#bcfb4b] text-[14px] transition-colors">Our Story</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#bcfb4b] text-[14px] transition-colors">Chef's Table</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#bcfb4b] text-[14px] transition-colors">Gift Cards</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#bcfb4b] text-[14px] transition-colors">Private Events</a></li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <h5 className="text-white text-[14px] font-bold uppercase tracking-wider">Support</h5>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-[#bcfb4b] text-[14px] transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#bcfb4b] text-[14px] transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#bcfb4b] text-[14px] transition-colors">Sustainability</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#bcfb4b] text-[14px] transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <h5 className="text-white text-[14px] font-bold uppercase tracking-wider">Lumière Newsletter</h5>
                <p className="text-gray-400 text-[14px] leading-relaxed">Join our inner circle for exclusive seasonal reveals.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="bg-[#1e1e1e] border border-white/10 rounded-l-lg py-3 px-4 text-sm focus:outline-none focus:border-[#bcfb4b] text-white w-full"
                  />
                  <button className="bg-[#bcfb4b] text-[#0a1f00] px-6 py-3 rounded-r-lg text-[14px] font-bold hover:bg-[#a2dd3b] transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-[12px]">© {new Date().getFullYear()} Lumière Dining. All rights reserved.</p>
              <div className="flex gap-2 items-center text-gray-500 text-[12px]">
                <span className="w-2 h-2 rounded-full bg-[#bcfb4b]"></span> Paris · New York · Tokyo
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
