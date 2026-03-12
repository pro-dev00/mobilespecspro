import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import AISuggestion from './pages/AISuggestion';
import Compare from './pages/Compare';
import { Phone } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedPhone, setSelectedPhone] = React.useState<Phone | null>(null);
  const [comparisonList, setComparisonList] = React.useState<Phone[]>([]);

  const handlePhoneClick = (phone: Phone) => {
    setSelectedPhone(phone);
    setActiveTab('product');
    window.scrollTo(0, 0);
  };

  const handleAddToCompare = (phone: Phone) => {
    if (comparisonList.length < 2 && !comparisonList.find(p => p.id === phone.id)) {
      setComparisonList([...comparisonList, phone]);
    }
    setActiveTab('compare');
    window.scrollTo(0, 0);
  };

  const handleRemoveFromCompare = (id: string) => {
    setComparisonList(comparisonList.filter(p => p.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            onPhoneClick={handlePhoneClick}
            onExplore={() => setActiveTab('store')}
            onCompare={() => setActiveTab('compare')}
            onAIAdvisor={() => setActiveTab('ai')}
          />
        );
      case 'store':
        return <Store onPhoneClick={handlePhoneClick} />;
      case 'product':
        return selectedPhone ? (
          <ProductDetail
            phone={selectedPhone}
            onBack={() => setActiveTab('store')}
            onCompare={() => handleAddToCompare(selectedPhone)}
          />
        ) : (
          <Store onPhoneClick={handlePhoneClick} />
        );
      case 'ai':
        return <AISuggestion />;
      case 'compare':
        return (
          <Compare
            comparisonList={comparisonList}
            onRemove={handleRemoveFromCompare}
            onAdd={(phone) => {
              if (comparisonList.length < 2) {
                setComparisonList([...comparisonList, phone]);
              }
            }}
            onBack={() => setActiveTab('store')}
          />
        );
      case 'news':
        return (
          <div className="flex h-[60vh] items-center justify-center text-center p-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Latest Tech News</h2>
              <p className="text-zinc-500">Stay updated with the latest mobile technology news and reviews.</p>
              <button onClick={() => setActiveTab('home')} className="mt-8 rounded-full bg-black px-8 py-3 font-bold text-white">Back to Home</button>
            </div>
          </div>
        );
      default:
        return (
          <Home
            onPhoneClick={handlePhoneClick}
            onExplore={() => setActiveTab('store')}
            onCompare={() => setActiveTab('compare')}
            onAIAdvisor={() => setActiveTab('ai')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab === 'product' ? 'store' : activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col lg:flex-row">
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
        {/* Sidebar Ad - visible on large screens */}
        <aside className="hidden lg:flex flex-col items-center py-8 px-2">
          <div className="sticky top-24">
            <AdBanner />
          </div>
        </aside>
      </div>
      {/* Mobile Ad - visible on small screens */}
      <div className="flex lg:hidden justify-center py-6">
        <AdBanner />
      </div>
      <Footer />
    </div>
  );
}
