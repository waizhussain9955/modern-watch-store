const Store = () => {
  const flagshipStores = [
    { city: 'London', address: '17-19 New Bond Street, W1S 3AL', phone: '+44 20 7493 2714', hours: '10:00 AM - 6:30 PM' },
    { city: 'Paris', address: '12 Place Vendôme, 75001', phone: '+33 1 55 04 60 00', hours: '11:00 AM - 7:00 PM' },
    { city: 'Dubai', address: 'The Dubai Mall, Fashion Avenue', phone: '+971 4 339 8000', hours: '10:00 AM - 11:00 PM' }
  ];

  return (
    <div className="bg-wayne-bg min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Hero section */}
        <header className="text-center mb-24 space-y-4 max-w-2xl mx-auto">
          <h2 className="text-wayne-teal text-[10px] font-black uppercase tracking-[0.6em] animate-in slide-in-from-top-4 duration-700">Flagship Presence</h2>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white animate-in slide-in-from-bottom-4 duration-700">Global <span className="text-wayne-teal">Boutiques</span></h1>
          <p className="text-wayne-text-muted text-sm italic font-medium pt-4 animate-in fade-in duration-1000 delay-300">
            "A sanctuary for the world's finest timepieces, where heritage meets modern luxury."
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          {/* ... existing locator code ... */}
          <div className="lg:col-span-1 space-y-12">
            <div className="bg-wayne-card border border-wayne-border p-10 shadow-2xl space-y-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-wayne-teal/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-wayne-teal/10 transition-colors duration-700"></div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-white flex items-center">
                <span className="w-8 h-[1px] bg-wayne-teal mr-4"></span>
                Find a Store
              </h3>

              <div className="space-y-6">
                {/* Selects */}
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-black text-wayne-text-muted">Select Region</label>
                  <select className="w-full bg-wayne-black border border-wayne-border p-4 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-wayne-teal transition-colors rounded-none appearance-none">
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                    <option>Dubai Emirate</option>
                    <option>Île-de-France</option>
                    <option>Greater London</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-black text-wayne-text-muted">Select City</label>
                  <select className="w-full bg-wayne-black border border-wayne-border p-4 text-xs font-bold text-white uppercase tracking-widest focus:outline-none focus:border-wayne-teal transition-colors rounded-none appearance-none">
                    <option>Mumbai</option>
                    <option>New Delhi</option>
                    <option>Dubai</option>
                    <option>Paris</option>
                    <option>London</option>
                  </select>
                </div>
                <button className="w-full btn-primary py-4 mt-4 font-black transition-all active:scale-[0.98]">Search Boutiques</button>
              </div>

              <div className="pt-8 border-t border-wayne-border">
                <h4 className="text-[9px] uppercase tracking-[0.3em] font-black text-wayne-teal mb-4">Concierge Service</h4>
                <p className="text-[10px] text-wayne-text-muted leading-relaxed uppercase tracking-widest font-bold">
                  Book a private viewing with our master horologists for a personalized experience.
                </p>
                <button className="text-[9px] uppercase tracking-[0.3em] font-black text-white mt-4 border-b border-wayne-teal pb-1 hover:text-wayne-teal transition-colors">Request Callback</button>
              </div>
            </div>

            {/* Virtual Tour Card */}
            <div className="bg-gradient-to-br from-wayne-black to-wayne-card border border-wayne-border p-8 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-white text-lg font-bold uppercase tracking-tighter mb-2">Virtual Boutique</h4>
                <p className="text-wayne-text-muted text-[10px] uppercase tracking-widest font-bold mb-6">Experience our London flagship in 360° immersive 4K.</p>
                <button className="flex items-center text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2 border border-wayne-border hover:border-wayne-teal transition-all group-hover:bg-wayne-teal/5">
                  <span className="mr-2">▶</span> Start Tour
                </button>
              </div>
              <div className="absolute inset-0 bg-wayne-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {flagshipStores.map((store, index) => (
              <div key={store.city} className="bg-wayne-card border border-wayne-border p-8 group hover:border-wayne-teal/30 transition-all duration-700 animate-in fade-in slide-in-from-right-8 relative overflow-hidden" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-wayne-teal/5 -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-wayne-teal/10 transition-all duration-700"></div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white group-hover:text-wayne-teal transition-colors duration-500">{store.city}</h3>
                  <span className="text-[8px] border border-wayne-teal/40 text-wayne-teal px-3 py-1 rounded-full font-black uppercase tracking-widest">Flagship</span>
                </div>
                <div className="space-y-4 text-xs text-wayne-text-muted font-medium uppercase tracking-[0.15em] relative z-10">
                  <p className="flex items-center group-hover:text-white transition-colors duration-500"><span className="w-5 h-5 mr-3 opacity-30 group-hover:opacity-100 group-hover:text-wayne-teal transition-all flex items-center justify-center">○</span> {store.address}</p>
                  <p className="flex items-center group-hover:text-white transition-colors duration-500"><span className="w-5 h-5 mr-3 opacity-30 group-hover:opacity-100 group-hover:text-wayne-teal transition-all flex items-center justify-center">○</span> {store.phone}</p>
                  <p className="flex items-center group-hover:text-white transition-colors duration-500"><span className="w-5 h-5 mr-3 opacity-30 group-hover:opacity-100 group-hover:text-wayne-teal transition-all flex items-center justify-center">○</span> {store.hours}</p>
                </div>
                <div className="mt-8 pt-8 border-t border-wayne-border opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 relative z-10">
                  <button className="text-[10px] font-black uppercase tracking-widest text-wayne-teal flex items-center group/btn">
                    Get Directions <span className="ml-2 transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;