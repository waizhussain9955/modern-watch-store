import { useState, useMemo } from 'react';
import { WATCH_COLLECTION } from '../types';
import WatchCard from '../components/WatchCard';

const Internationalbrands = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Categorize watches for filtering
  const filteredWatches = useMemo(() => {
    if (activeCategory === 'ALL') return WATCH_COLLECTION;
    if (activeCategory === 'SWISS') return WATCH_COLLECTION.filter(w => ['Rolex', 'Patek Philippe', 'Audemars Piguet', 'Omega', 'Zenith', 'Vacheron Constantin'].includes(w.brand));
    if (activeCategory === 'PREMIUM') return WATCH_COLLECTION.filter(w => w.price > 500000);
    if (activeCategory === 'FASHION') return WATCH_COLLECTION.filter(w => ['Cartier', 'Hublot', 'Tag Heuer', 'Bulgari', 'Chopard'].includes(w.brand));
    if (activeCategory === 'SMART') return WATCH_COLLECTION.filter(w => w.category === 'Smart');
    return WATCH_COLLECTION;
  }, [activeCategory]);

  const categories = ['ALL', 'SWISS', 'PREMIUM', 'FASHION', 'SMART'];

  return (
    <div className="bg-wayne-bg min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <div className="container mx-auto px-6 mb-20 text-center">
        <div className="space-y-6 animate-in fade-in slide-in-from-top-12 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">
            Global <span className="text-wayne-teal">Vault</span>
          </h1>
          <p className="text-wayne-text-muted text-[10px] md:text-xs uppercase tracking-[0.5em] font-black italic">
            Curated from 45+ Premier International Brands
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Filters - Fixed the scrollbar issue requested by user */}
        <div className="flex justify-center flex-wrap gap-4 md:gap-12 mb-16 border-b border-wayne-border pb-8 overflow-visible">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase font-black tracking-[0.3em] transition-all duration-300 relative py-2 ${activeCategory === cat ? 'text-wayne-teal' : 'text-gray-500 hover:text-white'
                }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-wayne-teal animate-in fade-in zoom-in duration-500"></span>
              )}
            </button>
          ))}
        </div>

        {/* Watch Grid with Add to Cart Functionality */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredWatches.map((watch, index) => (
            <div key={watch.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
              <WatchCard watch={watch} />
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-24 pt-12 border-t border-wayne-border text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-wayne-text-muted font-bold">
            Exclusive International Warranty Included with All Acquisitions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Internationalbrands;