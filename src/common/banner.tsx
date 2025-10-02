// Import Swiper React components
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import ejemplo from "../assets/ejemplo-banner.svg";
import ejemplo2 from "../assets/ejemplo-2.png";
import Autoplay from "embla-carousel-autoplay";

export default function Banner() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  return (
    <div className="container mt-[10%] p-10">
      <div className="embla" ref={emblaRef}>
        {" "}
        <div className="embla__container">
          {" "}
          <div className="embla__slide">
            <img className="h-max w-full" src={ejemplo} />
          </div>{" "}
          <div className="embla__slide">
            <img className="h-max w-full" src={ejemplo2} />
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
