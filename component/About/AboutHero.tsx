import React from 'react'

const AboutHero = () => {
    return (
        <>
            <section className="relative py-50 flex flex-col justify-center items-center text-center border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7uJfCyuWZZ-oWNcOyjyrWGsmrqqvfmc2Dhq4oOVG2POP-f6g8dO7xJGJ7hGrLtM4RmG70I1FMI9QiRXBh-yE6IuWEqTXHXLS0NRlK-QqkO1KfQpBmDnztMdS_wZ1Xj1ZMpKr3FIoxXPZxxZzcp0RAQrZWpvx8KJBFB4IjHqlzSeQmYgGJq691fvLQWdoDxg61A11CVdXFE6GlK1qLLLIDFZ_fdYk_XGuGr6IOtRH0Sm4QoIFc7tz8bEvrv0kmfDE737Ayp62SWyXd"
                        alt="Lumiere Banner Background"
                        className="w-full h-full object-cover opacity-60 scale-105 animate-pulse"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent"></div>
                </div>

                <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto w-full">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#84cc16]/30 bg-[#84cc16]/10 backdrop-blur-md">
                        <span className="text-[#84cc16] text-xs font-bold uppercase tracking-[0.25em]">Discover Our Essence</span>
                    </div>
                    <h1 className="text-3xl md:text-7xl lg:text-8xl font-['Playfair_Display',serif] font-bold mb-8 leading-[1.1] bg-linear-to-r from-white to-[#d0c5af] bg-clip-text text-transparent drop-shadow-2xl">
                        A <span className='text-[#84cc16]'> Symphony </span> of <br className="hidden md:block" /> Light & Flavor
                    </h1>
                    <p className="max-w-2xl text-[#d0c5af] text-md md:text-xl font-light leading-relaxed mx-auto">
                        <span className="font-['Playfair_Display',serif] text-[#84cc16] text-[24px]">Lumière </span> was born from a singular vision: to <span className="font-['Playfair_Display',serif] text-[#84cc16] text-[24px]"> illuminate </span> the finest ingredients through <span className="font-['Playfair_Display',serif] text-[#84cc16] text-[24px]"> masterful technique</span>, creating an unforgettable sensory journey.
                    </p>
                </div>
            </section>
        </>
    )
}

export default AboutHero