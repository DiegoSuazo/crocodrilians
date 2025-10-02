import "../styles/App.css";
import Header from "../common/header";
import Banner from "../common/banner";
import Shortcuts from "../common/shorcuts";
import CarouselBox from "../common/carousel-box";
import ejemplo from "../assets/bb-ejemplo.png";
import Footer from "../common/footer";

function Home() {
  const products = [
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
      title: "Scarlet & Violet Booster Display Box (36 paquetes)",
      price: 300000,
      stock: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "5",
      image: ejemplo,
      title: "Lost Origin Booster Display Box (36 paquetes)",
      price: 280000,
      stock: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "6",
      image: ejemplo,
      title: "Evolving Skies Booster Display Box (36 paquetes)",
      price: 350000,
      stock: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

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
