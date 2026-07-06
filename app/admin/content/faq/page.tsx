'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  useEffect(() => {
    // In a real implementation this would fetch from /api/content?type=faq
    setFaqs([
      { _id: '1', key: 'What are your opening hours?', value: 'We are open from 10 AM to 10 PM daily.', isActive: true },
      { _id: '2', key: 'Do you offer vegan options?', value: 'Yes, we have a dedicated vegan menu.', isActive: true },
    ]);
    setLoading(false);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    toast.success("FAQ deleted (Simulation)");
    setFaqs(faqs.filter(f => f._id !== id));
  };

  const handleCreate = async () => {
    if (!newFaq.question || !newFaq.answer) return toast.error("Question and answer are required");
    setSaving(true);
    setTimeout(() => {
      toast.success("FAQ added! (Simulation)");
      setFaqs([{ _id: Date.now().toString(), key: newFaq.question, value: newFaq.answer, isActive: true }, ...faqs]);
      setIsAdding(false);
      setNewFaq({ question: '', answer: '' });
      setSaving(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 shrink-0">
        <div>
          <h1 className="font-serif text-[42px] leading-tight font-semibold text-white mb-2">FAQ Management</h1>
          <p className="text-gray-400 font-sans max-w-xl text-[15px] leading-relaxed">
            Manage frequently asked questions displayed on the website.
          </p>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-primary-400 text-[#0d1700] px-6 py-3 rounded-full font-bold tracking-wider uppercase text-[13px] hover:bg-primary-300 transition-colors shadow-[0_0_20px_rgba(158,233,57,0.3)]">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-gray-400">Loading FAQs...</div>
        ) : (
          faqs.map((faq) => (
            <div key={faq._id} className="bg-dark-surface p-6 rounded-2xl border border-white/5 flex justify-between items-start gap-4">
              <div>
                <h3 className="font-serif text-xl text-white mb-2">{faq.key}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.value}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(faq._id)} className="w-8 h-8 rounded-full hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-dark-surface border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
            <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white">✕</button>
            <h2 className="text-2xl font-serif text-white mb-6">Add FAQ</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Question</label>
                <input type="text" value={newFaq.question} onChange={e => setNewFaq({...newFaq, question: e.target.value})} className="w-full bg-dark-bg border border-white/10 text-white rounded-md px-4 py-3 outline-none mt-2" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Answer</label>
                <textarea value={newFaq.answer} onChange={e => setNewFaq({...newFaq, answer: e.target.value})} rows={4} className="w-full bg-dark-bg border border-white/10 text-white rounded-md px-4 py-3 outline-none mt-2 resize-none" />
              </div>
              
              <button onClick={handleCreate} disabled={saving} className="w-full bg-primary-500 text-dark-bg py-3.5 rounded-lg font-bold mt-4 shadow-[0_0_15px_rgba(132,204,22,0.2)]">
                {saving ? 'Adding...' : 'Add FAQ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
