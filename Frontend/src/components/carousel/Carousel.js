import React, { useState } from "react";
import "./carousel.css";
import { Previous, Next } from "../../utils/icons/Icons";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="carousel-btn prev">
        {Previous}
      </button>
      <img
        src={images[currentIndex]}
        alt="carousel-img"
        className="carousel-img"
      />
      <button onClick={nextSlide} className="carousel-btn next">
        {Next}
      </button>
    </div>
  );
};

export default Carousel;
