import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Cpu } from 'lucide-react';
import { MOCK_PHONES, Phone } from '../types';
import PhoneCard from '../components/PhoneCard';

interface HomeProps {
  onPhoneClick: (phone: Phone) => void;
  onExplore: () => void;
  onCompare: () => void;
  onAIAdvisor: () => void;
}

export default function Home({ onPhoneClick, onExplore, onCompare, onAIAdvisor }: HomeProps) {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/tech/1920/1080"
            alt="Hero Background"
            className="h-full w-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md w-fit">
              <Sparkles size={14} className="text-emerald-400" />
              <span>AI-Powered Device Discovery</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-white sm:text-7xl lg:text-8xl">
              Discover Your <br />
              <span className="text-emerald-400">Perfect</span> Phone
            </h1>
            <p className="mb-10 text-lg text-zinc-300 max-w-xl sm:text-xl">
              Compare specs, read AI-generated reviews, and find the best device tailored to your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onExplore}
                className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:bg-emerald-400 active:scale-95"
              >
                Explore Now
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={onCompare}
                className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                Compare Devices
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { icon: Zap, title: 'Real-time Specs', desc: 'Always up-to-date technical data for the latest releases.' },
            { icon: Sparkles, title: 'AI Insights', desc: 'Deep analysis of pros and cons powered by advanced AI.' },
            { icon: ShieldCheck, title: 'Verified Reviews', desc: 'Authentic feedback from real users and tech experts.' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-4 rounded-3xl bg-zinc-50 p-8 border border-zinc-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-zinc-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flagship Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-4xl font-bold">Flagship Phones</h2>
            <p className="text-zinc-500">The best of the best, currently dominating the market.</p>
          </div>
          <button className="text-sm font-bold text-emerald-600 hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MOCK_PHONES.concat(MOCK_PHONES).slice(0, 8).map((phone, i) => (
            <PhoneCard 
              key={`${phone.id}-${i}`} 
              phone={phone} 
              onClick={() => onPhoneClick(phone)} 
            />
          ))}
        </div>
      </section>

      {/* AI CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-black p-8 sm:p-12 text-white">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-emerald-500 text-black">
              <Sparkles size={28} className="sm:hidden" />
              <Sparkles size={32} className="hidden sm:block" />
            </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">Not sure which one to pick?</h2>
            <p className="mb-8 sm:mb-10 max-w-2xl text-base sm:text-lg text-zinc-400">
              Our AI Phone Advisor can help you find the perfect device based on your budget, usage patterns, and preferences.
            </p>
            <button 
              onClick={onAIAdvisor}
              className="w-full sm:w-auto rounded-full bg-white px-10 py-4 text-lg font-bold text-black transition-all hover:bg-emerald-400 active:scale-95"
            >
              Talk to AI Advisor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
