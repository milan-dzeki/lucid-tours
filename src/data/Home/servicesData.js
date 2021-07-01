import React from 'react';
import { Link } from 'react-router-dom';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { CgViewComfortable } from 'react-icons/cg';
import { BiHotel } from 'react-icons/bi';
import { GiFreedomDove } from 'react-icons/gi';

const styles = {
  display: "inline-block", 
  color: "red",
  textDecoration: "underline"
};

export const servicesData = [
  {
    id: "service-1",
    serviceIcon: <RiMoneyDollarCircleFill />,
    serviceTitle: "flexible payment",
    serviceText: (
      <React.Fragment>
        You don't need to pay full price all at once. You can split your payment into multiple parts, and pay them monthly. We offer couple of options for this. Also, if you've already travelled with us, you get the 5% discount for every next travel. After each tour you do with us, we add it to our database. But you can also {<Link to="/signup" style={styles}>sign up</Link>} and have your tours stored here, in {<Link to="/your-page" style={styles}>your page</Link>}.
      </React.Fragment>
    ),
    serviceLinkName: "check payment options",
    serviceLinkPath: "/about#discounts"
  },
  {
    id: "service-2",
    serviceIcon: <CgViewComfortable />,
    serviceTitle: "comfort travelling",
    serviceText: (
      <React.Fragment>
        We care about your comfort, so we chose most modern transportations. From buses with custom seats to first class airplanes. Also, while on the tour, we choose native tour buses with care, and try to find the most comfortable ones, in order to make your vacations easier.
      </React.Fragment>
    ),
    serviceLinkName: "check transport options",
    serviceLinkPath: "/about#transport"
  },
  {
    id: "service-3",
    serviceIcon: <BiHotel />,
    serviceTitle: "highly rated hotels",
    serviceText: (
      <React.Fragment>
        We try to find best hotels possible in every country we travel to. Off course, this is not possible sometimes, especially in underdeveloped conuntries. However, as our business grows, we plan to make our own hotels, according to our own standards, in cities that our customers often visit. Since we are young company, it can take a while. 
      </React.Fragment>
    ),
    serviceLinkName: "favorite hotels",
    serviceLinkPath: "/about#hotels"
  },
  {
    id: "service-4",
    serviceIcon: <GiFreedomDove />,
    serviceTitle: "freedom",
    serviceText: (
      <React.Fragment>
        You don't need to travel our route when on tour. You can get to desired place with us, and go explore on your own. We respect freedom of choice. You can go back with your tour companions after the tour is done, or, if you want to stay more, you can wait for the next tour, if there is one coming soon, and only then come back home.
      </React.Fragment>
    ),
    serviceLinkName: "",
    serviceLinkPath: "/"
  }
];