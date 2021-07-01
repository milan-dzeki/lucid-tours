import React, { useEffect, useReducer } from 'react';
import './request-tour.scss';
import csc from 'country-state-city';
// import { ICountry, IState, ICity } from 'country-state-city';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';
import RedirectModal from '../../components/UI/RedirectModal/RedirectModal';
import { AiOutlinePullRequest } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useRedirectModal } from '../../custom-hooks/useRedirectModal';
import * as actions from '../../store/actions/index';

//reducer 
const reducer = (state, action) => {
  switch(action.type) {
    case("COUNTRY_CHANGED"):
      return {
        ...state,
        requestForm: {
          ...state.requestForm,
          countries: {
            ...state.requestForm.countries,
            value: action.country,
            touched: action.touched,
            valid: action.countryIsValid
          },
          cities: {
            ...state.requestForm.cities,
            valid: action.cityIsValid
          }
        }
      };
    case("STATE_CHANGED"):
      return {
        ...state,
        requestForm: {
          ...state.requestForm,
          states: {
            ...state.requestForm.states,
            value: action.state
          }
        }
      };
    case("CITY_CHANGED"):
      return {
        ...state,
        requestForm: {
          ...state.requestForm,
          cities: {
            ...state.requestForm.cities,
            value: action.city,
            touched: action.touched,
            valid: action.valid
          }
        }
      };
    case("GET_STATES_BY_COUNTRY"):
      return {
        ...state,
        requestForm: {
          ...state.requestForm,
          states: {
            ...state.requestForm.states,
            elementConfig: {
              ...state.requestForm.states.elementConfig,
              options: action.states
            },
            disabled: false
          },
          cities: {
            ...state.requestForm.cities,
            elementConfig: {
              ...state.requestForm.cities.elementConfig,
              options: []
            },
            disabled: true,
            valid: action.cityIsValid
          }
        }
      };
    case("GET_CITIES_BY_COUNTRY"):
      return {
        ...state,
        requestForm: {
          ...state.requestForm,
          states: {
            ...state.requestForm.states,
            elementConfig: {
              ...state.requestForm.states.elementConfig,
              options: []
            },
            disabled: true
          },
          cities: {
            ...state.requestForm.cities,
            elementConfig: {
              ...state.requestForm.cities.elementConfig,
              options: action.cities
            },
            disabled: false,
            valid: action.cityIsValid,
            defaultValue: action.defaultValue
          }
        }
      };
    case("GET_CITIES_BY_STATE"):
      return {
        ...state,
        requestForm: {
          ...state.requestForm,
          cities: {
            ...state.requestForm.cities,
            elementConfig: {
              ...state.requestForm.cities.elementConfig,
              options: action.cities
            },
            disabled: false,
            valid: action.valid,
            defaultValue: action.defaultValue
          }
        }
      };
    case("CLEAR_INPUT_FIELDS"):
      return {
        ...state,
        requestForm: {
          ...state.requestForm,
          countries: {
            ...state.requestForm.countries,
            value: "",
            touched: false,
            valid: false
          },
          states: {
            ...state.requestForm.states,
            value: "",
            touched: false
          },
          cities: {
            ...state.requestForm.cities,
            value: "",
            touched: false,
            valid: false
          }
        }
      }
    case("FORM_VALIDITY"):
      return {
        ...state,
        formIsValid: action.formIsValid
      };
    case("INVALIDATE_FORM"):
      return {
        ...state,
        formIsValid: false
      };
    default:
      return state;
  }
};

