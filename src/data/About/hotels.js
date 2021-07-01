import React from 'react';
// hotel images
import nyStregisImg from '../../images/about/sections/hotels/new-york-stregis.jpg';
import w4seasonsImg from '../../images/about/sections/hotels/washington-4seasons.jpg';
import bostonParkPlazaImg from '../../images/about/sections/hotels/boston-park-plaza.jpg';
import miamiHiltonImg from '../../images/about/sections/hotels/miami-hilton-downtown.jpg';
import torontoFairmontImg from '../../images/about/sections/hotels/toronto-fairmont.jpg';
import montrealRitzImg from '../../images/about/sections/hotels/montreal-ritz.jpg';
import anchorageLakefrontImg from '../../images/about/sections/hotels/anchorage-lakefront.jpg';
import janeiroImg from '../../images/about/sections/hotels/janeiro.jpg';
import sttropezSezzImg from '../../images/about/sections/hotels/sttropez-sezz.jpg';
import athensGaiaImg from '../../images/about/sections/hotels/athens-gaia.jpg';

export const hotels = [
  {
    name: "st regis",
    address: "Two E 55th St, New York, NY 10022, United States",
    image: nyStregisImg,
    stars: "5/5",
    info: (
      <>
        Set in Midtown Manhattan and a block from The Museum of Modern Art, this landmark luxury hotel is a 6-minute walk from Central Park.
        <br />
        <br />
        Sophisticated rooms with 12-foot ceilings, silk wall coverings and chandeliers feature sitting areas and Italian marble bathrooms, as well as 24-hour personal butler service. All rooms come with free Wi-Fi and flat-screen HDTVs. Select suites add kitchens and formal dining rooms.
        <br />
        <br />
        There's a renowned lounge/bar, a grand restaurant and a cognac room. Other amenities include valet parking and a limousine service (both fee), plus a 24-hour exercise room and a steam room.
      </>
    )
  },
  {
    name: "four seasons",
    address: "2800 Pennsylvania Avenue NW, Washington, DC 20007, United States",
    image: w4seasonsImg,
    stars: "5/5",
    info: (
      <>
        Off Route 29 and an 11-minute walk from Foggy Bottom metro station, this upscale hotel is 1.3 miles from the White House and 2.5 miles from the National Mall.
        <br />
        <br /> 
        The warmly decorated rooms feature free Wi-Fi, flat-screen TVs, minibars and marble bathrooms. Stylish suites add sitting areas with pull-out sofas; some have dining tables and/or furnished terraces.
        <br />
        <br />
        Dining options include a modern steakhouse with an elegant cocktail lounge, and a contemporary restaurant serving regional dishes. There's a spa, a fitness center, and an indoor pool with a hot tub and a sauna. Other amenities include a business center and meeting space. Breakfast is extra.
      </>
    )
  },
  {
    name: "boston park plaza",
    address: "50 Park Plaza, Boston, MA 02116, United States",
    image: bostonParkPlazaImg,
    stars: "5/5",
    info: (
      <>
        This upmarket hotel dating from the 1920s is a 3-minute walk from the Boston Public Garden as well as the nearest MBTA station, and a 6-minute walk from the Boston Common.
        <br />
        <br />
        Polished, modern rooms offer smart TVs. Upgraded rooms add desks, coffeemakers and minifridges. Elegant suites have living rooms and city views; one has a terrace. Room service is available.
        <br />
        <br />
        Amenities include an airy lobby restaurant serving local cuisine and a buffet breakfast for a fee, plus a steakhouse with a trendy bar. There’s a fitness center and a golf simulator, along with event space and a business center. Dogs are welcome (fee).
      </>
    )
  },
  {
    name: "hilton miami downtown",
    address: "1601 Biscayne Blvd, Miami, FL 33132, United States",
    image: miamiHiltonImg,
    stars: "4/5",
    info: (
      <>
        In a contemporary tower overlooking Biscayne Bay, this upscale hotel is a 3-minute walk from Adrienne Arsht Center Metromover Station, offering a free trolley to Downtown Miami, and 4 miles' drive from Miami Beach.
        <br />
        <br />
        Modern rooms feature floor-to-ceiling windows and upscale decor, plus custom-designed beds, flat-screen TVs and Wi-Fi (fee); some provide bay views. Suites add sitting areas and pull-out sofas.
        <br />
        <br />
        Amenities include a relaxed bistro serving international cuisine, a laid-back lobby cafe, and a rooftop pool with a breezy bar and skyline views. Business facilities include a business center and 45,000 sq ft of meeting space.
      </>
    )
  },
  {
    name: "fairmont royal york",
    address: "100 Front St W, Toronto, ON M5J 1E3, Canada",
    image: torontoFairmontImg,
    stars: "5/5",
    info: (
      <>
        Occupying a circa-1929 building retaining original features such as hand-painted ceilings and travertine pillars, this upscale hotel is a 13-minute walk from the CN Tower and 1 km from the Harbourfront Centre.
        <br />
        <br />
        Elegant rooms offer Wi-Fi (fee) and flat-screen TVs, as well as minibars, and tea and coffeemakers; some have city views. Upgraded rooms add sitting areas. Individually decorated suites include living rooms; some have wet bars or full kitchens and dining rooms.
        <br />
        <br />
        There are 4 restaurants and bars, including a refined lounge serving afternoon tea. There's also a spa with a 24/7 gym, an indoor pool and a whirlpool tub.
      </>
    )
  },
  {
    name: "The Ritz-Carlton",
    address: "1228 Sherbrooke St W, Montreal, Quebec H3G 1H6, Canada",
    image: montrealRitzImg,
    stars: "5/5",
    info: (
      <>
        In a property dating from 1912, this opulent hotel is 3 km from the Basilique Notre-Dame de Montréal and 4 km from the Vieux Port de Montréal.
        <br />
        <br />
        Offering city or garden views, the refined rooms have free Wi-Fi and flat-screen TVs, plus iPod docks, Nespresso machines, and marble bathrooms with heated floors and rainforest showerheads. Suites add separate living areas and fireplaces. Room service is available 24/7.
        <br />
        <br />
        There's a fine-dining restaurant by chef Daniel Boulud, a lounge serving afternoon tea, and a champagne bar. Other amenities include a rooftop terrace, an indoor saltwater pool and a fitness center, plus 12,000 sq ft of event space.
      </>
    )
  },
  {
    name: "The Lakefront Anchorage",
    address: "4800 Spenard Rd, Anchorage, AK 99517, United States",
    image: anchorageLakefrontImg,
    stars: "3/5",
    info: (
      <>
        Set on the eastern shore of Lake Hood, this polished hotel is 4 miles from the downtown area and 2 miles from the Alaska Aviation Heritage Museum.
        <br />
        <br />
        Refined, traditional rooms feature pillow-top mattresses, minifridges, coffeemakers and WiFi access. Some rooms have whirlpool tubs and fireplaces.
        <br />
        <br />
        Parking is free. There's an elegant restaurant with water views, plus a casual lakeside bar and grill. Other amenities include a private floatplane dock, a lobby lounge with a fireplace, a gym and a business center.
      </>
    )
  },
  {
    name: "janeiro hotel",
    address: "Av. Delfim Moreira, 696 - Leblon, Rio de Janeiro - RJ, 22441-000, Brazil",
    image: janeiroImg,
    stars: "5/5",
    info: (
      <>
        Opposite Leblon Beach on the Atlantic Ocean, this contemporary hotel is a 3-minute walk from Antero de Quental metro station and 14 km from the mountaintop statue of Christ the Redeemer.
        <br />
        <br />
        Airy, minimalist rooms offer ocean views and flat-screens. Suites add sitting areas.
        <br />
        <br />
        Breakfast is complimentary. There's also a casual restaurant with panoramic ocean views. Other amenities include a lounge and a Japanese eatery.
      </>
    )
  },
  {
    name: "Hotel Sezz Saint-tropez",
    address: "151 Chemin des Salins, 83990 Saint-Tropez, France",
    image: sttropezSezzImg,
    stars: "5/5",
    info: (
      <>
        A 6-minute walk from Baie de Canebiers waterfront, this luxe hotel is 3 km from Port de Saint Tropez, and 8 km from the legendary Plage de Pampelonne beach.
        <br />
        <br />
        The chic, contemporary rooms feature high ceilings and wood-paneled walls, and offer flat-screens, free Wi-Fi, and terraces with outdoor showers. Upgraded rooms add plunge pools, while 2-bedroom luxury villas feature private pools and lounges. Room service is available.
        <br />
        <br />
        Free shuttles to Saint-Tropez and Pampelonne beach are offered. There's a champagne bar and an elegant restaurant with a terrace, as well as a heated pool, and a spa with massage rooms.
      </>
    )
  },
  {
    name: "gaia athens",
    address: "Sarri 17, Athina 105 54, Greece",
    image: athensGaiaImg,
    stars: "3/5",
    info: `
      No info
    `
  }
];