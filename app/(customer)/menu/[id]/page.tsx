'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

export default function FoodDetail() {
  const { id }: any = useParams();
  const router = useRouter();
  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state: { addItem: any; }) => state.addItem);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchFoodAndReviews = async () => {
      try {
        const [foodRes, reviewsRes] = await Promise.all([
          axios.get(`/api/menu/${id}`),
          axios.get(`/api/reviews?foodId=${id}`)
        ]);
        if (foodRes.data.success) {
          setFood(foodRes.data.food);
        }
        if (reviewsRes.data.success) {
          setReviews(reviewsRes.data.reviews);
        }
      } catch (error) {
        console.error("Error fetching food/reviews:", error);
      } finally {
        setLoading(false);
        setLoadingReviews(false);
      }
    };
    fetchFoodAndReviews();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-dark-bg flex justify-center items-center text-primary-500">Loading...</div>;
  if (!food) return <div className="min-h-screen bg-dark-bg flex flex-col justify-center items-center text-white">Food not found <button onClick={() => router.push('/menu')} className="mt-4 text-primary-400">Back to menu</button></div>;

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Top Nav */}
      <nav className="w-full z-50 bg-dark-bg border-b border-primary-950 py-4">
        <div className="flex justify-between items-center px-5 md:px-20 w-full max-w-7xl mx-auto">
          <div className="font-serif text-2xl font-bold text-primary-400 cursor-pointer" onClick={() => router.push('/')}>
            Lumière Dining
          </div>
          <button onClick={() => router.push('/menu')} className="text-gray-400 hover:text-white transition-colors duration-300">← Back to Menu</button>
        </div>
      </nav>

      <main className="px-5 md:px-20 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 relative rounded-3xl overflow-hidden border border-primary-900 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
          >
            <img src={food.primaryImage || "/api/placeholder/800/600"} alt={food.name} className="w-full h-auto object-cover aspect-square" />
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 flex flex-col justify-center"
          >
            <h4 className="text-primary-400 text-[14px] font-bold tracking-widest uppercase mb-4">{food.category?.name || 'Signature'}</h4>
            <h1 className="font-serif text-[42px] font-bold text-white mb-6 leading-tight">{food.name}</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {food.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {food.attributes?.map((attr: string, i: number) => (
                <span key={i} className="bg-dark-surface border border-primary-800 text-primary-200 text-[12px] font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                  {attr}
                </span>
              ))}
            </div>

              <div className="flex items-center gap-8 mt-auto border-t border-primary-950 pt-8">
                <span className="font-serif text-4xl text-primary-400 font-bold">${food.price}</span>
                <motion.button 
                  onClick={() => addItem({ id: food._id, name: food.name, price: food.price, image: food.primaryImage, quantity: 1 })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-500 text-dark-bg px-8 py-4 rounded-xl font-bold hover:bg-primary-400 transition-colors grow text-center shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl text-white">Customer Reviews</h2>
          </div>
          <div className="bg-dark-surface p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-medium mb-4 text-white">Write a Review</h3>
            <form onSubmit={async (e: any) => {
              e.preventDefault();
              const form = e.target;
              try {
                const res = await axios.post('/api/reviews', {
                  food: food._id,
                  customerName: form.customerName.value,
                  rating: form.rating.value,
                  comment: form.comment.value
                });
                if (res.data.success) {
                  alert('Review submitted successfully!');
                  form.reset();
                  window.location.reload();
                }
              } catch (err) {
                alert('Failed to submit review');
              }
            }} className="space-y-4 mb-12 border-b border-white/10 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Name</label>
                  <input required name="customerName" className="w-full bg-dark-bg border border-white/10 rounded-xl p-3 text-white focus:border-primary-500 outline-none" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Rating (1-5)</label>
                  <input required type="number" min="1" max="5" name="rating" className="w-full bg-dark-bg border border-white/10 rounded-xl p-3 text-white focus:border-primary-500 outline-none" placeholder="5" defaultValue={5} />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">Comment</label>
                <textarea required name="comment" className="w-full bg-dark-bg border border-white/10 rounded-xl p-3 text-white focus:border-primary-500 outline-none min-h-[100px]" placeholder="Tell us what you thought..."></textarea>
              </div>
              <button type="submit" className="bg-primary-500 text-dark-bg font-bold py-3 px-8 rounded-lg uppercase tracking-widest text-sm hover:brightness-110">Post Review</button>
            </form>

            <div className="space-y-8">
              <h3 className="text-xl font-medium text-white">Recent Reviews</h3>
              {loadingReviews ? (
                <p className="text-gray-500">Loading reviews...</p>
              ) : reviews.length === 0 ? (
                <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
              ) : (
                reviews.map((review: any) => (
                  <div key={review._id} className="border border-white/5 p-6 rounded-2xl bg-dark-bg/50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-white">{review.customerName}</h4>
                      <div className="flex items-center text-primary-400">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-sm">star</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400">{review.comment}</p>
                    <p className="text-xs text-gray-600 mt-4">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
