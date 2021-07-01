import React from 'react';
import './section-title.scss';

const SectionTitle = ({titleClassname, icon, titleText, titleAdditional}) => {
  return (
    <article className={`section-title section-title__${titleClassname}`}>
      <div className="section-title__content">
        <div className="section-title__icon">
          {icon}
        </div>
        <h1 className="section-title__text">
          {titleText}
        </h1>
      </div>
      <div className="section-title__additional">
        {titleAdditional}
      </div>
    </article>
  );
}

export default SectionTitle;
