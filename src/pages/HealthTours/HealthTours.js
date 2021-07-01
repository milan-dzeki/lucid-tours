import React from 'react';
import './health-tours.scss';

import { useSelector } from 'react-redux';
import { setupTourGuides } from '../../utilities';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import PageSubSection from '../../components/PageSubSection/PageSubSection';
import SingleTour from '../../components/Tours/SingleTour/SingleTour';
import { tourGuides } from '../../data/About/tourGuides';

import { GiHealthPotion, GiSwimfins, GiMountaintop } from 'react-icons/gi';

const HealthTours = () => {
  // swimming tours
  const swimmingTours = useSelector(state => state.tours.tours).filter(tour => tour.activities.includes("swimming"));
  
  // climbing tours
  const climbingTours = useSelector(state => state.tours.tours).filter(tour => tour.activities.includes("climbing"));

  // swimming instructors
  const swimmingInstructors = tourGuides.swimming;

  // climbing instructors
  const climbingInstructors = tourGuides.climbing;
  return (
    <>
      <SectionTitle
        titleClassname="health-tours"
        icon={<GiHealthPotion />}
        titleText="healthy tours"
        titleAdditional="improve your health" />
      <section className="health-tours__content">
        <p className="health-tours__text">
          If you want to use the travelling as an opportunity to recreate and improve your health, this is the place for you. Many of our tours contains physical activity. Besides a lots of walking that is present in all our tours, we offer special activities such as swimming and climbing.
          <br />
          <br />
          We have professional swimming and climbing instructors, educated to organize these activities and teach you the skills, if you are a rookie, or hold training sessions, if you are relatively skillful and just want to exercise for the health's sake.
        </p>
        <PageSubSection
          subsectionId="swimming"
          subsectionClassname="health-tours__swimming"
          subsectionIcon={<GiSwimfins />}
          subsectionTitle="swimming tours"
          subsectionText={
            swimmingTours.map(tour => {
              return <SingleTour
                key={tour.id}
                tourIcon={tour.displayIcon}
                tourState={tour.state}
                tourCities={tour.cities}
                tourPrice={tour.price}
                tourDuration={tour.days}
                tourImg={tour.displayImg}
                tourId={tour.id} />
            })
          } 
          subsectionImages={
            setupTourGuides(swimmingInstructors, "swimming", "swimming instructors")
          } />
        <PageSubSection
          subsectionId="climbing"
          subsectionClassname="health-tours__climbing"
          subsectionIcon={<GiMountaintop />}
          subsectionTitle="climbing tours"
          subsectionText={
            climbingTours.map(tour => {
              return <SingleTour
                key={tour.id}
                tourIcon={tour.displayIcon}
                tourState={tour.state}
                tourCities={tour.cities}
                tourPrice={tour.price}
                tourDuration={tour.days}
                tourImg={tour.displayImg}
                tourId={tour.id} />
            })
          } 
          subsectionImages={
            setupTourGuides(climbingInstructors, "climbing", "climbing instructors")
          } />
      </section>
    </>
  )
}

export default HealthTours
