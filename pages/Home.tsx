import Head from 'next/head';

export default function LumiereDining() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      {/* Embedded Custom CSS to avoid external stylesheets */}
      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-color: #131314;
          color: #e5e2e3;
          overflow-x: hidden;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid transparent;
          border-image: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(212, 175, 55, 0.3) 100%) 1;
        }
        .gold-glow {
          box-shadow: 0 0 40px 0 rgba(212, 175, 55, 0.15);
        }
        .text-shadow-hero {
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4af37;
        }
      `}} />

      <div className="font-sans text-4 leading-6 selection:bg-[#5fca2d] selection:text-[#1a5000] dark min-h-screen bg-[#131314]">
        {/* Top Navigation Bar */}
        <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl border-b border-white/10">
          <div className="flex justify-between items-center px-5 md:px-20 py-4 w-full max-w-360 mx-auto">
            <div className="font-serif text-[32px] md:text-[48px] leading-10 md:leading-14 font-bold text-[#72df41]">
              Lumière Dining
            </div>
            <div className="hidden md:flex items-center gap-10">
              <a className="text-[#7ae749] border-b-2 border-[#7ae749] pb-1 font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">Menu</a>
              <a className="text-[#e5e2e3]/70 hover:text-[#7ae749] transition-colors duration-300 font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">About</a>
              <a className="text-[#e5e2e3]/70 hover:text-[#7ae749] transition-colors duration-300 font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">Reservations</a>
              <a className="text-[#e5e2e3]/70 hover:text-[#7ae749] transition-colors duration-300 font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">Contact</a>
            </div>
            <div className="flex items-center gap-6">
              <button className="hidden md:block text-[#72df41] hover:text-[#7ae749] transition-colors font-sans text-[14px] leading-5 tracking-wider font-semibold">Sign In</button>
              <button className="bg-[#5fca2d] text-[#1a5000] px-6 py-2.5 rounded-full font-sans text-[14px] leading-5 tracking-wider font-semibold hover:bg-[#7ae749] transition-all duration-300 shadow-lg shadow-[#7ae749]/20">
                Order Now
              </button>
              <button className="md:hidden text-[#e5e2e3]">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </nav>

        <main>
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                alt="A high-end cinematic close-up of a gourmet dish" 
                className="w-full h-full object-cover opacity-60 scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrmJ0Eu865lci0BZ7y6IjW0rhATHlDjD8tD39l3d5bUTiXiDIC2Rj46a2_ZO8RRC4klNgFd-qHJDQE5wvXINj0Ro3N5tTrww78pIh3dS2niktMsra2SIk8eun9JMOhHgDtSrsZl3o4Nr2kFm7HElo1pNQNzdzLMA7Hv6HG7ozIlsVscI8UyER3SpMAd1YMGKPepz7OkiHi8wFMLZg8SkeaRZmDKhv1GBiZlPWu3pAY1oA9x1K03e6Rzc_eYA6Gdgyj7gzAhy3KLU_c" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#131314] via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-linear-to-r from-[#131314]/80 via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 px-5 md:px-20 w-full max-w-360 mx-auto">
              <div className="max-w-3xl space-y-8">
                <h1 className="font-serif text-[48px] md:text-[72px] leading-13 md:leading-20 tracking-[-0.01em] md:tracking-[-0.02em] font-bold text-shadow-hero text-white">
                  The Art of <span className="text-[#72df41]">Fine Dining</span>, Delivered
                </h1>
                <p className="font-sans text-[18px] leading-7 text-[#d0c5af] max-w-xl">
                  Experience Michelin-star quality in the comfort of your sanctuary. Our master chefs prepare each masterpiece with surgical precision and artistic passion.
                </p>
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                  <div className="relative grow max-w-md">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#99907c]">search</span>
                    <input 
                      className="w-full bg-[#1c1b1c]/40 backdrop-blur-md border-b border-white/20 px-12 py-4 focus:outline-none focus:border-[#7ae749] transition-all text-[#e5e2e3] placeholder:text-[#99907c]" 
                      placeholder="Search for delicacies..." 
                      type="text" 
                    />
                  </div>
                  <button className="bg-[#7ae749] text-[#103900] px-10 py-4 rounded-full font-sans text-[14px] leading-5 tracking-wider font-semibold gold-glow hover:scale-105 transition-all">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Dishes Slider */}
          <section className="py-24 px-5 md:px-20 bg-[#131314]">
            <div className="max-w-360 mx-auto">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="font-serif text-[32px] md:text-[48px] leading-10 md:leading-14 font-semibold text-white">Curated Selection</h2>
                  <p className="text-[#72df41] font-sans text-[14px] leading-5 tracking-wider font-semibold mt-2">CHEF'S SIGNATURE CREATIONS</p>
                </div>
                <div className="flex gap-4">
                  <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
              
              <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar snap-x">
                {/* Dish Card 1 */}
                <div className="min-w-[320px] md:min-w-100 glass-card p-6 snap-start group cursor-pointer">
                  <div className="relative overflow-hidden aspect-4/5 mb-6">
                    <img 
                      alt="Wagyu steak" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHZO_WKdZcx0olVbciE-BJuYeef68QWTnZ6onowS2IneQ43BS6PjRHWtHsZpBi4OWBcIkRzP2PDYX02mZrHpS5L54bgTQyBad30NYsAG4X3X5i0nsxlrLi4288BnlXeIFd1j0LrB7h7vLy9wVQ92GXI5RRXL5Pi7vk1dJ7DIXZWrScP83IaLEyeyhzwOCXNilwMhMY-g3hl5q-4vRIjheVb9I0qdOzsmyFJKcr42YUfQqLai7gvc8ZD6yOAOeohoMgczVhH5PUmcII" 
                    />
                    <div className="absolute top-4 right-4 bg-[#131314]/60 backdrop-blur-md px-3 py-1 rounded-full text-[#72df41] font-sans text-[12px] leading-4 tracking-[0.03em] font-medium">
                      Premium
                    </div>
                  </div>
                  <h3 className="font-serif text-[32px] leading-10 font-medium text-white mb-2">Truffle Wagyu Ribeye</h3>
                  <p className="text-[#d0c5af] font-sans text-4 leading-6 line-clamp-2 mb-6">Grade A5 wagyu with fresh Périgord truffles and roasted root vegetables.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#72df41] font-serif text-[32px] leading-10 font-medium">$124.00</span>
                    <button className="bg-[#7ae749] text-[#103900] w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>

                {/* Dish Card 2 */}
                <div className="min-w-[320px] md:min-w-100 glass-card p-6 snap-start group cursor-pointer">
                  <div className="relative overflow-hidden aspect-4/5 mb-6">
                    <img 
                      alt="Imperial Omakase Set" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMHYZBxDd3RoHejHlrOqeUnbInIHS-1VvB3PvMuaWqHHe6ZKk5lhvuZhWjulI9jj7-oufm0Dww-PX5M7cYwwDCQqS-GxoGTrdbVurcrh0AJEj80x2HYRwhznbUulR2dX7pDZo0bvKrjzi4MQZVpxvbsiJclQdvJ9PVR0OPKlZjrCI5dBoQIKURu4EvF00fbiVCdh7qa2MK9K8nhx46IXerqLB9lCuOBMQwMDhnZtNqgABb6hlqciZh8B8LoZn05t_l_AUMge8rRpLo" 
                    />
                    <div className="absolute top-4 right-4 bg-[#131314]/60 backdrop-blur-md px-3 py-1 rounded-full text-[#72df41] font-sans text-[12px] leading-4 tracking-[0.03em] font-medium">
                      Seasonal
                    </div>
                  </div>
                  <h3 className="font-serif text-[32px] leading-10 font-medium text-white mb-2">Imperial Omakase Set</h3>
                  <p className="text-[#d0c5af] font-sans text-4 leading-6 line-clamp-2 mb-6">Hand-selected bluefin tuna, uni, and premium sashimi selections.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#72df41] font-serif text-[32px] leading-10 font-medium">$158.00</span>
                    <button className="bg-[#7ae749] text-[#103900] w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>

                {/* Dish Card 3 */}
                <div className="min-w-[320px] md:min-w-100 glass-card p-6 snap-start group cursor-pointer">
                  <div className="relative overflow-hidden aspect-4/5 mb-6">
                    <img 
                      alt="Saffron Gold Taglioni" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0LZ2lWbMTD5wkzQgsZD_qHr849boJutbhGXgWcxRUnC9uaWlAiyi-Xdk7Ei0gxSxA4C4BEKt-LmTWKTSukISSWA17jSA4RJpl3M62Aeo-buwQLUUo30A9EoU4TsH4cp44IDu8NK9dPkoQmhDGGpaXhZUq9nsAuGnFlcfo8BJ7QICcPNsW_iCmQ2AT4Wby_3iBaY6hOZ9ZjCZGyGHpHKeQADZrdXG1FiRfsgQJwHakNMWdowRtdYuIW2j9lJNwkO1CQx-FX0SYI4R1" 
                    />
                  </div>
                  <h3 className="font-serif text-[32px] leading-10 font-medium text-white mb-2">Saffron Gold Taglioni</h3>
                  <p className="text-[#d0c5af] font-sans text-4 leading-6 line-clamp-2 mb-6">Handmade pasta tossed in 24k saffron cream and seasonal mushrooms.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#72df41] font-serif text-[32px] leading-10 font-medium">$89.00</span>
                    <button className="bg-[#7ae749] text-[#103900] w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Categories (Bento Grid Style) */}
          <section className="py-24 px-5 md:px-20">
            <div className="max-w-360 mx-auto">
              <h2 className="font-serif text-[32px] md:text-[48px] leading-10 md:leading-14 font-semibold text-white mb-12 text-center">Exquisite Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="glass-card h-48 flex flex-col items-center justify-center group hover:bg-[#7ae749]/10 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-4xl text-[#7ae749] mb-4 transition-transform group-hover:-translate-y-2">restaurant_menu</span>
                  <span className="font-sans text-[14px] leading-5 tracking-wider font-semibold uppercase">Steaks</span>
                </div>
                <div className="glass-card h-48 flex flex-col items-center justify-center group hover:bg-[#7ae749]/10 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-4xl text-[#7ae749] mb-4 transition-transform group-hover:-translate-y-2">set_meal</span>
                  <span className="font-sans text-[14px] leading-5 tracking-wider font-semibold uppercase">Sushi</span>
                </div>
                <div className="glass-card h-48 flex flex-col items-center justify-center group hover:bg-[#7ae749]/10 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-4xl text-[#7ae749] mb-4 transition-transform group-hover:-translate-y-2">dinner_dining</span>
                  <span className="font-sans text-[14px] leading-5 tracking-wider font-semibold uppercase">Pasta</span>
                </div>
                <div className="glass-card h-48 flex flex-col items-center justify-center group hover:bg-[#7ae749]/10 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-4xl text-[#7ae749] mb-4 transition-transform group-hover:-translate-y-2">wine_bar</span>
                  <span className="font-sans text-[14px] leading-5 tracking-wider font-semibold uppercase">Wines</span>
                </div>
              </div>
            </div>
          </section>

          {/* Promo Banner */}
          <section className="py-24 px-5 md:px-20">
            <div className="max-w-360 mx-auto relative glass-card p-12 md:p-20 overflow-hidden text-center gold-glow">
              <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#5fca2d] rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffbfb7] rounded-full blur-[120px]"></div>
              </div>
              <div className="relative z-10">
                <h3 className="font-sans text-[14px] leading-5 tracking-wider font-semibold text-[#7ae749] uppercase mb-4">Limited Availability</h3>
                <h2 className="font-serif text-[48px] leading-13 md:leading-14 font-bold md:font-semibold text-white mb-8">The Moonlight Gala Menu</h2>
                <p className="text-[#d0c5af] max-w-2xl mx-auto font-sans text-[18px] leading-7 mb-10">
                  A strictly limited 12-course experience curated by our Michelin-starred executive chef. Pre-order now to secure your delivery window for this weekend.
                </p>
                <button className="bg-[#7ae749] text-[#103900] px-12 py-5 rounded-full font-sans text-[14px] leading-5 tracking-wider font-semibold hover:scale-105 transition-all">
                  Reserve Your Experience
                </button>
              </div>
            </div>
          </section>

          {/* Why Choose Us (Stats) */}
          <section className="py-24 px-5 md:px-20">
            <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="space-y-4">
                <div className="text-[#72df41] font-serif text-[72px] leading-20 font-bold">50+</div>
                <h4 className="font-serif text-[32px] leading-10 font-medium text-white">Master Chefs</h4>
                <p className="text-[#d0c5af] font-sans text-4 leading-6 px-8">Award-winning artisans from around the globe crafting culinary perfection.</p>
              </div>
              <div className="space-y-4">
                <div className="text-[#72df41] font-serif text-[72px] leading-20 font-bold">15m</div>
                <h4 className="font-serif text-[32px] leading-10 font-medium text-white">Fast Delivery</h4>
                <h4 className="text-[#d0c5af] font-sans text-4 leading-6 px-8">Precision-timed logistics ensuring your meal arrives at the peak of flavor.</h4>
              </div>
              <div className="space-y-4">
                <div className="text-[#72df41] font-serif text-[72px] leading-20 font-bold">100%</div>
                <h4 className="font-serif text-[32px] leading-10 font-medium text-white">Luxury Quality</h4>
                <p className="text-[#d0c5af] font-sans text-4 leading-6 px-8">Every ingredient is sourced from sustainable, premium suppliers worldwide.</p>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="py-24 px-5 md:px-20 bg-[#0e0e0f]">
            <div className="max-w-360 mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h2 className="font-serif text-[32px] md:text-[48px] leading-10 md:leading-14 font-semibold text-white mb-4">Join the Inner Circle</h2>
                <p className="text-[#d0c5af] font-sans text-4 leading-6">Subscribe to receive exclusive access to seasonal menus and private tasting events.</p>
              </div>
              <div className="grow max-w-md w-full">
                <div className="flex gap-4">
                  <input 
                    className="grow bg-transparent border-b border-white/20 px-4 py-4 focus:outline-none focus:border-[#7ae749] transition-all text-[#e5e2e3]" 
                    placeholder="Your email address" 
                    type="email" 
                  />
                  <button className="bg-white text-[#131314] px-8 py-4 rounded-full font-sans text-[14px] leading-5 tracking-wider font-semibold hover:bg-[#7ae749] transition-all">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full py-12 px-5 md:px-20 border-t border-white/5 bg-[#0e0e0f]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-360 mx-auto mb-12">
            <div className="space-y-6">
              <div className="font-serif text-[32px] leading-10 font-medium text-[#72df41]">Lumière Dining</div>
              <p className="text-[#d0c5af] font-sans text-[14px] leading-5 tracking-wider font-semibold">Setting the global standard for elite food delivery experiences since 2024.</p>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:text-[#7ae749] transition-all" href="#">
                  <span className="material-symbols-outlined">public</span>
                </a>
                <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:text-[#7ae749] transition-all" href="#">
                  <span className="material-symbols-outlined">alternate_email</span>
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-white font-sans text-[14px] leading-5 tracking-wider font-semibold uppercase">Experience</h5>
              <ul className="space-y-2">
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">Menu</a></li>
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">Reservations</a></li>
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">Gift Cards</a></li>
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">Careers</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-white font-sans text-[14px] leading-5 tracking-wider font-semibold uppercase">Support</h5>
              <ul className="space-y-2">
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">Privacy Policy</a></li>
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">Terms of Service</a></li>
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">Sustainability</a></li>
                <li><a className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold" href="#">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-white font-sans text-[14px] leading-5 tracking-wider font-semibold uppercase">Location</h5>
              <p className="text-[#d0c5af] font-sans text-[14px] leading-5 tracking-wider font-semibold">
                88 Golden Plaza, Mayfair<br />
                London, W1J 8AQ<br />
                United Kingdom
              </p>
              <div className="mt-4">
                <img 
                  alt="Map detail of the London Mayfair district" 
                  className="w-full h-32 object-cover rounded-lg opacity-40 grayscale hover:grayscale-0 transition-all duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKE4_zoMN68GmldigLD6HizmvoTTvBnC81YOX7LVEL6G6zlnbtvd9AcFMeLGzXluCwlfEXqhoP_wHb1Iuvu92SnZpa61nNv63tfRiRMsd56RkCbawEtRho6AHZAbwTWl8hBrC8__Rl3pAN6VAQhydvO8WhJ59hYxYRn89hw0L5cjedizIuOdRW1DVX80HkCn6mcFEAcMA9TV9TEcoEZek1UDzKjawDCl47YvIhfvaCfV-zHZMPfDvoOFPIyBnx0VJLA9bNgJae8nCJ" 
                />
              </div>
            </div>
          </div>
          
          <div className="max-w-360 mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#d0c5af] font-sans text-[12px] leading-4 tracking-[0.03em] font-medium">© {new Date().getFullYear()} Lumière Dining. All Rights Reserved.</p>
            <div className="flex gap-8">
              <span className="text-[#d0c5af] font-sans text-[12px] leading-4 tracking-[0.03em] font-medium">Designed with Excellence</span>
              <span className="text-[#d0c5af] font-sans text-[12px] leading-4 tracking-[0.03em] font-medium">English (UK)</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}