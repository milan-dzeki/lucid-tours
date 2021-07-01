import React from 'react';
import './info-modal.scss';
import '../../../sass-additions/helper-classes.scss';
import CSSTransition from 'react-transition-group/CSSTransition';
import Backdrop from '../Backdrop/Backdrop';

const InfoModal = props => {
  return (
    <>
      <Backdrop
        show={props.infoModalShow}
        backdropClicked={props.infoModalClosed} />
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.infoModalShow}
        timeout={300}
        classNames="show">
        <div className="info-modal">
          <h3 className="info-modal__title">
            {props.infoModalTitle}
          </h3>
          <h3 
            className="info-modal__alert"
            style={{display: props.infoModalAlert ? "block" : "none"}}>
            Please choose a date before booking
          </h3>
          <div className="info-modal__text" style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${props.infoModalBcg})`}}>
            {props.infoModalText}
          </div>
          <div className="info-modal__btns">
            {props.infoModalBtns}
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default InfoModal;
