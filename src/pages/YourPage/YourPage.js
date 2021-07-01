import React, { useState, useEffect, useCallback } from 'react';
import './your-page.scss';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import SingleTourBooked from '../../components/YourPage/SingleTourBooked/SingleTourBooked';
import RequestedTour from '../../components/YourPage/RequestedTour/RequestedTour';
import YourReview from '../../components/YourPage/YourReview/YourReview';
import Spinner from '../../components/UI/Spinner/Spinner';
import QuestionModal from '../../components/UI/QuestionModal/QuestionModal';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';
import { BsPersonFill, BsClockHistory,BsPerson } from 'react-icons/bs';
import { AiOutlinePullRequest } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import { useQuestionModal } from '../../custom-hooks/useQuestionModal';

const YourPage = () => {
  const userToken = useSelector(state => state.auth.token);
  const userID = useSelector(state => state.auth.userID);
  // use question modal
  const { questionModalData, showQuestionModal, closeQuestionModal } = useQuestionModal();
  
  const dispatch = useDispatch();
  // auth loading
  const authIsLoading = useSelector(state => state.auth.loading);
  // auth error
  const authIsError = useSelector(state => state.auth.error);
  // get user info
  const onGetAdditionalUserInfo = useCallback((token, userId) => dispatch(actions.getAdditionalUserInfo(token, userId)), [dispatch]);
  // fetch tours loading state
  const fetchToursIsLoading = useSelector(state => state.toursFetching.loading);
  // fetch tours error state
  const fetchToursIsError = useSelector(state => state.toursFetching.error);
  // delete tour error
  const deleteTourIsError = useSelector(state => state.toursFetching.deleteError);
  // clear delete tour error
  const onClearDeleteTourError = () => dispatch(actions.clearDeleteTourError());
  // fetch tours
  const onFetchTours = useCallback((token, userId) => dispatch(actions.fetchTours(token, userId)), [dispatch]);
  
  // fetch request tours loading state
  const fetchRequestToursIsLoading = useSelector(state => state.requestTour.loading);
  // delete/clear req tour(s) error
  const deleteReqTourIsError = useSelector(state => state.requestTour.deleteError);
  // fetch request tours error state
  const fetchRequestToursIsError = useSelector(state => state.requestTour.fetchError);
  // fetch request tours
  // clear requ tour delete error
  const onClearDeleteReqTourError = () => dispatch(actions.clearReqTourDeleteError());
  const onFetchRequestedTours = useCallback((token, userId) => dispatch(actions.fetchReqTours(token, userId)), [dispatch]);

  // fetch reviews actions
  const onFetchAgencyReview = useCallback((token, userId) => dispatch(actions.fetchAgencyReview(token, userId)), [dispatch]);
  const OnFetchTourReviews = useCallback((token, userId) => dispatch(actions.fetchTourReviews(token, userId)), [dispatch]);
  // fetch tours, requested and reviews tours on mount
  useEffect(() => {
    onFetchTours(userToken, userID);
    onFetchRequestedTours(userToken, userID);
    onFetchAgencyReview(userToken, userID);
    OnFetchTourReviews(userToken, userID);
    onGetAdditionalUserInfo(userToken, userID);
  }, [onFetchTours,onFetchRequestedTours,onFetchAgencyReview, OnFetchTourReviews, onGetAdditionalUserInfo, userToken, userID]);

  // fetched user info
  const userInfo = useSelector(state => state.auth.userInfo);

  // fetched tours from state
  const pastTours = useSelector(state => state.toursFetching.pastTours);
  const presentTours = useSelector(state => state.toursFetching.presentTours);
  const futureTours = useSelector(state => state.toursFetching.futureTours);
  
  // reviews from state
  const agencyReview = useSelector(state => state.reviews.agencyReview);
  const tourReviews = useSelector(state => state.reviews.tourReviews);
  // reviews loadings and errors
  const agencyReviewIsLoading = useSelector(state => state.reviews.fetchAgencyReviewLoading);
  const toursReviewIsLoading = useSelector(state => state.reviews.fetchTourReviewsLoading);
  const agencyReviewIsError = useSelector(state => state.reviews.fetchAgencyRevewError);
  const tourReviewsIsError = useSelector(state => state.reviews.fetchTourReviewsError);
  const deleteReviewsIsError = useSelector(state => state.reviews.deleteReviewError);

  // deleting reviews
  const onRemoveAgencyReview = (revId, token) => dispatch(actions.removeAgencyReview(revId, token));
  const onRemoveTourReview = (revId, token) => dispatch(actions.removeTourReview(revId, token));

  // fetched requested tours from state
  const requestedTours = useSelector(state => state.requestTour.requestedTours);

  // setting clear all tours state
  const [clearAllToursType, setClearAllToursType] = useState("");
  // deleting requested tour
  const onReqTourDelete = (tourId, token) => dispatch(actions.reqTourDelete(tourId, token));
  // deleting all requested tours
  const onReqToursClearAll = (token) => dispatch(actions.reqToursClearAll(token));
  // store target requested tour id
  const [reqTourDeleteId, setReqTourDeleteId] = useState(null);
  // set target req tour id when showing quest.modal
  const deleteReqTourQuestion = (reqTourId) => {
    showQuestionModal("cancelling request", "Are you sure you want to cancel this request?");
    setReqTourDeleteId(reqTourId);
  };
  // clear all req tours question
  const clearAllReqToursQuestion = () => {
    setClearAllToursType("reqTours");
    showQuestionModal("deleting all requests", "Are you sure you want to delete all your requested tours?");
  };

  // deleting single tour
  const onDeleteSingleTour = (tourId, token) => dispatch(actions.deleteSingleTour(tourId, token));
  // store target tour id
  const [tourDeleteID, setTourDeleteId] = useState(null);
  // set target tour id when showing quest.modal
  const deleteTourQuestion = (tourId, status) => {
    let questionTitle, questionText;
    if(status === "past" || status === "present") {
      questionTitle = "removing tour from history";
      questionText = "Are you sure you want to remove this tour from history? Beware that if you do that, you won't get discounts while booking via website for future tours, since our dicounts system rellies of your touring history. To get discounts, you will need to call us directly."
    } else if(status === "future") {
      questionTitle = "cancelling tour";
      questionText = "Are you sure you want to cancel this tour?";
    }
    showQuestionModal(questionTitle, questionText);
    setTourDeleteId(tourId);
  };

  // clear all tours from particular box
  const onClearTours = (tourStatus, targetedTourList, token) => dispatch(actions.clearTours(tourStatus, targetedTourList, token));
  // get target tours status
  const [targetToursStatus, setTargetToursStatus] = useState("");
  // get targeted tours
  const [targetedTours, setTargetedTours] = useState(null);
  // clear all tours question
  const clearAllToursQuestion = (targetTours) => {
    setTargetedTours(targetTours);
    let questionTitle, questionText;
    if(targetTours === pastTours) {
      questionTitle = "clearing past touring history";
      questionText = "Are you sure you want to clear all past touring history? Beware that if you do that, you won't get discounts while booking via website for future tours, since our dicounts system rellies of your touring history. To get discounts, you will need to call us directly."
    } else if(targetTours === presentTours) {
      questionTitle = "clearing present touring history";
      questionText = "Are you sure you want to clear all present touring history? Beware that if you do that, you won't get discounts while booking via website for future tours, since our dicounts system rellies of your touring history. To get discounts, you will need to call us directly."
    } else if(targetTours === futureTours) {
      questionTitle = "cancelling all booked tours";
      questionText = "Are you sure you want to cancel all of your booked tours?";
    }
    setTargetToursStatus(targetTours[0].status);
    setClearAllToursType("bookedTours");
    showQuestionModal(questionTitle, questionText);
  };

  // reviews deleting data
  const [reviewType, setReviewType] = useState(null);
  const [tourRevId, setTourRevId] = useState(null);
  // delete review question
  const deleteReviewQuestion = (revType = null, revId = null) => {
    if(revId !== null && revType === null) {
      setTourRevId(revId);
    }
    if(revId === null && revType !== null) {
      setReviewType(revType);
    }
    
    showQuestionModal("deleting review", "Are you sure you want to delete this review?");
  };
  // cancel question modal
  const cancelQuestionModal = () => {
    setReqTourDeleteId(null);
    setTourDeleteId(null);
    setClearAllToursType("");
    closeQuestionModal();
    setTargetToursStatus("");
    setReviewType(null);
    setTourRevId(null);
    setTargetedTours(null);
  };
  // confirm req tour deletion
  const confirmQuestionModal = (reqTourId = null, bookedTourId = null, tourStatus = null, targetedTourList = null, revType = null, revId = null) => {
    if(reqTourId !== null && bookedTourId === null && clearAllToursType === "" && revType === null && revId === null) {
      onReqTourDelete(reqTourId, userToken);
    } else if(reqTourId === null && bookedTourId !== null && clearAllToursType === "" && revType === null && revId === null) {
      onDeleteSingleTour(bookedTourId, userToken);
    } else if(reqTourId === null && bookedTourId === null && clearAllToursType === "reqTours" && revType === null && revId === null) {
      onReqToursClearAll(userToken);
    } else if(reqTourId === null && bookedTourId === null && clearAllToursType === "bookedTours" && revType === null && revId === null) {
      onClearTours(tourStatus, targetedTourList, userToken);
    } else if(reqTourId === null && bookedTourId === null && clearAllToursType === "" && revType === "agencyRev" && revId === null) {
      onRemoveAgencyReview(null, userToken);
    } else if(reqTourId === null && bookedTourId === null && clearAllToursType === "" && revType === null && revId !== null) {
      onRemoveTourReview(revId, userToken);
    }
    setReqTourDeleteId(null);
    setTourDeleteId(null);
    setClearAllToursType("");
    closeQuestionModal();
    setTargetToursStatus("");
    setReviewType(null);
    setTourRevId(null);
    setTargetedTours(null);
  };

  // display tours function
  const displayToursHandler = (tourList) => {
    let displayedTours = tourList.map(tour => {
      
      return <SingleTourBooked
        key={tour.id}
        tourIcon={tour.displayIcon}
        tourContinent={tour.continent}
        tourState={tour.state}
        tourCities={tour.cities}
        tourImg={tour.displayImg}
        tourPrice={tour.price}
        tourDays={tour.days}
        tourDate={tour.tourDate}
        tourMeditation={tour.meditation}
        tourMeditationParticipation={tour.meditationParticipation}
        tourDiscount={tour.discount}
        tourDelBtnText={tourList === futureTours ? "cancel this tour" : "remove from history"}
        tourPrepareDelete={() => deleteTourQuestion(tour.id, tour.status)} />
    });
    return displayedTours;
  };

  let noToursText = <p style={{textAlign: "center", fontSize: "2rem", textTransform: "uppercase"}}>no tours yet</p>;
  let errorFetchingText = <p style={{textAlign: "center", fontSize: "2rem", textTransform: "uppercase", color: "red"}}>can't load tours. try refreshing the page, or try again latter</p>;

  // display tourboxes function
  const displayTourBoxesHandler = (fetchedTours, tourBoxTitle) => {

    let displayedTours = displayToursHandler(fetchedTours);
    if(fetchedTours && fetchedTours.length !== 0) {
      displayedTours = displayToursHandler(fetchedTours);
    } 
    if(fetchedTours.length === 0) {
      displayedTours = noToursText;
    }
    if(fetchToursIsLoading) {
      displayedTours = <Spinner />;
    }
    if(fetchToursIsError) {
      displayedTours = errorFetchingText;
    }

    let tourBox = (
      <div className="your-page__tours-section">
        <h3>{tourBoxTitle}</h3>
        <div className={fetchToursIsLoading || fetchedTours.length === 0 || fetchToursIsError !== null ? "your-page__tours-toursbox tourbox-disp-block" : "your-page__tours-toursbox"}>
          {displayedTours}
        </div>
        <button className="your-page__clear-all-btn" style={{display: fetchedTours.length === 0 ? "none" : "block"}} onClick={() => clearAllToursQuestion(fetchedTours)}>
          {fetchedTours === futureTours ? "cancel all booked tours" : "clear all tours"}
        </button>
      </div>
    );

    return tourBox;
  }

  // displayed requested tours
  let requestedToursDisplayed = requestedTours.map(tour => {
    return <RequestedTour
        key={tour.id}
        countryCode={tour.code}
        countryCountry={tour.country}
        countryState={tour.state === "" ? "---" : tour.state}
        countryCity={tour.city === "" ? "---" : tour.city}
        deleteQuestion={() => deleteReqTourQuestion(tour.id)} />
  });
  
  if(fetchRequestToursIsLoading) {
    requestedToursDisplayed = <Spinner />;
  }
  if(requestedTours.length === 0) {
    requestedToursDisplayed = noToursText;
  }
  if(fetchRequestToursIsError) {
    requestedToursDisplayed = errorFetchingText;
  }

  let noReviewesText = <p style={{textAlign: "center", fontSize: "2rem", textTransform: "uppercase"}}>no reviews yet</p>;
  let reviewsLoadErrorText = <p style={{textAlign: "center", fontSize: "2rem", textTransform: "uppercase", color: "red"}}>can't load reviews. try refreshing the page, or try again latter</p>;

  // display agency tour
  let agencyReviewDisplayed;
  if(agencyReview !== null) {
    agencyReviewDisplayed = <YourReview
        yourReviewClassname="agency"
        yourReviewTitle="your opinion of us"
        yourReviewName={agencyReview.name}
        yourReviewJob={agencyReview.job}
        yourReviewTours={agencyReview.tours}
        yourReviewText={agencyReview.review}
        yourReviewRating={agencyReview.rating}
        deleteReviewQuestion={() => deleteReviewQuestion("agencyRev", null)} />;
  }
  if(agencyReviewIsLoading) {
    agencyReviewDisplayed = <Spinner />;
  }
  if(agencyReview === null) {
    agencyReviewDisplayed = noReviewesText;
  }
  if(agencyReviewIsError) {
    agencyReviewDisplayed = reviewsLoadErrorText;
  }

  // display tours reviews
  let tourReviewsDisplayed;
  if(tourReviews) {
    tourReviewsDisplayed = tourReviews.map(tour => {
      return <YourReview
        key={tour.id}
        yourReviewClassname="tours"
        yourReviewTitle="single tour review"
        yourReviewName={tour.name}
        yourReviewJob={tour.job}
        yourReviewTours={tour.tour}
        yourReviewText={tour.review}
        yourReviewRating={tour.rating}
        deleteReviewQuestion={() => deleteReviewQuestion(null, tour.id)} />
    })
  }
  if(tourReviews.length === 0) {
    tourReviewsDisplayed = noReviewesText
  }
  if(toursReviewIsLoading) {
    tourReviewsDisplayed = <Spinner />;
  }
  if(tourReviewsIsError) {
    tourReviewsDisplayed = reviewsLoadErrorText;
  }

  let userInfoDisplayed;
  if(userInfo !== null) {
    userInfoDisplayed = (
      <>
        <ul className="your-page__user-info-list">
          <li className="your-page__user-info-item">
            <span>Full name: </span>{userInfo.firstName} {userInfo.lastName}
          </li>
          <li className="your-page__user-info-item">
            <span>Email: </span>{userInfo.email}
          </li>
          <li className="your-page__user-info-item">
            <span>Country: </span>{userInfo.country}
          </li>
          <li className="your-page__user-info-item">
            <span>City: </span>{userInfo.city}
          </li>
          <li className="your-page__user-info-item">
            <span>Phone: </span>{userInfo.phone}
          </li>
        </ul>
      </>
    );
  }
  if(!userInfo) {
    userInfoDisplayed = <p>no info to show</p>;
  }
  if(authIsLoading) {
    userInfoDisplayed = <Spinner />;
  }
  if(authIsError) {
    userInfoDisplayed = <p style={{textAlign: "center", fontSize: "2rem", textTransform: "uppercase", color: "red", marginBottom: "2rem"}}>your info should be here, but it can't be loaded right now. try refreshing the page</p>
  }
  return (
    <>
      <SectionTitle
        titleClassname="your-page"
        icon={<BsPersonFill />}
        titleText="your page"
        titleAdditional="all your activities" />
      {/* modals for tours managing */}
      <QuestionModal
        questionModalShow={questionModalData.show}
        questionModalTitle={questionModalData.title}
        questionModalText={questionModalData.text}
        questionModalCancel={cancelQuestionModal}
        questionModalConfirm={() => confirmQuestionModal(reqTourDeleteId, tourDeleteID, targetToursStatus, targetedTours, reviewType, tourRevId)} />
      <ErrorModal
        errorModalShow={deleteReqTourIsError !== null || deleteTourIsError !== null}
        errorModalMsg={deleteReqTourIsError !== null || deleteTourIsError !== null ? "Can't perform action at the moment. Try later." : null}
        errorModalClosed={deleteReqTourIsError !== null ? onClearDeleteReqTourError : onClearDeleteTourError} />
      {/* modals for reviews managing */}
      <section className="your-page__content">
        <p className="your-page__text">
          Hello {userInfo !== null ? <span style={{fontWeight: "bold", color: "red"}}>{userInfo.firstName}</span> : "user"}! This is your personal page. Here you can find all your activities on our website. Your touring history is here - your past, present and future tours.
          Also, here you can find the tours the you have requested, if you requested any. Plus, if you left reviews, you can find them here.
        </p>
        <article className="your-page__user-info">
          <div className="your-page__tours-title">
            <BsPerson className="your-page__tours-title__icon"/>
            <p className="your-page__tours-title__text">your info</p>
          </div>
          {userInfoDisplayed}
        </article>
        {/* past, present and future tours */}
        <article className="your-page__tours">
          <div className="your-page__tours-title">
            <BsClockHistory className="your-page__tours-title__icon"/>
            <p className="your-page__tours-title__text">your touring history</p>
          </div>
          {/* past tours */}
          <>
            {displayTourBoxesHandler(pastTours, "Past Tours")}
          </>
          {/* present tours */}
          <>
            {displayTourBoxesHandler(presentTours, "Current Tours")}
          </>
          {/* past tours */}
          <>
            {displayTourBoxesHandler(futureTours, "Upcoming Tours")}
          </>
        </article>
        {/* requested tours */}
        <article className="your-page__requests">
          <div className="your-page__tours-title">
            <AiOutlinePullRequest className="your-page__tours-title__icon"/>
            <p className="your-page__tours-title__text">tours you requested</p>
          </div>
          <div className={fetchRequestToursIsLoading || requestedTours.length === 0 || fetchRequestToursIsError !== null ? "your-page__requests-tours tourbox-disp-block" : "your-page__requests-tours"}>
            {/* single tours */}
            {requestedToursDisplayed}
            <button 
              className="your-page__clear-all-btn"
              style={{display: requestedTours.length === 0 || fetchRequestToursIsError !== null ? "none" : "block"}}
              onClick={clearAllReqToursQuestion}>
              delete all requests
            </button>
          </div>
        </article>
        {/* reviews */}
        <article className="your-page__reviews">
          <div className="your-page__tours-title">
            <AiOutlinePullRequest className="your-page__tours-title__icon"/>
            <p className="your-page__tours-title__text">your reviews</p>
          </div>
          <div className="your-page__reviews-reviews your-page__reviews-reviews--agency">
            {/* reviews */}
            <div className="your-page__reviews-reviews__agency">
              <h3 className="your-page__reviews-reviews__title">
                Agency review
              </h3>
              {agencyReviewDisplayed}
            </div>
          </div>
          <div className="your-page__reviews-reviews your-page__reviews-reviews--tours">
            {/* reviews */}
            <div className="your-page__reviews-reviews__agency">
              <h3 className="your-page__reviews-reviews__title">
                Tours Reviews
              </h3>
              <div className="reviews-tours-box">
                {tourReviewsDisplayed}
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}

export default YourPage;
