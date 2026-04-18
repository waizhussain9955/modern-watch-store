import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Haversine formula to calculate distance in kilometers
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
};

// Custom Marker Component to handle centering
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'HERITAGE PRODUCT ACQUISITION',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [nearestBoutique, setNearestBoutique] = useState<{ city: string, distance: string } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const boutiques = [
    { city: 'MUMBAI', location: 'Modern Tower, Level 42', phone: '+91 1800 202 2026', email: 'mumbai@modernwatch.com', hours: '10:00 - 20:00', lat: 18.9221, lng: 72.8341 },
    { city: 'LONDON', location: '17-19 New Bond Street', phone: '+44 20 7493 2714', email: 'london@modernwatch.com', hours: '10:00 - 18:30', lat: 51.5235, lng: -0.1444 },
    { city: 'DUBAI', location: 'The Dubai Mall, Fashion Avenue', phone: '+971 4 339 8000', email: 'dubai@modernwatch.com', hours: '10:00 - 23:00', lat: 25.1972, lng: 55.2744 },
    { city: 'PARIS', location: '12 Place Vendôme', phone: '+33 1 55 04 60 00', email: 'paris@modernwatch.com', hours: '11:00 - 19:00', lat: 48.8675, lng: 2.3292 }
  ];

  const handleLocateUser = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);

          let minDistance = Infinity;
          let nearest = "";

          boutiques.forEach(boutique => {
            const dist = parseFloat(calculateDistance(latitude, longitude, boutique.lat, boutique.lng));
            if (dist < minDistance) {
              minDistance = dist;
              nearest = boutique.city;
            }
          });

          setNearestBoutique({ city: nearest, distance: minDistance.toString() });
          setIsLocating(false);
        },
        () => {
          setIsLocating(false);
          alert("Unable to retrieve location. Please check permissions.");
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Create WhatsApp message
    const whatsappMessage = `New inquiry from ${formState.name}:\nEmail: ${formState.email}\nSubject: ${formState.subject}\nMessage: ${formState.message}`;
    const whatsappUrl = `https://wa.me/923272051549?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Create email subject
    const emailSubject = encodeURIComponent(formState.subject);
    const emailBody = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    const emailUrl = `mailto:modernwatch@store.com?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      setStatus('success');
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Also open email client
      window.location.href = emailUrl;
      
      setFormState({ name: '', email: '', subject: 'HERITAGE PRODUCT ACQUISITION', message: '' });
    }, 2000);
  };

  // Custom icon for boutiques
  const boutiqueIcon = L.divIcon({
    className: 'custom-icon',
    html: `<div class="w-6 h-6 bg-wayne-teal rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
             <div class="w-2 h-2 bg-white rounded-full"></div>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  // Custom icon for user
  const userIcon = L.divIcon({
    className: 'user-icon',
    html: `<div class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg shadow-emerald-500/50">
             <div class="w-2 h-2 bg-white rounded-full"></div>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  return (
    <div className="bg-wayne-bg min-h-screen pt-32 pb-24 relative overflow-hidden selection:bg-wayne-teal/30">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-gradient-to-b from-wayne-teal/15 via-transparent to-transparent pointer-events-none"></div>

      {/* Animated noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className={`mb-32 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-12 bg-wayne-teal/50"></span>
              <h4 className="text-wayne-teal text-[10px] font-black uppercase tracking-[0.8em]">Global Network</h4>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter text-white leading-[0.8] mb-12">
              Bespoke <br />
              <span className="text-wayne-teal font-serif italic lowercase tracking-normal bg-clip-text">Concierge</span>
            </h1>
            <p className="text-wayne-text-muted text-[11px] uppercase tracking-[0.6em] font-black max-w-2xl leading-relaxed">
              Our presence spans the globe's most prestigious avenues, offering an unparalleled gateway to the world of fine horology.
            </p>
          </div>

          {/* Real Interactive Map Section */}
          <div className="mb-40 relative group h-[400px] md:h-[550px] bg-wayne-card border border-wayne-border rounded-sm overflow-hidden shadow-2xl">
            {/* Precision Navigation - Moved to right side */}
            <div className="absolute top-6 right-6 z-[1000] p-6 bg-wayne-black/90 backdrop-blur-md border border-wayne-border rounded-sm max-w-xs transition-all duration-500 hover:shadow-cyan-500/10 shadow-2xl">
              <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4">Precision Navigation</h4>
              <div className="space-y-4">
                <button
                  onClick={handleLocateUser}
                  disabled={isLocating}
                  className="w-full bg-wayne-teal/10 border border-wayne-teal/30 text-wayne-teal py-3 px-4 text-[9px] font-black uppercase tracking-widest hover:bg-wayne-teal hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isLocating ? 'LOCATING...' : 'GET MY LOCATION'}
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>
                </button>

                {nearestBoutique && (
                  <div className="pt-4 border-t border-wayne-border/50 animate-in fade-in slide-in-from-top-2">
                    <p className="text-wayne-text-muted text-[9px] font-black uppercase tracking-[.2em] mb-2">Nearest Sanctuary:</p>
                    <p className="text-white text-sm font-bold uppercase tracking-tighter mb-1">{nearestBoutique.city}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-wayne-teal text-[10px] font-bold tracking-widest">{nearestBoutique.distance} KM</span>
                      <span className="text-wayne-text-muted text-[8px] uppercase tracking-widest font-black">FROM CURRENT POSITION</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <MapContainer
              center={[30, 0]}
              zoom={2}
              className="w-full h-full transition-all duration-[1s]"
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />

              {boutiques.map((bot) => (
                <Marker key={bot.city} position={[bot.lat, bot.lng]} icon={boutiqueIcon}>
                  <Popup>
                    <div className="bg-wayne-black p-2 min-w-[150px]">
                      <h4 className="text-wayne-teal text-[10px] font-black uppercase tracking-widest border-b border-wayne-border pb-1 mb-2">{bot.city}</h4>
                      <p className="text-white text-[10px] font-bold uppercase tracking-tight">{bot.location}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {userLocation && (
                <>
                  <Marker position={userLocation} icon={userIcon}>
                    <Popup>
                      <span className="text-[10px] font-black uppercase tracking-widest">You are here</span>
                    </Popup>
                  </Marker>
                  <MapController center={userLocation} />
                </>
              )}
            </MapContainer>

            <div className="absolute bottom-12 right-12 z-[1000] pointer-events-none hidden md:block">
              {/* Clean interface */}
            </div>
          </div>

          {/* Boutique Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-40">
            {boutiques.map((bot, idx) => (
              <div
                key={bot.city}
                className="bg-wayne-card/50 border border-wayne-border p-10 hover:border-wayne-teal/40 transition-all duration-700 group relative overflow-hidden backdrop-blur-sm"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-wayne-teal/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-wayne-teal/10 transition-all duration-700"></div>
                <div className="flex justify-between items-start mb-12">
                  <h3 className="text-2xl font-bold uppercase tracking-tighter text-white group-hover:text-wayne-teal transition-colors">{bot.city}</h3>
                  <span className="text-[10px] text-wayne-teal/40 font-black">0{idx + 1}</span>
                </div>

                <div className="space-y-8 text-[10px] uppercase tracking-[0.2em] font-bold text-wayne-text-muted">
                  <div className="group/item">
                    <p className="text-white/40 mb-2 group-hover/item:text-wayne-teal/60 transition-colors">Location</p>
                    <p className="text-white leading-relaxed">{bot.location}</p>
                  </div>
                  <div className="group/item">
                    <p className="text-white/40 mb-2 group-hover/item:text-wayne-teal/60 transition-colors">Direct Link</p>
                    <p className="text-white">{bot.phone}</p>
                    <p className="lowercase tracking-normal text-wayne-teal/80 mt-1">{bot.email}</p>
                  </div>
                  <div className="flex justify-between items-end pt-8 border-t border-wayne-border/50">
                    <div>
                      <p className="text-white/40 mb-1">Status</p>
                      <p className="text-emerald-500">Open Now</p>
                    </div>
                    <button className="text-[9px] font-black text-wayne-teal hover:text-white transition-colors cursor-pointer">DIRECTIONS →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inquiry Protocol Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-wayne-border bg-wayne-card/80 backdrop-blur-md shadow-[0_0_100px_rgba(0,163,193,0.05)] overflow-hidden mb-40">
            {/* Visual Side */}
            <div className="lg:col-span-5 relative h-[500px] lg:h-auto overflow-hidden group">
              <img
                src="/images/generated/lifestyle_heritage.png"
                alt="Boutique Atmosphere"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[10s] grayscale brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-wayne-card via-wayne-card/20 to-transparent lg:bg-gradient-to-b"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-16">
                <div className="mb-8 w-12 h-12 border border-wayne-teal/30 flex items-center justify-center rounded-sm">
                  <div className="w-1.5 h-1.5 bg-wayne-teal animate-pulse"></div>
                </div>
                <h4 className="text-4xl font-bold uppercase tracking-tighter text-white mb-4 leading-none">The Collector's <br />Protocol</h4>
                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-wayne-teal mb-10 italic">Secure Correspondence Channel</p>
                <div className="grid grid-cols-2 gap-8 opacity-40 text-[9px] uppercase tracking-widest text-white font-bold">
                  <div>
                    <p className="mb-2">● Acquisition</p>
                    <p>● Curation</p>
                  </div>
                  <div>
                    <p className="mb-2">● Valuation</p>
                    <p>● Heritage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7 p-12 md:p-24 relative">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-700">
                  <div className="relative">
                    <div className="absolute inset-0 bg-wayne-teal/20 blur-2xl rounded-full"></div>
                    <div className="w-24 h-24 bg-wayne-teal/10 rounded-full flex items-center justify-center border border-wayne-teal/30 relative z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-wayne-teal"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold uppercase tracking-tighter text-white">Transmission Received</h3>
                    <p className="text-wayne-text-muted text-[11px] uppercase tracking-[0.4em] max-w-sm mx-auto leading-relaxed">Identity verified. Your request is being processed through the Wayne Private Clients department. Expect contact within 12h.</p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-wayne-teal hover:text-white transition-all"
                  >
                    <span>Send Another Protocol</span>
                    <span className="w-8 h-[1px] bg-wayne-teal group-hover:bg-white transition-all"></span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-4 group">
                      <label className="text-[9px] uppercase tracking-[0.5em] font-black text-wayne-text-muted group-focus-within:text-wayne-teal transition-colors">01 / Full Legal Name</label>
                      <input
                        required
                        type="text"
                        placeholder="NAME"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-transparent border-b border-wayne-border py-6 text-white placeholder-white/5 focus:outline-none focus:border-wayne-teal transition-all font-bold text-sm tracking-widest uppercase"
                      />
                    </div>
                    <div className="space-y-4 group">
                      <label className="text-[9px] uppercase tracking-[0.5em] font-black text-wayne-text-muted group-focus-within:text-wayne-teal transition-colors">02 / Secure Email</label>
                      <input
                        required
                        type="email"
                        placeholder="ADDRESS@CLIENT.COM"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-transparent border-b border-wayne-border py-6 text-white placeholder-white/5 focus:outline-none focus:border-wayne-teal transition-all font-bold text-sm tracking-widest uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 group">
                    <label className="text-[9px] uppercase tracking-[0.5em] font-black text-wayne-text-muted group-focus-within:text-wayne-teal transition-colors">03 / Nature of Request</label>
                    <div className="relative">
                      <select
                        className="w-full bg-transparent border-b border-wayne-border py-6 text-white focus:outline-none focus:border-wayne-teal transition-all font-bold text-sm appearance-none cursor-pointer uppercase tracking-widest"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      >
                        <option className="bg-wayne-card text-white">HERITAGE PRODUCT ACQUISITION</option>
                        <option className="bg-wayne-card text-white">PRIVATE COLLECTION VIEWING</option>
                        <option className="bg-wayne-card text-white">CURATION & VALUATION SERVICES</option>
                        <option className="bg-wayne-card text-white">MAINTENANCE & RESTORATION</option>
                      </select>
                      <span className="absolute right-0 bottom-8 pointer-events-none text-wayne-teal/40">↓</span>
                    </div>
                  </div>

                  <div className="space-y-4 group">
                    <label className="text-[9px] uppercase tracking-[0.5em] font-black text-wayne-text-muted group-focus-within:text-wayne-teal transition-colors">04 / Briefing Memo</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="DETAIL YOUR REQUIREMENTS FOR OUR ADVISORS..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-transparent border-b border-wayne-border py-6 text-white placeholder-white/5 focus:outline-none focus:border-wayne-teal transition-all font-bold text-sm resize-none tracking-widest uppercase"
                    />
                  </div>

                  <div className="pt-8">
                    <button
                      disabled={status === 'submitting'}
                      type="submit"
                      className="group relative w-full overflow-hidden border border-wayne-teal bg-transparent py-8 transition-all hover:bg-wayne-teal"
                    >
                      <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.8em] text-wayne-teal group-hover:text-white transition-colors duration-500">
                        {status === 'submitting' ? 'Authenticating...' : 'Submit Credentials'}
                      </span>
                      <div className="absolute top-0 -left-[100%] h-full w-full bg-wayne-teal transition-all duration-500 group-hover:left-0 -z-0"></div>
                    </button>
                    <p className="mt-8 text-center text-[8px] font-bold text-wayne-text-muted uppercase tracking-[0.3em] opacity-40">
                      Private data encryption active ● ISO 27001 Compliant
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* FAQ / Service Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-40">
            <div>
              <h4 className="text-3xl font-bold uppercase tracking-tighter text-white mb-12">Frequent <br />Inquiries</h4>
              <div className="space-y-12">
                {[
                  { q: "How are private viewings arranged?", a: "Private viewings are coordinated through our concierge after a preliminary client verification process." },
                  { q: "Do you offer global collection transport?", a: "Yes, we utilize specialized high-security logistics for the international transport of heritage timepieces." },
                  { q: "What is the valuation lead time?", a: "Standard appraisals require 3-5 business days; heritage documentation may take up to 3 weeks." }
                ].map((item) => (
                  <div key={item.q} className="group cursor-help">
                    <p className="text-wayne-teal text-[10px] font-black uppercase tracking-widest mb-3">{item.q}</p>
                    <p className="text-wayne-text-muted text-[11px] uppercase tracking-wider font-bold leading-relaxed group-hover:text-white transition-colors">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-wayne-card border border-wayne-border p-16 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-1 h-full bg-wayne-teal"></div>
              <h4 className="text-2xl font-bold uppercase tracking-tighter text-white mb-6">Heritage Care Lab</h4>
              <p className="text-wayne-text-muted text-[11px] uppercase tracking-widest font-black mb-10 leading-relaxed">
                Our master watchmakers in Geneva provide world-class restoration services for timepieces that have ceased to function or require aesthetic preservation.
              </p>
              <div className="flex gap-4">
                <div className="h-24 w-[1px] bg-wayne-border"></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.3em]">Precision Certification</p>
                  <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.3em]">Atmospheric Calibration</p>
                  <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.3em]">Historical Archive Match</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mb-40">
            <div className="text-center mb-16">
              <h4 className="text-4xl font-bold uppercase tracking-tighter text-white mb-8">Connect With Us</h4>
              <p className="text-wayne-text-muted text-[11px] uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
                Follow our journey and stay updated with the latest collections and exclusive offers through our social media channels.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <a href="https://www.instagram.com/waiz_hussain_/" target="_blank" rel="noopener noreferrer" className="bg-wayne-card/50 border border-wayne-border p-8 hover:border-wayne-teal/40 transition-all duration-700 group relative overflow-hidden backdrop-blur-sm text-center">
                <div className="flex flex-col items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wayne-teal group-hover:scale-110 transition-transform"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-wayne-teal transition-colors">Instagram</span>
                </div>
              </a>
              <a href="https://www.facebook.com/waiz.hussain.ansari.2025/" target="_blank" rel="noopener noreferrer" className="bg-wayne-card/50 border border-wayne-border p-8 hover:border-wayne-teal/40 transition-all duration-700 group relative overflow-hidden backdrop-blur-sm text-center">
                <div className="flex flex-col items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wayne-teal group-hover:scale-110 transition-transform"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-wayne-teal transition-colors">Facebook</span>
                </div>
              </a>
              <a href="https://www.threads.com/@waiz_hussain_?xmt=AQF0em6vQhOH5Z8yXuW031kli1vmAf6YKtiKyQL87Daux74" target="_blank" rel="noopener noreferrer" className="bg-wayne-card/50 border border-wayne-border p-8 hover:border-wayne-teal/40 transition-all duration-700 group relative overflow-hidden backdrop-blur-sm text-center">
                <div className="flex flex-col items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-wayne-teal group-hover:scale-110 transition-transform"><path d="M18.25 11.75c0 4.56-3.69 8.25-8.25 8.25-4.56 0-8.25-3.69-8.25-8.25C1.75 7.19 5.44 3.5 10 3.5c4.56 0 8.25 3.69 8.25 8.25zm-8.25-7c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 2.5c.41 0 .75.34.75.75v3.25h3.25c.41 0 .75.34.75.75s-.34.75-.75.75h-4c-.41 0-.75-.34-.75-.75v-4c0-.41.34-.75.75-.75z"/></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-wayne-teal transition-colors">Threads</span>
                </div>
              </a>
              <a href="https://github.com/waizhussain9955" target="_blank" rel="noopener noreferrer" className="bg-wayne-card/50 border border-wayne-border p-8 hover:border-wayne-teal/40 transition-all duration-700 group relative overflow-hidden backdrop-blur-sm text-center">
                <div className="flex flex-col items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-wayne-teal group-hover:scale-110 transition-transform"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.68 1.68 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-wayne-teal transition-colors">GitHub</span>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/waiz-hussain-6750392ba/" target="_blank" rel="noopener noreferrer" className="bg-wayne-card/50 border border-wayne-border p-8 hover:border-wayne-teal/40 transition-all duration-700 group relative overflow-hidden backdrop-blur-sm text-center">
                <div className="flex flex-col items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-wayne-teal group-hover:scale-110 transition-transform"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.68 1.68 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-wayne-teal transition-colors">LinkedIn</span>
                </div>
              </a>
              <a href="https://wa.me/923272051549" target="_blank" rel="noopener noreferrer" className="bg-wayne-card/50 border border-wayne-border p-8 hover:border-wayne-teal/40 transition-all duration-700 group relative overflow-hidden backdrop-blur-sm text-center">
                <div className="flex flex-col items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-wayne-teal group-hover:scale-110 transition-transform"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-wayne-teal transition-colors">WhatsApp</span>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Contact Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
            <a href="https://wa.me/923272051549?text=Hi!%20I'm%20interested%20in%20your%20watch%20collection.%20Can%20we%20discuss%20further?" target="_blank" rel="noopener noreferrer" className="bg-wayne-teal/10 border border-wayne-teal/30 p-12 hover:bg-wayne-teal hover:text-white transition-all duration-700 group relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-wayne-teal/20 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-wayne-teal group-hover:text-white transition-colors"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold uppercase tracking-tighter text-white mb-2 group-hover:text-white transition-colors">Chat on WhatsApp</h4>
                  <p className="text-wayne-text-muted text-[11px] uppercase tracking-[0.4em] leading-relaxed">Get instant responses for your inquiries and personalized assistance.</p>
                </div>
              </div>
            </a>
            <a href="mailto:modernwatch@store.com?subject=Watch%20Inquiry&body=Hi%20Modern%20Watch%20Store,%0A%0AI'm%20interested%20in%20your%20watch%20collection.%20Could%20you%20please%20provide%20more%20information%20about..." className="bg-wayne-card/50 border border-wayne-border p-12 hover:border-wayne-teal/40 transition-all duration-700 group relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-wayne-teal/10 rounded-full flex items-center justify-center group-hover:bg-wayne-teal/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wayne-teal group-hover:text-white transition-colors"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 5L2 7" /></svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold uppercase tracking-tighter text-white mb-2 group-hover:text-wayne-teal transition-colors">Send Email</h4>
                  <p className="text-wayne-text-muted text-[11px] uppercase tracking-[0.4em] leading-relaxed">Detailed inquiries and formal business communications.</p>
                </div>
              </div>
            </a>
          </div>

          {/* Global Footer Credits */}
          <div className="flex flex-wrap items-center justify-between gap-12 pt-16 border-t border-wayne-border/50">
            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white">Modern Watch Store Global Network</p>
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-wayne-text-muted">Premium Timepieces Worldwide</p>
            </div>
            <div className="flex gap-12">
              {[
                { name: 'Instagram', label: 'IMG', url: 'https://www.instagram.com/waiz_huss_/' },
                { name: 'LinkedIn', label: 'LNK', url: 'https://www.linkedin.com/in/waiz-hussain-6750392ba/' },
                { name: 'GitHub', label: 'GIT', url: 'https://github.com/waizhussain9955' },
                { name: 'WhatsApp', label: 'WAP', url: 'https://wa.me/923272051549' }
              ].map(social => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white group-hover:text-wayne-teal transition-colors">{social.name}</span>
                  <span className="text-[8px] font-bold text-wayne-teal/40 group-hover:text-wayne-teal transition-all">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
