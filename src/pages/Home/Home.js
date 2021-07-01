import React, { useState } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
// data
import bannerData from '../../data/Home/bannerData';
import { travelSubSections } from '../../data/Home/travelSubsections';
import { servicesData } from '../../data/Home/servicesData';
// components
import Banner from '../../components/Banner/Banner';
import InfoModal from '../../components/UI/InfoModal/InfoModal';
import Section from '../../components/Home/HomeSection/HomeSection';
import SubSection from '../../components/PageSubSection/PageSubSection';
import Service from '../../components/Service/Service';
import SingleTour from '../../components/Home/SingleTour/SingleTour';
import Slider from '../../components/UI/Slider/Slider';
import SingleReview from '../../components/Reviews/SingleReview/SingleReview';
// icons
import { AiOutlinePullRequest } from 'react-icons/ai';
import { MdCardTravel, MdRateReview } from 'react-icons/md';
import { GiDetour } from 'react-icons/gi';
import { SiWheniwork } from 'react-icons/si';
import { FiChevronsDown } from 'react-icons/fi';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { GoSignIn } from 'react-icons/go';
// from react-redux
import { useSelector } from 'react-redux';
import { useSlider } from '../../custom-hooks/useSlider';
import { useInfoModal } from '../../custom-hooks/useInfoModal';

