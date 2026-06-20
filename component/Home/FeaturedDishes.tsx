import { LuChevronLeft, LuChevronRight, LuPlus } from 'react-icons/lu';

const DISHES = [
  {
    id: 1,
    name: "Truffle Wagyu Ribeye",
    desc: "Grade A5 wagyu with fresh Périgord truffles and roasted root vegetables.",
    price: "$124.00",
    tag: "Premium",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHZO_WKdZcx0olVbciE-BJuYeef68QWTnZ6onowS2IneQ43BS6PjRHWtHsZpBi4OWBcIkRzP2PDYX02mZrHpS5L54bgTQyBad30NYsAG4X3X5i0nsxlrLi4288BnlXeIFd1j0LrB7h7vLy9wVQ92GXI5RRXL5Pi7vk1dJ7DIXZWrScP83IaLEyeyhzwOCXNilwMhMY-g3hl5q-4vRIjheVb9I0qdOzsmyFJKcr42YUfQqLai7gvc8ZD6yOAOeohoMgczVhH5PUmcII"
  },
  {
    id: 2,
    name: "Imperial Omakase Set",
    desc: "Hand-selected bluefin tuna, uni, and premium sashimi selections.",
    price: "$158.00",
    tag: "Seasonal",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMHYZBxDd3RoHejHlrOqeUnbInIHS-1VvB3PvMuaWqHHe6ZKk5lhvuZhWjulI9jj7-oufm0Dww-PX5M7cYwwDCQqS-GxoGTrdbVurcrh0AJEj80x2HYRwhznbUulR2dX7pDZo0bvKrjzi4MQZVpxvbsiJclQdvJ9PVR0OPKlZjrCI5dBoQIKURu4EvF00fbiVCdh7qa2MK9K8nhx46IXerqLB9lCuOBMQwMDhnZtNqgABb6hlqciZh8B8LoZn05t_l_AUMge8rRpLo"
  },
  {
    id: 3,
    name: "Saffron Gold Taglioni",
    desc: "Handmade pasta tossed in 24k saffron cream and seasonal mushrooms.",
    price: "$89.00",
    tag: "Signature",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0LZ2lWbMTD5wkzQgsZD_qHr849boJutbhGXgWcxRUnC9uaWlAiyi-Xdk7Ei0gxSxA4C4BEKt-LmTWKTSukISSWA17jSA4RJpl3M62Aeo-buwQLUUo30A9EoU4TsH4cp44IDu8NK9dPkoQmhDGGpaXhZUq9nsAuGnFlcfo8BJ7QICcPNsW_iCmQ2AT4Wby_3iBaY6hOZ9ZjCZGyGHpHKeQADZrdXG1FiRfsgQJwHakNMWdowRtdYuIW2j9lJNwkO1CQx-FX0SYI4R1"
  }
];

export default function FeaturedDishes() {
  return (
    <section className="py-24 px-5 md:px-20 bg-[#131314]">
      <div className="max-w-360 mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-[32px] md:text-[48px] leading-10 md:leading-14 font-semibold text-white">Curated Selection</h2>
            <p className="text-[#72df41] font-sans text-[14px] leading-5 tracking-wider font-semibold mt-2 uppercase">Chef's Signature Creations</p>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all">
              <LuChevronLeft className="text-2xl" />
            </button>
            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all">
              <LuChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
        
        {/* Slider */}
        <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar snap-x">
          {DISHES.map((dish) => (
            <div key={dish.id} className="min-w-[320px] md:min-w-100 glass-card p-6 snap-start group cursor-pointer">
              <div className="relative overflow-hidden aspect-4/5 mb-6 rounded-lg">
                <img alt={dish.name} src={dish.img} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute top-4 right-4 bg-[#131314]/60 backdrop-blur-md px-3 py-1 rounded-full text-[#72df41] font-sans text-[12px] leading-4 tracking-[0.03em] font-medium">
                  {dish.tag}
                </div>
              </div>
              <h3 className="font-serif text-[32px] leading-10 font-medium text-white mb-2">{dish.name}</h3>
              <p className="text-[#d0c5af] font-sans text-base leading-6 line-clamp-2 mb-6">{dish.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#72df41] font-serif text-[32px] leading-10 font-medium">{dish.price}</span>
                <button className="bg-[#7ae749] text-[#103900] w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <LuPlus className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}