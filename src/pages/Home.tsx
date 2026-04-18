import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WATCH_COLLECTION } from '../types';
import WatchCard from '../components/WatchCard';

const Home = () => {
  const featuredWatches = WATCH_COLLECTION.filter(w => w.featured).slice(0, 4);

  // Hero Image Randomization logic
  const heroImages = [
    '/images/generated/hero_banner_v2.png',
    '/images/generated/hero_banner_v3.png',
    '/images/generated/hero_banner.png'
  ];

  const [currentHero, setCurrentHero] = useState('');

  useEffect(() => {
    // Pick a random image on load/reload
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    setCurrentHero(heroImages[randomIndex]);
  }, []);

  return (
    <div className="bg-wayne-bg">
      {/* Dynamic Hero Section - Image on Right, Text on Left */}
      <section className="relative h-[85vh] min-h-[700px] overflow-hidden bg-wayne-black flex items-center pt-20">
        {/* Background Pattern/Texture (Optional) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-wayne-teal via-transparent to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4 animate-in slide-in-from-left-12 duration-1000">
              <h2 className="text-wayne-teal text-xs font-bold uppercase tracking-[0.6em]">The Masterpiece Collection</h2>
              <h1 className="text-white text-6xl md:text-8xl font-bold uppercase leading-[0.9] tracking-tighter">
                Precision <br />
                <span className="text-wayne-teal">Redefined</span>
              </h1>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
              Experience the pinnacle of Swiss engineering and timeless luxury. Our curated collection represents the fusion of heritage and innovation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <Link to="/men" className="btn-primary px-12 py-5 text-sm">Explore Men</Link>
              <Link to="/women" className="btn-secondary px-12 py-5 text-sm border-white text-white hover:bg-white hover:text-black transition-all">Explore Women</Link>
            </div>
          </div>

          {/* Right: Dynamic Image */}
          <div className="relative group perspective-1000 order-first lg:order-last">
            <div className="relative aspect-square w-full max-w-[300px] md:max-w-[500px] mx-auto overflow-hidden shadow-[20px_20px_60px_-15px_rgba(0,163,193,0.3)] border border-white/10 animate-in fade-in zoom-in duration-1000 delay-200">
              {currentHero && (
                <img
                  src={currentHero}
                  alt="Luxury Watch"
                  className="w-full h-full object-cover transform transition-transform duration-[3s] group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-wayne-black/40 to-transparent"></div>
            </div>
            {/* Decorative floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-wayne-teal/30"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-wayne-teal/30"></div>
          </div>
        </div>

        {/* Removed Scroll to Discover as requested */}
      </section>

      {/* Brands Section - Refined for Dark Theme */}
      <section className="py-12 bg-wayne-black border-y border-wayne-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
            {['Rolex', 'Patek Philippe', 'Audemars Piguet', 'Omega', 'Cartier'].map(brand => (
              <span
                key={brand}
                className="text-lg md:text-xl font-serif font-black tracking-tighter text-gray-400 hover:text-wayne-teal hover:scale-110 transition-all duration-500 cursor-default uppercase"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 bg-wayne-bg">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="space-y-4">
              <h2 className="text-white text-4xl md:text-5xl font-bold uppercase tracking-tight">Featured <span className="text-wayne-teal">Acquisitions</span></h2>
              <p className="text-wayne-text-muted text-xs uppercase tracking-[0.4em] font-black italic">Curated for the modern connoisseur</p>
            </div>
            <Link to="/search" className="text-[10px] uppercase tracking-widest font-bold border-b border-wayne-teal pb-2 hover:text-wayne-teal transition-colors mt-8 md:mt-0">View All Pieces</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredWatches.map((watch, index) => (
              <div key={watch.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                <WatchCard watch={watch} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Banner */}
      <section className="relative h-[600px] overflow-hidden group">
        <div className="absolute inset-0">
          <img
            src="/images/generated/lifestyle_heritage.png"
            alt="Heritage"
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-700"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center text-center h-full p-6">
          <div className="max-w-2xl bg-wayne-card/90 backdrop-blur-md p-12 md:p-20 space-y-8 transform shadow-2xl skew-y-1 group-hover:skew-y-0 transition-all duration-1000 border border-wayne-border">
            <h4 className="text-wayne-teal text-[10px] font-black uppercase tracking-[0.6em]">Executive Concierge</h4>
            <h2 className="text-white text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-tight">The <span className="text-wayne-teal">Heritage</span> Service</h2>
            <p className="text-gray-400 text-sm leading-relaxed italic max-w-lg mx-auto font-medium">
              "Owning a Wayne timepiece is not just about telling time; it's about preserving a legacy of excellence for generations to come."
            </p>
            <div className="pt-6">
              <Link to="/contact" className="btn-primary py-4 px-12 inline-block shadow-xl hover:shadow-wayne-teal/20 transition-all">Book a Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;