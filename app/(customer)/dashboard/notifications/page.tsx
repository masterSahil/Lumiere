'use client'
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: false,
    reservations: true,
    newsletter: false
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-8">
          <h1 className="font-serif text-[48px] leading-tight font-semibold mb-2 text-white">Notifications</h1>
          <p className="text-gray-400">Manage how you receive updates and communications.</p>
        </div>

        <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-8 border-b border-white/10">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20 shrink-0">
                  <Bell className="text-primary-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-white mb-1">Order Updates</h3>
                  <p className="text-sm text-gray-400">Real-time status on your delivery and takeout orders.</p>
                </div>
              </div>
              <button 
                onClick={() => togglePreference('orderUpdates')}
                className={`w-14 h-8 rounded-full transition-colors relative flex items-center ${preferences.orderUpdates ? 'bg-primary-500' : 'bg-gray-700'}`}
              >
                <div className={`w-6 h-6 rounded-full bg-white absolute transition-transform ${preferences.orderUpdates ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </div>

          <div className="p-8 border-b border-white/10">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20 shrink-0">
                  <Mail className="text-primary-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-white mb-1">Reservation Reminders</h3>
                  <p className="text-sm text-gray-400">Receive reminders 24 hours before your scheduled dining experience.</p>
                </div>
              </div>
              <button 
                onClick={() => togglePreference('reservations')}
                className={`w-14 h-8 rounded-full transition-colors relative flex items-center ${preferences.reservations ? 'bg-primary-500' : 'bg-gray-700'}`}
              >
                <div className={`w-6 h-6 rounded-full bg-white absolute transition-transform ${preferences.reservations ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </div>

          <div className="p-8 border-b border-white/10">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20 shrink-0">
                  <MessageSquare className="text-primary-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-white mb-1">Promotional Offers</h3>
                  <p className="text-sm text-gray-400">Exclusive invites, seasonal menus, and special discounts.</p>
                </div>
              </div>
              <button 
                onClick={() => togglePreference('promotions')}
                className={`w-14 h-8 rounded-full transition-colors relative flex items-center ${preferences.promotions ? 'bg-primary-500' : 'bg-gray-700'}`}
              >
                <div className={`w-6 h-6 rounded-full bg-white absolute transition-transform ${preferences.promotions ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/20 shrink-0">
                  <Smartphone className="text-primary-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-white mb-1">SMS Notifications</h3>
                  <p className="text-sm text-gray-400">Receive quick text updates instead of emails for urgent notices.</p>
                </div>
              </div>
              <button 
                onClick={() => togglePreference('newsletter')}
                className={`w-14 h-8 rounded-full transition-colors relative flex items-center ${preferences.newsletter ? 'bg-primary-500' : 'bg-gray-700'}`}
              >
                <div className={`w-6 h-6 rounded-full bg-white absolute transition-transform ${preferences.newsletter ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
