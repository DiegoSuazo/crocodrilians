import { Request } from 'express';

// Extender Request de Express para incluir usuario autenticado
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    isAdmin: boolean;
  };
}

// Tipos para DTOs (Data Transfer Objects)
export interface RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateProductDTO {
  title: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;
  images?: string[];
  metadata?: Record<string, any>;
}

export interface UpdateProductDTO {
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
  imageUrl?: string;
  images?: string[];
  metadata?: Record<string, any>;
  isActive?: boolean;
}

export interface CreateCategoryDTO {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface AddToCartDTO {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDTO {
  quantity: number;
}

export interface CreateOrderDTO {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod?: string;
  notes?: string;
}

export interface CreateAddressDTO {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  isDefault?: boolean;
}

export interface UpdateAddressDTO {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  isDefault?: boolean;
}

export interface CreateBannerDTO {
  title?: string;
  imageUrl: string;
  linkUrl?: string;
  displayOrder?: number;
}

export interface UpdateBannerDTO {
  title?: string;
  imageUrl?: string;
  linkUrl?: string;
  isActive?: boolean;
  displayOrder?: number;
}

// Tipos para respuestas de API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}