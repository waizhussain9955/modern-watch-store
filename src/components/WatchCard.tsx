import { useCart } from '../context/CartContext';
import type { Watch } from '../types';

interface WatchCardProps {
    watch: Watch;
}

const WatchCard = ({ watch }: WatchCardProps) => {
    const { addToCart, formatPrice } = useCart();

    return (
        <div className="bg-wayne-card border border-wayne-border group overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-wayne-teal/10 transition-all duration-700 rounded-sm">
            {/* Image Container - Full cover as requested, dark themed */}
            <div className="relative aspect-square overflow-hidden bg-wayne-black">
                <img
                    src={watch.image}
                    alt={watch.name}
                    className="relative z-10 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1547996160-81dfa63595dd?q=80&w=300&auto=format&fit=crop';
                    }}
                />

                {/* Overlay with Quick Add */}
                <div className="absolute inset-0 bg-wayne-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8 z-20">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(watch);
                        }}
                        className="bg-wayne-teal text-white text-[10px] uppercase font-bold tracking-widest px-8 py-3 shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-700 hover:bg-white hover:text-wayne-black active:scale-95"
                    >
                        Quick Add
                    </button>
                </div>

                {watch.onSale && (
                    <div className="absolute top-4 right-4 bg-wayne-teal text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest z-20 shadow-lg border border-white/20">
                        Sale
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-8 flex flex-col flex-grow bg-wayne-card border-t border-wayne-border">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-wayne-text-muted font-bold">{watch.brand}</span>
                    {watch.category === 'Luxury' && (
                        <span className="text-[8px] bg-wayne-teal/10 border border-wayne-teal/30 text-wayne-teal px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Premium</span>
                    )}
                </div>

                <h3 className="text-base font-bold uppercase tracking-wider mb-1 line-clamp-1 group-hover:text-wayne-teal transition-colors font-sans text-white">{watch.name}</h3>
                <p className="text-[10px] text-wayne-text-muted uppercase tracking-widest mb-6 font-medium italic">{watch.collection} Collection</p>

                <div className="mt-auto pt-6 border-t border-wayne-border flex items-center justify-between">
                    <div className="flex flex-col text-white">
                        {watch.onSale && watch.discountPrice ? (
                            <>
                                <span className="text-wayne-teal font-bold text-lg leading-none">{formatPrice(watch.discountPrice)}</span>
                                <span className="text-gray-500 line-through text-[10px] mt-1">{formatPrice(watch.price)}</span>
                            </>
                        ) : (
                            <span className="font-bold text-lg leading-none">{formatPrice(watch.price)}</span>
                        )}
                    </div>
                    <button
                        onClick={() => addToCart(watch)}
                        className="p-3 bg-wayne-border text-white hover:bg-wayne-teal hover:text-white transition-all duration-300 rounded-full border border-transparent hover:border-wayne-teal group-hover:shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WatchCard;
