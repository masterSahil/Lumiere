import Image from 'next/image';
import HeroImg from '@/assets/images/home/main.png';

export default function HeroSection() {
    return (
        <div className='bg-[#131314]'>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src={HeroImg} alt="A high-end cinematic close-up of a gourmet dish"
                        className="w-full h-full object-cover opacity-60 scale-105" />
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
                    </div>
                </div>
            </section>
        </div>
    );
}