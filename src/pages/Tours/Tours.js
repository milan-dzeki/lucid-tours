import React, { useEffect, useReducer, useRef } from 'react';
import { useLength } from '../../custom-hooks/useLength';
import './tours.scss';
import '../../sass-additions/helper-classes.scss';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import SingleTour from '../../components/Tours/SingleTour/SingleTour';
import { MdCardTravel } from 'react-icons/md';
import { AiOutlineFilter } from 'react-icons/ai';

// reducers outside component
const reducer = (state, action) => {
  switch(action.type) {
    case("SWITCH_FILTER_TYPE"):
      return {
        ...state,
        filterType: action.filterType
      };
    case("FILTER_BY_VALUE_CHANGED"):
      return {
        ...state,
        filterByValue: action.value
      };
    case("ADDITIONAL_FILTER_VALUE_CHANGED"):
      return {
        ...state,
        additionalFilterValue: action.value
      };
    case("FILTER_TOURS"):
      return {
        ...state,
        visibleTours: action.filteredTours
      };
    case("CUSTOM_FILTER_FIELD_CHANGED"):
      return {
        ...state,
        customFilterValues: {
          ...state.customFilterValues,
          [action.filterName]: action.filterValue
        }
      };
    case("ADJUST_CUSTOM_FILTER_FIELDS"):
      return {
        ...state,
        customFilterData: {
          ...state.customFilterData,
          [action.filterName]: action.filterData
        }
      };
    default:
      return state;
  }
};

