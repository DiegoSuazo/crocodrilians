import Footer from "../common/footer";
import Header from "../common/header";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const location = useLocation();
  const product = location.state?.product; // Obtener datos desde la navegación
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    // Esperar a que el contenido se cargue y luego hacer scroll
    setTimeout(() => {
      const element = document.getElementById("product-detail");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  }, []);
  if (!product) {
    return <p>Producto no encontrado</p>;
  }
  function formatPrice(price: number) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  }

  return (
    <div
      id="product-detail"
      className="flex flex-col  justify-center min-h-screen"
    >
      <Header></Header>
      <div className="flex flex-col  justify-center mx-auto mt-[50%] w-[60%] text-texting md:flex-row md:justify-between  md:my-[16%] xl:my-[10%]">
        <img className="md:w-[30%] w-full" src={product.image}></img>
        <div className="flex flex-col justify-center w-full md:w-[60%]">
          <h1 className="font-bold text-3xl my-4">{product.title}</h1>
          <h2 className="text-left text-2xl  font-semibold my-4">
            {" "}
            {product.stock != null && product.stock > 0
              ? `Disponible :${product.stock}`
              : "Agotado"}{" "}
          </h2>
          <p> Impuesto incluido</p>
          <h2 className="text-left my-4 text-xl font-semibold">
            {" "}
            {formatPrice(product.price)}
          </h2>
          <p className="my-1"> Cantidad </p>
          <div className="flex flex-row my-4 border-primary  border-2 rounded-md w-24">
            <button
              disabled={count == 0}
              className={`bg-primary text-white  py-2 w-10 ${
                count == 0
                  ? " disabled:cursor-not-allowed font-thin"
                  : "cursor-pointer"
              }`}
              onClick={() => setCount(count - 1)}
            >
              {" "}
              -{" "}
            </button>
            <div className="w-10 text-center my-auto"> {count}</div>
            <button
              className="bg-primary text-white  py-2 w-10 cursor-pointer"
              onClick={() => setCount(count + 1)}
            >
              {" "}
              +{" "}
            </button>
          </div>
          <button className="text-primary border-primary border font-bold rounded-md py-2 my-4 md:w-[40%] hover:border-2">
            {" "}
            Agregar al carro
          </button>
          <button className="bg-primary text-white font-bold rounded-md py-2 my-4 md:w-[40%] hover:border-2 hover:border-primary">
            {" "}
            Comprar artículo
          </button>
          <p>{product.description}</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
