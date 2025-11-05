import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../common/header';
import Footer from '../common/footer';
import { SearchResults } from '../components/search/SearchResults';
import { ProductDisplay } from '../interface/product';
import ejemplo from '../assets/bb-ejemplo.png';

export default function Category() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  // Mock products data organized by category
  const productsByCategory: Record<string, ProductDisplay[]> = {
    'booster-box': [
      {
        id: "1",
        image: ejemplo,
        title: "Scarlet & Violet Booster Display Box (36 paquetes)",
        price: 300000,
        stock: 10,
        description: "Booster Display Box con 36 paquetes de Scarlet & Violet.",
      },
      {
        id: "2",
        image: ejemplo,
        title: "Lost Origin Booster Display Box (36 paquetes)",
        price: 280000,
        stock: 10,
        description: "Booster Display Box con 36 paquetes de Lost Origin.",
      },
      {
        id: "3",
        image: ejemplo,
        title: "Evolving Skies Booster Display Box (36 paquetes)",
        price: 350000,
        stock: 10,
        description: "Booster Display Box con 36 paquetes de Evolving Skies.",
      },
      {
        id: "6",
        image: ejemplo,
        title: "Fusion Strike Booster Display Box",
        price: 320000,
        stock: 8,
        description: "Booster Display Box con 36 paquetes de Fusion Strike.",
      },
    ],
    'elite-trainer-box': [
      {
        id: "4",
        image: ejemplo,
        title: "Battle Styles Elite Trainer Box",
        price: 45000,
        stock: 15,
        description: "Elite Trainer Box con 8 booster packs y accesorios.",
      },
      {
        id: "5",
        image: ejemplo,
        title: "Chilling Reign Elite Trainer Box",
        price: 47000,
        stock: 12,
        description: "Elite Trainer Box con 8 booster packs y accesorios.",
      },
      {
        id: "7",
        image: ejemplo,
        title: "Brilliant Stars Elite Trainer Box",
        price: 48000,
        stock: 20,
        description: "Elite Trainer Box con 8 booster packs y accesorios de Brilliant Stars.",
      },
      {
        id: "8",
        image: ejemplo,
        title: "Astral Radiance Elite Trainer Box",
        price: 46000,
        stock: 18,
        description: "Elite Trainer Box con 8 booster packs y accesorios de Astral Radiance.",
      },
    ],
    'preventa': [
      {
        id: "9",
        image: ejemplo,
        title: "Paldea Evolved Booster Box (Preventa)",
        price: 330000,
        stock: 5,
        description: "Preventa del nuevo set Paldea Evolved. Disponible próximamente.",
      },
      {
        id: "10",
        image: ejemplo,
        title: "Obsidian Flames Elite Trainer Box (Preventa)",
        price: 50000,
        stock: 10,
        description: "Preventa del Elite Trainer Box de Obsidian Flames.",
      },
    ],
  };

  const categoryNames: Record<string, string> = {
    'booster-box': 'Booster Box',
    'elite-trainer-box': 'Elite Trainer Box',
    'preventa': 'Preventa',
  };

  useEffect(() => {
    const loadCategoryProducts = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const categoryProducts = productsByCategory[categorySlug || ''] || [];
        const name = categoryNames[categorySlug || ''] || 'Categoría';
        
        setProducts(categoryProducts);
        setCategoryName(name);
      } catch (error) {
        console.error('Error loading category products:', error);
        setProducts([]);
        setCategoryName('Categoría');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryProducts();
  }, [categorySlug]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 mt-32">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-texting mb-2">{categoryName}</h1>
            <p className="text-gray-600">
              Explora nuestra selección de productos en la categoría {categoryName.toLowerCase()}
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando productos...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No hay productos en esta categoría
              </h3>
              <p className="text-gray-500">
                Pronto agregaremos más productos a esta categoría
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
                        {new Intl.NumberFormat('es-CL', {
                          style: 'currency',
                          currency: 'CLP',
                        }).format(product.price)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </span>
                    </div>
                    <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}