import React from 'react';
import './requested-tour.scss';
import Flag from 'react-world-flags';

const RequestedTour = props => {
  return (
    <div className="requested-tour">
      <h3 className="requested-tour__title">
        You requested:
      </h3>
      <div className="requested-tour__flex">
      <div className="requested-tour__content">
        <div className="requested-tour__info">
          <p><span>Country: </span>{props.countryCountry}</p>
          <p><span>State: </span>{props.countryState}</p>
          <p><span>City: </span>{props.countryCity}</p>
        </div>
        <div className="requested-tour__flag">
          <Flag code={props.countryCode} />
        </div>
      </div>
      <button 
        className="requested-tour__delete"
        onClick={props.deleteQuestion}>
        delete request
      </button>
      </div>
    </div>
  );
}

export default React.memo(RequestedTour);
