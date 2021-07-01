import React from 'react';
import './slider.scss';
import { BsFillCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

const Slider = ({sliderClassname, prevSlide, nextSlide, children}) => {
  return (
    <article className={`slider slider__${sliderClassname}`}>
      <button
        type="button"
        className="slider__button slider__button--left"
        onClick={prevSlide}>
        <BsFillCaretLeftFill />
      </button>
      <button
        type="button"
        className="slider__button slider__button--right"
        onClick={nextSlide}>
        <BsCaretRightFill />
      </button>
      <div className="slider__content">
        {children}
      </div>
    </article>
  );
}

export default Slider;
