import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Watch } from '../types';

interface CartItem extends Watch {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (watch: Watch) => void;
    removeFromCart: (watchId: string) => void;
    updateQuantity: (watchId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
    totalPrice: number;
    currency: 'USD' | 'INR';
    setCurrency: (currency: 'USD' | 'INR') => void;
    formatPrice: (amount: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('wayne-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('wayne-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (watch: Watch) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === watch.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...watch, quantity: 1 }];
        });
    };

    const removeFromCart = (watchId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== watchId));
    };

    const updateQuantity = (watchId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(watchId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === watchId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
    const exchangeRate = 83;

    const formatPrice = (amount: number) => {
        if (currency === 'USD') {
            const usdAmount = amount / exchangeRate;
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            }).format(usdAmount);
        } else {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(amount);
        }
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = subtotal; // Can add taxes/shipping later

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            subtotal,
            totalPrice,
            currency,
            setCurrency,
            formatPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
