import React from 'react';
import './single-tour.scss';
import { VscFileSymlinkFile } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const SingleTour = props => {
  return (
    <div 
      className="home-single-tour"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${props.singleTourBcg})`
      }}>
      <div className="home-single-tour__state">
        <div className="home-single-tour__state-icon">
          {props.singleTourIcon}
        </div>
        <div className="home-single-tour__state-text">
          {props.singleTourState}
        </div>
      </div>
      <div className="home-single-tour__info">
        <div className="home-single-tour__info-cities">
          <p className="home-single-tour__info-cities__text">
            cities: 
          </p>
          <p className="home-single-tour__info-cities__items">
            {props.singleTourCities}
          </p>
        </div>
        <div className="home-single-tour__info-price">
          price: $<span>{props.singleTourPrice}</span>
        </div>
        <Link to={`/tours/${props.singleTourId}`} className="home-single-tour__info-btn">
          <p className="home-single-tour__info-btn__text">go to tour page</p>
          <p className="home-single-tour__info-btn__icon"><VscFileSymlinkFile /></p>
        </Link>
      </div>
    </div>
  );
}

export default React.memo(SingleTour);
