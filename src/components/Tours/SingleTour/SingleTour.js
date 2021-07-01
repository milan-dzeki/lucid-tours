import React from 'react';
import './single-tour.scss';
import { Link } from 'react-router-dom';

const SingleTour = React.memo(({tourIcon, tourState, tourCities, tourPrice, tourDuration, tourImg, tourId}) => {
  return (
    <article className="tours-single-tour">
      <div className="tours-single-tour__title">
          <div className="tours-single-tour__icon">
            {tourIcon}
          </div>
          <p className="tours-single-tour__state">
            {tourState}
          </p>
        </div>
      <div className="tours-single-tour__info">
        
        <div className="tours-single-tour__cities">
          <p className="tours-single-tour__cities-text">
            You will visit:
          </p>
          <ul className="tours-single-tour__cities-list">
            {tourCities.map((city, index) => (
              <li
                key={index}
                className="tours-single-tour__cities-city">
                {city}
              </li>
            ))}
          </ul>
        </div>
        <p className="tours-single-tour__price">
          price: ${tourPrice}
        </p>
        <p className="tours-single-tour__duration">
          You wll stay {tourDuration} days
        </p>
      </div>
      <div className="tours-single-tour__img">
        <img src={tourImg} alt={tourState} />
      </div>
      <Link to={`/tours/${tourId}`} className="tours-single-tour__link">see details or book tour</Link>
    </article>
  );
})

export default SingleTour;
