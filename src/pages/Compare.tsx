import React from 'react';
import { motion } from 'motion/react';
import { Phone, MOCK_PHONES } from '../types';
import { X, Plus, ArrowLeft, Smartphone, Info } from 'lucide-react';

interface CompareProps {
  comparisonList: Phone[];
  onRemove: (id: string) => void;
  onAdd: (phone: Phone) => void;
  onBack: () => void;
}

export default function Compare({ comparisonList, onRemove, onAdd, onBack }: CompareProps) {
  const [isAdding, setIsAdding] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const categories = [
    { id: 'general', label: 'General Information' },
    { id: 'build', label: 'Build & Design' },
    { id: 'display', label: 'Display' },
    { id: 'os', label: 'Operating System' },
    { id: 'processor', label: 'Processor & GPU' },
    { id: 'memory', label: 'Memory' },
    { id: 'camera', label: 'Camera' },
    { id: 'connectivity', label: 'Connectivity' },
    { id: 'battery', label: 'Battery' },
    { id: 'sensors', label: 'Sensors' }
  ];

  const formatKey = (key: string) => {
    const specialCases: Record<string, string> = {
      fiveG: '5G',
      fourG: '4G',
      threeG: '3G',
      twoG: '2G',
      wlan: 'WLAN',
      nfc: 'NFC',
      usb: 'USB',
      gps: 'GPS',
      cpu: 'CPU',
      gpu: 'GPU',
      ram: 'RAM'
    };
    return specialCases[key] || key.replace(/([A-Z])/g, ' $1').trim();
  };

  const filteredPhones = MOCK_PHONES
    .filter(p => !comparisonList.find(cp => cp.id === p.id))
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Compare Phones</h1>
          <p className="text-zinc-500 text-base sm:text-lg">Side-by-side comparison of device specifications</p>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 py-3 px-6 text-sm font-bold text-zinc-600 hover:text-black hover:bg-zinc-50 transition-all sm:border-none sm:py-0 sm:px-0"
        >
          <ArrowLeft size={16} />
          Back to Store
        </button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-zinc-100 bg-white shadow-xl shadow-zinc-200/50">
        {/* Header Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 border-b border-zinc-100">
          <div className="hidden md:flex items-center px-8 py-10 bg-zinc-50/50">
            <div className="flex items-center gap-3 text-zinc-400">
              <Info size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Specifications</span>
            </div>
          </div>
          
          {[0, 1].map((index) => {
            const phone = comparisonList[index];
            return (
              <div key={index} className={`relative p-4 sm:p-8 flex flex-col items-center text-center ${index === 0 ? 'border-r border-zinc-100' : ''}`}>
                {phone ? (
                  <>
                    <button 
                      onClick={() => onRemove(phone.id)}
                      className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 hover:text-red-500 transition-all"
                    >
                      <X size={14} className="sm:size-4" />
                    </button>
                    <div className="aspect-[4/3] w-full max-w-[120px] sm:max-w-[200px] overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-50 mb-3 sm:mb-6">
                      <img src={phone.image} alt={phone.name} className="h-full w-full object-cover" />
                    </div>
                    <h3 className="text-sm sm:text-xl font-bold mb-1 line-clamp-1">{phone.name}</h3>
                    <p className="text-xs sm:text-base text-emerald-600 font-bold">{phone.price}</p>
                  </>
                ) : (
                  <div 
                    onClick={() => {
                      setSearchTerm('');
                      setIsAdding(true);
                    }}
                    className="aspect-[4/3] w-full max-w-[120px] sm:max-w-[200px] flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
                  >
                    <Plus size={20} className="text-zinc-300 group-hover:text-emerald-500 mb-1 sm:mb-2" />
                    <span className="text-[10px] sm:text-xs font-bold text-zinc-400 group-hover:text-emerald-600">Add Device</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Spec Rows */}
        <div className="divide-y divide-zinc-100">
          {categories.map((cat) => (
            <React.Fragment key={cat.id}>
              {/* Category Header Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 bg-zinc-50/80">
                <div className="col-span-1 md:col-span-3 px-4 py-2 sm:px-8 sm:py-3">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{cat.label}</span>
                </div>
              </div>

              {/* Individual Spec Rows */}
              {Object.keys(MOCK_PHONES[0].specs[cat.id as keyof Phone['specs']]).map((specKey) => (
                <div key={specKey} className="grid grid-cols-2 md:grid-cols-3 group hover:bg-zinc-50/30 transition-colors">
                  {/* Label - Mobile Hidden, Desktop Visible */}
                  <div className="hidden md:flex px-8 py-4 items-center border-r border-zinc-100">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      {formatKey(specKey)}
                    </span>
                  </div>

                  {/* Values */}
                  {[0, 1].map((index) => {
                    const phone = comparisonList[index];
                    const value = phone ? (phone.specs[cat.id as keyof Phone['specs']] as any)[specKey] : '-';
                    return (
                      <div key={index} className={`px-4 py-3 sm:px-8 sm:py-4 flex flex-col sm:flex-row sm:items-center ${index === 0 ? 'border-r border-zinc-100' : ''}`}>
                        <div className="md:hidden text-[9px] font-bold text-zinc-300 uppercase mb-1 shrink-0">
                          {formatKey(specKey)}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-zinc-700 leading-relaxed">
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Add Phone Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl rounded-t-[2rem] sm:rounded-[2.5rem] bg-white p-6 sm:p-8 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold">Select Device</h2>
              <button onClick={() => setIsAdding(false)} className="p-2 text-zinc-400 hover:text-black">
                <X size={24} />
              </button>
            </div>

            <div className="mb-6 relative">
              <input
                type="text"
                autoFocus
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 sm:h-14 rounded-2xl bg-zinc-50 pl-12 pr-4 text-sm font-medium outline-none border border-zinc-100 focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 transition-all"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <Plus size={18} className="rotate-45" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-h-[60vh] sm:max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar pb-8 sm:pb-0">
              {filteredPhones.length > 0 ? (
                filteredPhones.map((phone) => (
                  <div 
                    key={phone.id}
                    onClick={() => {
                      onAdd(phone);
                      setIsAdding(false);
                      setSearchTerm('');
                    }}
                    className="flex items-center gap-4 p-3 sm:p-4 rounded-2xl border border-zinc-100 hover:border-emerald-500 hover:bg-emerald-50/30 cursor-pointer transition-all group"
                  >
                    <div className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-50">
                      <img src={phone.image} alt={phone.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm sm:text-base group-hover:text-emerald-600 truncate">{phone.name}</h4>
                      <p className="text-[10px] sm:text-xs text-zinc-400 truncate">{phone.brand} • {phone.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 py-12 text-center">
                  <p className="text-zinc-400 font-medium">No devices match your search.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

