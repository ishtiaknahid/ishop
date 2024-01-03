/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";

const ImageSlider = ({ images, imgSize }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  }, [setCurrentIndex, images, currentIndex]);
  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const handleMouseClick = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  useEffect(() => {
    // Automatically change slide every 2 seconds
    const intervalId = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 3000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentIndex, images, isPaused, nextSlide]);

  return (
    <div className="image-slider relative shadow-3xl">
      <button
        onClick={prevSlide}
        className="absolute top-[40%] left-0 text-[3rem] text-white leading-none shadow-slate-800 font-light"
      >
        {" "}
        {"<"}{" "}
      </button>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        width={950}
        onClick={handleMouseClick}
        onMouseLeave={handleMouseLeave}
        className={`${imgSize}`}
      />
      <button
        onClick={nextSlide}
        className="absolute top-[40%] right-0 text-[3rem] text-white leading-none shadow-slate-800 font-light"
      >
        {">"}
      </button>

      <div className="dot-indicators absolute bottom-5 left-[45%]">
        {images.map((_, index) => ( 
          <span key={index} className={index === currentIndex ? "dot active" : "dot"}></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
