import React from 'react';
import './tour-guides.scss';

const TourGuides = props => {
  return (
    <div className={`guides__container guides__container--${props.guidesClassname}`}>
      <h3 className="guides__title">
        {props.guidesTitle}       
      </h3>
      <div className="guides__people">
        {props.guidesPeople.map(person => {
          return (
            <div 
              className="guides__person" 
              key={person.name}
              style={{backgroundImage: `url(${person.image})`}} >
              <p className="guides__person-name">
                <span>Name: </span>
                {person.name}
              </p>
              <p className="guides__person-job">
                <span>Job: </span>
                {person.job}
              </p>
              <p className="guides__person-info">
                {person.info}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TourGuides;
