import Head from 'next/head';

export default function ShoppingCartPage() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,FILL@0..1&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-color: #131314;
          color: #e5e2e3;
          font-family: 'Manrope', sans-serif;
        }
        h1, h2, h3, h4 {
          font-family: 'Playfair Display', serif;
        }
      `}} />

      <div className="min-h-screen bg-[#131314] text-[#e5e2e3] font-sans selection:bg-[#84cc16] selection:text-[#103900]">
        
        {/* Navigation */}
        <nav className="border-b border-[#353436]/50 bg-[#0e0e0f] py-6">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="text-2xl font-bold text-[#84cc16] tracking-widest uppercase font-serif">Lumière</div>
            <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
              <a className="hover:text-[#84cc16] transition-colors" href="#">Menu</a>
              <a className="hover:text-[#84cc16] transition-colors" href="#">Reservations</a>
              <a className="hover:text-[#84cc16] transition-colors" href="#">Experience</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined cursor-pointer hover:text-[#84cc16] transition-colors">search</span>
              <div className="relative">
                <span className="material-symbols-outlined cursor-pointer hover:text-[#84cc16] transition-colors">shopping_bag</span>
                <span className="absolute -top-2 -right-2 bg-[#84cc16] text-[#103900] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl mb-12 font-serif">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Your Selection List */}
            <div className="lg:col-span-2 space-y-8">
              <div className="border-b border-[#353436]/50 pb-4">
                <h2 className="text-2xl text-[#84cc16] font-serif">Your Selection</h2>
              </div>
              
              {/* Cart Items */}
              <div className="space-y-6">
                
                {/* Item 1 */}
                <div className="flex flex-col sm:flex-row items-start gap-6 p-4 rounded-xl hover:bg-[#1c1b1c] transition-colors group">
                  <div className="w-full sm:w-32 h-48 sm:h-32 bg-[#201f20] rounded-lg overflow-hidden shrink-0">
                    <img 
                      alt="Miyazaki Wagyu A5" 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCllEl6vxE-ldddSkgPH__lazkNLBnBKQjM-f979ayBYpf7y7IToe-VswAixXQFg1NN7UtrDf4oPcRz7Qg1HnYrq8XIggpWcnpDuP23sqFN-HGmkhG_x6bDjkWzBNfR3JN-KNEEDPP0usPmYAtBumH4h99CPio1DmENq7B5g0Fvvo82yQ1lxpVUmiz2GpLksq127QeIKAK_IIEZ2WaccMe3N2Y7Ok7L7bAOR1Qp6LDL_w-e41DupGNUhWD7dr5LvrjoQTWsiOWrYoWP"
                    />
                  </div>
                  <div className="grow w-full">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 sm:mb-0">
                      <div>
                        <h3 className="text-xl mb-1 font-serif">Miyazaki Wagyu A5</h3>
                        <p className="text-[#d0c5af] text-sm mb-4">Truffle jus, smoked bone marrow, pickled heritage carrots.</p>
                      </div>
                      <p className="text-xl text-[#84cc16] font-semibold">$245.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 border border-[#353436] rounded-full px-3 py-1">
                        <button className="text-[#d0c5af] hover:text-[#84cc16] transition-colors flex items-center">
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="text-sm font-semibold">1</span>
                        <button className="text-[#d0c5af] hover:text-[#84cc16] transition-colors flex items-center">
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      <button className="text-[#d0c5af] hover:text-[#ffb4ab] transition-colors text-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">delete</span> Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col sm:flex-row items-start gap-6 p-4 rounded-xl hover:bg-[#1c1b1c] transition-colors group">
                  <div className="w-full sm:w-32 h-48 sm:h-32 bg-[#201f20] rounded-lg overflow-hidden shrink-0">
                    <img 
                      alt="Midnight Fondant" 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxRVU8f8hdleLHWkVFmmGTDkLX7po9tNv3WwgrHmwoEUpZRSkLcp0Jbo_ITElopMjXhbWGD0u_ibRBJxEE52jAK8viaJukNnwLePg5jiLcl4bk5Q5jNb5BiCzF1fwl6xWywhpwJ5-dD8qpxi69Lfg0-6tO20N5P6Wt6pwvs0_xF_0yyGdCvdWzS1He9BzZUYqvDfYJlp0hiXQhqfyGS1QaltTugRkWmlmdToxz9P8Z_ESn8KicIWzOUpHxNevD400u3CfL0caAh3Ma"
                    />
                  </div>
                  <div className="grow w-full">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 sm:mb-0">
                      <div>
                        <h3 className="text-xl mb-1 font-serif">Midnight Fondant</h3>
                        <p className="text-[#d0c5af] text-sm mb-4">70% dark cocoa, gold leaf, Madagascar vanilla crème.</p>
                      </div>
                      <p className="text-xl text-[#84cc16] font-semibold">$38.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 border border-[#353436] rounded-full px-3 py-1">
                        <button className="text-[#d0c5af] hover:text-[#84cc16] transition-colors flex items-center">
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="text-sm font-semibold">1</span>
                        <button className="text-[#d0c5af] hover:text-[#84cc16] transition-colors flex items-center">
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      <button className="text-[#d0c5af] hover:text-[#ffb4ab] transition-colors text-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">delete</span> Remove
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sommelier's Recommendations */}
              <div className="mt-16 pt-12 border-t border-[#353436]/50">
                <h2 className="text-2xl text-[#84cc16] font-serif mb-6">Sommelier's Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="bg-[#1c1b1c] p-6 rounded-xl flex items-center gap-4 border border-[#353436]/20 hover:border-[#84cc16]/30 transition-colors">
                    <div className="w-16 h-24 bg-[#201f20] rounded overflow-hidden shrink-0">
                      <img 
                        alt="Red Wine" 
                        className="w-full h-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5AUL-sDmTGwbUsr-uP0g8USiMZuqY-saf3gk4T_rv-KCZNSVFFp7LwWNHtv8sKna7zjV-_LUwacsz6g58LP_EbC3mOzUvgNsrBYtrKxrmcnxQZH2z24bh9iuCptGxfcf6k_Sr-9YKTNRk_PnxxSZq4p6PapUnprNUI0P7oU9QKYBDa_NUR8dFcD95w4l_aMarvXEVANCo8VRNLvHnp9pr4RUzmK0MOpaJ7_HjGE2NpgTicC2K7bzLwKDovtFXUZjI84J40lSpvw9s"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif">Château Margaux 2015</h4>
                      <p className="text-sm text-[#d0c5af] mb-2">Perfect pairing for the Wagyu</p>
                      <button className="text-xs uppercase tracking-widest text-[#84cc16] font-bold hover:underline">Add to selection +$850</button>
                    </div>
                  </div>
                  
                  <div className="bg-[#1c1b1c] p-6 rounded-xl flex items-center gap-4 border border-[#353436]/20 hover:border-[#84cc16]/30 transition-colors">
                    <div className="w-16 h-24 bg-[#201f20] rounded overflow-hidden shrink-0">
                      <img 
                        alt="Dessert Wine" 
                        className="w-full h-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuaX-n6zsh4dMewa8V-3hFn6I5klBL6MAqgxaAjecR-nAcOdu_WwbbI6RVEtm-GmY2pp0cIoskJQJFmY8Y3IwCHQchE3S-IZ7P9qwPTgSfIee9dcwsqJjgsoH2SdrKNMJmYWJKjiKzIn_R7ngIQkNP6zNRV4Q7FYT8utwaCEbDpcl8yFAAGf6pY_As649Ns_RODNteIB84C5XXt_P32ChzIKV7TzBn128ifF5NxHprrPMQo7B-MsIeKQuj-oYohmj2lidWoVYZlu07"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif">Château d'Yquem 2017</h4>
                      <p className="text-sm text-[#d0c5af] mb-2">Enhances the Midnight Fondant</p>
                      <button className="text-xs uppercase tracking-widest text-[#84cc16] font-bold hover:underline">Add to selection +$120</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#1c1b1c] p-8 rounded-2xl sticky top-8 border border-[#353436]/30 backdrop-blur-sm">
                <h2 className="text-2xl text-[#84cc16] font-serif mb-8 border-b border-[#353436]/30 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[#d0c5af]">
                    <span>Subtotal</span>
                    <span>$283.00</span>
                  </div>
                  <div className="flex justify-between text-[#d0c5af]">
                    <span>Service Fee (15%)</span>
                    <span>$42.45</span>
                  </div>
                  <div className="flex justify-between text-[#d0c5af]">
                    <span>Tax (8%)</span>
                    <span>$22.64</span>
                  </div>
                  <div className="pt-4 border-t border-[#353436]/30 flex justify-between items-baseline">
                    <span className="text-xl">Total</span>
                    <span className="text-3xl text-[#84cc16] font-bold tracking-tight">$348.09</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button className="w-full bg-[#84cc16] hover:bg-[#84cc16]/90 text-[#103900] font-bold py-4 rounded-lg uppercase tracking-widest transition-all">
                    Proceed to Checkout
                  </button>
                  <p className="text-[10px] text-center text-[#d0c5af] uppercase tracking-widest px-4">
                    By proceeding, you agree to the Lumière Dining terms of service and private dining policy.
                  </p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-[#353436]/30">
                  <div className="flex items-center gap-3 text-sm text-[#d0c5af] mb-4">
                    <span className="material-symbols-outlined text-[#84cc16]">schedule</span>
                    <span>Preparation time: ~45 minutes</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#d0c5af]">
                    <span className="material-symbols-outlined text-[#84cc16]">verified_user</span>
                    <span>Encrypted Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="mt-24 py-12 bg-[#0e0e0f] border-t border-[#353436]/50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="text-xl text-[#84cc16] font-serif tracking-widest uppercase mb-6">Lumière Dining</div>
            <p className="text-[#d0c5af] text-sm max-w-md mx-auto mb-8">
              Crafting unforgettable culinary experiences at the intersection of tradition and innovation.
            </p>
            <div className="flex justify-center gap-6 mb-8">
              <a className="text-[#d0c5af] hover:text-[#84cc16] transition-colors italic" href="#">Instagram</a>
              <a className="text-[#d0c5af] hover:text-[#84cc16] transition-colors italic" href="#">Twitter</a>
              <a className="text-[#d0c5af] hover:text-[#84cc16] transition-colors italic" href="#">Facebook</a>
            </div>
            <p className="text-[10px] text-[#d0c5af]/50 uppercase tracking-[0.2em]">© {new Date().getFullYear()} Lumière Gastronomy Group</p>
          </div>
        </footer>

      </div>
    </>
  );
}
