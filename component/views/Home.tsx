import Categories from '@/component/Home/Categories';
import FeaturedDishes from '@/component/Home/FeaturedDishes';
import Footer from '@/component/Home/Footer';
import HeroSection from '@/component/Home/Hero';
import UserNavbar from '@/component/layout/UserNavbar';
import PromoBanner from '@/component/Home/Promo';
import Stats from '@/component/Home/Stats';
import LiveStatusWidget from '@/component/LiveStatusWidget';

export default function LumiereDining({ dishes = [], categories = [] }: { dishes?: any[], categories?: any[] }) {
  return (
    <>
      <UserNavbar />
      <HeroSection />
      <div className="relative z-20 px-8 -mt-16 mb-24">
        <LiveStatusWidget />
      </div>
      <FeaturedDishes dishes={dishes} />
      <Categories categories={categories} />
      <PromoBanner />
      <Stats />
      <Footer />
    </>
  );
}