// COMPONENT
const Tours = () => {
  // tours from the redux reducer
  const allTours = useSelector(state => state.tours.tours);
  // filtering data
  const MAIN_FILTER_NAMES = [
    "none",
    "continent",
    "state",
    "city",
    "price",
    "days",
    "activities",
    "meditation"
  ];
  const ADDITIONAL_FILTER_VALUES = {
    continent: [...new Set(allTours.map(tour => tour.continent))],
    state: [...new Set(allTours.map(tour => tour.state))],
    city: [...new Set(allTours.map(tour => tour.cities)
      .reduce((arr, el) => {
        return arr.concat(el)
      }, []))],
    price: [
      "< $500",
      "$500 - $1000",
      "$1000 - $1500",
      "$1500 - $2000",
      "$2000 - $2500"
    ],
    days: [...new Set(allTours.map(tour => tour.days).sort())],
    activities: [
      "all",
      "swimming",
      "climbing"
    ],
    meditation: [
      "with",
      "without"
    ]
  };

  //  useReducer state
  const [state, dispatch] = useReducer(reducer, {
    filterType: "filterBy",
    filterByValue: "none",
    additionalFilterValue: "",
    visibleTours: allTours,
    customFilterData: {
      continent: ["any", ...new Set(allTours.map(tour => tour.continent))],
      state: ["any", ...new Set(allTours.map(tour => tour.state))],
      city: ["any", ...new Set(allTours.map(tour => tour.cities)
      .reduce((cities, city) => {
          return cities.concat(city);
        }, []))],
      price: [
        "any",
        "< $500",
        "$500 - $1000",
        "$1000 - $1500",
        "$1500 - $2000",
        "$2000 - $2500"
      ],
      days: ["any", ...new Set(allTours.map(tour => tour.days).sort())],
      activities: [
        "any",
        "swimming",
        "climbing"
      ],
      meditation: [
        "any",
        "with",
        "without"
      ]
    },
    customFilterValues: {
      continent: "any",
      state: "any",
      city: "any",
      price: "any",
      days: "any",
      activities: "any",
      meditation: "any"
    }
  });

  // switch filter type
  const swicthFilterType = () => {
    dispatch({type: "FILTER_TOURS", filteredTours: allTours});

    if(state.filterType === "filterBy") {
      dispatch({type: "SWITCH_FILTER_TYPE", filterType: "customFilter"});

      for(const key in state.customFilterValues) {
        dispatch({type: "CUSTOM_FILTER_FIELD_CHANGED", filterName: key, filterValue: "any"});
      }

    } else if(state.filterType === "customFilter") {
      dispatch({type: "SWITCH_FILTER_TYPE", filterType: "filterBy"});

      dispatch({type: "FILTER_BY_VALUE_CHANGED", value: "none"});
    }
  };

  //filter by value changed
  const filterByValueChanged = (inputValue) => {
    dispatch({type: "FILTER_BY_VALUE_CHANGED", value: inputValue});

    if(inputValue === "none") {
      dispatch({type: "ADDITIONAL_FILTER_VALUE_CHANGED", value: ""});
      dispatch({type: "FILTER_TOURS", filteredTours: allTours })
    } else {
      dispatch({type: "ADDITIONAL_FILTER_VALUE_CHANGED", value: ADDITIONAL_FILTER_VALUES[inputValue][0]});

      // setup tours according to initial additional filter values
      let updatedTours = [];

      if(inputValue !== "price" && inputValue !== "activities") {
        updatedTours = allTours.filter(tour => tour[inputValue] === ADDITIONAL_FILTER_VALUES[inputValue][0]);
      } else if(inputValue === "price") {
        updatedTours = allTours.filter(tour => tour.priceRange === ADDITIONAL_FILTER_VALUES[inputValue][0]);
      } else if(inputValue === "activities") {
        updatedTours = allTours.filter(tour => tour.activities.length > 1);
      }
      dispatch({type: "FILTER_TOURS", filteredTours: updatedTours });
    }
  };

  // managing additional filter value changes
  const additionalFilterValueChanged = (inputValue) => {
    dispatch({type: "ADDITIONAL_FILTER_VALUE_CHANGED", value: inputValue});

    let updatedTours = [];

    if(state.filterByValue !== "price" && state.filterByValue !== "activities") {
      updatedTours = allTours.filter(tour => tour[state.filterByValue] === inputValue);
    } else if(state.filterByValue === "price") {
      updatedTours = allTours.filter(tour => tour.priceRange === inputValue);
    } else if(state.filterByValue === "activities" && inputValue !== "all") {
      updatedTours = allTours.filter(tour => tour.activities.includes(inputValue));
    } else if(state.filterByValue === "activities" && inputValue === "all") {
      updatedTours = allTours.filter(tour => tour.activities.length > 1);
    }

    dispatch({type: "FILTER_TOURS", filteredTours: updatedTours });
  };

  // managing custom filter fileds changes
  const customFilterFieldsChanged = (inputValue, filterName) => {
    dispatch({type: "CUSTOM_FILTER_FIELD_CHANGED", filterName, filterValue: inputValue});

    if(filterName === "state" && inputValue !== "any") {
      dispatch({type: "CUSTOM_FILTER_FIELD_CHANGED", filterName: "city", filterValue: "any"});
    }
    if(filterName === "continent" && inputValue !== "any") {
      dispatch({type: "CUSTOM_FILTER_FIELD_CHANGED", filterName: "state", filterValue: "any"});
      dispatch({type: "CUSTOM_FILTER_FIELD_CHANGED", filterName: "city", filterValue: "any"});
    }
  };

  useEffect(() => {
    let updatedTours;
    let adjustedStates;
    let adjustedCities;
    let currentContinent = state.customFilterValues.continent;
    let currentState = state.customFilterValues.state;
    let currentCity = state.customFilterValues.city;
    let currentPrice = state.customFilterValues.price;
    let currentDays = state.customFilterValues.days;
    let currentActivity = state.customFilterValues.activities;
    let currentMeditation = state.customFilterValues.meditation;

    if(currentContinent === "any") {
      //state any
      if(currentState === "any") {

        if(currentCity === "any") {
          updatedTours = allTours;
        }
        if(currentCity !== "any") {
          updatedTours = allTours.filter(tour => tour.cities.includes(currentCity));
        }
        adjustedStates = ["any", ...new Set(allTours.map(tour => tour.state))];
        adjustedCities = ["any", ...new Set(allTours.map(tour => tour.cities).reduce((cities, city) => {
          return cities.concat(city);
        }, []))];
      }
      // state !== any
      
      if(currentState !== "any") {
        updatedTours = allTours.filter(tour => tour.state === currentState);
        adjustedStates = ["any", ...new Set(allTours.map(tour => tour.state))];
        adjustedCities = ["any", ...new Set(updatedTours.map(tour => tour.cities).reduce((cities, city) => {
          return cities.concat(city);
        }, []))];

        if(currentCity === "any") {
          updatedTours = allTours.filter(tour => tour.state === currentState); 
        }
        if(currentCity !== "any") {
          updatedTours = allTours.filter(tour => tour.state === currentState && tour.cities.includes(currentCity));
        }
      }
    }

    if(currentContinent !== "any") {
      updatedTours = allTours.filter(tour => tour.continent === currentContinent);
      adjustedStates = ["any", ...new Set(updatedTours.map(tour => tour.state))];
      adjustedCities = ["any", ...new Set(updatedTours.map(tour => tour.cities).reduce((cities, city) => {
          return cities.concat(city);
        }, []))];

      if(currentState === "any") {
        if(currentCity !== "any") {
          updatedTours =  allTours.filter(tour => tour.continent === currentContinent && tour.cities.includes(currentCity));
        }
      }

      if(currentState !== "any") {
        updatedTours = allTours.filter(tour => tour.continent === currentContinent && tour.state === currentState);
        adjustedCities = ["any", ...new Set(updatedTours.map(tour => tour.cities).reduce((cities, city) => {
          return cities.concat(city);
        }, []))];

        if(currentCity !== "any") {
          updatedTours = allTours.filter(tour => tour.continent === currentContinent && tour.state === currentState && tour.cities.includes(currentCity));
        }
      }
    }

    if(currentPrice !== "any") {
      updatedTours = updatedTours.filter(tour => tour.priceRange === currentPrice);
    }
    if(currentDays !== "any") {
      updatedTours = updatedTours.filter(tour => tour.days === currentDays);
    }
    if(currentActivity !== "any") {
      updatedTours = updatedTours.filter(tour => tour.activities.includes(currentActivity));
    }
    if(currentMeditation !== "any") {
      updatedTours = updatedTours.filter(tour => tour.meditation === currentMeditation);
    }

    dispatch({type: "FILTER_TOURS", filteredTours: updatedTours});
    dispatch({type: "ADJUST_CUSTOM_FILTER_FIELDS", filterName: "state", filterData: adjustedStates});
    dispatch({type: "ADJUST_CUSTOM_FILTER_FIELDS", filterName: "city", filterData: adjustedCities});
  }, [state.customFilterValues, allTours]);

  let displayedTours = state.visibleTours.map(tour => {
    return <SingleTour
      key={tour.id}
      tourId={tour.id}
      tourIcon={tour.displayIcon}
      tourState={tour.state}
      tourCities={tour.cities}
      tourPrice={tour.price}
      tourDuration={tour.days}
      tourImg={tour.displayImg}
      tourLink={tour.link} />
  });
  
  if(state.visibleTours.length === 0) {
    displayedTours = (
      <p style={{
        fontSize: "1.8rem",
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
        margin: "0 auto"
      }}>
        No tours matching your search requirements
      </p>
    );
  }

  // MANAGE DISPLAY ACCORDING TO NUMBER OF TOURS
  const tourContainer = useRef(null);
  useLength(displayedTours, tourContainer);

  // filtering fields
  let filterByField = (
    <article className="tours__filter-list">
      <div className="tours__filter-list__item">
        <label htmlFor="filterBy">
          filter by: 
        </label>
        <select
          id="filterBy"
          name="filterBy"
          value={state.filterByValue}
          onChange={(event) => filterByValueChanged(event.target.value)}>
            {MAIN_FILTER_NAMES.filter(option => option !== "city")
            .map(option => {
              return (
                <option
                  key={option}
                  value={option}>
                  {option}
                </option>
              );
            })}
        </select>
      </div>
      {state.filterByValue === "none" || (
        <div className="tours__filter-by__addition">
          <label htmlFor="additional">
            Choose by {state.filterByValue}:
          </label>
          <select
            id="additional"
            name="additional"
            value={state.additionalFilterValue}
            onChange={(event) => additionalFilterValueChanged(event.target.value)}>
            {ADDITIONAL_FILTER_VALUES[state.filterByValue].map(option => {
              return (
                <option
                  key={option}
                  value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      )} 
    </article>
  );

  let customFilterField = (
    <article className="tours__filter-list">
      {MAIN_FILTER_NAMES.filter(filter => filter !== "none")
        .map(filter => {
          return (
            <div
              className="tours__filter-list__item"
              key={filter}>
              <label htmlFor={filter}>
                {filter}:
              </label>
              <select
                id={filter}
                name={filter}
                value={state.customFilterValues[filter]}
                onChange={(e) => customFilterFieldsChanged(e.target.value, filter)}>
                {state.customFilterData[filter].map(option => (
                  <option
                    key={option}
                    value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
    </article>
  );

  return (
    <>
      <SectionTitle
        titleClassname="tours"
        icon={<MdCardTravel />}
        titleText="tours"
        titleAdditional="all of them" />
      <div className="tours__content">
        <p className="tours__text">
          These are our tours. All that we can offer at the moment. As our company grows, we'll be adding more oportunities for you to explore. You can filter through them and hopefully find what you are looking for
        </p>       
        <section className="tours__filter">
          <article className="tours__filter-title">
            <p className="tours__filter-title__text">filter tours</p>
            <div className="tours__filter-title__icon">
              <AiOutlineFilter />
            </div>
          </article>
          {state.filterType === "filterBy" ? filterByField : customFilterField}
          <button
            type="button"
            className="tours__filter-switch"
            onClick={swicthFilterType}>
            {state.filterType === "filterBy" ? 
            "switch to custom filtering" :
            "switch to filtering by group"}
          </button>
        </section>
        <section className="tours__tours">
          <p className="tours__tours-info">
            selected tours
          </p>
          <div className="tours__tours-content" ref={tourContainer}>
            {displayedTours}
          </div>
        </section>
        <section className="tours__request">
          <p className="tours__text">
            Haven't found what you were looking for? Unfortunately, for now these are all tours that we have at our disposal.
            <br />
            <br />
            As we are growing company, we'll be expanding our offers. To contribute, you can require a tour. 
            <br />
            Go to the link bellow, and tell us where would you like to go. We'll be adding more tour options according to all of yours requirements.
          </p>
          <Link 
            to="/request-tour"
            className="tours__request-link">
            request tour
          </Link>
        </section>
      </div>
    </>
  );
}

export default Tours;
