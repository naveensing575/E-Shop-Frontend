import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cartCount: number;
  updateCartCount: (count: number) => void;
  handleCartUpdate: (quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = (count: number) => {
    setCartCount(count);
  };

  // Function to handle updating cart count based on addition, removal, or deletion
  const handleCartUpdate = (quantity: number) => {
    setCartCount((prevCount) => prevCount + quantity);
  };

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
