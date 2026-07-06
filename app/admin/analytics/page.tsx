'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('/api/admin/analytics');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err: any) {
        if (err.response?.status === 403) {
          toast.error("Super Admin Access Required");
          router.push('/admin/dashboard');
        } else {
          toast.error("Failed to load analytics");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [router]);

  if (loading) return <div className="text-primary-400">Loading Business Intelligence...</div>;
  if (!data) return <div className="text-red-400">Analytics unavailable</div>;

  const maxRevenue = Math.max(...data.chartData.map((d: any) => d.revenue), 1); // Avoid division by zero

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-serif text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary-500" />
            Business Intelligence
          </h1>
          <p className="text-gray-400 text-sm mt-2 uppercase tracking-widest font-bold">Super Admin Exclusive</p>
        </div>
        <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors">
          Export Report (.CSV)
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-surface p-6 rounded-[20px] border border-white/5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-500/10 rounded-full blur-xl group-hover:bg-primary-500/20 transition-all"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
              <DollarSign className="w-5 h-5 text-primary-400" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-primary-400 bg-primary-500/10 px-2 py-1 rounded">
              <ArrowUpRight className="w-3 h-3" /> +12.5%
            </span>
          </div>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Total Revenue</p>
          <h3 className="text-3xl font-serif text-white">${data.totalRevenue.toFixed(2)}</h3>
        </div>

        <div className="bg-dark-surface p-6 rounded-[20px] border border-white/5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded">
              <ArrowDownRight className="w-3 h-3" /> -2.1%
            </span>
          </div>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Today's Revenue</p>
          <h3 className="text-3xl font-serif text-white">${data.todayRevenue.toFixed(2)}</h3>
        </div>

        <div className="bg-dark-surface p-6 rounded-[20px] border border-white/5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Package className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Total Orders</p>
          <h3 className="text-3xl font-serif text-white">{data.totalOrders}</h3>
        </div>

        <div className="bg-dark-surface p-6 rounded-[20px] border border-white/5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/20 transition-all"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Users className="w-5 h-5 text-orange-400" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-primary-400 bg-primary-500/10 px-2 py-1 rounded">
              <ArrowUpRight className="w-3 h-3" /> +5.4%
            </span>
          </div>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Active Customers</p>
          <h3 className="text-3xl font-serif text-white">{data.totalUsers}</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-surface p-8 rounded-[20px] border border-white/5">
          <h3 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-8">7-Day Revenue Trend</h3>
          
          {/* Custom CSS Bar Chart */}
          <div className="h-64 flex items-end gap-2 md:gap-4 justify-between w-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-t border-b border-white/5">
              <div className="flex-1 h-px bg-white/10 mx-2"></div>
              <div className="flex-1 h-px bg-white/10 mx-2"></div>
              <div className="flex-1 h-px bg-white/10 mx-2"></div>
              <div className="flex-1 h-px bg-white/10 mx-2"></div>
            </div>

            {data.chartData.map((point: any, idx: number) => {
              const heightPercent = (point.revenue / maxRevenue) * 100;
              return (
                <div key={idx} className="relative flex flex-col items-center flex-1 h-full justify-end group z-10">
                  {/* Tooltip */}
                  <div className="absolute -top-10 bg-dark-bg border border-white/10 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    ${point.revenue.toFixed(2)}
                  </div>
                  
                  {/* Bar */}
                  <div 
                    className="w-full max-w-[40px] bg-linear-to-t from-primary-500/20 to-primary-500 rounded-t-sm transition-all duration-1000"
                    style={{ height: `${Math.max(heightPercent, 2)}%` }} // Give at least 2% height so 0 isn't invisible
                  ></div>
                  
                  {/* Label */}
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-4">
                    {point.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights / AI Summary (Mocked for premium feel) */}
        <div className="bg-dark-surface p-8 rounded-[20px] border border-white/5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-6">Lumière AI Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-primary-500/5 border border-primary-500/10 rounded-xl">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <strong className="text-white font-serif">Revenue Spike Detected:</strong> Fridays consistently generate 45% more revenue than the weekly average. Consider launching targeted promotions for Wednesday nights to smooth demand.
                </p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <strong className="text-white font-serif">Customer Retention:</strong> You have an exceptionally high retention rate. 32% of customers this month were returning diners.
                </p>
              </div>
            </div>
          </div>
          
          <button className="w-full py-3 mt-6 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-colors">
            Generate Full Report
          </button>
        </div>
      </div>
    </div>
  );
}
