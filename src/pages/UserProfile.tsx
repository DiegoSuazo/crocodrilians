import React, { useState } from 'react';
import { User, Package, MapPin, Settings } from 'lucide-react';
import Header from '../common/header';
import Footer from '../common/footer';
import { useAuth } from '../context/AuthContext';
import { Order } from '../interface/order';

export default function UserProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  
  // Mock data - replace with actual API calls
  const [orders] = useState<Order[]>([
    {
      id: '1',
      usuario_id: user?.id || '',
      numero_pedido: 'ORD-001',
      estado: 'entregado',
      monto_total: 300000,
      direccion_envio: 'Av. Providencia 123, Santiago',
      metodo_pago: 'Tarjeta de Crédito',
      estado_pago: 'pagado',
      creado_en: new Date('2024-01-15'),
      actualizado_en: new Date('2024-01-20'),
    },
    {
      id: '2',
      usuario_id: user?.id || '',
      numero_pedido: 'ORD-002',
      estado: 'enviado',
      monto_total: 280000,
      direccion_envio: 'Av. Providencia 123, Santiago',
      metodo_pago: 'Transferencia',
      estado_pago: 'pagado',
      creado_en: new Date('2024-02-01'),
      actualizado_en: new Date('2024-02-03'),
    },
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregado':
        return 'bg-green-100 text-green-800';
      case 'enviado':
        return 'bg-blue-100 text-blue-800';
      case 'procesando':
        return 'bg-yellow-100 text-yellow-800';
      case 'pendiente':
        return 'bg-gray-100 text-gray-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center mt-32">
          <p className="text-xl text-gray-600">Debes iniciar sesión para ver tu perfil</p>
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
          <h1 className="text-3xl font-bold text-texting mb-8">Mi Perfil</h1>
          
          {/* Tabs */}
          <div className="flex space-x-1 mb-8 border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 font-medium rounded-t-lg ${
                activeTab === 'profile'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <User className="inline mr-2" size={20} />
              Perfil
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-medium rounded-t-lg ${
                activeTab === 'orders'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <Package className="inline mr-2" size={20} />
              Mis Pedidos
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`px-6 py-3 font-medium rounded-t-lg ${
                activeTab === 'addresses'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <MapPin className="inline mr-2" size={20} />
              Direcciones
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="bg-primary text-white rounded-full p-4 mr-4">
                  <User size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-texting">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={user.firstName}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={user.lastName}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={user.phone || 'No especificado'}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 flex items-center">
                  <Settings className="mr-2" size={16} />
                  Editar Perfil
                </button>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <Package size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-xl text-gray-600">No tienes pedidos aún</p>
                  <p className="text-gray-400 mt-2">Cuando realices tu primera compra, aparecerá aquí</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-texting">
                          Pedido #{order.numero_pedido}
                        </h3>
                        <p className="text-gray-600">
                          Realizado el {formatDate(order.creado_en)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.estado)}`}>
                        {order.estado.charAt(0).toUpperCase() + order.estado.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Total</p>
                        <p className="font-semibold">{formatPrice(order.monto_total)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Método de Pago</p>
                        <p className="font-semibold">{order.metodo_pago}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Dirección de Envío</p>
                        <p className="font-semibold">{order.direccion_envio}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <button className="text-primary hover:underline text-sm font-medium">
                        Ver detalles del pedido
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center py-8">
                <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">No tienes direcciones guardadas</p>
                <p className="text-gray-400 mt-2">Agrega una dirección para facilitar tus compras</p>
                <button className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90">
                  Agregar Dirección
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}