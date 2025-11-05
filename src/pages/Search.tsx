import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../common/header';
import Footer from '../common/footer';
import { SearchResults } from '../components/search/SearchResults';
import { ProductDisplay } from '../interface/product';
import ejemplo from '../assets/bb-ejemplo.png';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<ProductDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock products data - replace with actual API call
  const allProducts: ProductDisplay[] = [
    {
      id: "1",
      image: ejemplo,
      title: "Scarlet & Violet Booster Display Box (36 paquetes)",
      price: 300000,
      stock: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "2",
      image: ejemplo,
      title: "Lost Origin Booster Display Box (36 paquetes)",
      price: 280000,
      stock: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "3",
      image: ejemplo,
      title: "Evolving Skies Booster Display Box (36 paquetes)",
      price: 350000,
      stock: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
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
      id: "6",
      image: ejemplo,
      title: "Fusion Strike Booster Display Box",
      price: 320000,
      stock: 8,
      description: "Booster Display Box con 36 paquetes de Fusion Strike.",
    },
  ];

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter products based on search query
        const filteredProducts = allProducts.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase())
        );
        
        setSearchResults(filteredProducts);
      } catch (error) {
        console.error('Error searching products:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 mt-32">
        <SearchResults 
          products={searchResults}
          searchTerm={query}
          isLoading={isLoading}
        />
      </div>
      
      <Footer />
    </div>
  );
}