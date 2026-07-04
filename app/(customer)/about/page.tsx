import Navbar from '@/component/Home/Navbar';
import Footer from '@/component/Home/Footer';
import bannerImg from '@/assets/images/about/banner.png';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-dark-bg text-white min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Banner Section */}
        <section className="relative pt-48 pb-32 flex flex-col items-center text-center border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src={bannerImg} 
              alt="Lumiere Banner Background" 
              className="w-full h-full object-cover opacity-90 scale-105" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-dark-bg via-dark-bg/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
            <h4 className="text-primary-500 text-xs font-bold uppercase tracking-[0.3em] mb-6 drop-shadow-md">Discover Our Essence</h4>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-white drop-shadow-xl">
              A Symphony of <br className="hidden md:block"/> Light & Flavor
            </h1>
            <p className="max-w-2xl text-gray-300 text-lg leading-relaxed mx-auto">
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
            <div className="absolute inset-0 bg-linear-to-t from-dark-bg via-transparent to-transparent opacity-80"></div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-serif font-medium mb-4 text-white">Our Story</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Founded in 2018 in the heart of the culinary district, Lumière started as an intimate 12-seat chef's counter. Our founders, driven by a relentless pursuit of perfection, sought to strip away the pretense of fine dining while elevating the artistry of the plate.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Today, Lumière stands as a beacon of modern gastronomy, blending heritage recipes with avant-garde execution. Every dish tells a story of local terroir and global inspiration.
              </p>
            </div>
            
            <div className="bg-dark-surface border border-white/5 p-8 rounded-2xl border-l-4 border-l-primary-500">
              <h3 className="text-xl font-serif font-medium mb-3 text-white">Our Mission</h3>
              <p className="text-gray-300 italic">
                "To curate profound dining experiences that honor the earth's bounty, champion culinary innovation, and leave a luminous, lasting memory for every guest who walks through our doors."
              </p>
            </div>
          </div>
        </section>

        {/* Brand Values */}
        <section className="py-24 bg-dark-surface border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-medium text-white">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-dark-bg border border-white/5 p-8 rounded-2xl text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl text-primary-500 mb-6">psychiatry</span>
                <h4 className="text-xl font-serif font-medium mb-3 text-white">Sustainable Sourcing</h4>
                <p className="text-gray-400 text-sm leading-relaxed">We partner exclusively with ethical fisheries, regenerative farms, and local foragers to ensure every ingredient honors the ecosystem.</p>
              </div>
              <div className="bg-dark-bg border border-white/5 p-8 rounded-2xl text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl text-primary-500 mb-6">palette</span>
                <h4 className="text-xl font-serif font-medium mb-3 text-white">Artistic Precision</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Cooking is our canvas. We approach every plating with meticulous attention to color, texture, and architectural balance.</p>
              </div>
              <div className="bg-dark-bg border border-white/5 p-8 rounded-2xl text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl text-primary-500 mb-6">volunteer_activism</span>
                <h4 className="text-xl font-serif font-medium mb-3 text-white">Unrivaled Hospitality</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Service should be invisible yet omnipresent. We strive to anticipate needs and craft an atmosphere of profound warmth and luxury.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}