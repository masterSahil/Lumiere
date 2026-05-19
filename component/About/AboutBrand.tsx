import React from 'react'
import { MdAllInclusive } from 'react-icons/md'

const AboutBrand = () => {
    return (
        <>
            <section className="py-32 relative bg-[#0a0a0c] border-y border-white/5 overflow-hidden">
                {/* Ambient Background Blur */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-250 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#84cc16]/5 via-transparent to-transparent pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                        
                        {/* Left Column: Sticky Header */}
                        <div className="lg:col-span-5 relative">
                            <div className="lg:sticky lg:top-40 max-w-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-px bg-[#84cc16]"></div>
                                    <span className="text-[#84cc16] text-xs font-bold uppercase tracking-[0.3em]">The Ideology</span>
                                </div>
                                <h2 className="text-5xl lg:text-7xl font-['Playfair_Display',serif] font-medium leading-[1.1] bg-linear-to-br from-white via-[#e5e2e3] to-[#84cc16]/50 bg-clip-text text-transparent mb-8">
                                    Beyond the <br/> Plate.
                                </h2>
                                <p className="text-[#d0c5af] text-lg font-light leading-relaxed">
                                    Lumière is not merely a restaurant; it is a <span className="font-['Playfair_Display',serif] text-[#84cc16] text-[22px] italic">living philosophy</span>. We challenge the boundaries of fine dining by stripping away pretense and focusing entirely on the profound connection between earth, art, and emotion.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Staggered Editorial Blocks */}
                        <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12 lg:pt-24">

                            {/* Block */}
                            <div className="relative p-8 md:p-12 bg-white/2 border border-white/5 rounded-3xl overflow-hidden group hover:bg-white/4 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(132,204,22,0.1)]">
                                <div className="absolute -right-8 -top-12 text-[180px] font-['Playfair_Display',serif] font-bold text-white/2 group-hover:text-[#84cc16]/80 transition-colors duration-700 pointer-events-none select-none leading-none">
                                    100%
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-[#84cc16]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-[#84cc16]/20">
                                        <MdAllInclusive className="text-3xl text-[#84cc16]" />
                                    </div>
                                    <h3 className="text-3xl font-['Playfair_Display',serif] text-white mb-4">Intuitive Elegance</h3>
                                    <p className="text-[#d0c5af] font-light leading-relaxed text-lg">
                                        True luxury is feeling understood before a word is spoken. Our service is a silent choreography, designed to envelop you in an atmosphere of <span className="text-white border-b border-[#84cc16]/40 pb-0.5">profound, unpretentious warmth</span>.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutBrand