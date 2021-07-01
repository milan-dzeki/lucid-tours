import React from 'react';
import './gallery.scss';
import Backdrop from '../Backdrop/Backdrop';
import Slider from '../Slider/Slider';

const Gallery = ({galleryOpen, closeGallery,  galleryClassname, sliderClassname, prevSlide, nextSlide, children}) => {
  return (
    <div className={`gallery gallery_${galleryClassname}`} style={{display: galleryOpen ? "block" : "none"}}>
      <Backdrop 
        backdropClicked={closeGallery}
        show={galleryOpen}/>
      <Slider
        sliderClassname={sliderClassname}
        prevSlide={prevSlide}
        nextSlide={nextSlide}>
        {children}
      </Slider>
    </div>
  );
}

export default Gallery;
