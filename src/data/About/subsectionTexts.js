import React from 'react';
import { Link } from 'react-router-dom';

const linkStyles = {
  display: "inline-block",
  color: "red",
  textDecoration: "underline"
};

const importantStyles = {
  fontWeight: "bold"
};

export const whoWeAreText = (
  <>
    We are international tour agency based in Belgrade, Serbia. Our company came into being in 2018.year, built by travel enthusiasts from all over the country. Since we enjoy traveling so much, we want to offer others same enjoyment.
    <br />
    We keep expanding daily, adding new tours to our menu, and building true community of travel enthusiasts. We try to find best conditions for traveling and to try to offer something that everyone will enjoy.
  </>
);

export const whereAreWeText = (
  <>
    We are located in Bulevar Kralja Aleksandra street, at number 118, in Belgrade, Serbia. Our working hours are from 9am to 4pm, Monday to Friday. We don't work on weekdays.
    <br />
    To contact us, call 011/333-555-444-555, anytime between 9am and 4pm, or come straight to our location. If you are internet person, you can do everything here, on our website, by <Link to="/tours" style={linkStyles}>checking the tours</Link> or <Link to="/request-tour" style={linkStyles}>requesting the tour</Link>.
  </>
);

export const transportText = (
  <>
    We collaborate with variety of transportation companies in Belgrade. For traveling to distant countries, our customers may travel with "Air Serbia" and "Aeroflot". For traveling closer to home, we use "Lasta buses".
  </>
);

export const hotelsText = (
  <>
    We try to offer you the greatest comfort possible by chosing top rated hotels for you to sleep in, all over the world. What you see here are only a fraction of hotels that we operate with. As you'll see, they are all real deal, and they will offer you the rest you need in order to be able to enjoy our tours with recharged energy. 
  </>
);

export const discountsText = (
  <>
    We offer special discounts for all of you who travel a lot with our agency. For your second tour already, we offer <span style={importantStyles}>5% discount</span>. And also, for every next tour, your price drops for aditional 5%, up to even <span style={importantStyles}>30% discount</span>.
    <br />
    <br />
    Also, if you brings someone with you, you get special discounts: <span style={importantStyles}>5% each if there are two of you</span>, and <span style={importantStyles}>10% each if there are more that two of you</span>. Also, if you are not satisfied with somethintg during tour, and we find that your complaints are justified, you get <span style={importantStyles}>50% of your money back</span>.
  </>
);

export const tourGuidesText = (
  <>
    These are our current tour guides and other helping staff members, determined to provide you with great touring experience. 
  </>
);