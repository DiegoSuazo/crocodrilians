import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Product, ProductDisplay } from "../interface/product";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface BoosterBoxProps {
  title: string;
  products: ProductDisplay[];
}

export default function CarouselBox({ title, products }: BoosterBoxProps) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  function formatPrice(price: number) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  }
  
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" }, [
    Autoplay(),
  ]);
  const navigate = useNavigate();

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

  return (
    <div className="container mt-[10%] p-10">
      <h1 className="text-6xl font-bold">{title}</h1>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {products.map((product) => (
            <div
              key={product.id}
              className="embla__slide_bb p-4 flex items-center flex-col"
            >
              <img
                className="h-auto md: h-[50%]"
                src={product.image}
                alt={product.title}
              />
              <a
                onClick={
                  () => {
                    navigate("/product", { state: { product } });
                  } // Pasar datos al navegar
                }
                className="text-base text-texting md:w-3/4 font-semibold mt-2 cursor-pointer"
              >
                <p>{product.title}</p>
              </a>

              <p className="text-base text-texting md:w-3/4 font-light mt-2">
                {formatPrice(product.price)}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-primary text-white rounded-lg p-2 mt-2 w-full hover:bg-primary/90 transition-colors"
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
