import React from 'react';
import './banner.scss';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { FiChevronsRight } from 'react-icons/fi';

const Banner = props => {
  return (
    <section className={`banner banner__${props.bannerClassname}`}>
      <article 
        className="banner__content"
        style={{
          transform: `translateX(calc(-100vw * ${props.slidePosition}))`
        }}>
        {props.data.map((item, index) => {
          const {id, image, title, text, link, linkText} = item;
          return (
            <div
              key={id}
              className={`banner__item banner__item--${index}
              ${props.slidePosition === index ? "slide-active" : null}`}
              style={{backgroundImage: `url(${image})`}}>
              <div className="banner__item-content">
                <div className="banner__item-title">
                  <p className="banner__item-title__title">
                    {title}
                  </p>
                  <p className="banner__item-title__text">
                    {text}
                  </p>
                </div>
                <div className="banner__item-link">
                  <div className="banner__item-link__content">
                    {props.bannerType === "hash" ? (
                      <NavHashLink to={link} className="banner__item-link__link">
                        {linkText}
                      </NavHashLink>
                      ) : (
                      <Link to={link} className="banner__item-link__link">
                        {linkText}
                      </Link>
                      )}
                    <FiChevronsRight className="banner__item-link__icon"/>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </article>
      {/* buttons */}
      <div className="banner__buttons">
        {props.data.map((btn, index) => (
          <button 
            className={`banner__btn ${props.slidePosition === index ? "btn-active" : null}`}
            key={index}
            onClick={() => props.setSlidePosition(index)}></button>
        ))}
      </div>
    </section>
  );
}

export default React.memo(Banner);
