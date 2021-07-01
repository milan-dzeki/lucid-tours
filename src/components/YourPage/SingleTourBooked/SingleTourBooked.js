import React from 'react';
import './single-tour-booked.scss';

const SingleTourBooked = props => {
  return (
    <div className="single-tour-booked">
      <div className="single-tour-booked__title">
        <div className="single-tour-booked__title-icon">
          {props.tourIcon}
        </div>
        <p className="single-tour-booked__title-continent">
          {/* {tour.continent} */}
          {props.tourContinent}
        </p>
      </div>
      <div className="single-tour-booked__info">
        <div className="single-tour-booked__info-text">
          <p><span>State: </span>{props.tourState}</p>
          <p><span>Cities you visited:</span></p>
          <ul>
            {props.tourCities.map((city, index) => {
              return <li key={index}> - {city}</li>
            })}
          </ul>
          <p><span>price payed:</span> ${props.tourPrice}</p>
          <p><span>discounts: </span>{props.tourDiscount || "none"}</p>
          <p><span>days stayed:</span> {props.tourDays}</p>
          <p><span>visit period:</span> {props.tourDate}</p>
          {props.tourMeditation === "with" && (
            <p><span>parcipitates in meditation: </span>{props.tourMeditationParticipation}</p>
          )}
        </div>
        <div className="single-tour-booked__info-img" style={{backgroundImage: `url(${props.tourImg})`}}></div>
      </div>
      <button 
        className="single-tour-booked__delete-btn"onClick={props.tourPrepareDelete}>
        {props.tourDelBtnText}
      </button>
    </div>
  )
}

export default React.memo(SingleTourBooked);
