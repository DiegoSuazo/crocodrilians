import "../styles/App.css";
import Header from "../common/header";
import Banner from "../common/banner";
import Shortcuts from "../common/shorcuts";
import CarouselBox from "../common/carousel-box";
import ejemplo from "../assets/bb-ejemplo.png";
import Footer from "../common/footer";
import { ProductDisplay, Product } from "../interface/product";
import { useState, useEffect } from "react";

function Home() {
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar productos reales desde la API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          const realProducts: ProductDisplay[] = data.products.map((product: Product) => ({
            id: product.id,
            image: product.imageUrl || ejemplo,
            title: product.title,
            price: product.price,
            stock: product.stock,
            description: product.description,
          }));
          setProducts(realProducts);
        } else {
          // Fallback a productos mock si la API falla
          setProducts([
            {
              id: "mock-1",
              image: ejemplo,
              title: "Producto de Ejemplo 1",
              price: 300000,
              stock: 10,
              description: "Producto de ejemplo mientras se cargan los datos reales.",
            },
            {
              id: "mock-2",
              image: ejemplo,
              title: "Producto de Ejemplo 2",
              price: 280000,
              stock: 10,
              description: "Producto de ejemplo mientras se cargan los datos reales.",
            },
          ]);
        }
      } catch (error) {
        console.error('Error cargando productos:', error);
        // Productos mock como fallback
        setProducts([
          {
            id: "mock-1",
            image: ejemplo,
            title: "Producto de Ejemplo",
            price: 300000,
            stock: 10,
            description: "Producto de ejemplo - Error cargando datos reales.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header></Header>
      <Banner></Banner>
      <Shortcuts></Shortcuts>
      <CarouselBox title="Booster Box" products={products}></CarouselBox>
      <CarouselBox title="Elite Trainer Box" products={products}></CarouselBox>
      <Footer></Footer>
    </div>
  );
}

export default Home;
