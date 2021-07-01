import React from 'react';
import './your-review.scss';

const YourReview = props => {
  return (
    <div className={`your-review your-review__${props.yourReviewClassname}`}>
      <h3 className="your-review__title">
        {props.yourReviewTitle}
      </h3>
      <div className="your-review__data">
        <p className="your-review__data-item">
          <span>Chosen Name: </span>{props.yourReviewName}
        </p>
        <p className="your-review__data-item">
          <span>Job: </span>{props.yourReviewJob}
        </p>
        <p className="your-review__data-item">
          <span>You visited:</span>
        </p>
        <ul className="your-review__data-list">
          {props.yourReviewClassname === "agency" && props.yourReviewTours ?  props.yourReviewTours.map((tour, index) => {
            return (
              <li key={index} style={{display: tour === "" ? "none" : "block"}}>
                - {tour.toUpperCase()}
              </li>
            );
          }) : <li>{props.yourReviewTours.toUpperCase()}</li>}
        </ul>
        <p className="your-review__data-item"><span>Your review: </span>{props.yourReviewText}</p>
        <p className="your-review__data-item"><span>Rated: </span>{props.yourReviewRating}/5</p>
      </div>
      <button 
        className="your-review__remove-btn"
        onClick={props.deleteReviewQuestion}>
        remove review
      </button>
    </div>
  )
}

export default React.memo(YourReview);
