import React, { useState, useRef } from 'react';
import './reviews.scss';
import '../../sass-additions/helper-classes.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { VscPreview } from 'react-icons/vsc';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import SingleReview from '../../components/Reviews/SingleReview/SingleReview';
import InfoModal from '../../components/UI/InfoModal/InfoModal';
import { useLength } from '../../custom-hooks/useLength';
import { useInfoModal } from '../../custom-hooks/useInfoModal';

const Reviews = () => {
  const {infoModalData, showInfoModal, closeInfoModal} = useInfoModal();
  // auth state
  const isAuth = useSelector(state => state.auth.token);
  // reviews from reducer
  const userReviews = useSelector(state => state.reviewPeople.users);
  const [ratings, setRatings] = useState({
    options: [
      {
        value: "all"
      },
      {
        value: "1/5"
      },
      {
        value: "2/5"
      },
      {
        value: "3/5"
      },
      {
        value: "4/5"
      },
      {
        value: "5/5"
      },
    ],
    value: "all"
  });

  const ratingsValueChanged = (event) => {
    setRatings(prevState => {
      return {
        ...prevState,
        value: event.target.value
      }
    })
  };

  let filteredReviews;

  if(ratings.value !== "all") {
    filteredReviews = userReviews.filter(review => review.rated === ratings.value);
  } else {
    filteredReviews = userReviews;
  }

  let displayedReviews = filteredReviews.map(singleReview => {
    const {image, name, job, travelledTo, review, rated} = singleReview;
    return <SingleReview
        key={name}
        personReviewImg={image}
        personReviewName={name}
        personReviewJob={job}
        personReviewTours={travelledTo}
        personReviewText={review}
        personReviewRating={rated} />
  });

  // reviews container
  const reviewsContainer = useRef(null);
  // manage look according to number of displayed reviews
  useLength(filteredReviews, reviewsContainer);

  return (
    <>
      <InfoModal
        infoModalShow={infoModalData.show}
        infoModalClosed={closeInfoModal}
        infoModalTitle={infoModalData.title}
        infoModalBcg={infoModalData.bcgImg}
        infoModalText={infoModalData.text}
        infoModalBtns={
          <Link to="/signup" className="info-modal__btn--confirm" style={{display: "block"}}>
            sign up/log in
          </Link>
        } />
      <SectionTitle
        titleClassname="reviews"
        icon={<VscPreview />}
        titleText="user reviews"
        titleAdditional="share your experience" />
      <section className="reviews__content">
        <p className="reviews__text">
          These are our customers reviews, so far. To add your review, sign up and click on the button bellow.
        </p>
        <article className="reviews__filter">
          <label htmlFor="filter">
            View by rating:
          </label>
          <select 
            name="filter" 
            id="filter"
            value={ratings.value}
            onChange={ratingsValueChanged}>
            {ratings.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.value}
              </option>
            ))}
          </select>
        </article>
        <article className="reviews__reviews" ref={reviewsContainer}>
          {displayedReviews}
        </article>
        {isAuth !== null ? (
          <Link className="reviews__btn" to="/leave-review">
            Leave your review
          </Link>
        ) : (
          <button 
            type="button"
            className="reviews__btn"
            onClick={() => showInfoModal("", "sign up to proceed", <p style={{textAlign: "center"}}>You need to log in in order to proceed.</p>)}>
            Leave your review
          </button>
        )}
      </section>
    </>
  );
}

export default Reviews;
