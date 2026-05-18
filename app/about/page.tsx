import Footer from '@/component/Home/Footer';
import Head from 'next/head';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #131314;
            color: #e5e2e3;
            overflow-x: hidden;
            font-family: 'Manrope', sans-serif;
        }
        h1, h2, h3, h4, h5, h6, .font-serif {
            font-family: 'Playfair Display', serif;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
        }
        .glass-card:hover {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(132, 204, 22, 0.3);
        }
      `}} />

      <div className="min-h-screen selection:bg-[#84cc16] selection:text-[#062100]">
        
        {/* Navigation */}
        <header className="border-b border-[#4d4635]/30 py-6 absolute w-full z-50 bg-[#131314]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="text-2xl font-bold tracking-widest text-[#84cc16] uppercase font-serif">Lumière</div>
            <div className="hidden md:flex gap-8">
              <Link className="text-sm uppercase tracking-widest hover:text-[#84cc16] transition-colors font-semibold text-[#e5e2e3]" href="/menu">Menu</Link>
              <Link className="text-sm uppercase tracking-widest text-[#84cc16] border-b-2 border-[#84cc16] pb-1 font-semibold" href="/about">About</Link>
              <Link className="text-sm uppercase tracking-widest hover:text-[#84cc16] transition-colors font-semibold text-[#e5e2e3]" href="reservations">Reservations</Link>
            </div>
            <a className="text-sm uppercase tracking-widest hover:text-[#84cc16] transition-colors border border-[#84cc16]/50 px-4 py-2 rounded-lg text-[#84cc16]" href="/orders">Order Now</a>
          </div>
        </header>

        <main>
          {/* Hero Banner Section */}
          <section className="relative pt-48 pb-32 flex flex-col items-center text-center border-b border-[#4d4635]/30 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7uJfCyuWZZ-oWNcOyjyrWGsmrqqvfmc2Dhq4oOVG2POP-f6g8dO7xJGJ7hGrLtM4RmG70I1FMI9QiRXBh-yE6IuWEqTXHXLS0NRlK-QqkO1KfQpBmDnztMdS_wZ1Xj1ZMpKr3FIoxXPZxxZzcp0RAQrZWpvx8KJBFB4IjHqlzSeQmYgGJq691fvLQWdoDxg61A11CVdXFE6GlK1qLLLIDFZ_fdYk_XGuGr6IOtRH0Sm4QoIFc7tz8bEvrv0kmfDE737Ayp62SWyXd" 
                alt="Lumiere Banner Background" 
                className="w-full h-full object-cover opacity-90 scale-105" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#131314] via-[#131314]/80 to-transparent"></div>
              {/* <div className="absolute inset-0 bg-gradient-to-b from-[#131314] via-transparent to-transparent"></div> */}
            </div>
            
            <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
              <h4 className="text-[#84cc16] text-xs font-bold uppercase tracking-[0.3em] mb-6 drop-shadow-md">Discover Our Essence</h4>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-[#e5e2e3] drop-shadow-xl">
                A Symphony of <br className="hidden md:block"/> Light & Flavor
              </h1>
              <p className="max-w-2xl text-[#d0c5af] text-lg leading-relaxed mx-auto">
                Lumière was born from a singular vision: to illuminate the finest ingredients through masterful technique, creating an unforgettable sensory journey.
              </p>
            </div>
          </section>

          {/* Restaurant Story & Mission */}
          <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-125 w-full rounded-2xl overflow-hidden group border border-white/5">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzGiD3zEp6PP5Lr3YA3g-YT2Cg4PH5UkF4zfFA4tREoEAVRjJafxRmAP2l5aIckKQmolYjq1LIU7kBpZ0BdaXpiab_MWRvM61meQYTD3cMYM8ZhjcVsbFHV_DzFmTjbZMefUPHC2cDq3rznAgNCszqhS4aBMGq-6kwdj2IZNOktl-qT9JXsp45HOZforDMbdHytcXtEcHsWQsUoxmQbO4m4EweXsU4bLL7em23Rg66T_HT7xfJFCqVZ7SCG3g8cJic8eR0_U2WDlSi" 
                alt="Our Culinary Story" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#131314] via-transparent to-transparent opacity-80"></div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-serif font-medium mb-4 text-[#e5e2e3]">Our Story</h2>
                <p className="text-[#d0c5af] leading-relaxed mb-4">
                  Founded in 2018 in the heart of the culinary district, Lumière started as an intimate 12-seat chef's counter. Our founders, driven by a relentless pursuit of perfection, sought to strip away the pretense of fine dining while elevating the artistry of the plate.
                </p>
                <p className="text-[#d0c5af] leading-relaxed">
                  Today, Lumière stands as a beacon of modern gastronomy, blending heritage recipes with avant-garde execution. Every dish tells a story of local terroir and global inspiration.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-2xl border-l-4 border-l-[#84cc16]">
                <h3 className="text-xl font-serif font-medium mb-3 text-[#e5e2e3]">Our Mission</h3>
                <p className="text-[#d0c5af] italic">
                  "To curate profound dining experiences that honor the earth's bounty, champion culinary innovation, and leave a luminous, lasting memory for every guest who walks through our doors."
                </p>
              </div>
            </div>
          </section>

          {/* Brand Values */}
          <section className="py-24 bg-[#1c1b1c] border-y border-[#4d4635]/30">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-medium text-[#e5e2e3]">Our Core Values</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-8 rounded-2xl text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-4xl text-[#84cc16] mb-6">psychiatry</span>
                  <h4 className="text-xl font-serif font-medium mb-3 text-[#e5e2e3]">Sustainable Sourcing</h4>
                  <p className="text-[#d0c5af] text-sm leading-relaxed">We partner exclusively with ethical fisheries, regenerative farms, and local foragers to ensure every ingredient honors the ecosystem.</p>
                </div>
                <div className="glass-card p-8 rounded-2xl text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-4xl text-[#84cc16] mb-6">palette</span>
                  <h4 className="text-xl font-serif font-medium mb-3 text-[#e5e2e3]">Artistic Precision</h4>
                  <p className="text-[#d0c5af] text-sm leading-relaxed">Cooking is our canvas. We approach every plating with meticulous attention to color, texture, and architectural balance.</p>
                </div>
                <div className="glass-card p-8 rounded-2xl text-center flex flex-col items-center">
                  <span className="material-symbols-outlined text-4xl text-[#84cc16] mb-6">volunteer_activism</span>
                  <h4 className="text-xl font-serif font-medium mb-3 text-[#e5e2e3]">Unrivaled Hospitality</h4>
                  <p className="text-[#d0c5af] text-sm leading-relaxed">Service should be invisible yet omnipresent. We strive to anticipate needs and craft an atmosphere of profound warmth and luxury.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Chef Team */}
          <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h4 className="text-[#84cc16] text-xs font-bold uppercase tracking-[0.3em] mb-4">The Artisans</h4>
              <h2 className="text-4xl font-serif font-medium text-[#e5e2e3]">Meet Our Chefs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Chef 1 */}
              <div className="group">
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden mb-6 border border-white/5">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDug2KO8aoapksbNiSWJCQ1_yl5_OCJ_lt2WRr2wlYnVbb0coevR6ZKqfdTqClgPOHRARk3nkNc57Dl6czdnBG_mzKHCuwRRgMPzkFvdvLs2H1HLAK8l_4M5AdHzG5_GaAuWfFo2uu-8sg4XZnsnZssrj8362omJmxMdBsNF1zfOdPz8ufskQps1p2Dcw-psTeqXnBlOYFtQ12-0C3IMiYgA8l4BrwaDqMT6xRZh_tWY6Ns3kZ2kn5rFYV1aJvleI0RAghCJjqmhvsP" 
                    alt="Julian Vane - Executive Chef" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" 
                  />
                </div>
                <h3 className="text-2xl font-serif font-medium text-[#e5e2e3] mb-1">Julian Vane</h3>
                <p className="text-[#84cc16] text-sm font-bold uppercase tracking-widest mb-3">Executive Chef</p>
                <p className="text-[#d0c5af] text-sm leading-relaxed">Two-time Michelin Star recipient. Julian bridges traditional French techniques with bold, modernist flavors.</p>
              </div>
              {/* Chef 2 */}
              <div className="group">
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden mb-6 border border-white/5">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjVyOlcrQMllBz80Zws5yfqWyrsx048ld0V0CfrJZVheg6cAhMrfPkKLit-sbN0G5A00jBlidG7-d-F--L_hu1v2eSzLUSEt-NBrnIcASXLqmYhai8ouhsiVpj9zHGwICc0Adzs8q1nlS55sAHmdBxcwfqsWFJSvSdTuAE1qSAAU-KkZ05YIOpbp4Y9LJHZo8xlfOUV_4XzmoBrjvkb3aGTK_EVZProFb7mOH4Z5saBBQO1dHtR2EKtuL_KANwaEBxDRDZPmLbKiXm" 
                    alt="Elara Vance - Head Pastry Chef" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" 
                  />
                </div>
                <h3 className="text-2xl font-serif font-medium text-[#e5e2e3] mb-1">Elara Vance</h3>
                <p className="text-[#84cc16] text-sm font-bold uppercase tracking-widest mb-3">Head Pastry Chef</p>
                <p className="text-[#d0c5af] text-sm leading-relaxed">Architect of sugar and flour. Elara creates gravity-defying desserts that balance subtle sweetness with savory undertones.</p>
              </div>
              {/* Chef 3 */}
              <div className="group">
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden mb-6 border border-white/5">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4mkzp4qKgZzk3Q3abiRZywSw-_9cVu4M9nQp3E5LhITAF5hklQaGSReDsqHpTN8XzpyfJWl-kTlbTmguMwb8koMpA4xc6tF6a-fyKEsBDf90RbT7H6lcFymTQOsOF6AfEccbXmgOHFBgp5mXBTNh7ChbXFNQPeaJXABr4CuE51Y6yYe8mNDvB33rnH-x_PKulmWZE-EwDtG_1XjtpCbN1n-MhULPQUhF86RC2nWFThk_5ZqFnq_KRZySbxJcPi7k5_nh47GrKuMy3" 
                    alt="Marcus Chen - Chef de Cuisine" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" 
                  />
                </div>
                <h3 className="text-2xl font-serif font-medium text-[#e5e2e3] mb-1">Marcus Chen</h3>
                <p className="text-[#84cc16] text-sm font-bold uppercase tracking-widest mb-3">Chef de Cuisine</p>
                <p className="text-[#d0c5af] text-sm leading-relaxed">The master of the pass. Marcus ensures flawless execution and leads our rigorous seasonal menu development.</p>
              </div>
            </div>
          </section>

          {/* Journey Timeline */}
          <section className="py-24 bg-[#0e0e0f] border-y border-[#4d4635]/30">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
              <h2 className="text-4xl font-serif font-medium text-center text-[#e5e2e3] mb-16">The Lumière Journey</h2>
              
              <div className="relative border-l-2 border-[#84cc16]/30 ml-4 md:ml-1/2 space-y-16 py-8">
                {/* Milestone 1 */}
                <div className="relative pl-10 md:pl-12">
                  <div className="absolute w-4 h-4 rounded-full bg-[#84cc16] shadow-[0_0_15px_rgba(132,204,22,0.6)] -left-2.25 top-1.5"></div>
                  <h3 className="text-[#84cc16] font-bold text-lg mb-2">2018</h3>
                  <h4 className="text-2xl font-serif font-medium text-[#e5e2e3] mb-3">The Inception</h4>
                  <p className="text-[#d0c5af]">Lumière opens its doors as a humble 12-seat tasting counter in the historic district, focusing entirely on fire-cooked heritage ingredients.</p>
                </div>
                {/* Milestone 2 */}
                <div className="relative pl-10 md:pl-12">
                  <div className="absolute w-4 h-4 rounded-full bg-[#131314] border-2 border-[#84cc16] -left-2.25 top-1.5"></div>
                  <h3 className="text-[#84cc16] font-bold text-lg mb-2">2020</h3>
                  <h4 className="text-2xl font-serif font-medium text-[#e5e2e3] mb-3">First Michelin Star</h4>
                  <p className="text-[#d0c5af]">Recognized for our uncompromising commitment to excellence, Lumière receives its first Michelin Star, putting us on the global culinary map.</p>
                </div>
                {/* Milestone 3 */}
                <div className="relative pl-10 md:pl-12">
                  <div className="absolute w-4 h-4 rounded-full bg-[#131314] border-2 border-[#84cc16] -left-2.25 top-1.5"></div>
                  <h3 className="text-[#84cc16] font-bold text-lg mb-2">2022</h3>
                  <h4 className="text-2xl font-serif font-medium text-[#e5e2e3] mb-3">The Expansion</h4>
                  <p className="text-[#d0c5af]">Relocated to our current flagship location, introducing a full dining room, an immersive wine cellar, and a dedicated research kitchen.</p>
                </div>
                {/* Milestone 4 */}
                <div className="relative pl-10 md:pl-12">
                  <div className="absolute w-4 h-4 rounded-full bg-[#131314] border-2 border-[#84cc16] -left-2.25 top-1.5"></div>
                  <h3 className="text-[#84cc16] font-bold text-lg mb-2">2024</h3>
                  <h4 className="text-2xl font-serif font-medium text-[#e5e2e3] mb-3">Digital Elevation</h4>
                  <p className="text-[#d0c5af]">Launch of the Lumière Delivery Experience, bringing Michelin-quality plating and temperature-controlled artistry directly to patrons' homes.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Awards Section */}
          <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
            <h4 className="text-[#84cc16] text-xs font-bold uppercase tracking-[0.3em] mb-12">Accolades & Recognition</h4>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-5xl text-[#d4af37] mb-4">stars</span>
                <p className="font-serif text-lg text-[#e5e2e3]">Two Michelin Stars</p>
                <p className="text-xs text-[#d0c5af] mt-1">2020 - 2024</p>
              </div>
              <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-5xl text-[#d4af37] mb-4">restaurant</span>
                <p className="font-serif text-lg text-[#e5e2e3]">James Beard Award</p>
                <p className="text-xs text-[#d0c5af] mt-1">Best Chef 2022</p>
              </div>
              <div className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-5xl text-[#d4af37] mb-4">diamond</span>
                <p className="font-serif text-lg text-[#e5e2e3]">AAA Five Diamond</p>
                <p className="text-xs text-[#d0c5af] mt-1">2023</p>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="py-24 bg-[#1c1b1c]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-medium text-[#e5e2e3]">Visual Experience</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
                {/* Large Main Feature */}
                <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden group relative border border-white/5">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHZO_WKdZcx0olVbciE-BJuYeef68QWTnZ6onowS2IneQ43BS6PjRHWtHsZpBi4OWBcIkRzP2PDYX02mZrHpS5L54bgTQyBad30NYsAG4X3X5i0nsxlrLi4288BnlXeIFd1j0LrB7h7vLy9wVQ92GXI5RRXL5Pi7vk1dJ7DIXZWrScP83IaLEyeyhzwOCXNilwMhMY-g3hl5q-4vRIjheVb9I0qdOzsmyFJKcr42YUfQqLai7gvc8ZD6yOAOeohoMgczVhH5PUmcII" 
                    alt="Truffle Wagyu Ribeye" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                {/* Small Gallery Images */}
                <div className="rounded-2xl overflow-hidden group relative border border-white/5">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuz6wdPPbY66BKgjdYEJZGSYHeOW3HpLe93U1PQP_f358aQxC6RCyRqh0OZxaC4YSh78C5Hjk83WpcOu_3olhf4O7x2j4KPD4Z7yVjLfqn2tERfHHImbVzHoCLMJdDEgkDVbTtN8VL7qWrm1UkNQrOthtONgHjuMsfet6k69Qh8mvSUCqNwcMLjzSc5nHrFq0UBcxz8r07LzYhMvVZFY1i1nSn94LHyNkmV_BDHVKilxG96AtM4I_tQzQ53dQ5EChuvN-vZX2a8Zym" 
                    alt="Chocolate Delice" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                </div>
                <div className="rounded-2xl overflow-hidden group relative border border-white/5">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMHYZBxDd3RoHejHlrOqeUnbInIHS-1VvB3PvMuaWqHHe6ZKk5lhvuZhWjulI9jj7-oufm0Dww-PX5M7cYwwDCQqS-GxoGTrdbVurcrh0AJEj80x2HYRwhznbUulR2dX7pDZo0bvKrjzi4MQZVpxvbsiJclQdvJ9PVR0OPKlZjrCI5dBoQIKURu4EvF00fbiVCdh7qa2MK9K8nhx46IXerqLB9lCuOBMQwMDhnZtNqgABb6hlqciZh8B8LoZn05t_l_AUMge8rRpLo" 
                    alt="Imperial Omakase" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                </div>
                {/* Bottom Wide Feature */}
                <div className="col-span-2 rounded-2xl overflow-hidden group relative border border-white/5">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbN92NWQVAYpDSs4qWUuYyOatYRshmiXdXlq5KbRWAULxsKGcrym70Rlk-1fzJzD3WiXWfFnin1zCOaGxR_wSD5TeJLScpP156BX4gYBlv5ZfGlvqBNksDsYqQwkiWnlsDt6DNIiy-wOfx822R7EiJL-0o9ps-oHFR5SoxpJtWVlFD5AudYJPDJFvthAR9pSrtBDLE8k_3rsUtv8-qIc7BgP6dSvqAD-WZo3c0tflRR_vY4jajbew0In_kv8f8-6W_UOkyYvoKVjtN" 
                    alt="Steakhouse Dinner Spread" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}