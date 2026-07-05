'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Lock, Bell, Users, Camera, X, Check, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Profile State
  const [profileData, setProfileData] = useState({ username: '', email: '', phone: '' });
  const [savingProfile, setSavingProfile] = useState(false);

  // Security State
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [savingPassword, setSavingPassword] = useState(false);

  // Staff State
  const [staff, setStaff] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({ username: '', email: '', password: '', role: 'admin' });
  const [savingStaff, setSavingStaff] = useState(false);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/auth/verify');
      if (data.success) {
        setCurrentUser(data.data);
        setProfileData({
          username: data.data.username || '',
          email: data.data.email || '',
          phone: data.data.phone || ''
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (activeTab === 'staff') fetchStaff();
  }, [activeTab]);

  const fetchStaff = async () => {
    setLoadingStaff(true);
    try {
      const { data } = await axios.get('/api/users');
      if (data.success) {
        const staffUsers = data.users.filter((u: any) => ['admin', 'superadmin'].includes(u.role));
        setStaff(staffUsers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStaff(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!currentUser) return;
    setSavingProfile(true);
    try {
      const res = await axios.put(`/api/users/${currentUser._id}`, profileData);
      if (res.data.success) {
        toast.success("Profile updated successfully!");
        setCurrentUser(res.data.user);
      }
    } catch (e: any) {
      toast.error("Failed to update profile: " + e.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match!");
      return;
    }
    setSavingPassword(true);
    try {
      const res = await axios.put(`/api/users/${currentUser._id}/password`, {
        currentPassword: passwords.current,
        newPassword: passwords.new
      });
      if (res.data.success) {
        toast.success("Password updated successfully!");
        setPasswords({ current: '', new: '', confirm: '' });
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to update password");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleAddStaff = async () => {
    if (!newStaff.username || !newStaff.email || !newStaff.password) {
      toast.error("Please fill all required fields");
      return;
    }
    setSavingStaff(true);
    try {
      const res = await axios.post('/api/auth/register', newStaff);
      if (res.data.success) {
        setIsAddingStaff(false);
        setNewStaff({ username: '', email: '', password: '', role: 'admin' });
        fetchStaff();
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to add staff");
    } finally {
      setSavingStaff(false);
    }
  };

  const handleDeleteStaff = async (id: string) => {
    if (!confirm('Are you sure you want to remove this staff member?')) return;
    try {
      const res = await axios.delete(`/api/users/${id}`);
      if (res.data.success) fetchStaff();
    } catch (e) {
      toast.error("Failed to remove staff");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-white tracking-tight">System Settings</h1>
        <p className="text-gray-400 text-sm mt-2">Manage your account, security, and restaurant staff.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Navigation Sidebar */}
        <div className="w-full md:w-72 shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-[15px] font-medium transition-all ${activeTab === 'profile' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-[0_0_20px_rgba(132,204,22,0.05)]' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
          >
            <User className="w-5 h-5" /> Account Profile
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-[15px] font-medium transition-all ${activeTab === 'security' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-[0_0_20px_rgba(132,204,22,0.05)]' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
          >
            <Lock className="w-5 h-5" /> Security & Passwords
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-[15px] font-medium transition-all ${activeTab === 'notifications' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-[0_0_20px_rgba(132,204,22,0.05)]' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
          >
            <Bell className="w-5 h-5" /> Notifications
          </button>
          
          {currentUser?.role === 'superadmin' && (
            <button 
              onClick={() => setActiveTab('staff')}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-[15px] font-medium transition-all mt-6 ${activeTab === 'staff' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-[0_0_20px_rgba(132,204,22,0.05)]' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
            >
              <Users className="w-5 h-5" /> Manage Staff
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-dark-surface rounded-3xl border border-white/10 p-8 sm:p-10 relative overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
              <div className="border-b border-white/10 pb-6">
                <h2 className="text-2xl font-serif text-white mb-2">Profile Information</h2>
                <p className="text-sm text-gray-400">Update your account details and public persona.</p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-2xl bg-dark-bg border border-white/10 flex items-center justify-center overflow-hidden">
                    {currentUser?.avatar ? (
                      <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-gray-500" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold">{currentUser?.username || 'Loading...'}</h4>
                  <p className="text-sm text-gray-400 capitalize">{currentUser?.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Username</label>
                  <input 
                    type="text" 
                    value={profileData.username}
                    onChange={e => setProfileData({...profileData, username: e.target.value})}
                    className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-xl px-4 py-3 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    value={profileData.email}
                    onChange={e => setProfileData({...profileData, email: e.target.value})}
                    className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-xl px-4 py-3 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="tel" 
                    value={profileData.phone}
                    onChange={e => setProfileData({...profileData, phone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-xl px-4 py-3 outline-none transition-all" 
                  />
                </div>
              </div>
              
              <div className="pt-6 flex justify-end">
                <button 
                  onClick={handleUpdateProfile}
                  disabled={savingProfile}
                  className="bg-primary-500 text-dark-bg px-8 py-3 rounded-xl font-bold shadow-[0_0_15px_rgba(132,204,22,0.2)] hover:shadow-[0_0_25px_rgba(132,204,22,0.4)] transition-all disabled:opacity-50"
                >
                  {savingProfile ? 'Saving...' : 'Save Profile Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
              <div className="border-b border-white/10 pb-6">
                <h2 className="text-2xl font-serif text-white mb-2">Security & Passwords</h2>
                <p className="text-sm text-gray-400">Ensure your account is using a long, secure password.</p>
              </div>
              
              <div className="space-y-6 max-w-lg">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Current Password</label>
                  <input 
                    type="password" 
                    value={passwords.current}
                    onChange={e => setPasswords({...passwords, current: e.target.value})}
                    placeholder="••••••••" 
                    className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-xl px-4 py-3 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">New Password</label>
                  <input 
                    type="password" 
                    value={passwords.new}
                    onChange={e => setPasswords({...passwords, new: e.target.value})}
                    placeholder="••••••••" 
                    className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-xl px-4 py-3 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={passwords.confirm}
                    onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                    placeholder="••••••••" 
                    className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-xl px-4 py-3 outline-none transition-all" 
                  />
                </div>
                
                <div className="pt-4">
                  <button 
                    onClick={handleUpdatePassword}
                    disabled={savingPassword}
                    className="bg-white text-dark-bg px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
                  >
                    {savingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
              <div className="border-b border-white/10 pb-6">
                <h2 className="text-2xl font-serif text-white mb-2">Notification Preferences</h2>
                <p className="text-sm text-gray-400">Control how and when you receive system alerts.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-dark-bg p-5 rounded-2xl border border-white/5">
                  <div>
                    <h4 className="text-white font-semibold">New Order Alerts</h4>
                    <p className="text-sm text-gray-400 mt-1">Receive notifications when a new order is placed.</p>
                  </div>
                  <div className="w-12 h-6 bg-primary-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-dark-bg rounded-full shadow-sm"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-dark-bg p-5 rounded-2xl border border-white/5">
                  <div>
                    <h4 className="text-white font-semibold">Reservation Reminders</h4>
                    <p className="text-sm text-gray-400 mt-1">Get alerts for upcoming table reservations.</p>
                  </div>
                  <div className="w-12 h-6 bg-primary-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-dark-bg rounded-full shadow-sm"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-dark-bg p-5 rounded-2xl border border-white/5">
                  <div>
                    <h4 className="text-white font-semibold">Marketing Emails</h4>
                    <p className="text-sm text-gray-400 mt-1">Receive product updates and marketing emails.</p>
                  </div>
                  <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manage Staff Tab */}
          {activeTab === 'staff' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
              <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-2xl font-serif text-white mb-2">Manage Staff</h2>
                  <p className="text-sm text-gray-400">Control admin access and team members.</p>
                </div>
                <button 
                  onClick={() => setIsAddingStaff(true)}
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-medium transition-all text-sm flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" /> Add Staff Member
                </button>
              </div>
              
              <div className="space-y-4">
                {loadingStaff ? (
                  <p className="text-primary-400 p-4">Loading staff directory...</p>
                ) : staff.length === 0 ? (
                  <p className="text-gray-500 p-4 bg-dark-bg rounded-xl border border-white/5 text-center">No staff members found.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {staff.map((member: any) => (
                      <div key={member._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-dark-bg p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 border border-white/10 group-hover:border-primary-500/30 group-hover:text-primary-400 transition-colors">
                            {member.avatar ? <img src={member.avatar} className="w-full h-full rounded-full object-cover" /> : <User className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="text-white font-bold">{member.username}</p>
                            <p className="text-gray-400 text-sm">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${member.role === 'superadmin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                            {member.role}
                          </span>
                          {member._id !== currentUser?._id && (
                            <button 
                              onClick={() => handleDeleteStaff(member._id)} 
                              className="text-sm font-medium text-red-500/80 hover:text-red-400 transition-colors"
                            >
                              Revoke Access
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-dark-surface border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsAddingStaff(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-8">
              <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center text-primary-400 mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif text-white">Add Team Member</h2>
              <p className="text-sm text-gray-400 mt-1">Create a new admin account with dashboard access.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  value={newStaff.username}
                  onChange={e => setNewStaff({...newStaff, username: e.target.value})}
                  className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-xl px-4 py-3 outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  value={newStaff.email}
                  onChange={e => setNewStaff({...newStaff, email: e.target.value})}
                  className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-xl px-4 py-3 outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Temporary Password</label>
                <input 
                  type="password" 
                  value={newStaff.password}
                  onChange={e => setNewStaff({...newStaff, password: e.target.value})}
                  className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-xl px-4 py-3 outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Role Level</label>
                <select 
                  value={newStaff.role}
                  onChange={e => setNewStaff({...newStaff, role: e.target.value})}
                  className="w-full bg-dark-bg border border-white/10 focus:border-primary-500 text-white rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer"
                >
                  <option value="admin">Standard Admin</option>
                  <option value="superadmin">Super Administrator</option>
                </select>
              </div>
              
              <button 
                onClick={handleAddStaff}
                disabled={savingStaff}
                className="w-full bg-primary-500 text-dark-bg py-3.5 rounded-xl font-bold shadow-[0_0_15px_rgba(132,204,22,0.2)] hover:shadow-[0_0_25px_rgba(132,204,22,0.4)] transition-all disabled:opacity-50 mt-4"
              >
                {savingStaff ? 'Creating Account...' : 'Create Staff Account'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
