export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;
  images?: string[] | null;
  metadata?: Record<string, string | number | boolean> | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface para mostrar productos (compatibilidad)
export interface ProductDisplay {
  id: string;
  image: string;
  title: string;
  price: number;
  description?: string;
  stock: number;
}

// Interface para items del carrito
export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product?: Product;
}
