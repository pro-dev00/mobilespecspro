import React from 'react';
import { motion } from 'motion/react';
import { Phone } from '../types';
import {
  Cpu,
  Battery,
  Camera,
  Smartphone,
  ArrowLeft,
  Sparkles,
  Check,
  Star,
  Share2,
  Heart,
  ChevronRight,
  Zap
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getGroqPhoneInsight } from '../lib/groq';

interface ProductDetailProps {
  phone: Phone;
  onBack: () => void;
  onCompare: () => void;
}

export default function ProductDetail({ phone, onBack, onCompare }: ProductDetailProps) {
  const [isThinking, setIsThinking] = React.useState(false);
  const [aiResponse, setAiResponse] = React.useState<string | null>(null);

  const handleAskAI = async () => {
    setIsThinking(true);
    try {
      const response = await getGroqPhoneInsight(
        phone,
        `What are the standout features or potential downsides of the ${phone.name} based on its specs? Is it a good value at ${phone.price}?`
      );
      setAiResponse(response);
    } catch (error) {
      setAiResponse("I'm sorry, I couldn't generate an insight for this device right now.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8"
    >
      {/* Breadcrumbs & Actions */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Store
        </button>
        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-all hover:bg-zinc-50">
            <Heart size={18} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-all hover:bg-zinc-50">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center p-8">
            <img
              src={phone.image}
              alt={phone.name}
              className="h-full w-full object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://picsum.photos/seed/${phone.id}/800/600`;
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-50 border border-zinc-100 p-2 cursor-pointer hover:border-emerald-500 transition-colors flex items-center justify-center">
                <img
                  src={`https://picsum.photos/seed/${phone.id}_${i}/200/200`}
                  alt={`${phone.name} Gallery ${i}`}
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700">
              New Arrival
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={12} className="sm:size-[14px]" fill="currentColor" />
              <span className="text-xs sm:text-sm font-bold">{phone.rating} (1.2k Reviews)</span>
            </div>
          </div>

          <h1 className="mb-2 sm:mb-4 text-3xl sm:text-5xl font-bold leading-tight">{phone.name}</h1>
          <p className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">{phone.price}</p>

          {/* Key Specs Bento */}
          <div className="mb-8 sm:mb-10 grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { icon: Cpu, label: 'Processor', value: phone.specs.processor.chipset.split(' (')[0], color: 'text-emerald-600' },
              { icon: Battery, label: 'Battery', value: `${phone.specs.battery.type.split(' ')[1]} ${phone.specs.battery.type.split(' ')[2]}`, color: 'text-blue-600' },
              { icon: Camera, label: 'Camera', value: phone.specs.camera.main.split(',')[0], color: 'text-purple-600' },
              { icon: Smartphone, label: 'RAM/Storage', value: `${phone.specs.memory.ram} / ${phone.specs.memory.internal.split(' / ')[0]}`, color: 'text-orange-600' }
            ].map((spec, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-3 sm:p-4">
                <div className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-white ${spec.color} shadow-sm`}>
                  <spec.icon size={18} className="sm:size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-zinc-400 uppercase truncate">{spec.label}</p>
                  <p className="text-sm sm:text-base font-bold truncate">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto flex gap-4">
            <button
              onClick={onCompare}
              className="w-full rounded-full bg-black py-4 text-base sm:text-lg font-bold text-white transition-all hover:bg-zinc-800 active:scale-95 shadow-lg shadow-black/10"
            >
              Compare This Phone
            </button>
          </div>
        </div>
      </div>

      {/* AI Insights Section - ENHANCED */}
      <section className="mt-16 sm:mt-24">
        <div className="ai-card group">
          <div className="relative z-10">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
                  <Sparkles size={20} className="sm:size-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-emerald-950">AI Insights</h2>
                  <p className="text-[10px] sm:text-sm font-medium text-emerald-700/70 uppercase tracking-wider">MobileSpec Intelligence</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 text-xs font-bold text-emerald-800 backdrop-blur-sm">
                <Zap size={14} />
                REAL-TIME ANALYSIS
              </div>
            </div>

            <div className="prose prose-emerald max-w-none">
              <div className="rounded-2xl bg-white/40 p-4 sm:p-6 backdrop-blur-sm border border-white/40 shadow-sm">
                <div className="text-sm sm:text-base text-emerald-900/80 leading-relaxed">
                  <ReactMarkdown>
                    {phone.aiInsights}
                  </ReactMarkdown>
                  {aiResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-4 sm:mt-6 sm:pt-6 border-t border-emerald-200/50 italic text-emerald-800"
                    >
                      <p className="flex items-center gap-2 text-xs sm:text-sm">
                        <Sparkles size={14} />
                        {aiResponse}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(() => {
                // Heuristic Scoring Logic

                // 1. Value Score (Price relative to RAM + Camera)
                let valueScore = 6.0;
                const priceMatch = phone.price.match(/\d+(?:,\d+)?/);
                const price = priceMatch ? parseInt(priceMatch[0].replace(/,/g, '')) : 0;
                const ramMatch = phone.specs.memory.ram.match(/(\d+)GB/i);
                const ram = ramMatch ? parseInt(ramMatch[1]) : 4;
                if (price > 0) {
                  const valueRatio = (ram * 100000) / price;
                  valueScore = Math.min(10, Math.max(3, 4 + valueRatio));
                }

                // 2. Camera Score
                let camScore = 5.0;
                const mainCamMatch = phone.specs.camera.main.match(/(\d+)\s*MP/i);
                const mp = mainCamMatch ? parseInt(mainCamMatch[1]) : 12;
                if (mp >= 100) camScore = 9.8;
                else if (mp >= 64) camScore = 8.5;
                else if (mp >= 48) camScore = 7.5;
                else if (mp >= 12) camScore = 6.5;

                // 3. Performance Score
                let perfScore = 5.0;
                if (ram >= 16) perfScore = 9.8;
                else if (ram >= 12) perfScore = 9.0;
                else if (ram >= 8) perfScore = 8.0;
                else if (ram >= 6) perfScore = 7.0;
                else if (ram >= 4) perfScore = 6.0;

                // 4. Battery Life
                let battText = "Average";
                let battPercent = "50%";
                const battMatch = (phone.specs.battery.type || '').match(/(\d{4,})\s*mAh/i);
                const capacity = battMatch ? parseInt(battMatch[1]) : 4000;
                if (capacity >= 5500) { battText = "2+ Days"; battPercent = "95%"; }
                else if (capacity >= 5000) { battText = "24h+ Heavy"; battPercent = "85%"; }
                else if (capacity >= 4500) { battText = "All Day"; battPercent = "70%"; }
                else { battText = "Needs charging"; battPercent = "40%"; }

                return [
                  {
                    label: 'Value Score',
                    value: valueScore.toFixed(1) + '/10',
                    color: 'bg-emerald-500',
                    width: ((valueScore / 10) * 100) + '%'
                  },
                  {
                    label: 'Camera Score',
                    value: camScore.toFixed(1) + '/10',
                    color: 'bg-blue-500',
                    width: ((camScore / 10) * 100) + '%'
                  },
                  {
                    label: 'Performance Score',
                    value: perfScore.toFixed(1) + '/10',
                    color: 'bg-orange-500',
                    width: ((perfScore / 10) * 100) + '%'
                  },
                  {
                    label: 'Battery Life',
                    value: battText,
                    color: 'bg-purple-500',
                    width: battPercent
                  }
                ];
              })().map((stat, i) => (
                <div key={i} className="flex flex-col gap-1 rounded-2xl bg-white/60 p-4 border border-white/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800/50">{stat.label}</span>
                  <span className="text-lg sm:text-xl font-bold text-emerald-950">{stat.value}</span>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-emerald-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: stat.width }}
                      className={`h-full ${stat.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 flex justify-center">
              <button
                onClick={handleAskAI}
                disabled={isThinking}
                className="w-full sm:w-auto group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-emerald-600 px-8 py-4 text-base sm:text-lg font-bold text-white transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isThinking ? 'AI is analyzing...' : 'Ask AI More'}
                </span>
                <Sparkles size={20} className={`relative z-10 transition-transform ${isThinking ? 'animate-spin' : 'group-hover:rotate-12'}`} />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Specifications */}
      <section className="mt-16 sm:mt-24">
        <h2 className="mb-8 sm:mb-12 text-2xl sm:text-3xl font-bold">Full Specifications</h2>
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-100 bg-white shadow-sm">
          <div className="divide-y divide-zinc-100">
            {Object.entries(phone.specs).map(([category, details]) => {
              const categoryTitles: Record<string, string> = {
                general: 'General Information',
                build: 'Build & Design',
                display: 'Display',
                os: 'Operating System',
                processor: 'Processor & GPU',
                memory: 'Memory',
                camera: 'Camera',
                connectivity: 'Connectivity',
                battery: 'Battery',
                sensors: 'Sensors'
              };

              return (
                <div key={category} className="flex flex-col">
                  <div className="bg-zinc-50 px-4 py-3 sm:px-6 sm:py-4">
                    <h3 className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-zinc-500">
                      {categoryTitles[category] || category}
                    </h3>
                  </div>
                  <div className="divide-y divide-zinc-50">
                    {Object.entries(details).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-3 sm:gap-4 sm:p-6">
                        <span className="text-[10px] sm:text-sm font-bold text-zinc-400 uppercase sm:capitalize">
                          {key === 'fiveG' ? '5G' :
                            key === 'fourG' ? '4G' :
                              key === 'threeG' ? '3G' :
                                key === 'twoG' ? '2G' :
                                  key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="sm:col-span-2 text-sm sm:text-base font-medium text-zinc-900 leading-relaxed">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mt-24">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-3xl font-bold">User Reviews</h2>
          <button className="text-sm font-bold text-emerald-600 hover:underline">Write a Review</button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-3xl border border-zinc-100 bg-zinc-50 p-8">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-200" />
                  <div>
                    <p className="font-bold">User {i}</p>
                    <p className="text-xs text-zinc-400">2 days ago</p>
                  </div>
                </div>
                <div className="flex text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-zinc-600 italic">"The best camera I've ever used on a smartphone. The AI features are actually useful and not just gimmicks."</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
