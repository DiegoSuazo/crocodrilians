import React from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import { Shield, Truck, CreditCard, RefreshCw, Mail, Phone } from 'lucide-react';

export default function Info() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8 mt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-texting mb-8">Información y Políticas</h1>
          
          {/* Políticas de Envío */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <Truck className="mr-3 text-primary" size={24} />
              <h2 className="text-2xl font-semibold text-texting">Políticas de Envío</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Tiempos de Entrega</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Región Metropolitana: 1-2 días hábiles</li>
                  <li>Regiones: 2-4 días hábiles</li>
                  <li>Zonas extremas: 5-7 días hábiles</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Costos de Envío</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Envío gratis en compras sobre $50.000</li>
                  <li>Región Metropolitana: $3.990</li>
                  <li>Regiones: $5.990</li>
                  <li>Zonas extremas: $8.990</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Condiciones</h3>
                <p>Los productos se envían en su empaque original. Para productos de alto valor, se requiere firma del destinatario.</p>
              </div>
            </div>
          </div>

          {/* Políticas de Pago */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <CreditCard className="mr-3 text-primary" size={24} />
              <h2 className="text-2xl font-semibold text-texting">Métodos de Pago</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Tarjetas Aceptadas</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Visa, Mastercard, American Express</li>
                  <li>Tarjetas de débito con logo Redcompra</li>
                  <li>Cuotas disponibles según tu banco</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Transferencia Bancaria</h3>
                <p>Aceptamos transferencias bancarias. El pedido se procesa una vez confirmado el pago.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Seguridad</h3>
                <p>Todas las transacciones están protegidas con encriptación SSL de 256 bits.</p>
              </div>
            </div>
          </div>

          {/* Políticas de Devolución */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <RefreshCw className="mr-3 text-primary" size={24} />
              <h2 className="text-2xl font-semibold text-texting">Políticas de Devolución</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Condiciones para Devoluciones</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Productos en perfecto estado y empaque original</li>
                  <li>Máximo 30 días desde la fecha de compra</li>
                  <li>Productos sellados no pueden ser devueltos una vez abiertos</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Proceso de Devolución</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Contacta nuestro servicio al cliente</li>
                  <li>Envía el producto con su empaque original</li>
                  <li>Procesamos el reembolso en 5-10 días hábiles</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Excepciones</h3>
                <p>Productos en oferta, cartas individuales y productos personalizados no admiten devolución.</p>
              </div>
            </div>
          </div>

          {/* Garantía */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <Shield className="mr-3 text-primary" size={24} />
              <h2 className="text-2xl font-semibold text-texting">Garantía y Calidad</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Garantía de Autenticidad</h3>
                <p>Todos nuestros productos son 100% originales y auténticos. Trabajamos directamente con distribuidores oficiales.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Control de Calidad</h3>
                <p>Cada producto es revisado antes del envío para garantizar que llegue en perfectas condiciones.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Productos Defectuosos</h3>
                <p>Si recibes un producto defectuoso, lo reemplazamos inmediatamente sin costo adicional.</p>
              </div>
            </div>
          </div>

          {/* Privacidad */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-texting mb-4">Política de Privacidad</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Protección de Datos</h3>
                <p>Tus datos personales están protegidos según la Ley de Protección de Datos Personales de Chile.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Uso de la Información</h3>
                <p>Utilizamos tu información únicamente para procesar pedidos, mejorar nuestro servicio y enviarte ofertas relevantes (si lo autorizas).</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cookies</h3>
                <p>Utilizamos cookies para mejorar tu experiencia de navegación. Puedes deshabilitarlas en tu navegador.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}