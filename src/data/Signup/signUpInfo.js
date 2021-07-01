import React from 'react';
//images
import imgBook from '../../images/signup/book-tour.jpg';
import imgRequest from '../../images/signup/request-tour.jpg';
// import imgCommunity from '../../images/signup/online-community.png';
import imgReview from '../../images/signup/review.jpg';
//icons
import { BsBookmarkCheck } from 'react-icons/bs';
import { GoRequestChanges } from 'react-icons/go';
// import { IoIosPeople } from 'react-icons/io';
import { MdRateReview } from 'react-icons/md';

export const signUpInfo = [
  {
    id: "signup-book",
    title: "book your tour from home",
    titleIcon: <BsBookmarkCheck />,
    image: imgBook,
    text: "Book your tour from the comfort of your home right now.",
    link: "/tours",
    linkName: "see tours"
  },
  {
    id: "signup-request",
    title: "request tour according to your wishes",
    titleIcon: <GoRequestChanges />,
    image: imgRequest,
    text: "Tell us where would you like to travel. Request the destination and we'll see what we can do.",
    link: "/request-tour",
    linkName: "request a tour"
  },
  // {
  //   id: "signup-community",
  //   title: "join online community",
  //   titleIcon: <IoIosPeople />,
  //   image: imgCommunity,
  //   text: "Meet other travel enthusiasts and see their experiences",
  //   link: "/online-community",
  //   linkName: "view community"
  // },
  {
    id: "signup-review",
    title: "leave a review",
    titleIcon: <MdRateReview />,
    image: imgReview,
    text: "What are your experiences from traveling with us? Leave your comment.",
    link: "/leave-review",
    linkName: "leave review"
  },
];