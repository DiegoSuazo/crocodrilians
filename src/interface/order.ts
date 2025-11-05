export interface Address {
  id: string;
  usuario_id: string;
  calle: string;
  ciudad: string;
  region: string;
  codigo_postal: string;
  pais: string;
  predeterminada: boolean;
  creado_en: Date;
}

export interface Order {
  id: string;
  usuario_id: string;
  numero_pedido: string;
  estado: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';
  monto_total: number;
  direccion_envio: string;
  metodo_pago: string;
  estado_pago: 'pendiente' | 'pagado' | 'fallido' | 'reembolsado';
  notas?: string;
  creado_en: Date;
  actualizado_en: Date;
}

export interface OrderItem {
  id: string;
  pedido_id: string;
  producto_id: string;
  cantidad: number;
  precio_unitario: number;
  precio_total: number;
  snapshot_producto?: string; // JSON field
}

export interface Banner {
  id: string;
  titulo: string;
  url_imagen: string;
  url_enlace?: string;
  activo: boolean;
  orden_muestra: number;
  creado_en: Date;
}