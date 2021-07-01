import React from 'react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { MdCardTravel } from 'react-icons/md';
import { GiHealthIncrease,GiMeditation } from 'react-icons/gi';
import * as texts from './travelSectionTexts';
//travel-explore the world images
import explore1 from '../../images/home/sections/travel/explore/explore-1.jpg';
import explore2 from '../../images/home/sections/travel/explore/explore-2.jpg';
import explore3 from '../../images/home/sections/travel/explore/explore-3.jpg';
//travel-health images
import health1 from '../../images/home/sections/travel/health/health-1.jpg';
import health2 from '../../images/home/sections/travel/health/health-2.jpg';
import health3 from '../../images/home/sections/travel/health/health-3.jpg';
//travel-self images
import self1 from '../../images/home/sections/travel/self/self-1.jpg';
import self2 from '../../images/home/sections/travel/self/self-2.jpg';
import self3 from '../../images/home/sections/travel/self/self-3.jpg';
import self4 from '../../images/home/sections/travel/self/self-4.jpg';

const styles = {
  display: "inline-block", 
  color: "red",
  textDecoration: "underline"
};

export const travelSubSections = [
  {
    id: "travel-subsection-1",
    customClassname: "home-travel",
    titleIcon: <MdCardTravel />,
    titleText: "explore the world",
    paragraphText: texts.textOne,
    images: [
      {
        id: "travel-subsection-1-img-1",
        imageUrl: explore1,
        imageText: "explore the ecosystem",
        imageInfo: (
          <>
            Every country has its peculiar ecosystem. Even though you won't see much of it in highly populated cities, like for example New York, there are still places in the world where nature has not been demolished.
            <br />
            These places are amazing as they bring the sense of wonder and reverence toward life. Check <Link to="/tours/tour-18" style={styles}>Madagascar</Link> for example. It's environment is rich with extraordinary species about which some can only dream off. There is a lot to discover, so check <Link to="/tours" style={styles}> our tours</Link> and come aboard.
          </>
        )
      },
      {
        id: "travel-subsection-1-img-2",
        imageUrl: explore2,
        imageText: "explore the sea",
        imageInfo: (
          <>
            Many of our tours include visiting beautiful seashores all over the world. For example, you can enjoy beautiful beaches in <Link to="/tours/tour-2" style={styles}>Miami</Link>, in one of our US tours.
            <br />
            Besides that, you can visit <Link to="/tours/tour-9" style={styles}>Greece</Link> with us and enjoy southern european sea flavor. Or you can come along to <Link to="/tours/tour-17" style={styles}>Egypt</Link> and take part in scuba diving.
            <br />
            Overall, you can check our <NavHashLink to="/health#swimming" style={styles}>tours with swimming on this page</NavHashLink>. Anyway, we are sure you'll find something that suits your needs.
          </>
        )
      },
      {
        id: "travel-subsection-1-img-3",
        imageUrl: explore3,
        imageText: "enjoy the view",
        imageInfo: (
          <>
            If you like climbing, we offer variety of tours which involves this peculiar activity, some of which you can <NavHashLink to="/health#climbing" style={styles}>check here</NavHashLink>.
            Among many, you can visit <Link to="/tours/tour-9" style={styles}>Greece</Link> and experience climbing activities there. Or you can even come with us to <Link to="/tours/tour-21" style={styles}>Antarctica</Link> and take part in winning the top ice bergs.
          </>
        )
      }
    ]
  },
  {
    id: "travel-subsection-2",
    customClassname: "home-health",
    titleIcon: <GiHealthIncrease />,
    titleText: "improve your health",
    paragraphText: texts.textTwo,
    images: [
      {
        id: "travel-subsection-2-img-1",
        imageUrl: health1,
        imageText: "go hiking",
        imageInfo: (
          <>
            All of our tours involve a lot of walking, sometimes througn plain city landscapes, and sometimes through rich natural environments.
            <br />
            There isn't any specific tour that we can recommend concerning this situation, since all of them will provide you with variety of healthy activities. So be free to check all of <Link to="/tours" style={styles}> our tours</Link>.
          </>
        )
      },
      {
        id: "travel-subsection-2-img-2",
        imageUrl: health2,
        imageText: "climb the mountains",
        imageInfo: (
          <>
            If you like climbing, we offer variety of tours which involves this peculiar activity, some of which you can <NavHashLink to="/health#climbing" style={styles}>check here</NavHashLink>.
            Among many, you can visit <Link to="/tours/tour-9" style={styles}>Greece</Link> and experience climbing activities there. Or you can even come with us to <Link to="/tours/tour-21" style={styles}>Antarctica</Link> and take part in winning the top ice bergs.
          </>
        )
      },
      {
        id: "travel-subsection-2-img-3",
        imageUrl: health3,
        imageText: "swim safely",
        imageInfo: (
          <>
            Many of our tours include visiting beautiful seashores all over the world. For example, you can enjoy beautiful beaches in <Link to="/tours/tour-2" style={styles}>Miami</Link>, in one of our US tours.
            <br />
            Besides that, you can visit <Link to="/tours/tour-9" style={styles}>Greece</Link> with us and enjoy southern european sea flavor. Or you can come along to <Link to="/tours/tour-17" style={styles}>Egypt</Link> and take part in scuba diving.
            <br />
            Overall, you can check our <NavHashLink to="/health#swimming" style={styles}>tours with swimming on this page</NavHashLink>. Anyway, we are sure you'll find something that suits your needs.
          </>
        )
      }
    ]
  },
  {
    id: "travel-subsection-3",
    customClassname: "home-self",
    titleIcon: <GiMeditation />,
    titleText: "find your self",
    paragraphText: texts.textThree,
    images: [
      {
        id: "travel-subsection-3-img-1",
        imageUrl: self1,
        imageText: "ayahuasca experience",
        imageInfo: (
          <>
            For those of you with peculiar tastes, we offer a lifetime opportunity to take part in ayahuasca experience, led by experienced Brazilian shamans. Your life will forever change after this, we can guarantee that.
            <br />
            Wait no more and check <Link to="/tours/tour-6" style={styles}>Brazil tour</Link> or check all of our tours which invole <Link to="/meditation" style={styles}>similar activities</Link>
          </>
        )
      },
      {
        id: "travel-subsection-3-img-2",
        imageUrl: self2,
        imageText: "go to retreat",
        imageInfo: (
          <>
            For those of you with peculiar tastes, we offer a lifetime opportunity to take part in meditation retreat in Shambhala Meditation Centre of Toronto. Your life will forever change after this, we can guarantee that.
            <br />
            Wait no more and check <Link to="/tours/tour-3" style={styles}>Canada tour</Link> or check all of our tours which invole <Link to="/meditation" style={styles}>similar activities</Link>
          </>
        )
      },
      {
        id: "travel-subsection-3-img-3",
        imageUrl: self3,
        imageText: "meet indian gurus",
        imageInfo: (
          <>
            For those of you with peculiar tastes, we offer a lifetime opportunity to take part in meditation retreat with Indian gurus. Your life will forever change after this, we can guarantee that.
            <br />
            Wait no more and check <Link to="/tours/tour-16" style={styles}>India tour</Link> or check all of our tours which invole <Link to="/meditation" style={styles}>similar activities</Link>
          </>
        )
      },
      {
        id: "travel-subsection-3-img-4",
        imageUrl: self4,
        imageText: "aboriginal initiation",
        imageInfo: (
          <>
            For those of you with peculiar tastes, we offer a lifetime opportunity to recieve Aboriginal initiation which involves expansion or your state of consciousness. Your life will forever change after this, we can guarantee that.
            <br />
            Wait no more and check <Link to="/tours/tour-20" style={styles}>Australia tour</Link> or check all of our tours which invole <Link to="/meditation" style={styles}>similar activities</Link>
          </>
        )
      }
    ]
  },
];