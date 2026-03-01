import React from 'react';
import { Search, Menu, X, Smartphone, ShoppingBag, Sparkles, Layers, Newspaper, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PHONES } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const navItems = [
    { id: 'home', label: 'Home', icon: Smartphone },
    { id: 'store', label: 'Store', icon: ShoppingBag },
    { id: 'ai', label: 'AI Suggestion', icon: Sparkles },
    { id: 'compare', label: 'Compare', icon: Layers },
    { id: 'news', label: 'News', icon: Newspaper },
  ];

  const searchSuggestions = searchQuery.length > 0 
    ? MOCK_PHONES.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : MOCK_PHONES.slice(0, 3);

  return (
    <nav className={`sticky top-0 z-50 w-full border-b border-zinc-100 transition-colors ${isMenuOpen || isSearchOpen ? 'bg-white' : 'bg-white/80 backdrop-blur-xl'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Hidden when search is open on mobile */}
          <div className={`flex items-center gap-2 cursor-pointer transition-opacity duration-200 ${isSearchOpen ? 'opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto' : 'opacity-100'}`} onClick={() => setActiveTab('home')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <Smartphone size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight font-display">MobileSpec</span>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden md:block transition-opacity duration-200 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-black ${
                    activeTab === item.id ? 'text-black' : 'text-zinc-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search devices..."
                className="h-9 w-64 rounded-full bg-zinc-100 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-black/5"
              />
            </div>

            {/* Mobile Search Toggle */}
            <button 
              className="sm:hidden p-2 text-zinc-600 hover:text-black transition-colors"
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
            >
              <Search size={22} />
            </button>

            {/* Menu Button */}
            <button className={`md:hidden p-2 -mr-2 text-zinc-600 hover:text-black transition-colors ${isSearchOpen ? 'hidden' : 'block'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white sm:bg-black/20 sm:backdrop-blur-sm"
          >
            <div className="mx-auto max-w-7xl h-full sm:h-auto sm:mt-20">
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="bg-white h-full sm:h-auto sm:rounded-[2.5rem] shadow-2xl overflow-hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Search Header */}
                  <div className="flex items-center gap-4 p-4 sm:p-6 border-b border-zinc-100">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                      <input
                        autoFocus
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for phones, brands..."
                        className="w-full h-12 sm:h-14 rounded-2xl bg-zinc-50 pl-12 pr-4 text-lg font-medium outline-none border border-zinc-100 focus:border-black/20 transition-all"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="p-2 text-zinc-400 hover:text-black transition-colors"
                    >
                      <X size={28} />
                    </button>
                  </div>

                  {/* Search Results / Suggestions */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                    <div className="mb-6">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                        {searchQuery.length > 0 ? 'Search Results' : 'Trending Searches'}
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {searchSuggestions.map((phone) => (
                          <div 
                            key={phone.id}
                            onClick={() => {
                              setActiveTab('store'); // In a real app, go to product
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-4 p-3 rounded-2xl border border-zinc-50 hover:border-black/10 hover:bg-zinc-50 cursor-pointer transition-all group"
                          >
                            <div className="h-12 w-12 overflow-hidden rounded-xl bg-zinc-100">
                              <img src={phone.image} alt={phone.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold group-hover:text-emerald-600 transition-colors">{phone.name}</h4>
                              <p className="text-xs text-zinc-400">{phone.brand} • {phone.price}</p>
                            </div>
                            <ArrowRight size={18} className="text-zinc-300 group-hover:text-black transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {searchQuery.length === 0 && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Quick Links</h3>
                        <div className="flex flex-wrap gap-2">
                          {['iPhone 15', 'Galaxy S24', 'Pixel 8', 'Best Camera', 'Budget Phones'].map(tag => (
                            <button 
                              key={tag}
                              onClick={() => setSearchQuery(tag)}
                              className="px-4 py-2 rounded-full bg-zinc-100 text-sm font-bold text-zinc-600 hover:bg-black hover:text-white transition-all"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-md md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 top-16 z-50 w-full max-w-xs bg-zinc-50 shadow-2xl md:hidden border-l border-zinc-200"
            >
              <div className="flex flex-col h-full p-6">
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-lg font-bold transition-all ${
                        activeTab === item.id 
                          ? 'bg-black text-white shadow-lg shadow-black/10' 
                          : 'text-zinc-500 hover:bg-white hover:text-black hover:shadow-sm'
                      }`}
                    >
                      <item.icon size={22} />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
