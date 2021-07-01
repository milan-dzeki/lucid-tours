import React, { useState, useEffect, useCallback } from 'react';

import './single-tour-page.scss';
import '../../sass-additions/helper-classes.scss';
import { Link } from 'react-router-dom';
import PageSubSection from '../../components/PageSubSection/PageSubSection';
import InfoModal from '../../components/UI/InfoModal/InfoModal';
import RedirectModal from '../../components/UI/RedirectModal/RedirectModal';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import Gallery from '../../components/UI/Gallery/Gallery';
import { activitiesData } from '../../data/SingleTourPage/activitiesData';
import { useSlider } from '../../custom-hooks/useSlider';
import { useInfoModal } from '../../custom-hooks/useInfoModal';
import { useRedirectModal } from '../../custom-hooks/useRedirectModal';
import { getDateAndMonths, orderDateInfo } from '../../utilities';
import * as actions from '../../store/actions/index';

const SingleTourPage = () => {
  // dispatch
  const dispatch = useDispatch();
  //extract route id
  const { id } = useParams();
  // auth status
  const authStatus = useSelector(state => state.auth.token);
  // user ID
  const userID = useSelector(state => state.auth.userID);
  // get all tours
  const allTours = useSelector(state => state.tours.tours);
  // get booking loading state
  const isLoading = useSelector(state => state.booking.loading);
  // get booking error state
  const isError = useSelector(state => state.booking.error);
  // custome error state to be used while checking validity of booking tour date
  const [dateError, setDateError] = useState(false);
  const [dateExistsError, setDateExistsError] = useState(false);
  // discount value
  const [discountValue, setDiscountValue] = useState("");
  // clear booking error
  const onBookClearError = () => dispatch(actions.bookClearError());
  // clear all errors 
  const clearAllErrorsHandler = () => {
    //clear booking error state and date
    onBookClearError();
    setDateError(false);
    setDateExistsError(false);
  };
  // get current tour by id
  const [currentTour, setCurrentTour] = useState({});
  // get current tour by id as page mounts
  useEffect(() => {
    const clickedTour = allTours.find(tour => tour.id === id);
    setCurrentTour(clickedTour);
  }, [allTours, id]);
  // selected date when booking
  const [bookedDate, setBookedDate] = useState("");
  // meditation participation ?
  const [meditationParticipation, setMeditationParticipation] = useState("no");
  
  // use info modal
  const {infoModalData, showInfoModal, closeInfoModal} = useInfoModal();
  // reset discount value when closing info modal
  const infoModalClosed = () => {
    closeInfoModal();
    setDiscountValue("");
  };
  // info modal alert
  const [infoModalAlert, setInfoModalAlert] = useState(false);
  // redirect modal
  const {redirectModalShow, showRedirectModal, hideRedirectModal} = useRedirectModal();

  // fetch all tours when component mounts (to compare currently booking date with previously booked tour dates)
  const onFetchTours = useCallback((token, userId) => dispatch(actions.fetchTours(token, userId)), [dispatch]);
  useEffect(() => {
    onFetchTours(authStatus, userID);
  }, [onFetchTours, authStatus, userID]);
  // get fetched tours from the state
  const pastTours = useSelector(state => state.toursFetching.pastTours);
  const presentTours = useSelector(state => state.toursFetching.presentTours);
  const futureTours = useSelector(state => state.toursFetching.futureTours);

  // booking btn clicked
  const prepareBookTourHandler = () => {
    let infoModalContent;
    if(authStatus) {
      // check touring history for possible discounts
      let discountNumber;
      if(pastTours.length !== 0 || presentTours.length !== 0 || futureTours.length !== 0) {
        let mergedTours = pastTours.concat(presentTours).concat(futureTours);
        discountNumber = 5 * mergedTours.length;
        
        let finalDiscountValue;
        if(discountNumber < 30) {
          finalDiscountValue = `${discountNumber}%`;
        } else if(discountNumber >= 30) {
          discountNumber = 30;
          finalDiscountValue = "30%";
        }
        setDiscountValue(finalDiscountValue);
      }

      infoModalContent = (
        <>
          <p style={{marginBottom: "1rem"}}>choose your tour date:</p>
          <div>
            {currentTour.dates.map(date => {
              return (
                <div key={date}>
                  <input type="radio" id={date} name="dates"
                  value={date}
                  onChange={(e) => {
                    const value = e.target.value;
                    setBookedDate(value)
                  }} style={{marginRight: "1rem"}}/>
                  <label htmlFor={date}>
                    {date}
                  </label>
                </div>
              );
            })}
          </div>
            {currentTour.meditation === "with" && (
              <div style={{paddingTop: "1rem", marginTop: "1rem", borderTop: "1px solid black"}}>
                <p>Would you like to participate in meditation retreat on this tour?</p>
                <div>
                  <div>
                    <input type="radio" id="yes" name="meditation"
                    value="yes" style={{marginRight: "1rem"}} onChange={(e) => {
                      const value = e.target.value;
                      setMeditationParticipation(value);
                    }}/>
                    <label htmlFor="yes">
                      Yes
                    </label>
                  </div>
                  <div>
                    <input type="radio" id="no" name="meditation"
                    value="no" style={{marginRight: "1rem"}} onChange={(e) => {
                      const value = e.target.value;
                      setMeditationParticipation(value);
                    }}/>
                    <label htmlFor="no">
                      No
                    </label>
                  </div>
                </div>
              </div>
            )}
            {discountNumber !== 0 ? (
              <p style={{marginTop: "1rem"}}>
                Considering your prevoius touring history, you get {discountNumber}% discount for this tour.
                <br />
                To see more about discounts, visit our <Link to="/about" style={{display: "inline"}} onClick={infoModalClosed}>"about page"</Link>
              </p>
            ) : null}
        </>
      );
      showInfoModal(currentTour.displayImg, "booking", infoModalContent);
    } else {
      infoModalContent = <p style={{textAlign: "center"}}>You need to log in in order to proceed.</p>;
      showInfoModal("", "signing up", infoModalContent);
    }
  };

  // fetch tours again when hiding redir.modal to get the newest tour stata
  const closeRedirectModalAndFetchTours = () => {
    onFetchTours(authStatus, userID);
    hideRedirectModal();
  };

  // book tour from actions
  const onBookTour = (tourData, token) => dispatch(actions.bookTour(tourData, token));

  // book tour handler (actual action that does the job)
  const bookTourHandler = () => {
    // 1. check whether selected date is PAST
    let bookingStatus = true;
    let bookingStatusTwo = true;
    const {presentDay, presentMonth, monthNames} = getDateAndMonths();
    if(bookedDate.trim() !== "") {
      // get data from utilities functions
      const {tourMonth, tourDateOne, tourDateTwo} = orderDateInfo(bookedDate);
      // check if day user is trying to book has passed
      if(presentMonth < monthNames.indexOf(tourMonth) || 
        (presentMonth === monthNames.indexOf(tourMonth) && presentDay < parseInt(tourDateOne))
      ) {
        setDateError(false);
        bookingStatus = true;
      } else {
        setDateError(true);
        bookingStatus = false;
        closeInfoModal();
      }

      // 2. check whether you already have futur tour that matches currently selected date
      // get dates from future tours
      let futureBookedDates = futureTours.map(tour => tour.tourDate);
      let bookingMonth = tourMonth;
      let bookingDateOne = tourDateOne;
      let bookingDateTwo = tourDateTwo;
      bookingStatusTwo = futureBookedDates.every(date => {
        const {tourMonth, tourDateOne, tourDateTwo} = orderDateInfo(date);
        
        if(bookingMonth === tourMonth && 
          parseInt(bookingDateOne) >= parseInt(tourDateOne) &&
          parseInt(bookingDateTwo) <= parseInt(tourDateTwo)) {
          setDateExistsError(true);
          // bookingStatusTwo = false;
          closeInfoModal();
          return false;
        } else {
          setDateExistsError(false);
          return true
        }
        // return bookingStatusTwo;
      })

      // adjuct price according to discount
      let updatedPrice = currentTour.price;
      if(discountValue !== "") {
        let numFromDiscount = discountValue.slice(0, -1);
        updatedPrice = (parseInt(updatedPrice) - (parseInt(updatedPrice) * parseInt(numFromDiscount) / 100)).toFixed(2);
      }
      
      if(bookingStatus && bookingStatusTwo) {
        let bookedTour = {
          id: currentTour.id,
          continent: currentTour.continent,
          state: currentTour.state,
          cities: currentTour.cities,
          days: currentTour.days,
          price: updatedPrice,
          meditation: currentTour.meditation,
          activities: currentTour.activities,
          tourDate: bookedDate,
          displayImg: currentTour.displayImg,
          discount: discountValue,
          userId: userID
        };
        if(currentTour.meditation === "with") {
          bookedTour.meditationParticipation = meditationParticipation;
        }
          onBookTour(bookedTour, authStatus);
          closeInfoModal();
          showRedirectModal();
      } 
    } else {
      setInfoModalAlert(true);

      setTimeout(() => {
        setInfoModalAlert(false);
      }, 2000);
    }
    setBookedDate("");
    setDiscountValue("");
  };

  // check for error when booking
  useEffect(() => {
    if(isError || dateError || dateExistsError) {
      hideRedirectModal();
    } 
  }, [isError, dateError, dateExistsError, hideRedirectModal]);
  
  // manage gallery dropdown list
  const [galleryListOpen, setGalleryListOpen] = useState(false);
  // manage actual gallery display
  const [galleryOpen, setGalleryOpen] = useState(false);
  // manage images by current tour's city
  const [galleryImages, setGalleryImages] = useState([]);
  // use slider
  const {checkSliderPosition, prevSlide, nextSlide} = useSlider(galleryImages);

  // toggle gallery cities dropdown
  const toggleGalleryList = () => {
    setGalleryListOpen(prevState => !prevState)
  };
  // open/close actual gallery
  const showGallery = (cityName) => {
    setGalleryOpen(true);
    setGalleryImages(currentTour.gallery[cityName]);
  };
  const closeGallery = () => {
    setGalleryOpen(false);
    setGalleryImages([]);
  };
  /////////////////////////////////////////
  
  // set gallery dinamically
  let gallery = <div>Loading</div>;

  if(currentTour.gallery) {
    gallery = (
      <Gallery
        galleryOpen={galleryOpen}
        closeGallery={closeGallery}
        galleryClassname="single-tour-page"
        sliderClassname="single-tour-page"
        prevSlide={prevSlide}
        nextSlide={nextSlide}>
        {galleryImages.map((image, index) => {
          let slidePosition = checkSliderPosition(index, galleryImages);
          return (
            <div className={`gallery__single-tour-page__item ${slidePosition}`} key={image.text}>
              <div className="gallery__single-tour-page__item-img">
                <img src={image.url} alt="city" />
              </div>
              <div className="gallery__single-tour-page__item-text">
                {image.text}
              </div>
            </div>
          )
        })}
      </Gallery>
    );
  }

  let infoModal = (
    <InfoModal
      infoModalAlert={infoModalAlert}
      infoModalShow={infoModalData.show}
      infoModalTitle={infoModalData.title}
      infoModalBcg={infoModalData.bcgImg}
      infoModalText={infoModalData.text}
      infoModalClosed={infoModalClosed}
      infoModalBtns={
        <>
          <button 
            className="info-modal__btn--cancel"
            onClick={infoModalClosed}>
            cancel
          </button>
          {authStatus ? (
            <button 
              className="info-modal__btn--confirm"
              onClick={bookTourHandler}>
              book now
            </button>
          ) : (
            <Link to="/signup" className="info-modal__btn--confirm" style={{display: "inline"}}>
              sign up/log in
            </Link>
          )}
        </>
      } />
  );

  if(isLoading) {
    infoModal = <Spinner />;
  };

  // set tour page
  let singleTour = <div>...loading</div>;
  if(Object.keys(currentTour).length !== 0) {
    const {displayIcon, state, cities, activities, meditation, meditationText, meditationImg, description} = currentTour;

    singleTour = (
      <>
        {infoModal}
        <ErrorModal
          errorModalShow={isError !== null || dateError || dateExistsError}
          errorModalMsg={isError !== null ? "Something went wrong. Try again later" : (dateError ? "Can't book tours that are passed. To book this date, try next year" : (dateExistsError ? "You already booked tour with similar date which overlaps with this one. Either cancell the existing tour, or book another one" : null))  }
          errorModalClosed={clearAllErrorsHandler} />
        <RedirectModal
          redirectModalShow={redirectModalShow}
          redirectModalClosed={closeRedirectModalAndFetchTours}
          redirectModalTitle="booking successfull" />
        {gallery}
        <section className="single-tour-page__title">
          <article className="single-tour-page__title-icon">
            {displayIcon}
          </article>
          <article className="single-tour-page__title-text">
            <p className="single-tour-page__title-main">
              {state} - 
            </p>
            <ul className="single-tour-page__title-cities">
              {cities.map((city, index) => (
                <li 
                  key={index}
                  className="single-tour-page__title-cities__item">
                  {city}
                </li>
              ))}
            </ul>
          </article>
        </section>
        <section className="single-tour-page__content">
          <article className="single-tour-page__description">
            <h3 className="single-tour-page__section-title single-tour-page__section-title--description">
              Tour description
            </h3>
            <p className="single-tour-page__description-text">
              {description}
            </p>
            <div className="single-tour-page__gallery single-tour-page__gallery--description">
              <div 
                className="single-tour-page__gallery-btn"
                onClick={toggleGalleryList}>
                <p className="single-tour-page__gallery-btn__text">
                  View Gallery
                </p>
                <div className={galleryListOpen ? "single-tour-page__gallery-btn__icon gallery-icon-rotated" : "single-tour-page__gallery-btn__icon"}>
                  <IoIosArrowDown />
                </div>
              </div>
              <ul className={galleryListOpen ? "single-tour-page__gallery-list gallery-list-open" : "single-tour-page__gallery-list"}>
                {cities.map((city, index) => (
                  <li
                    key={index}
                    className="single-tour-page__gallery-list__item"
                    onClick={() => showGallery(city)}>
                    {city}
                  </li>
                ))}
              </ul>
            </div>
            <div className="single-tour-page__dates">
              <h3 className="single-tour-page__section-title single-tour-page__section-title--description">
                Dates options
              </h3>
              <p className="single-tour-page__description-text">
                These are periods when we organize this particular tour every year. 
              </p>
              <ul className="single-tour-page__datelist">
                {currentTour.dates.map((date, index) => {
                  return (
                    <li key={date}>
                      {index + 1}. {date}
                    </li>
                  );
                })}
              </ul>
              <p className="single-tour-page__description-text">
                <span style={{color: "red"}}>NOTE: </span> 
                you can't book tours for the next year - only for present one you can do it. E.g, you can't book tour that occurs in January if now is March.
                <br />
                Also, beware that if you cancel the tour in less than 7 days before starting, you still need to pay 50%, due to our booking expenses.
                <br />
                Thank you for your understanding.
              </p>
            </div>
          </article>
          {activities.length !== 0 || meditation === "with" ?
            (
              <article className="single-tour-page__activities">
                <h3 className="single-tour-page__section-title single-tour-page__section-title--activities">
                  Special activities
                </h3>
                {activities.includes("swimming") ? 
                  <PageSubSection
                    subsectionClassname="tour-activities"
                    subsectionIcon={activitiesData.swimming.icon}
                    subsectionTitle={activitiesData.swimming.name}
                    subsectionText={activitiesData.swimming.text}
                    subsectionImages={
                      <img src={activitiesData.swimming.image} alt="swimming" />
                    } /> 
                : null }
                {activities.includes("climbing") ? 
                  <PageSubSection
                    subsectionClassname="tour-activities"
                    subsectionIcon={activitiesData.climbing.icon}
                    subsectionTitle={activitiesData.climbing.name}
                    subsectionText={activitiesData.climbing.text}
                    subsectionImages={
                      <img src={activitiesData.climbing.image} alt="climbing" />
                    } />  
                : null }
              </article>
            ) : null
          }
          {meditation === "with" ? 
            <PageSubSection
              subsectionClassname="tour-activities"
              subsectionIcon={activitiesData.meditation.icon}
              subsectionTitle={activitiesData.meditation.name}
              subsectionText={meditationText}
              subsectionImages={
                <img src={meditationImg} alt="meditation"/>
              } />
          : null}
        </section>
        <button 
          className="single-tour-page__book-btn"
          onClick={prepareBookTourHandler}>
            Book this tour now!
          </button>
      </>
    );
  }

  return singleTour;
}

export default SingleTourPage;
