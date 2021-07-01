import React, { useState } from 'react';
import './header.scss';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavList from '../../NavList/NavList';

const Header = () => {
  const [navlistShow, setNavlistShow] = useState(false);
  const closeNavlist = () => {
    setNavlistShow(false);
  };
  return (
    <header className="header">
      <article className="header__icon" onClick={() => setNavlistShow(true)}>
        <FaBars />
      </article>
      <article className="header__title">
        <Link
          to="/"
          className="header__title-link">
          lucid tours
        </Link>
        <div className="header__title-bcg"></div>
      </article>
      <NavList
        navlistShow={navlistShow}
        navlistClosed={closeNavlist} />
    </header>
  );
}

export default Header;
