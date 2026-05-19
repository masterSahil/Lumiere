export default function PromoBanner() {
  return (
    <section className="py-24 px-5 md:px-20 bg-[#131314]">
      <div className="max-w-360 mx-auto relative glass-card p-12 md:p-20 overflow-hidden text-center gold-glow rounded-3xl">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
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
  );
}