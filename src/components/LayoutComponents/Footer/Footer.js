import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <article className="footer__top">
          <p className="footer__top-title">
            lucid tours
          </p>
          <div className="footer__top-logo"></div>
        </article>
        <article className="footer__bottom">
          &copy; All Rights Reserved.
        </article>
      </div>
    </footer>
  );
}

export default Footer;
