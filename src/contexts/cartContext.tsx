import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartContextType {
  cartCount: number;
  updateCartCount: (count: number) => void;
  handleCartUpdate: (quantity: number) => void;
}

const CART_STORAGE_KEY = 'cartCount';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartCount, setCartCount] = useState<number>(() => {
    const storedCount = localStorage.getItem(CART_STORAGE_KEY);
    return storedCount ? parseInt(storedCount, 10) : 0;
  });

  const updateCartCount = (count: number) => {
    setCartCount(count);
  };

  // Function to handle updating cart count based on addition, removal, or deletion
  const handleCartUpdate = (quantity: number) => {
    setCartCount((prevCount) => {
      const newCount = prevCount + quantity;
      // Ensure the cart count never goes below zero
      return newCount >= 0 ? newCount : 0;
    });
  };

  // Save cart count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, cartCount.toString());
  }, [cartCount]);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, handleCartUpdate }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
