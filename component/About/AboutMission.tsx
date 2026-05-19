import React from 'react'

const AboutMission = () => {
    return (
        <>
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative h-125 lg:h-162.5 w-full rounded-3xl overflow-hidden group shadow-2xl shadow-black/50 border border-white/10">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzGiD3zEp6PP5Lr3YA3g-YT2Cg4PH5UkF4zfFA4tREoEAVRjJafxRmAP2l5aIckKQmolYjq1LIU7kBpZ0BdaXpiab_MWRvM61meQYTD3cMYM8ZhjcVsbFHV_DzFmTjbZMefUPHC2cDq3rznAgNCszqhS4aBMGq-6kwdj2IZNOktl-qT9JXsp45HOZforDMbdHytcXtEcHsWQsUoxmQbO4m4EweXsU4bLL7em23Rg66T_HT7xfJFCqVZ7SCG3g8cJic8eR0_U2WDlSi"
                        alt="Our Culinary Story"
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-transparent to-transparent opacity-90"></div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#84cc16] opacity-50"></div>
                    <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#84cc16] opacity-50"></div>
                </div>

                <div className="space-y-10">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-medium bg-linear-to-r from-white to-[#d0c5af] bg-clip-text text-transparent">
                            Our <span className="text-[#84cc16]">Story</span>
                        </h2>
                        <div className="w-16 h-1 bg-[#84cc16] rounded-full"></div>
                        <p className="text-[#d0c5af] text-lg leading-relaxed font-light">
                            Founded in 2018 in the heart of the culinary district, <span className="font-['Playfair_Display',serif] text-[#84cc16] text-[22px]">Lumière</span> started as an intimate <span className="font-['Playfair_Display',serif] text-[#84cc16] text-[22px]">12-seat chef's counter</span>. Our founders, driven by a <span className="font-['Playfair_Display',serif] text-[#84cc16] text-[22px]">relentless pursuit</span> of perfection, sought to strip away the pretense of fine dining while elevating the artistry of the plate.
                        </p>
                        <p className="text-[#d0c5af] text-lg leading-relaxed font-light">
                            Today, Lumière stands as a beacon of <span className="font-['Playfair_Display',serif] text-[#84cc16] text-[22px]">modern gastronomy</span>, blending heritage recipes with <span className="font-['Playfair_Display',serif] text-[#84cc16] text-[22px]">avant-garde execution</span>. Every dish tells a story of local terroir and global inspiration.
                        </p>
                    </div>

                    <div className="bg-[linear-gradient(145deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_100%)] backdrop-blur-md border border-white/6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-400 ease-in-out hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] hover:border-[#84cc16]/40 hover:-translate-y-1.25 hover:shadow-[0_15px_40px_-5px_rgba(132,204,22,0.15)] p-10 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#84cc16]"></div>
                        <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-white/5 rotate-[-15deg] group-hover:text-[#84cc16]/10 transition-colors duration-500">format_quote</span>
                        <h3 className="text-2xl font-['Playfair_Display',serif] font-medium mb-4 text-white relative z-10">
                            Our <span className="text-[#84cc16]">Mission</span>
                        </h3>
                        <p className="text-[#d0c5af] italic text-lg leading-relaxed relative z-10 font-light">
                            "To curate <span className="font-['Playfair_Display',serif] text-[#84cc16] text-[22px] not-italic">profound</span> dining experiences that honor the earth's bounty, champion <span className="font-['Playfair_Display',serif] text-[#84cc16] text-[22px] not-italic">culinary innovation</span>, and leave a luminous, lasting memory for every guest who walks through our doors."
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutMission