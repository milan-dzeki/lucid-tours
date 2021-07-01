import React from 'react';
import './page-subsection.scss';

const PageSubSection = props => {
  return (
    <article className={`subsection subsection__${props.subsectionClassname}`} id={props.subsectionId}>
      <div className="subsection__content">
        <div className="subsection__text">
          <div className="subsection__heading">
            <div className="subsection__icon">
              {props.subsectionIcon}
            </div>
            <h3 className="subsection__title">
              {props.subsectionTitle}
            </h3>
          </div>
          <div className="subsection__paragraph">
            {props.subsectionText}
          </div>
        </div>
        <div className="subsection__images">
          {props.subsectionImages}
        </div>
      </div>
    </article>
  );
}

export default React.memo(PageSubSection);
