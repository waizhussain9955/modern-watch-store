import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, currency, setCurrency, formatPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-wayne-bg">
        <div className="relative mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-wayne-teal opacity-20"><circle cx="6" cy="19" r="3" /><circle cx="17" cy="19" r="3" /><path d="M7 17h14l.05-1.95L21 9H6.15l-1-5H2" /><path d="m16 22-6-6" /><path d="m10 22 6-6" /></svg>
          <div className="absolute inset-0 bg-wayne-teal/5 blur-3xl rounded-full scale-150"></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-4 text-white">Your Collection is Waiting</h2>
        <p className="text-wayne-text-muted mb-10 max-w-xs uppercase text-[11px] tracking-[0.2em] font-medium leading-relaxed">It seems your curated selection is currently empty. Explore our latest acquisitions.</p>
        <Link to="/allwatches" className="btn-primary px-12 py-4">Explore Collection</Link>
      </div>
    );
  }

  return (
    <div className="bg-wayne-bg min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-wayne-border pb-8">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white">
            Shopping <span className="text-wayne-teal">Bag</span>
          </h1>
          <div className="flex items-center gap-8 mt-4 md:mt-0">
            {/* Premium Currency Toggle */}
            <div className="bg-wayne-black border border-wayne-border p-1 flex items-center">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-1.5 text-[10px] font-black tracking-widest transition-all ${currency === 'USD' ? 'bg-wayne-teal text-white' : 'text-gray-500 hover:text-white'}`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-4 py-1.5 text-[10px] font-black tracking-widest transition-all ${currency === 'INR' ? 'bg-wayne-teal text-white' : 'text-gray-500 hover:text-white'}`}
              >
                INR
              </button>
            </div>
            <span className="text-xs font-bold text-wayne-teal uppercase tracking-[0.4em]">{totalItems} Acquisitions</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div key={item.id} className="bg-wayne-card border border-wayne-border p-8 flex flex-col sm:flex-row items-center gap-10 group shadow-2xl hover:border-wayne-teal/30 transition-all duration-500">
                <div className="w-32 h-32 flex-shrink-0 bg-wayne-black p-4 border border-wayne-border group-hover:bg-black transition-colors">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex-grow text-center sm:text-left">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-wayne-teal mb-3 font-black underline decoration-wayne-teal/30 underline-offset-4">{item.brand}</p>
                  <h3 className="text-xl font-bold mb-2 text-white uppercase tracking-wider">{item.name}</h3>
                  <p className="text-[10px] text-wayne-text-muted uppercase tracking-[0.2em] font-bold italic">{item.collection} Series | {item.gender}'s</p>
                </div>

                <div className="flex items-center space-x-10">
                  <div className="flex items-center bg-wayne-black border border-wayne-border px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 text-gray-500 hover:text-wayne-teal transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="px-5 py-2 font-bold text-sm min-w-[50px] text-center text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 text-gray-500 hover:text-wayne-teal transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[120px]">
                    <p className="text-xl font-bold text-white tracking-tight">{formatPrice(item.price * item.quantity)}</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-600 hover:text-red-500 transition-colors p-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-wayne-card border border-wayne-border p-10 sticky top-32 shadow-2xl glassmorphism">
              <h2 className="text-2xl font-bold uppercase tracking-tighter mb-10 border-b border-wayne-border pb-6 text-white">Acquisition <span className="text-wayne-teal">Summary</span></h2>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-wayne-text-muted font-bold">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="text-white">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-wayne-text-muted font-bold">
                  <span>Concierge Delivery</span>
                  <span className="text-wayne-teal">Complimentary</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-wayne-text-muted font-bold">
                  <span>Tax (Included)</span>
                  <span className="text-white">Calculated</span>
                </div>
                <div className="pt-6 border-t border-wayne-border flex justify-between items-baseline">
                  <span className="font-black uppercase tracking-[0.3em] text-red-500/80 text-[10px]">Total Investment</span>
                  <span className="text-4xl font-bold text-wayne-teal tracking-tighter">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full btn-primary py-5 text-sm font-black shadow-[0_10px_30px_-10px_rgba(0,163,193,0.5)]">Authorize Checkout</button>
                <Link to="/allwatches" className="w-full btn-outline py-5 flex justify-center border-white/20 text-white hover:bg-white/10 text-xs font-bold">Return to Vault</Link>
              </div>

              <div className="mt-12 pt-8 border-t border-wayne-border text-center">
                <p className="text-[9px] uppercase tracking-[0.4em] text-wayne-teal font-black mb-6">Secured Transactions Only</p>
                <div className="flex justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                  <span className="text-xs font-serif font-black italic tracking-tighter">AMEX</span>
                  <span className="text-xs font-serif font-black italic tracking-tighter">BITCOIN</span>
                  <span className="text-xs font-serif font-black italic tracking-tighter">ETHER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;