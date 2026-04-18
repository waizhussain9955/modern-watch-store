import { useState, useMemo } from 'react';
import { WATCH_COLLECTION } from '../types';
import WatchCard from '../components/WatchCard';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredWatches = useMemo(() => {
        return WATCH_COLLECTION.filter(watch =>
            watch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            watch.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            watch.collection.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <div className="bg-wayne-bg min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Search Header */}
                <div className="max-w-4xl mx-auto mb-20 text-center space-y-10 animate-in fade-in slide-in-from-top-8 duration-1000">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">
                            Search <span className="text-wayne-teal">Vault</span>
                        </h1>
                        <p className="text-wayne-text-muted text-[11px] uppercase tracking-[0.5em] font-black">Locate your masterpiece</p>
                    </div>

                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="SEARCH BY BRAND, SERIES, OR NAME..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-wayne-black border-b-2 border-wayne-border px-8 py-6 text-xl md:text-2xl font-serif text-white placeholder-gray-500 focus:outline-none focus:border-wayne-teal transition-all duration-700 tracking-tight"
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-wayne-teal group-focus-within:w-full transition-all duration-1000"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-wayne-teal transition-colors"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {['Rolex', 'Patek', 'Royal Oak', 'Golden', 'Sport'].map(term => (
                            <button
                                key={term}
                                onClick={() => setSearchQuery(term)}
                                className="text-[10px] uppercase tracking-widest font-black text-gray-500 hover:text-white hover:bg-wayne-teal/20 border border-wayne-border px-4 py-2 hover:border-wayne-teal/30 transition-all duration-500 rounded-full"
                            >
                                # {term}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Section */}
                <div className="">
                    <div className="flex justify-between items-baseline mb-12 border-b border-wayne-border pb-6">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-wayne-teal">Search Results</h2>
                        <span className="text-[10px] font-bold text-wayne-text-muted uppercase tracking-widest">{filteredWatches.length} Matches Found</span>
                    </div>

                    {filteredWatches.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {filteredWatches.map((watch, index) => (
                                <div key={watch.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: `${index * 50}ms` }}>
                                    <WatchCard watch={watch} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center bg-wayne-card border border-wayne-border rounded-sm max-w-2xl mx-auto shadow-2xl">
                            <div className="relative mb-8 inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-wayne-teal opacity-20"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="M11 8v6" /><path d="M8 11h6" /></svg>
                                <div className="absolute inset-0 bg-wayne-teal/5 blur-2xl rounded-full"></div>
                            </div>
                            <h3 className="text-2xl font-bold uppercase tracking-widest mb-4 text-white">Entry Not Found</h3>
                            <p className="text-wayne-text-muted text-[11px] uppercase tracking-widest leading-relaxed max-w-xs mx-auto">Our current vault acquisitions do not match your inquiry. Please try a different specification.</p>
                            <button onClick={() => setSearchQuery('')} className="mt-10 text-[10px] uppercase font-black text-wayne-teal border-b border-wayne-teal pb-2 hover:text-white hover:border-white transition-all">Reset Vault Inquiry</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;