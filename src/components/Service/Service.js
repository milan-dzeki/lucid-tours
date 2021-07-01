import React from 'react';
import './service.scss';
import { NavHashLink } from 'react-router-hash-link';

const Service = props => {
  return (
    <div className={`service service--${props.serviceClassname}`}>
      <div className="service__content">
        <div className="service__icon">
          {props.serviceIcon}
        </div>
        <h3 className="service__title">
          {props.serviceTitle}
        </h3>
        <p className="service__text">
          {props.serviceText}
        </p>
      </div>
      <NavHashLink className="service__link" to={props.serviceLinkPath}>
        {props.serviceLinkName}
      </NavHashLink>
    </div>
  );
}

export default React.memo(Service);
