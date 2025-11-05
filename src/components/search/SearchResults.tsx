import React from 'react';
import { ProductDisplay } from '../../interface/product';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Product } from '../../interface/product';

interface SearchResultsProps {
  products: ProductDisplay[];
  searchTerm: string;
  isLoading: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  products, 
  searchTerm, 
  isLoading 
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const handleAddToCart = (product: ProductDisplay) => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }
    
    // Convert ProductDisplay to Product for cart
    const productForCart: Product = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock || 0,
      categoryId: '', // This would need to be provided
      imageUrl: product.image,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    addToCart(productForCart, 1);
  };

  const handleProductClick = (product: ProductDisplay) => {
    navigate('/product', { state: { product } });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Buscando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-texting">
          Resultados de búsqueda para "{searchTerm}"
        </h2>
        <p className="text-gray-600 mt-2">
          {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-gray-500 mb-6">
            Intenta con otros términos de búsqueda o explora nuestras categorías
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
          >
            Volver al inicio
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                onClick={() => handleProductClick(product)}
                className="cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-texting mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};