const Home = props => {
  // manage banner changes
  const [index, setIndex] = useState(0);
  // most popular tours from reducer
  const allTours = useSelector(state => state.tours.tours);
  const popularTours = allTours.filter(tour => tour.mostPopular);
  // user reviews from reducer
  const users = useSelector(state => state.reviewPeople.users);
  const topUsers = users.filter(user => user.topReview);
  const {checkSliderPosition, prevSlide, nextSlide} = useSlider(topUsers);
  // use info modal
  const {infoModalData, showInfoModal, closeInfoModal} = useInfoModal();

  return (
    <>
      <Banner
        bannerType="nohash"
        bannerClassname="home" 
        data={bannerData}
        slidePosition={index}
        setSlidePosition={setIndex} />
      <InfoModal
        infoModalShow={infoModalData.show}
        infoModalTitle={infoModalData.title}
        infoModalBcg={infoModalData.bcgImg}
        infoModalText={infoModalData.text}
        infoModalBtns={
          <button className="info-modal__btn" onClick={closeInfoModal}>
            got it
          </button>
        }
        infoModalClosed={closeInfoModal} />
      <Section
        sectionClassname="about" 
        icon={<MdCardTravel />} 
        titleText="travel with us"
        titleAdditional="all over the world">
          {travelSubSections.map(subsection => {
            const {
              id, 
              customClassname, 
              titleIcon,
              titleText,
              paragraphText,
              images
            } = subsection;

            return (
              <SubSection
                key={id}
                subsectionClassname={customClassname}
                subsectionIcon={titleIcon}
                subsectionTitle={titleText}
                subsectionText={paragraphText}
                subsectionImages={
                  images.map((img, index) => {
                    const {id, imageUrl, imageText, imageInfo} = img;
                    return (
                      <div 
                        key={id}
                        className={`subsection__image subsection__image--${index + 1}`}
                        onClick={() => showInfoModal(imageUrl, imageText, imageInfo)}>
                        <img src={imageUrl} alt="forest" />
                        <p className="subsection__image-text">
                          {imageText}
                        </p>
                      </div>
                    );
                  })
                } />
            );
          })}
      </Section>
      <Section 
        sectionClassname="services"
        icon={<SiWheniwork />}
        titleText="our services"
        titleAdditional="what we offer">
        {servicesData.map((service, index) => {
          const {
            id, 
            serviceIcon, 
            serviceTitle,
            serviceText,
            serviceLinkName,
            serviceLinkPath 
          } = service;
          return <Service
            key={id}
            serviceClassname={index + 1}
            serviceIcon={serviceIcon}
            serviceTitle={serviceTitle}
            serviceText={serviceText}
            serviceLinkPath={serviceLinkPath}
            serviceLinkName={serviceLinkName} />;
        })}
      </Section>
      <Section 
        sectionClassname="tours"
        icon={<GiDetour />}
        titleText="explore tours"
        titleAdditional="and find your taste">
        <SubSection
          subsectionClassname="home-tours"
          subsectionIcon={<FiChevronsDown />}
          subsectionTitle="most popular tours"
          subsectionText="Here you can find our most popular tours so far."
          subsectionImages={
            popularTours.map(tour => {
              const {
                id,
                displayImg,
                displayIcon,
                state,
                cities,
                price
              } = tour;
              
              return <SingleTour
                key={id}
                singleTourBcg={displayImg}
                singleTourId={id}
                singleTourIcon={displayIcon}
                singleTourState={state}
                singleTourCities={
                  cities.map(city => (
                    <span 
                      key={city}>
                      {city} 
                    </span>
                  ))
                }
                singleTourPrice={price}
                singleTourPageLink="/" />
            })
          } />
        <Link 
          to="/tours"
          className="home-section__tours-link">see all tours</Link>
      </Section>
      <Section
        sectionClassname="request-tour"
        icon={<AiOutlinePullRequest />}
        titleText="request a tour"
        titleAdditional="choose your destination">
        <p className="home-section__request-tour-text">
          Haven't found what your were looking for in our tour destination offering? No problem. No problem at all! As we are always seeking to expand our business, feel free to tell us where would you like to travel, by requesting tour. We will consider, and if there are multiple requests for same country/city, we will consider adding that tour as a real choice.
          <br />
          Be ware that you need to sign up in order to request a tour.
        </p>
        <div className="home-section__request-tour-links">
          <Link to="/request-tour" className="home-section__request-tour-link reqTour">Request tour</Link>
          <Link to="/signup" className="home-section__request-tour-link signup">Sign up</Link>
        </div>
      </Section>
      <Section
        sectionClassname="reviews"
        icon={<MdRateReview />}
        titleText="user reviews"
        titleAdditional="how you see us">
        <SubSection 
          subsectionClassname="home-reviews"
          subsectionIcon={<BsFillPersonCheckFill />}
          subsectionTitle="top reviews"
          subsectionText="These are most satisfied customers. We hope they will help you decied to travel with us and join our ever-growing community."
          subsectionImages={
            <Slider
              sliderClassname="home-reviews"
              prevSlide={prevSlide}
              nextSlide={nextSlide}>
              {topUsers.map((user, index) => {
                const {image, name, job, travelledTo, review, rated} = user;
                
                let slidePosition = checkSliderPosition(index, topUsers);
                return <SingleReview
                  key={name}
                  sliderContent={topUsers}
                  personReviewPosition={slidePosition}
                  personReviewImg={image}
                  personReviewName={name}
                  personReviewJob={job}
                  personReviewTours={travelledTo}
                  personReviewText={review}
                  personReviewRating={rated} />;
              })}
            </Slider>
          } />
        <Link to="/reviews" className="home-section__reviews-link">see all reviews</Link>
      </Section>
      <Section
        sectionClassname="sign"
        icon={<GoSignIn />}
        titleText="join us"
        titleAdditional="sign up" >
        <p className="home-section__sign-text">
          Create your account and become our member. By Doing this, you would be able to do a lot of things online, like:
        </p>
        <ul className="home-section__sign-list">
          <li className="home-section__sign-list-item">
            <Link to="/tours">Booking a tour</Link>
          </li>
          <li className="home-section__sign-list-item">
            <Link to="/request-tour">Requesting a tour</Link>
          </li>
          <li className="home-section__sign-list-item">
            <Link to="/leave-review">Leave review</Link>
          </li>
          <li className="home-section__sign-list-item">
            <Link to="/your-page">Acquire your page</Link>
          </li>
        </ul>
        <p className="home-section__sign-text">
          <span style={{textTransform: "uppercase", color: "red"}}>note: </span>You will be able to view your page only after signing up.
        </p>
        <Link className="home-section__sign-link" to="/signup">
          sign up
        </Link>
      </Section>
    </>
  );
}

export default Home;
