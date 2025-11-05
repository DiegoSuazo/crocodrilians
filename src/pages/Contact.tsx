import React, { useState } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8 mt-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-texting mb-8 text-center">Contacto</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Información de Contacto */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-texting mb-6">Información de Contacto</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="mr-4 text-primary" size={24} />
                    <div>
                      <h3 className="font-semibold text-texting">Email</h3>
                      <p className="text-gray-600">contacto@crocodilians.cl</p>
                      <p className="text-gray-600">ventas@crocodilians.cl</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="mr-4 text-primary" size={24} />
                    <div>
                      <h3 className="font-semibold text-texting">Teléfono</h3>
                      <p className="text-gray-600">+56 9 1234 5678</p>
                      <p className="text-gray-600">+56 2 2345 6789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="mr-4 text-primary" size={24} />
                    <div>
                      <h3 className="font-semibold text-texting">Dirección</h3>
                      <p className="text-gray-600">Av. Providencia 123, Oficina 456</p>
                      <p className="text-gray-600">Providencia, Santiago</p>
                      <p className="text-gray-600">Región Metropolitana, Chile</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="mr-4 text-primary" size={24} />
                    <div>
                      <h3 className="font-semibold text-texting">Horarios de Atención</h3>
                      <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                      <p className="text-gray-600">Sábados: 10:00 - 14:00</p>
                      <p className="text-gray-600">Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preguntas Frecuentes */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-texting mb-6">Preguntas Frecuentes</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-texting mb-2">¿Cuánto demora el envío?</h3>
                    <p className="text-gray-600 text-sm">Los envíos en Santiago demoran 1-2 días hábiles, y en regiones 2-4 días hábiles.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-texting mb-2">¿Puedo cambiar mi pedido?</h3>
                    <p className="text-gray-600 text-sm">Puedes modificar tu pedido dentro de las primeras 2 horas después de realizarlo.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-texting mb-2">¿Tienen tienda física?</h3>
                    <p className="text-gray-600 text-sm">Actualmente solo vendemos online, pero puedes retirar en nuestra oficina coordinando previamente.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-texting mb-2">¿Los productos son originales?</h3>
                    <p className="text-gray-600 text-sm">Sí, todos nuestros productos son 100% originales y auténticos.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-texting mb-6">Envíanos un Mensaje</h2>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-6xl mb-4">✓</div>
                  <h3 className="text-xl font-semibold text-texting mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-gray-600">Te responderemos dentro de las próximas 24 horas.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-primary hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                      Asunto *
                    </label>
                    <select
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="consulta-producto">Consulta sobre producto</option>
                      <option value="estado-pedido">Estado de mi pedido</option>
                      <option value="devolucion">Devolución o cambio</option>
                      <option value="problema-tecnico">Problema técnico</option>
                      <option value="sugerencia">Sugerencia</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje *
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 font-semibold flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={16} />
                        Enviar Mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}