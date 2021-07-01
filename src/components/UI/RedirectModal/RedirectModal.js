import React from 'react';
import './redirect-modal.scss';
import '../../../sass-additions/helper-classes.scss';
import Backdrop from '../Backdrop/Backdrop';
import CSSTransition from 'react-transition-group/CSSTransition';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/index';

const RedirectModal = props => {
  const dispatch = useDispatch();
  // logout action
  const onLogout = () => dispatch(actions.logout());
  // logout and close modal
  const logoutAndCloseModal = () => {
    onLogout();
    props.redirectModalClosed();
  };
  return (
    <>
      <Backdrop
        show={props.redirectModalShow}
        backdropClicked={props.redirectModalClosed} />
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.redirectModalShow}
        timeout={300}
        classNames="show">
        <div className="redirect-modal">
          <h3 className="redirect-modal__title">
            {props.redirectModalTitle}
          </h3>
          <div className="redirect-modal__content">
            <Link to="/" onClick={props.redirectModalClosed}>go home</Link>
            <Link to="/your-page" onClick={props.redirectModalClosed}>go to your page</Link>
            <Link to="/tours" onClick={props.redirectModalClosed}>view tours</Link>
            <Link to="/leave-review" onClick={props.redirectModalClosed}>leave review</Link>
            <Link to="/request-tour" onClick={props.redirectModalClosed}>request tour</Link>
            <button 
              className="redirect-modal__logout"
              onClick={logoutAndCloseModal}>logout</button>
          </div>
          <button 
            className="redirect-modal__btn"
            onClick={props.redirectModalClosed}>
            close
          </button>
        </div>
      </CSSTransition>
    </>
  );
}

export default RedirectModal;
