export interface Category {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  url_imagen?: string;
  imagenes?: string; // JSON field
  activo: boolean;
  creado_en: Date;
}