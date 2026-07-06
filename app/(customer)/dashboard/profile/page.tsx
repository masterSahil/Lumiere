'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, User, Award, Star, Utensils, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [passport, setPassport] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/verify');
        if (data.success) {
          setUser(data.data);
          setFormData({
            username: data.data.username || '',
            phone: data.data.phone || '',
          });
          if (data.data.avatar) {
            setImagePreview(data.data.avatar);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    const fetchPassport = async () => {
      try {
        const { data } = await axios.get('/api/user/passport');
        if (data.success) {
          setPassport(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch passport", err);
      }
    };

    fetchUser();
    fetchPassport();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    try {
      let avatarUrl = user.avatar;

      if (imageFile) {
        setUploadingImage(true);
        const imgData = new FormData();
        imgData.append('file', imageFile);
        const uploadRes = await axios.post('/api/upload', imgData);
        
        if (uploadRes.data.success) {
          avatarUrl = uploadRes.data.url;
          // Delete old avatar if it exists
          if (user.avatar) {
            try {
              await axios.delete('/api/upload', { data: { url: user.avatar } });
            } catch (e) {
              console.error("Failed to delete old avatar", e);
            }
          }
        } else {
          throw new Error('Failed to upload image');
        }
        setUploadingImage(false);
      }

      const res = await axios.put(`/api/users/${user._id}`, { ...formData, avatar: avatarUrl });
      if (res.data.success) {
        toast.success('Profile updated successfully!');
        setUser(res.data.user);
        window.location.reload(); // To update the layout profile avatar
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Failed to update profile');
      setUploadingImage(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 max-w-5xl">
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-serif text-[48px] leading-tight font-bold mb-2 text-white">Dining Passport</h1>
            <p className="text-gray-400">Your personalized culinary journey at Lumière.</p>
          </div>
        </div>

        {/* Passport Stats Section */}
        {passport && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Loyalty Card */}
            <div className="lg:col-span-1 bg-dark-surface p-8 rounded-[20px] border border-primary-500/20 relative overflow-hidden flex flex-col items-center text-center justify-center">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Award className="w-32 h-32 text-primary-400" />
              </div>
              
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#9EE939" strokeWidth="8" 
                    strokeDasharray={`${passport.progress * 2.82} 282`} 
                    strokeLinecap="round" 
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <Star className="w-6 h-6 text-primary-400 mb-1" />
                  <span className="text-xl font-bold text-white">{passport.progress}%</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-serif text-white mb-1">{passport.loyaltyLevel}</h3>
              <p className="text-sm text-gray-400">
                ${(passport.nextTier - passport.lifetimeSpending).toFixed(0)} away from next tier
              </p>
            </div>

            {/* Stats & Favorites */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Stats Block */}
              <div className="bg-dark-surface p-8 rounded-[20px] border border-white/5 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Lifetime Spend</p>
                    <p className="text-3xl font-serif text-white">${passport.lifetimeSpending.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Total Visits</p>
                    <p className="text-3xl font-serif text-white">{passport.totalVisits}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Member Since</p>
                    <div className="flex items-center gap-2 text-primary-400">
                      <Calendar className="w-4 h-4" />
                      <span className="font-bold">{new Date(passport.memberSince).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Favorites Block */}
              <div className="bg-dark-surface p-8 rounded-[20px] border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Utensils className="w-4 h-4 text-primary-400" />
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Most Ordered</p>
                </div>
                <div className="space-y-4">
                  {passport.favoriteDishes.length > 0 ? (
                    passport.favoriteDishes.map((dish: any, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-black/50 overflow-hidden shrink-0 border border-white/10">
                          {dish.image && <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">{dish.name}</h4>
                          <p className="text-xs text-primary-400">Ordered {dish.count}x</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No order history yet.</p>
                  )}
                </div>
              </div>
            </div>
            
          </div>
        )}
      </section>
    </div>
  );
}
