import React, { useState } from 'react';
import { CreditCard, MapPin, Package, ArrowLeft } from 'lucide-react';
import Header from '../common/header';
import Footer from '../common/footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    direccion: {
      calle: '',
      ciudad: '',
      region: '',
      codigo_postal: '',
    },
    metodoPago: 'tarjeta',
    tarjeta: {
      numero: '',
      nombre: '',
      expiracion: '',
      cvv: '',
    },
    notas: '',
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => {
      const currentSection = prev[section as keyof typeof prev] as Record<string, string>;
      return {
        ...prev,
        [section]: {
          ...currentSection,
          [field]: value,
        },
      };
    });
    
    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${section}.${field}`]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate address
    if (!formData.direccion.calle.trim()) {
      newErrors['direccion.calle'] = 'La dirección es requerida';
    }
    if (!formData.direccion.ciudad.trim()) {
      newErrors['direccion.ciudad'] = 'La ciudad es requerida';
    }
    if (!formData.direccion.region.trim()) {
      newErrors['direccion.region'] = 'La región es requerida';
    }
    if (!formData.direccion.codigo_postal.trim()) {
      newErrors['direccion.codigo_postal'] = 'El código postal es requerido';
    }
    
    // Validate payment method
    if (formData.metodoPago === 'tarjeta') {
      if (!formData.tarjeta.numero.trim()) {
        newErrors['tarjeta.numero'] = 'El número de tarjeta es requerido';
      }
      if (!formData.tarjeta.nombre.trim()) {
        newErrors['tarjeta.nombre'] = 'El nombre del titular es requerido';
      }
      if (!formData.tarjeta.expiracion.trim()) {
        newErrors['tarjeta.expiracion'] = 'La fecha de expiración es requerida';
      }
      if (!formData.tarjeta.cvv.trim()) {
        newErrors['tarjeta.cvv'] = 'El CVV es requerido';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // TODO: Process payment and create order
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Clear cart and redirect to success page
      await clearCart();
      alert('¡Pedido realizado con éxito! Recibirás un email de confirmación.');
      navigate('/');
    } catch {
      alert('Error al procesar el pedido. Por favor, intenta de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center mt-32">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">Debes iniciar sesión para realizar una compra</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
            >
              Volver al inicio
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center mt-32">
          <div className="text-center">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 mb-4">Tu carrito está vacío</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
            >
              Continuar comprando
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8 mt-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-texting">Checkout</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="mr-2 text-primary" size={24} />
                    <h2 className="text-xl font-semibold">Dirección de Envío</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección *
                      </label>
                      <input
                        type="text"
                        value={formData.direccion.calle}
                        onChange={(e) => handleInputChange('direccion', 'calle', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors['direccion.calle'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ej: Av. Providencia 123"
                      />
                      {errors['direccion.calle'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['direccion.calle']}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        value={formData.direccion.ciudad}
                        onChange={(e) => handleInputChange('direccion', 'ciudad', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors['direccion.ciudad'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Santiago"
                      />
                      {errors['direccion.ciudad'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['direccion.ciudad']}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Región *
                      </label>
                      <select
                        value={formData.direccion.region}
                        onChange={(e) => handleInputChange('direccion', 'region', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors['direccion.region'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Seleccionar región</option>
                        <option value="Metropolitana">Región Metropolitana</option>
                        <option value="Valparaíso">Región de Valparaíso</option>
                        <option value="Biobío">Región del Biobío</option>
                        {/* Add more regions as needed */}
                      </select>
                      {errors['direccion.region'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['direccion.region']}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        value={formData.direccion.codigo_postal}
                        onChange={(e) => handleInputChange('direccion', 'codigo_postal', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors['direccion.codigo_postal'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="7500000"
                      />
                      {errors['direccion.codigo_postal'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['direccion.codigo_postal']}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <CreditCard className="mr-2 text-primary" size={24} />
                    <h2 className="text-xl font-semibold">Método de Pago</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="metodoPago"
                          value="tarjeta"
                          checked={formData.metodoPago === 'tarjeta'}
                          onChange={(e) => setFormData(prev => ({ ...prev, metodoPago: e.target.value }))}
                          className="mr-2"
                        />
                        Tarjeta de Crédito/Débito
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="metodoPago"
                          value="transferencia"
                          checked={formData.metodoPago === 'transferencia'}
                          onChange={(e) => setFormData(prev => ({ ...prev, metodoPago: e.target.value }))}
                          className="mr-2"
                        />
                        Transferencia Bancaria
                      </label>
                    </div>
                    
                    {formData.metodoPago === 'tarjeta' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Tarjeta *
                          </label>
                          <input
                            type="text"
                            value={formData.tarjeta.numero}
                            onChange={(e) => handleInputChange('tarjeta', 'numero', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                              errors['tarjeta.numero'] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="1234 5678 9012 3456"
                          />
                          {errors['tarjeta.numero'] && (
                            <p className="text-red-500 text-sm mt-1">{errors['tarjeta.numero']}</p>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre del Titular *
                          </label>
                          <input
                            type="text"
                            value={formData.tarjeta.nombre}
                            onChange={(e) => handleInputChange('tarjeta', 'nombre', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                              errors['tarjeta.nombre'] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Juan Pérez"
                          />
                          {errors['tarjeta.nombre'] && (
                            <p className="text-red-500 text-sm mt-1">{errors['tarjeta.nombre']}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de Expiración *
                          </label>
                          <input
                            type="text"
                            value={formData.tarjeta.expiracion}
                            onChange={(e) => handleInputChange('tarjeta', 'expiracion', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                              errors['tarjeta.expiracion'] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="MM/AA"
                          />
                          {errors['tarjeta.expiracion'] && (
                            <p className="text-red-500 text-sm mt-1">{errors['tarjeta.expiracion']}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={formData.tarjeta.cvv}
                            onChange={(e) => handleInputChange('tarjeta', 'cvv', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                              errors['tarjeta.cvv'] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="123"
                          />
                          {errors['tarjeta.cvv'] && (
                            <p className="text-red-500 text-sm mt-1">{errors['tarjeta.cvv']}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Notes */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Notas del Pedido (Opcional)</h2>
                  <textarea
                    value={formData.notas}
                    onChange={(e) => setFormData(prev => ({ ...prev, notas: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    placeholder="Instrucciones especiales para la entrega..."
                  />
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.product?.imageUrl || '/placeholder-image.jpg'}
                        alt={item.product?.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-texting">
                          {item.product?.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatPrice((item.product?.price || 0) * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío:</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 font-semibold mt-6"
                >
                  {isProcessing ? 'Procesando...' : 'Realizar Pedido'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}