const RequireTour = props => {
  const reduxDispatch = useDispatch();
  // get countries from npm package
  const countries = csc.getAllCountries();
  const states = csc.getAllStates();

  // redux state
  const isAuth = useSelector(state => state.auth.token);
  const userID = useSelector(state => state.auth.userID);
  const isLoading = useSelector(state => state.requestTour.loading);
  const isError = useSelector(state => state.requestTour.error);
  // redux clear request error
  const onClearRequestError = () => reduxDispatch(actions.reqClearError());

  // use redirect modal
  const {redirectModalShow, showRedirectModal, hideRedirectModal} = useRedirectModal();
  
  // check input fields valitidy
  const checkInputValidity = (rules, value) => {
    let valid = true;

    if(!rules.required) {
      return true;
    }
    if(rules.required) {
      valid = value.trim() !== "" && valid;
    }

    return valid;
  }

  // counties changed handler
  const countriesChangedHandler = (value) => {
    // get country
    const selectedCountry = countries.find(country => country.name === value);
    // get ISO code
    const countryCode = selectedCountry.isoCode;
    // states and cities
    let states;
    let cities;
    // field validation
    let countryIsValid = checkInputValidity(state.requestForm.countries.validation, value);
    let touched = true;
    let cityIsValid = false;

    dispatch({type: "COUNTRY_CHANGED", country: value, touched: touched, countryIsValid: countryIsValid, cityIsValid: cityIsValid});

    if(value === "United States") {
      states = csc.getStatesOfCountry(countryCode);
      dispatch({
        type: "GET_STATES_BY_COUNTRY", 
        states: states,
        cityIsValid: cityIsValid
      });
    } else {
      cities = csc.getCitiesOfCountry(countryCode);
      let defaultCityValue;

      if(cities.length === 0) {
        cityIsValid = true;
        defaultCityValue = "no cities for current country";
      } else {
        cityIsValid = false;
        defaultCityValue = "your city";
      }

      dispatch({
        type: "GET_CITIES_BY_COUNTRY", 
        cities: cities, 
        cityIsValid: cityIsValid,
        defaultValue: defaultCityValue
      });
    }
  };

  // states changed handler
  const statesChangedHandler = (value) => {
    // get state
    const selectedState = states.find(state => state.name === value);
    const stateCode = selectedState.isoCode;
    const countryCode = selectedState.countryCode;
    const citiesByState = csc.getCitiesOfState(countryCode, stateCode);

    dispatch({
      type: "STATE_CHANGED", 
      state: value
    });

    let cityFieldValid;
    let defaultCityValue;

    if(citiesByState.length === 0) {
      cityFieldValid = true;
      defaultCityValue = "no cities for current state";
    } else {
      cityFieldValid = false;
      defaultCityValue = "your city";
    }

    dispatch({
      type: "GET_CITIES_BY_STATE",
      cities: citiesByState,
      valid: cityFieldValid,
      defaultValue: defaultCityValue
    });
  };

  // cities changed handler
  const citiesChangedHandler = (value) => {
    let isValid = checkInputValidity(state.requestForm.countries.validation, value);
    let touched = true;

    dispatch({
      type: "CITY_CHANGED", 
      city: value,
      touched: touched,
      valid: isValid
    });
  };

  // useReducer
  const [state, dispatch] = useReducer(reducer, {
    requestForm: {
      countries: {
        id: "countries",
        elementType: "select",
        elementConfig: {
          label: {
            for: "countries",
            name: "Choose Country: "
          },
          atributes: {
            name: "countries" 
          },
          options: countries
        },
        value: "",
        defaultValue: "your country",
        disabled: false,
        onChangeHandler: countriesChangedHandler,
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      states: {
        id: "states",
        elementType: "select",
        elementConfig: {
          label: {
            for: "states",
            name: "Choose State: "
          },
          atributes: {
            name: "states" 
          },
          options: []
        },
        value: "",
        defaultValue: "your state",
        disabled: true,
        onChangeHandler: statesChangedHandler,
        validation: {
          required: false
        },
        touched: false,
        valid: true
      },
      cities: {
        id: "cities",
        elementType: "select",
        elementConfig: {
          label: {
            for: "cities",
            name: "Choose City: "
          },
          atributes: {
            name: "cities" 
          },
          options: []
        },
        value: "",
        defaultValue: "your city",
        disabled: true,
        onChangeHandler: citiesChangedHandler,
        validation: {
          required: true
        },
        touched: false,
        valid: false
      }
    },
    formIsValid: false
  });

  // check if all fields are valid
  useEffect(() => {
    let formValidity = false;
    let validValues = [];
    for(const key in state.requestForm) {
      validValues.push(state.requestForm[key].valid);
    }

    validValues.forEach(value => {
      if(value === true) {
        formValidity = true;
      } else {
        formValidity = false;
      }
    })
    dispatch({type: "FORM_VALIDITY", formIsValid: formValidity});
    
  }, [state.requestForm]);

  // check for request errors and close redirect modal
  useEffect(() => {
    if(isError !== null) {
      hideRedirectModal();
      dispatch({type: "INVALIDATE_FORM"});
    }
  }, [isError]);

  // transform request form into array
  const formElements = [];
  for(const key in state.requestForm) {
    formElements.push({
      id: key,
      config: state.requestForm[key]
    });
  }

  // requesting tour action
  const onRequestTour = (tourData, token) => reduxDispatch(actions.reqTour(tourData, token));
  // form submit
  const formSubmitHanlder = (e) => {
    e.preventDefault();
    let currentCountry = csc.getAllCountries().find(country => country.name === state.requestForm.countries.value);
    let countryCode = currentCountry.isoCode;
    let tourData = {
      country: state.requestForm.countries.value,
      state: state.requestForm.states.value,
      city: state.requestForm.cities.value,
      code: countryCode,
      userId: userID
    };

    onRequestTour(tourData, isAuth);
    dispatch({type: "CLEAR_INPUT_FIELDS"});
    // dispatch({type: "INVALIDATE_FORM"});
    showRedirectModal();
  };

  // form UI
  let form;
  if(isAuth) {
    form = (
      <Form
        formClassname="request-tour"
        formBtnText="send request"
        formIsValid={state.formIsValid}
        formSubmitHandler={formSubmitHanlder}>
        {formElements.map(element => {
          const {id, config: {elementType, elementConfig, value, disabled, onChangeHandler, defaultValue}} = element;
          return <Input
            key={id}
            elementType={elementType}
            elementConfig={elementConfig}
            value={value}
            disabledInfo={disabled}
            defaultValue={defaultValue}
            inputChanged={(event) => onChangeHandler(event.target.value)} />
        })}
      </Form>
    );
  }
  if(isAuth === null) {
    form = (
      <div style={{textAlign: "center", paddingBottom: "2rem"}}>
        <p style={{fontSize: "2.5rem", marginBottom: "2rem"}}>You need to sign up in order to request a tour</p>
        <Link to="/signup" style={{backgroundColor: "lightblue", width: "15rem", margin: "0 auto", fontSize: "1.8rem", padding: "0.7rem 0", color: "white", fontWeight: "bold", borderRadius: "0.5rem"}}>Sign up</Link>
      </div>
    );
  }

  if(isLoading) {
    form = <Spinner />;
  }
  
  return (
    <>
      <SectionTitle
        titleClassname="require-tour"
        icon={<AiOutlinePullRequest />}
        titleText="request tour"
        titleAdditional="choose your destination" />
      <RedirectModal
        redirectModalShow={redirectModalShow}
        redirectModalClosed={hideRedirectModal}
        redirectModalTitle="tour request successful" />
      <ErrorModal
        errorModalShow={isError !== null}
        errorModalClosed={onClearRequestError}
        errorModalMsg="Something went wrong. Refresh the page and try again." />
      <section className="request-tour__content">
        <p className="request-tour__text">
          Choose where would you like to travel. Select prefered country, state and city, fill the form and send us the request. After you are done, you can come back and request more. You can check your request, along with your past, present and future touring history <Link to="/your-page" style={{display: "inline-block", color: "red", textDecoration: "underline"}}>here</Link>.
          <br />
          <br />
          <span style={{color: "red"}}>NOTE: </span>choosing state is required ONLY if country is United States. 
        </p>
        <article className="request-tour__request">
          <h3 className="request-tour__request-title">
            request your tour here
          </h3>
          {form}
        </article>
      </section>
    </>
  );
}

export default RequireTour;
