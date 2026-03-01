import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Send, User, Bot, Zap } from 'lucide-react';

import { getGroqChatCompletion, ChatMessage } from '../lib/groq';

export default function AISuggestion() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm your AI phone advisor from MobileSpec Pro. I have deep knowledge of the phones in our catalog. How can I help you find the perfect device today?" }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newChatHistory = [...messages, userMessage];

    setMessages(newChatHistory);
    setInput('');
    setIsTyping(true);

    try {
      // Send the entire conversation history (minus system prompt which is handled by lib)
      const aiResponse = await getGroqChatCompletion(newChatHistory);

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error checking my database. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-xl shadow-black/10">
          <Sparkles size={28} />
        </div>
        <div>
          <h1 className="text-4xl font-bold">AI Phone Advisor</h1>
          <p className="text-zinc-500">Get personalized phone recommendations powered by AI.</p>
        </div>
      </div>

      <div className="flex h-[600px] flex-col rounded-[2.5rem] border border-zinc-100 bg-white shadow-2xl shadow-zinc-200/50 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${msg.role === 'assistant' ? 'bg-emerald-100 text-emerald-600' : 'bg-zinc-100 text-zinc-600'
                }`}>
                {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 text-sm font-medium leading-relaxed ${msg.role === 'assistant' ? 'bg-emerald-50 text-emerald-950' : 'bg-zinc-900 text-white'
                }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Bot size={20} />
              </div>
              <div className="max-w-[80%] rounded-2xl p-4 text-sm font-medium leading-relaxed bg-emerald-50 text-emerald-950 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-zinc-100">
          <div className="mb-4 flex flex-wrap gap-2">
            {[
              'Best phone for photography under $800',
              'Gaming phones with good battery life',
              'Budget phones with 5G support'
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-bold hover:bg-zinc-50 transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about phones..."
              className="h-14 w-full rounded-2xl bg-zinc-50 pl-6 pr-16 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 flex items-center justify-center rounded-xl bg-black text-white transition-all hover:bg-emerald-600 active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Powered by MobileSpec Intelligence
          </p>
        </div>
      </div>
    </div>
  );
}
