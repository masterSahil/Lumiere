import Link from 'next/link';
import { MdEmail, MdPublic } from 'react-icons/md';
import mapImage from "@/assets/images/footer/map.png"
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-5 md:px-20 border-t border-white/5 bg-[#0e0e0f]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-360 mx-auto mb-12">
        
        {/* Brand & Socials */}
        <div className="space-y-6">
          <div className="font-serif text-[32px] leading-10 font-medium text-[#72df41]">
            Lumière Dining
          </div>
          <p className="text-[#d0c5af] font-sans text-[14px] leading-5 tracking-wider font-semibold">
            Setting the global standard for elite food delivery experiences since 2024.
          </p>
          <div className="flex gap-4">
            <Link href="/" aria-label="Social Media or Location"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:text-[#7ae749] transition-all">
              <MdPublic />
            </Link>
            <Link href="mailto:contact@lumieredining.com" 
              aria-label="Email Us" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:text-[#7ae749] transition-all">
              <MdEmail />
            </Link>
          </div>
        </div>
        
        {/* Experience Links */}
        <div className="space-y-4">
          <h5 className="text-white font-sans text-[14px] leading-5 tracking-wider font-semibold uppercase">Experience</h5>
          <ul className="space-y-2">
            <li>
              <Link href="/menu" className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/reservations" className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold">
                Reservations
              </Link>
            </li>
            <li>
              <Link href="/gift-cards" className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold">
                Gift Cards
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Support Links */}
        <div className="space-y-4">
          <h5 className="text-white font-sans text-[14px] leading-5 tracking-wider font-semibold uppercase">Support</h5>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/sustainability" className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold">
                Sustainability
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[#d0c5af] hover:text-[#7ae749] transition-all font-sans text-[14px] leading-5 tracking-wider font-semibold">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Location Section */}
        <div className="space-y-4">
          <h5 className="text-white font-sans text-[14px] leading-5 tracking-wider font-semibold uppercase">Location</h5>
          <p className="text-[#d0c5af] font-sans text-[14px] leading-5 tracking-wider font-semibold">
            88 Golden Plaza, Mayfair<br />
            London, W1J 8AQ<br />
            United Kingdom
          </p>
          <div className="mt-4">
            <Image 
              src={mapImage}
              alt="Map detail of the London Mayfair district" 
              className="w-full h-32 object-cover rounded-lg opacity-60 grayscale hover:grayscale-0 transition-all duration-500" 
            />
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright Bar */}
      <div className="max-w-360 mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#d0c5af] font-sans text-[12px] leading-4 tracking-[0.03em] font-medium">
          © {new Date().getFullYear()} Lumière Dining. All Rights Reserved.
        </p>
        <div className="flex gap-8">
          <span className="text-[#d0c5af] font-sans text-[12px] leading-4 tracking-[0.03em] font-medium">Designed with Excellence</span>
          <span className="text-[#d0c5af] font-sans text-[12px] leading-4 tracking-[0.03em] font-medium">English (UK)</span>
        </div>
      </div>
    </footer>
  );
}