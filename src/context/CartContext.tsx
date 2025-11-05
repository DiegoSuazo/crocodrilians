import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../interface/product';
import { useAuth } from './AuthContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load cart from localStorage for non-authenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, [isAuthenticated]);

  // Save cart to localStorage for non-authenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  // Load cart from server for authenticated users
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCartFromServer();
    }
  }, [isAuthenticated, user]);

  const loadCartFromServer = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.data.items);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity: number) => {
    try {
      setIsLoading(true);
      
      if (isAuthenticated) {
        // Add to server cart
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            productId: product.id,
            quantity: quantity,
          }),
        });
        
        if (response.ok) {
          await loadCartFromServer();
        }
      } else {
        // Add to local cart
        const existingItem = cartItems.find(item => item.productId === product.id);
        
        if (existingItem) {
          setCartItems(prev =>
            prev.map(item =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          );
        } else {
          const newItem: CartItem = {
            id: Date.now().toString(),
            userId: '',
            productId: product.id,
            quantity: quantity,
            createdAt: new Date(),
            updatedAt: new Date(),
            product: product,
          };
          setCartItems(prev => [...prev, newItem]);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setIsLoading(true);
      
      if (isAuthenticated) {
        // Find the cart item ID first
        const item = cartItems.find(item => item.productId === productId);
        if (!item) return;
        
        const response = await fetch(`/api/cart/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.ok) {
          await loadCartFromServer();
        }
      } else {
        setCartItems(prev => prev.filter(item => item.productId !== productId));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      setIsLoading(true);
      
      if (isAuthenticated) {
        // Find the cart item ID first
        const item = cartItems.find(item => item.productId === productId);
        if (!item) return;
        
        const response = await fetch(`/api/cart/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            quantity: quantity,
          }),
        });
        
        if (response.ok) {
          await loadCartFromServer();
        }
      } else {
        setCartItems(prev =>
          prev.map(item =>
            item.productId === productId
              ? { ...item, quantity: quantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      
      if (isAuthenticated) {
        // Clear server cart
        const response = await fetch('/api/cart', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.ok) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isLoading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};