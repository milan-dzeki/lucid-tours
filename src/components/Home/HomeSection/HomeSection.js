import React from 'react';
import './home-section.scss';
import SectionTitle from '../../SectionTitle/SectionTitle';

const HomeSection = ({icon, titleText, sectionClassname, titleAdditional, children}) => {
  return (
    <section className={`home-section home-section__${sectionClassname}`}>
      <SectionTitle 
        icon={icon}
        titleText={titleText}
        titleAdditional={titleAdditional} />
      <article className="home-section__content">
        {children}
      </article>
    </section>
  );
}

export default React.memo(HomeSection);
