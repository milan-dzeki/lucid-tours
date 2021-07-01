import React from 'react';
import './question-modal.scss';
import Backdrop from '../Backdrop/Backdrop';
import CSSTransition from 'react-transition-group/CSSTransition';

const QuestionModal = props => {
  return (
    <>
    <Backdrop 
      show={props.questionModalShow}
      backdropClicked={props.questionModalCancel}/>
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.questionModalShow}
      timeout={300}
      classNames="show">
        <div className="question-modal">
          <p className="question-modal__title">
            {props.questionModalTitle}
          </p>
          <p className="question-modal__text">
            {props.questionModalText}
          </p>
          <div className="question-modal__btns">
            <button 
              type="button"
              className="question-modal__btn question-modal__btn--cancel"
              onClick={props.questionModalCancel}>
              cancel
            </button>
            <button 
              type="button"
              className="question-modal__btn question-modal__btn--confirm"
              onClick={props.questionModalConfirm}>
              confirm
            </button>
          </div>
        </div>
    </CSSTransition>
    </>
  );
}

export default QuestionModal;
