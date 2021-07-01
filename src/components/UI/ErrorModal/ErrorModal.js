import React from 'react';
import './error-modal.scss';
import '../../../sass-additions/helper-classes.scss';
import Backdrop from '../Backdrop/Backdrop';
import CSSTransition from 'react-transition-group/CSSTransition';

const ErrorModal = props => {
  return (
    <>
      <Backdrop
        show={props.errorModalShow}
        backdropClicked={props.errorModalClosed} />
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.errorModalShow}
        timeout={300}
        classNames="show">
        <div className="error-modal">
          <p className="error-modal__title">
            Error occured
          </p>
          <p className="error-modal__message">
            {props.errorModalMsg}
          </p>
          <button 
            type="button"
            className="error-modal__btn"
            onClick={props.errorModalClosed}>
              OK
            </button>
        </div>
      </CSSTransition>
    </>
  )
}

export default ErrorModal
