import React, { useState } from 'react';
import './about.scss';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import PageSubSection from '../../components/PageSubSection/PageSubSection';
import Slider from '../../components/UI/Slider/Slider';
import { RiFolderInfoLine, RiQuestionnaireLine, RiHotelBedFill, RiMoneyDollarCircleLine, RiGuideLine } from 'react-icons/ri';
import { FiMapPin } from 'react-icons/fi';
import { MdCardTravel } from 'react-icons/md';
import Banner from '../../components/Banner/Banner';
import bannerData from '../../data/About/bannerData';
import { transportCompanies } from '../../data/About/transportCompanies';
import { hotels } from '../../data/About/hotels';
import { tourGuides } from '../../data/About/tourGuides';
import * as texts from '../../data/About/subsectionTexts';
import { useSlider } from '../../custom-hooks/useSlider';
import { setupTourGuides } from '../../utilities';
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const About = () => {
  // use slider
  const companiesSlider = useSlider(transportCompanies);
  const hotelsSlider = useSlider(hotels);

  // destructure tour guides
  const { survival, guides, swimming, climbing } = tourGuides;

  const [index, setIndex] = useState(0);
  return (
    <>
      <SectionTitle
        icon={<RiFolderInfoLine />}
        titleText="about us"
        titleClassname="about"
        titleAdditional="all there is to know" />
      <Banner
        bannerType="hash"
        bannerClassname="about" 
        data={bannerData}
        slidePosition={index}
        setSlidePosition={setIndex} />
      <PageSubSection
        subsectionClassname="about-who"
        subsectionIcon={<RiQuestionnaireLine/>}
        subsectionTitle="who we are"
        subsectionText={texts.whoWeAreText}
        subsectionImages={null} />
      <PageSubSection
        subsectionClassname="about-where"
        subsectionIcon={<FiMapPin/>}
        subsectionTitle="location and contact"
        subsectionText={texts.whereAreWeText}
        subsectionImages={
          null
        } />
      <PageSubSection
        subsectionClassname="about-transport"
        subsectionId="transport"
        subsectionIcon={<MdCardTravel/>}
        subsectionTitle="transport"
        subsectionText={texts.transportText}
        subsectionImages={
          <Slider
            sliderClassname="about-transport"
            prevSlide={companiesSlider.prevSlide}
            nextSlide={companiesSlider.nextSlide}>
            {transportCompanies.map((comp, index) => {
              let slidePosition = companiesSlider.checkSliderPosition(index, transportCompanies);
              return (
                <article
                  key={comp.name}
                  className={`about-transport__company ${slidePosition}`}>
                  <h3 className="about-transport__title">{comp.name}</h3>
                  <div className="about-transport__img">
                    <img src={comp.imgUrl} alt={comp.name}/>
                  </div>
                  <p className="about-transport__text">
                    {comp.text}
                  </p>
                  <a href={comp.link} target="_blank"
                  rel="noopener noreferrer" className="about-transport__link">
                    visit company page
                  </a>
                </article>
              );
            })}
          </Slider>
        } />
      <PageSubSection
        subsectionClassname="about-hotels"
        subsectionId="hotels"
        subsectionIcon={<RiHotelBedFill />}
        subsectionTitle="hotels"
        subsectionText={texts.hotelsText}
        subsectionImages={
          <Slider
            sliderClassname="about-hotels"
            prevSlide={hotelsSlider.prevSlide}
            nextSlide={hotelsSlider.nextSlide}>
              {hotels.map((hotel, index) => {
                let slidePosition = hotelsSlider.checkSliderPosition(index, hotels);

                return (
                  <article
                    key={hotel.name}
                    className={`about-hotel ${slidePosition}`}>
                    <h3 className="about-hotel__title">
                      {hotel.name}
                    </h3>
                    <div 
                      className="about-hotel__img"
                      style={{backgroundImage: `url(${hotel.image})`}}></div>
                    <div className="about-hotel__info">
                      <p className="about-hotel__address">
                        <span className="about-hotel__prefix">address: </span>{hotel.address}
                      </p>
                      <p className="about-hotel__stars">
                        <span className="about-hotel__prefix">stars: </span>{hotel.stars}
                      </p>
                      <p className="about-hotel__text">
                        {hotel.info}
                      </p>
                    </div>
                  </article>
                );
              })}
          </Slider>
        } />
      <PageSubSection 
        subsectionClassname="about-discounts"
        subsectionId="discounts"
        subsectionIcon={<RiMoneyDollarCircleLine />}
        subsectionTitle="discounts"
        subsectionText={texts.discountsText} />
      <PageSubSection
        subsectionClassname="about-tour-guides"
        subsectionId="tour-guides"
        subsectionIcon={<RiGuideLine />}
        subsectionTitle="our tour guides"
        subsectionText={texts.tourGuidesText}
        subsectionImages={
          <>
            {setupTourGuides(survival, "survival", "survival specialists")}
            {setupTourGuides(guides, "guides", "tour guides")}
            {setupTourGuides(swimming, "swimming", "swimming specialists")}
            {setupTourGuides(climbing, "climbing", "climbing specialists")}
          </>
        } />
    </>
  );
}

export default About;
