import React from 'react';
import { motion } from 'motion/react';
import { Phone } from '../types';
import { Star, ArrowRight } from 'lucide-react';

interface PhoneCardProps {
  phone: Phone;
  onClick: () => void;
}

export default function PhoneCard({ phone, onClick }: PhoneCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white transition-all hover:shadow-xl hover:shadow-zinc-200/50"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden bg-zinc-50 flex items-center justify-center p-4">
        <img
          src={phone.image}
          alt={phone.name}
          className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // prevents infinite loop
            target.src = `https://picsum.photos/seed/${phone.id}/800/600`;
          }}
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400">{phone.brand}</span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={10} className="sm:size-3" fill="currentColor" />
            <span className="text-[10px] sm:text-xs font-bold">{phone.rating}</span>
          </div>
        </div>
        <h3 className="mb-2 text-sm sm:text-lg font-bold leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">{phone.name}</h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-base sm:text-xl font-bold tracking-tight">{phone.price}</span>
          <button className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-emerald-600 active:scale-95">
            <ArrowRight size={14} className="sm:size-[18px]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
