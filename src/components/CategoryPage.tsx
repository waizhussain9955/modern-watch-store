import { useState } from 'react';
import WatchCard from './WatchCard';
import type { Watch } from '../types';
import { useCart } from '../context/CartContext';

interface CategoryPageProps {
    title: string;
    description?: string;
    categoryBanner: string;
    watches: Watch[];
}

const CategoryPage = ({ title, categoryBanner, watches }: CategoryPageProps) => {
    const { formatPrice } = useCart();
    const [activeBrand, setActiveBrand] = useState('All');
    const [priceRange, setPriceRange] = useState(5000000);
    const [showAllBrands, setShowAllBrands] = useState(false);

    const brands = ['All', ...new Set(watches.map(w => w.brand))];
    const displayBrands = showAllBrands ? brands : brands.slice(0, 10);

    const filteredWatches = watches.filter(w =>
        (activeBrand === 'All' || w.brand === activeBrand) &&
        w.price <= priceRange
    );

    return (
        <div className="bg-wayne-bg min-h-screen pt-20">
            {/* Extended Banner Height for Category */}
            <div className="h-[400px] md:h-[500px] relative overflow-hidden bg-wayne-black flex items-center justify-center">
                <div className="absolute inset-0">
                    <img src={categoryBanner} alt={title} className="w-full h-full object-cover opacity-40 scale-110" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-wayne-teal/20 via-transparent to-wayne-bg"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wayne-bg/40 to-wayne-bg"></div>
                </div>
                <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-top-12 duration-1000">
                    <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter drop-shadow-2xl text-white">{title}</h1>
                    <div className="flex items-center justify-center space-x-6 mt-8">
                        <span className="w-16 h-[1px] bg-wayne-teal/50"></span>
                        <p className="text-[10px] uppercase tracking-[0.5em] text-wayne-teal font-black italic">Exquisite Selection</p>
                        <span className="w-16 h-[1px] bg-wayne-teal/50"></span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16">
                {/* Sidebar Filters - Narrower as requested */}
                <aside className="w-full lg:w-56 flex-shrink-0 lg:sticky lg:top-32 h-fit">
                    <div className="space-y-8 bg-wayne-card p-6 border border-wayne-border shadow-2xl">
                        <div className="flex justify-between items-center border-b border-wayne-border pb-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">Filter</h3>
                            {(activeBrand !== 'All' || priceRange < 5000000) && (
                                <button onClick={() => { setActiveBrand('All'); setPriceRange(5000000); }} className="text-[9px] text-wayne-teal uppercase font-black hover:text-white transition-colors">Reset</button>
                            )}
                        </div>

                        {/* Brand Filter */}
                        <div className="flex flex-col">
                            <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-wayne-text-muted mb-4">Brands</h4>
                            <div className={`flex flex-col space-y-1 ${showAllBrands ? 'max-h-[220px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
                                {displayBrands.map(brand => (
                                    <button
                                        key={brand}
                                        onClick={() => setActiveBrand(brand)}
                                        className={`block w-full text-left text-[10px] uppercase tracking-[0.2em] transition-all duration-300 font-bold py-1.5 border-l-[1px] ${activeBrand === brand ? 'text-wayne-teal pl-3 border-wayne-teal' : 'text-gray-500 hover:text-white hover:pl-2 border-transparent hover:border-wayne-teal/30'}`}
                                    >
                                        {brand}
                                    </button>
                                ))}
                            </div>
                            {brands.length > 10 && (
                                <button
                                    onClick={() => setShowAllBrands(!showAllBrands)}
                                    className="text-[9px] text-wayne-teal uppercase font-black tracking-[0.4em] mt-3 hover:text-white transition-colors flex items-center group w-fit"
                                >
                                    <span className="transform group-hover:scale-105 transition-transform">{showAllBrands ? '[-] Less' : `[+] More (${brands.length - 10})`}</span>
                                </button>
                            )}
                        </div>

                        {/* Price Filter */}
                        <div className="pt-2 border-t border-wayne-border">
                            <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-wayne-text-muted mt-4 mb-4">Price Range</h4>
                            <input
                                type="range"
                                min="10000"
                                max="5000000"
                                step="10000"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full accent-wayne-teal bg-wayne-border h-1 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between mt-3 text-[10px] font-bold text-white tracking-[0.1em]">
                                <span>{formatPrice(10000)}</span>
                                <span className="text-wayne-teal font-black">UP TO {formatPrice(priceRange)}</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <div className="bg-wayne-teal/5 p-3 border border-wayne-teal/20">
                                <p className="text-[8px] text-wayne-teal uppercase tracking-[0.2em] leading-relaxed font-bold">
                                    All timepieces include a 2-year warranty.
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <div className="flex-grow">
                    {filteredWatches.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredWatches.map((watch, index) => (
                                <div key={watch.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both" style={{ animationDelay: `${index * 50}ms` }}>
                                    <WatchCard watch={watch} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-[400px] flex flex-col items-center justify-center text-center bg-wayne-card border border-wayne-border p-12">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-wayne-teal mb-6 opacity-40"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">No results found</h3>
                            <p className="text-wayne-text-muted text-sm max-w-xs">We couldn't find any watches matching your current filters. Try adjusting your selection.</p>
                            <button onClick={() => { setActiveBrand('All'); setPriceRange(5000000); }} className="mt-8 text-[10px] uppercase tracking-[0.3em] font-bold text-wayne-teal hover:text-white transition-colors">Clear all filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
