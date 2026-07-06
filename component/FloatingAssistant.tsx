'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User as UserIcon } from 'lucide-react';
import axios from 'axios';

type Message = { role: 'user' | 'assistant', text: string };

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Welcome to Lumière. I am your personal digital concierge. From wine pairings to securing a reservation, how may I assist you?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    // Add new user message to local state instantly
    const newMessages: Message[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Send the entire chat history for context
      const { data } = await axios.post('/api/ai/assistant', { history: newMessages });
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', text: "I apologize, my connection to the concierge desk was interrupted. Please ensure your API keys are configured." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all group"
          >
            <Sparkles className="w-6 h-6 text-white group-hover:text-primary-400 transition-colors duration-300" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-primary-500 rounded-full animate-pulse border-2 border-black"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Modal (Apple / Luxury Glassmorphism) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-full sm:w-[420px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-4rem)] bg-[#0a0a0a]/70 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                  <Sparkles className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-serif text-white font-medium text-[17px] tracking-wide">Lumière AI</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mt-0.5">Concierge</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3 items-end`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mb-1 shadow-sm">
                      <Bot className="w-3 h-3 text-gray-300" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-[20px] px-5 py-3.5 text-[14px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary-500 text-black font-medium rounded-br-sm' 
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-sm backdrop-blur-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex justify-start gap-3 items-end"
                >
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mb-1 shadow-sm">
                    <Bot className="w-3 h-3 text-gray-300" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-[20px] rounded-bl-sm px-5 py-4 flex items-center gap-1.5 backdrop-blur-sm shadow-sm">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-gray-400" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-gray-400" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-gray-400" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-black/20 border-t border-white/5 shrink-0 backdrop-blur-md">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Lumière..."
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-full py-4 pl-6 pr-14 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:bg-white/10 transition-all shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 p-2.5 rounded-full bg-white/10 text-white hover:bg-primary-500 hover:text-black disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-white transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="text-center mt-3">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Powered by Gemini AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
