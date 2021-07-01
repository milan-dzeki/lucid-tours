import React from 'react';
import './your-page-alt.scss';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const YourPageAlt = () => {
  return (
    <>  
      <SectionTitle
        titleClassname="your-page-alt"
        icon={<BsPersonFill />}
        titleText="your page"
        titleAdditional="sign up to view" />
      <section className="your-page-alt__content">
        <p className="your-page-alt__text">
          This is your personal page. Here you can find all your activities on our website. Your touring history is here - your past, present and future tours.
          Also, here you can find the tours the you have requested, if you requested any. Plus, if you left reviews, you can find them here.
          <br />
          <br />
          <Link to="/signup" style={{display: "inline-block", color: "red", textDecoration: "underline"}}>SIGN UP</Link> in order to gain access to this page.
        </p>
      </section>
    </>
  );
}

export default YourPageAlt;
