import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  display: "inline-block", 
  color: "red",
  textDecoration: "underline"
};

export const textOne = (
  <React.Fragment>
    Explore the world with our tours! As we are very young company, we don't have that much tour possibilities. But as times go by, we will expand more and more.
    <br />
    <br />
    We are sure that you will find something that interest you among our offers. We have tours accross all major continents.
    <br />
    <br />
    You can check <Link to="/tours" style={styles}>our tours page</Link>, to see if you like something.
    However, if you are not satisfied with our offers, you can tell us <Link to="/request-tour" style={styles}>where would you like to travel</Link>, and we will store your request in our database. If sufficient number of people require certain destination, we will make the custom tour.
    <br />
    <br />
    In order to require a tour, you need to <Link to="/signup" style={styles}>sign up</Link> first.
  </React.Fragment>
);

export const textTwo = (
  <React.Fragment>
    If you have some health issues due to lack of movement, you can definitely check our active tours, where we have number of physical activities to improve your health.
    <br />
    <br />
    If you like swimming, check out our <Link to="/health" style={styles}>sea tours</Link>. If you like climbing, explore <Link to="/health" style={styles}>mountain climbing possibilities</Link>.
    <br />
    <br />
    However, beware that these activities are optional, meaning, you can participate in them, or just be left alone by yourself and explore something else within the given terrain.  
  </React.Fragment>
);

export const textThree = (
  <React.Fragment>
    If you have an urge to explore life more deeply, you can participate in our <Link to="/meditation" style={styles}>self seeking tours</Link>. We offer a couple of possibilities for you to explore various spiritual traditions.
    <br />
    <br />
    The deal is that when we visit countries with such possibilities, we have extra transport for you, and others like you. We drop you off to meditation center and continue with our usual tour with our other travellers.
    <br />
    <br />
    But no worries! We are no leaving you behind! After your walkabout is complete, which is the same time when our tour ends, we come to pick you up and return you home. But there is also a possibility to stay longer, and extened your card.
  </React.Fragment>
);