import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  onCheckout 
}) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, isLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-texting">Carrito de Compras</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <p className="text-gray-400 mt-2">Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={item.product?.imageUrl || '/placeholder-image.jpg'}
                    alt={item.product?.title || 'Producto'}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-texting">
                      {item.product?.title || 'Producto'}
                    </h3>
                    <p className="text-gray-600">
                      {formatPrice(item.product?.price || 0)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={isLoading}
                      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={isLoading}
                      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-texting">
                      {formatPrice((item.product?.price || 0) * item.quantity)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    disabled={isLoading}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-texting">Total:</span>
              <span className="text-xl font-bold text-primary">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 font-semibold"
              >
                {isLoading ? 'Procesando...' : 'Proceder al Checkout'}
              </button>
              
              <button
                onClick={onClose}
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};