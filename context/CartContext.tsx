import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { CartItem, Product } from '../types';
import { useAuth } from '../hooks/useAuth';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const storageKey = user ? `eagleseye_cart_${user.id}` : null;

  useEffect(() => {
    if (storageKey) {
      try {
        const storedCart = localStorage.getItem(storageKey);
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        } else {
           setCartItems([]);
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  }, [storageKey]);

  const saveCart = (items: CartItem[]) => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
    setCartItems(items);
  };

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    let newItems;
    if (existingItem) {
      newItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...cartItems, { ...product, quantity: 1 }];
    }
    saveCart(newItems);
  };

  const removeFromCart = (productId: string) => {
    const newItems = cartItems.filter(item => item.id !== productId);
    saveCart(newItems);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    saveCart(newItems);
  };
  
  const clearCart = () => {
      saveCart([]);
  }

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if(context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}