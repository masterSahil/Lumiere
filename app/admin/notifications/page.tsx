'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Loader from '@/app/loading';
import { Plus, Trash2, Bell } from 'lucide-react';

export default function NotificationsManagement() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newNotification, setNewNotification] = useState({ title: '', message: '', type: 'system', isGlobal: true });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get('/api/notifications');
      if (data.success) {
        setNotifications(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notification?')) return;
    try {
      const { data } = await axios.delete(`/api/notifications/${id}`);
      if (data.success) {
        toast.success("Notification deleted");
        setNotifications(notifications.filter(n => n._id !== id));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleCreate = async () => {
    if (!newNotification.title || !newNotification.message) return toast.error("Title and message are required");
    setSaving(true);
    try {
      const { data } = await axios.post('/api/notifications', newNotification);
      if (data.success) {
        toast.success("Notification sent!");
        setNotifications([data.data, ...notifications]);
        setIsAdding(false);
        setNewNotification({ title: '', message: '', type: 'system', isGlobal: true });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send notification");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 shrink-0">
        <div>
          <h1 className="font-serif text-[42px] leading-tight font-semibold text-white mb-2">Notifications</h1>
          <p className="text-gray-400 font-sans max-w-xl text-[15px] leading-relaxed">
            Manage and send global notifications to your customers.
          </p>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-primary-400 text-[#0d1700] px-6 py-3 rounded-full font-bold tracking-wider uppercase text-[13px] hover:bg-primary-300 transition-colors shadow-[0_0_20px_rgba(158,233,57,0.3)]">
          <Plus className="w-4 h-4" /> Send Notification
        </button>
      </div>

      <div className="bg-dark-surface rounded-2xl border border-white/5 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-white/5 text-white uppercase font-semibold text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8"><Loader /></td></tr>
            ) : notifications.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8">No notifications found.</td></tr>
            ) : (
              notifications.map((notification) => (
                <tr key={notification._id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{notification.title}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{notification.message}</td>
                  <td className="px-6 py-4 uppercase text-xs">{notification.type}</td>
                  <td className="px-6 py-4">{new Date(notification.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(notification._id)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white">✕</button>
            <h2 className="text-2xl font-serif text-white mb-6">Send Notification</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Title</label>
                <input type="text" value={newNotification.title} onChange={e => setNewNotification({...newNotification, title: e.target.value})} className="w-full bg-dark-bg border border-white/10 text-white rounded-md px-4 py-3 outline-none mt-2" placeholder="Notification Title" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Message</label>
                <textarea value={newNotification.message} onChange={e => setNewNotification({...newNotification, message: e.target.value})} className="w-full bg-dark-bg border border-white/10 text-white rounded-md px-4 py-3 outline-none mt-2 resize-none" rows={3} placeholder="Message body..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Type</label>
                <select value={newNotification.type} onChange={e => setNewNotification({...newNotification, type: e.target.value})} className="w-full bg-dark-bg border border-white/10 text-white rounded-md px-4 py-3 outline-none mt-2">
                  <option value="system">System</option>
                  <option value="promotional">Promotional</option>
                  <option value="offer">Offer</option>
                </select>
              </div>
              
              <button onClick={handleCreate} disabled={saving} className="w-full bg-primary-500 text-dark-bg py-3.5 rounded-lg font-bold mt-4">
                {saving ? 'Sending...' : 'Send Notification'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
