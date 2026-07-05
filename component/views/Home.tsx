import Categories from '@/component/Home/Categories';
import FeaturedDishes from '@/component/Home/FeaturedDishes';
import Footer from '@/component/Home/Footer';
import HeroSection from '@/component/Home/Hero';
import UserNavbar from '@/component/layout/UserNavbar';
import PromoBanner from '@/component/Home/Promo';
import Stats from '@/component/Home/Stats';

export default function LumiereDining({ dishes = [], categories = [] }: { dishes?: any[], categories?: any[] }) {
  return (
    <>
      <UserNavbar />
      <HeroSection />
      <FeaturedDishes dishes={dishes} />
      <Categories categories={categories} />
      <PromoBanner />
      <Stats />
      <Footer />
    </>
  );
}
