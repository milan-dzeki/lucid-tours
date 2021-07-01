import React from 'react';
import './single-review.scss';
import { GrBlockQuote } from 'react-icons/gr';

const SingleReview = ({personReviewPosition, personReviewImg, personReviewName, personReviewJob, personReviewTours,  personReviewText, personReviewRating}) => {
  return (
    <div className={`single-review ${personReviewPosition}`}>
      <div className="single-review__photo">
        <img src={personReviewImg} alt="review-person" />
      </div>
      <p className="single-review__name">
        {personReviewName}
      </p>
      <p className="single-review__job">
        {personReviewJob}
      </p>
      <ul className="single-review__tours">
        <p className="single-review__tours-been">
          been to:
        </p>
        {personReviewTours.map((tour, index) => {
          return (
            <li
              key={index}
              className="single-review__tours-tour">
              {tour}
            </li>
          );
        })}
      </ul>
      <div className="single-review__text">
        <div className="single-review__text-icon">
          <GrBlockQuote />
        </div>
        <p className="single-review__text-text">
          {personReviewText}
        </p>
      </div>
      <div className="single-review__rating">
        <p className="single-review__rating-title">rated:</p>
        <p className="single-review__rating-rating">{personReviewRating}</p>
      </div>
    </div>
  );
}

export default React.memo(SingleReview);
