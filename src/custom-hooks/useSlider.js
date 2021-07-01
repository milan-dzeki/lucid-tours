import { useState, useEffect } from 'react';

export const useSlider = (sliderContent) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const checkSliderPosition = (elementIndex, sliderContent) => {
    let slidePosition = "next-slide";
    if(elementIndex === slideIndex) {
      slidePosition = "current-slide";
    }
    if(elementIndex === slideIndex - 1 || (slideIndex === 0 && elementIndex === sliderContent.length - 1)) {
      slidePosition = "prev-slide";
    }
    return slidePosition;
  }

  const prevSlide = () => {
    setSlideIndex(prevIndex => prevIndex - 1);
  };
  const nextSlide = () => {
    setSlideIndex(prevIndex => prevIndex + 1);
  };
  
  useEffect(() => {
    const lastIndex = sliderContent.length - 1;
    if(slideIndex < 0) {
      setSlideIndex(lastIndex);
    }
    if(slideIndex > lastIndex) {
      setSlideIndex(0);
    }
  }, [slideIndex, sliderContent]);

  return {
    checkSliderPosition,
    prevSlide,
    nextSlide
  };
};