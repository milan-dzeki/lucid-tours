import React from 'react';
import './navlist.scss';
import '../../sass-additions/helper-classes.scss';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineLogout } from 'react-icons/ai';
import { GiDetour } from 'react-icons/gi';
import { VscPreview } from 'react-icons/vsc';
import { FiAtSign } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa'; 
import { useSelector, useDispatch } from 'react-redux';
import Backdrop from '../UI/Backdrop/Backdrop';
import QuestionModal from '../UI/QuestionModal/QuestionModal';
import { useQuestionModal } from '../../custom-hooks/useQuestionModal';
import { CSSTransition } from 'react-transition-group';
import * as actions from '../../store/actions/index';

// navlist data
const navlistData = [
  {
    id: "home",
    text: "home",
    icon: <AiOutlineHome />,
    link: "/"
  },
  {
    id: "about",
    text: "about",
    icon: <AiOutlineInfoCircle />,
    link: "/about"
  },
  {
    id: "tours",
    text: "tours",
    icon: <GiDetour />,
    dropdown: [
      {
        id: "tours-tours",
        text: "see all tours",
        link: "/tours"
      },
      {
        id: "tours-health",
        text: "healthy tours",
        link: "/health"
      },
      {
        id: "tours-meditation",
        text: "meditation tours",
        link: "/meditation"
      },
      {
        id: "tours-request",
        text: "request tour",
        link: "/request-tour"
      }
    ]
  },
  {
    id: "reviews",
    text: "reviews",
    icon: <VscPreview />,
    dropdown: [
      {
        id: "reviews-all",
        text: "all reviews",
        link: "/reviews"
      },
      {
        id: "reviews-leave",
        text: "leave review",
        link: "/leave-review"
      }
    ]
  },
  {
    id: "signup",
    text: "sign up",
    icon: <FiAtSign />,
    link: "/signup"
  }
];

const NavList = props => {
  const dispatch = useDispatch();
  // is auth state
  const isAuth = useSelector(state => state.auth.token);

  const {questionModalData, showQuestionModal, closeQuestionModal} = useQuestionModal();

  const prepareLogoutAndCloseNavlist = () => {
    props.navlistClosed();
    showQuestionModal("logging out", "Are you sure you want to logout?");
  };

  const confirmLogout = () => {
    onLogout();
    closeQuestionModal();
  };

  const onLogout = () => dispatch(actions.logout());
  return (
    <>
      <QuestionModal
        questionModalShow={questionModalData.show}
        questionModalTitle={questionModalData.title}
        questionModalText={questionModalData.text}
        questionModalCancel={closeQuestionModal}
        questionModalConfirm={confirmLogout} />
      <Backdrop
        show={props.navlistShow}
        backdropClicked={props.navlistClosed} />
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.navlistShow}
        timeout={300}
        classNames="show">
        <div className="navlist">
          <div className="navlist__close" onClick={props.navlistClosed}>
            <FaTimes />
          </div>
          {navlistData.map(item => {
            return (
              <article key={item.id} className={`navlist__item ${item.link ? "navlist__item--link" : "navlist__item--nolink"}`}>
                {item.link ? (
                  <Link to={item.link} className="navlist__item-main" onClick={props.navlistClosed}>
                    <div className="navlist__item-main__icon">
                      {item.icon}
                    </div>
                    <p className="navlist__item-main__text">
                      {item.text}
                    </p>
                  </Link>
                ) : (
                  <>
                    <div className="navlist__item-main">
                      <div className="navlist__item-main__icon">
                        {item.icon}
                      </div>
                      <p className="navlist__item-main__text">
                        {item.text}
                      </p>
                    </div>
                    <ul className="navlist__item-submenu">
                      {item.dropdown.map(drItem => {
                        return (
                          <li key={drItem.id} className="navlist__item-submenu__item">
                            <Link className="navlist__item-submenu__item-link" to={drItem.link} onClick={props.navlistClosed}>
                              {drItem.text}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </article>
            );
          })}
          {isAuth !== null ? (
            <article className="navlist__item navlist__item--link" onClick={prepareLogoutAndCloseNavlist}>
              <div className="navlist__item-main">
                <div className="navlist__item-main__icon">
                <AiOutlineLogout />
                </div>
                <p className="navlist__item-main__text">
                  logout
                </p>
              </div>
            </article>
          ) : null}
          {isAuth !== null ? (
            <article className="navlist__item navlist__item--link">
              <Link  to="/your-page" className="navlist__item-main" onClick={props.navlistClosed}>
                <div className="navlist__item-main__icon">
                  <BsPerson />
                </div>
                <p className="navlist__item-main__text">
                  your page
                </p>
              </Link>
            </article>
          ) : null}
        </div>
      </CSSTransition>
    </>
  );
}

export default NavList;
