//images
import dmImg from '../../images/reviews/djordje-markovic.jpg';
import jbImg from '../../images/reviews/julie-brian.jpg';
import jgImg from '../../images/reviews/julija-gavrilovic.jpg';
import mkImg from '../../images/reviews/martha-kent.jpg';
import myImg from '../../images/reviews/maximilian-young.jpg';
import mbImg from '../../images/reviews/melina-brian.jpg';
import mdImg from '../../images/reviews/miodrag-draskovic.jpg';
import nsImg from '../../images/reviews/nadezda-sekulic.jpg';
import nlImg from '../../images/reviews/natasha-lucic.jpg';
import sbImg from '../../images/reviews/suzana-brajovic.jpg';

const initialState = {
  users: [
    {
      name: "djordje markovic",
      job: "web developer",
      image: dmImg,
      travelledTo: ["US", "Canada", "India"],
      rated: "5/5",
      topReview: true,
      review: "Best experiences ever! Especially in India with amazing culture. Tour guides are extraordinary. Arangements left me speechless. Organization is very good."
    },
    {
      name: "julie brian",
      job: "economist",
      image: jbImg,
      travelledTo: ["Antarctica"],
      rated: "1/5",
      review: "Worst experience ever. As we landed on Antarctica, we waited fo hours to get started. Tour guide got lost in the snow, so we ended up looking for him. My fingers froze and I got diarhea. Not sure about other arangements, but travelling with this agency to Antarctica was a mistake."
    },
    {
      name: "julia gavrilovic",
      job: "salesman",
      image: jgImg,
      travelledTo: ["Madagascar"],
      rated: "5/5",
      topReview: true,
      review: "I had amazing time with this agency. Tour guides are really professional. People are very kind, always there to help you. Highly recommend this agency."
    },
    {
      name: "martha kent",
      job: "farmer",
      image: mkImg,
      travelledTo: ["Greece", "Australia"],
      rated: "2/5",
      review: "Not very satisfied. We were supossed to learn swimming in Greece, but instructor/tour guide was not very professional. A couple of people started drowning since the swimming class was poorly organized. Anyways, it could be worse."
    },
    {
      name: "maximilian young",
      job: "broker",
      image: myImg,
      travelledTo: ["Germany"],
      rated: "4/5",
      review: "I had pretty cool experiences with this agency. Although mostly everything was ok, I didn't like the hotel choice. But overall, I will travel again."
    },
    {
      name: "melina brian",
      job: "banker",
      image: mbImg,
      travelledTo: ["France"],
      rated: "3/5",
      review: "I had good time exploring the country on my own, but I did't get what I was promised. Tour guides were drunk most of the time, so I rarely saw them, so we were basically left on our own. Not so professional, but hey, we're all people."
    },
    {
      name: "miodrag draskovic",
      job: "retired",
      image: mdImg,
      travelledTo: ["US", "Canada", "India", "Egypt"],
      rated: "5/5",
      topReview: true,
      review: "Very nice experiences. I enjoyed every tour and made a lots of friends in this community. Guides are very decent people, always there to give us directions. Hotel choices were excellent - I slept like a baby. Highly recommened this agency."
    },
    {
      name: "nadezda sekulic",
      job: "market owner",
      image: nsImg,
      travelledTo: ["Japan"],
      rated: "5/5",
      topReview: true,
      review: "Very, very nice experience. We were shown every corner of cities we were in. I've met many nice people and had a really good time. I recommend this agency. It is awesome."
    },
    {
      name: "natasha lucic",
      job: "econimist",
      image: nlImg,
      travelledTo: ["US", "Canada", "India"],
      rated: "5/5",
      review: "Not much to say except for good words. Professionalism is very high. Tour guides are the best. I had awesome experiences."
    },
    {
      name: "suzana brajovic",
      job: "game developer",
      image: sbImg,
      travelledTo: ["China"],
      rated: "4/5",
      review: "Nothing but good words to say. But can't give it 5 starts due to not so good travelling experience, and not so good hotel choice. But everything else was awesome."
    }
  ]
};

const reducer = (state = initialState, action) => {
  return state;
};

export default reducer;