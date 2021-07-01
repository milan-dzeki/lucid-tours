import swimmingImg from '../../images/singleTourActivities/swimming.jpg';
import { BiSwim } from 'react-icons/bi';
import climbingImg from '../../images/singleTourActivities/climbing.jpg';
import { GiMountains, GiMeditation } from 'react-icons/gi';

export const activitiesData = {
  swimming: {
    name: "swimming",
    icon: <BiSwim />,
    text: `On this tour, you will have an opportunity to attend professional swimming classes with our top instructors. If you know how to swim, but always wanted to learn how to do it properly, this is the right moment for you.
    Also, if you are non-swimmer, you'll be able to learn from scratch, starting from the basics, up to the more advanced levels.
    Off course, this activity is optional. If you don't care about swimming, you can just enjoy your trip.`,
    image: swimmingImg
  },
  climbing: {
    name: "climbing",
    icon: <GiMountains />,
    text: `On this tour, you will have an opportunity to attend professional climbing classes with our professional instructors. You'll learn the basics of alpinism, with cool tools to help you enjoy nature and mountains in general. Equipment is provided by us - you just need to follow along.
    If this doesn't interest you, you can just enjoy your trip, with no concerns.`,
    image: climbingImg
  },
  meditation: {
    name: "meditation",
    icon: <GiMeditation />
  }
}