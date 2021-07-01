import React from 'react';
import './meditation-tours.scss';
import { useSelector } from 'react-redux';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import PageSubSection from '../../components/PageSubSection/PageSubSection';
import SingleTour from '../../components/Tours/SingleTour/SingleTour';

import { GiMeditation } from 'react-icons/gi';
import { FaQuestion, FaList } from 'react-icons/fa';

import * as texts from '../../data/MeditationTours/subsectionTexts';

const MeditationTours = () => {
  // tours
  const meditationTours = useSelector(state => state.tours.tours).filter(tour => tour.meditation === "with");
  return (
    <>
      <SectionTitle
        titleClassname="meditation-tours"
        icon={<GiMeditation />}
        titleText="meditation tours"
        titleAdditional="find your self" />
      <section className="meditation-tours__content">
        <PageSubSection
          subsectionClassname="meditation-tours__why"
          subsectionIcon={<FaQuestion />}
          subsectionTitle="why would one meditate?"
          subsectionText={texts.whyText} />
        <PageSubSection
          subsectionClassname="meditation-tours__types"
          subsectionIcon={<FaList />}
          subsectionTitle="our offer"
          subsectionText={texts.typesText}
          subsectionImages={
            meditationTours.map(tour => {
              return <SingleTour
                key={tour.id}
                tourIcon={tour.displayIcon}
                tourState={tour.state}
                tourCities={tour.cities}
                tourPrice={tour.price}
                tourDuration={tour.days}
                tourId={tour.id}
                tourImg={tour.displayImg} />
            })
          } />
      </section>
    </>
  );
}

export default MeditationTours;
