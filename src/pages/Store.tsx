import React from 'react';
import { motion } from 'motion/react';
import { Filter, ChevronDown, Search, X } from 'lucide-react';
import { MOCK_PHONES, Phone } from '../types';
import PhoneCard from '../components/PhoneCard';

interface StoreProps {
  onPhoneClick: (phone: Phone) => void;
}

export default function Store({ onPhoneClick }: StoreProps) {
  const uniqueBrands = React.useMemo(() => {
    const b = new Set(MOCK_PHONES.map(p => p.brand).filter(Boolean));
    return ['All', ...Array.from(b).sort()];
  }, []);
  const maxPriceInDataset = React.useMemo(() => {
    let max = 0;
    MOCK_PHONES.forEach(p => {
      const priceVal = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;
      if (priceVal > max) max = priceVal;
    });
    return Math.ceil(max / 100) * 100 || 2000;
  }, []);

  const [selectedBrand, setSelectedBrand] = React.useState('All');
  const [priceRange, setPriceRange] = React.useState(maxPriceInDataset);
  const [selectedRam, setSelectedRam] = React.useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState('Popularity');
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

  const filteredPhones = MOCK_PHONES.filter(phone => {
    const brandMatch = selectedBrand === 'All' || phone.brand === selectedBrand;
    const priceVal = parseInt(phone.price.replace(/[^0-9]/g, '')) || 0;
    const priceMatch = priceVal <= priceRange;
    const ramMatch = !selectedRam || (phone.specs.memory.ram && phone.specs.memory.ram.includes(selectedRam));
    const storageMatch = !selectedStorage || (phone.specs.memory.internal && phone.specs.memory.internal.includes(selectedStorage));
    return brandMatch && priceMatch && ramMatch && storageMatch;
  });

  const sortedPhones = [...filteredPhones].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
    const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
    if (sortBy === 'Price: Low to High') {
      return priceA - priceB;
    }
    if (sortBy === 'Price: High to Low') {
      return priceB - priceA;
    }
    return 0; // Default popularity
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-12">
        <h1 className="mb-2 sm:mb-4 text-3xl sm:text-5xl font-bold">Mobile Store</h1>
        <p className="text-lg sm:text-xl text-zinc-500">Browse our complete collection of smartphones.</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setIsFiltersOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-100 py-4 font-bold text-zinc-900 transition-all active:scale-95"
          >
            <Filter size={18} />
            Filters
          </button>
          <div className="relative group flex-1">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 py-4 font-bold hover:bg-zinc-50">
              Sort
              <ChevronDown size={14} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-full rounded-xl border border-zinc-100 bg-white p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              {['Popularity', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className="w-full rounded-lg px-4 py-2 text-left text-sm font-medium hover:bg-zinc-50"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Filters */}
        <aside className={`fixed inset-0 z-[100] bg-white p-6 transition-transform lg:static lg:z-auto lg:w-64 lg:flex-shrink-0 lg:bg-transparent lg:p-0 ${isFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <h2 className="text-2xl font-bold">Filters</h2>
            <button onClick={() => setIsFiltersOpen(false)} className="p-2 text-zinc-400">
              <X size={24} />
            </button>
          </div>

          <div className="sticky top-24 space-y-8 overflow-y-auto max-h-[calc(100vh-120px)] lg:max-h-none pr-2 lg:pr-0">
            <div>
              <div className="mb-4 hidden lg:flex items-center justify-between">
                <h3 className="font-bold uppercase tracking-wider text-zinc-400 text-xs">Filters</h3>
                <Filter size={14} className="text-zinc-400" />
              </div>
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-bold">Brand</label>
                  <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    {uniqueBrands.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg border border-zinc-100 lg:border-none lg:p-0">
                        <input
                          type="checkbox"
                          checked={selectedBrand === brand}
                          onChange={() => setSelectedBrand(brand)}
                          className="h-4 w-4 rounded border-zinc-300 text-black focus:ring-black"
                        />
                        <span className="text-sm font-medium text-zinc-600 group-hover:text-black transition-colors">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold">Max Price: ${priceRange}</label>
                  <input
                    type="range"
                    min="0"
                    max={maxPriceInDataset}
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full accent-black"
                  />
                  <div className="mt-2 flex justify-between text-xs font-bold text-zinc-400">
                    <span>$0</span>
                    <span>${maxPriceInDataset}+</span>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold">RAM</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['4GB', '6GB', '8GB', '12GB', '16GB'].map((ram) => (
                      <button
                        key={ram}
                        onClick={() => setSelectedRam(selectedRam === ram ? null : ram)}
                        className={`rounded-lg border py-2 text-xs font-bold transition-colors ${selectedRam === ram ? 'bg-black text-white border-black' : 'border-zinc-200 hover:border-black'
                          }`}
                      >
                        {ram}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold">Storage</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['64GB', '128GB', '256GB', '512GB', '1TB'].map((storage) => (
                      <button
                        key={storage}
                        onClick={() => setSelectedStorage(selectedStorage === storage ? null : storage)}
                        className={`rounded-lg border py-2 text-xs font-bold transition-colors ${selectedStorage === storage ? 'bg-black text-white border-black' : 'border-zinc-200 hover:border-black'
                          }`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 lg:block">
              <button
                onClick={() => {
                  setSelectedBrand('All');
                  setPriceRange(maxPriceInDataset);
                  setSelectedRam(null);
                  setSelectedStorage(null);
                }}
                className="flex-1 lg:w-full rounded-xl bg-zinc-100 py-3 text-sm font-bold transition-all hover:bg-zinc-200"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="flex-1 lg:hidden rounded-xl bg-black py-3 text-sm font-bold text-white transition-all"
              >
                Apply
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8 hidden lg:flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-500">Showing {sortedPhones.length} devices</p>
            <div className="relative group">
              <button className="flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-bold hover:bg-zinc-50">
                Sort by: {sortBy}
                <ChevronDown size={14} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-zinc-100 bg-white p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                {['Popularity', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="w-full rounded-lg px-4 py-2 text-left text-sm font-medium hover:bg-zinc-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {sortedPhones.map((phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onClick={() => onPhoneClick(phone)}
              />
            ))}
          </div>

          {sortedPhones.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-zinc-50 p-6">
                <Search size={40} className="text-zinc-300" />
              </div>
              <h3 className="text-xl font-bold">No devices found</h3>
              <p className="text-zinc-500">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
