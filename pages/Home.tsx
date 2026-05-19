import Categories from '@/component/Home/Categories';
import FeaturedDishes from '@/component/Home/FeaturedDishes';
import Footer from '@/component/Home/Footer';
import HeroSection from '@/component/Home/Hero';
import Navbar from '@/component/Home/Navbar';
import PromoBanner from '@/component/Home/Promo';
import Stats from '@/component/Home/Stats';

export default function LumiereDining() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedDishes />
      <Categories />
      <PromoBanner />
      <Stats />
      <Footer />
    </>
  );
}