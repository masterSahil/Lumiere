import { LuChefHat, LuTimer, LuGem } from 'react-icons/lu';

export default function Stats() {
  const stats = [
    { 
      icon: LuChefHat, 
      value: "50+", 
      title: "Master Chefs", 
      desc: "Award-winning artisans from around the globe crafting culinary perfection." 
    },
    { 
      icon: LuTimer, 
      value: "15m", 
      title: "Fast Delivery", 
      desc: "Precision-timed logistics ensuring your meal arrives at the peak of flavor." 
    },
    { 
      icon: LuGem, 
      value: "100%", 
      title: "Luxury Quality", 
      desc: "Every ingredient is sourced from sustainable, premium suppliers worldwide." 
    }
  ];

  return (
    <section className="py-24 px-5 md:px-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle background accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-[#7ae749]/20 to-transparent"></div>

      <div className="max-w-360 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="relative group p-8 md:p-10 rounded-3xl bg-white/2 border border-white/5 hover:bg-white/4 hover:border-[#7ae749]/20 transition-all duration-500 overflow-hidden text-center flex flex-col items-center backdrop-blur-sm"
            >
              {/* Background Watermark Icon */}
              <stat.icon className="absolute -bottom-8 -right-8 text-[120px] text-white/3 group-hover:text-[#7ae749]/80 group-hover:scale-110 transition-all duration-700 pointer-events-none rotate-12" />

              {/* Top Highlight Glow on Hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-[#7ae749] opacity-0 group-hover:opacity-100 group-hover:w-3/4 transition-all duration-500 shadow-[0_0_20px_rgba(122,231,73,0.8)]"></div>

              {/* Number/Value */}
              <div className="relative z-10 text-[#72df41] font-serif text-[64px] lg:text-[80px] leading-tight font-bold drop-shadow-[0_0_15px_rgba(114,223,65,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(114,223,65,0.4)] group-hover:-translate-y-2 transition-all duration-500">
                {stat.value}
              </div>

              {/* Title */}
              <h4 className="relative z-10 font-serif text-[24px] lg:text-[32px] leading-10 font-medium text-white mt-4 mb-4 group-hover:text-[#e5e2e3] transition-colors duration-300">
                {stat.title}
              </h4>

              {/* Description */}
              <p className="relative z-10 text-[#99907c] font-sans text-sm md:text-base leading-relaxed px-4 lg:px-8 group-hover:text-[#d0c5af] transition-colors duration-300">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}