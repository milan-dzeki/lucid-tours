import React, { useState, useEffect, useCallback } from 'react';
import './leave-review.scss';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { VscPreview } from 'react-icons/vsc';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';
import RedirectModal from '../../components/UI/RedirectModal/RedirectModal';
import { useSelector, useDispatch } from 'react-redux';
import { useRedirectModal } from '../../custom-hooks/useRedirectModal';
import * as actions from '../../store/actions/index';

const LeaveReview = () => {
  const dispatch = useDispatch();
  // auth state
  const isAuth = useSelector(state => state.auth.token);
  const userID = useSelector(state => state.auth.userID);
  // get agency review to enable adding new one if there is one added
  const onFetchAgencyReview = useCallback((token, userId) => dispatch(actions.fetchAgencyReview(token, userId)), [dispatch]);
  // fetch agency review
  useEffect(() => {
    onFetchAgencyReview(isAuth, userID);
  }, [onFetchAgencyReview, isAuth, userID]);
  const fetchedAgencyReview = useSelector(state => state.reviews.agencyReview);
  // review already exists state
  const [agencyReviewExists, setAgencyReviewExists] = useState(false);
  useEffect(() => {
    if(fetchedAgencyReview !== null) {
      setAgencyReviewExists(true);
    } else {
      setAgencyReviewExists(false);
    }
  }, [fetchedAgencyReview]);
  // agency exists error
  const [agencyReviewExistsError, setAgencyReviewExistsError] = useState(false);
  // redirect modal
  const {redirectModalShow, showRedirectModal, hideRedirectModal} = useRedirectModal();
  // loading and error state
  const isLoading = useSelector(state => state.reviews.sendReviewLoading);
  const isError = useSelector(state => state.reviews.sendReviewError);
  // clear error
  const onLeaveReviewClearError = () => dispatch(actions.leaveReviewClearError());
  // send review action
  const onLeaveReview = (revData, form, token) => dispatch(actions.leaveReview(revData, form, token)); 
  
  // get states from tours to put in into options
  const allTours = useSelector(state => state.tours.tours);
  const statesFromTours = [...new Set(allTours.map(tour => tour.state))];
  const states = statesFromTours.map(tour => {
    return {name: tour};
  });
  // review form
  const [agencyReviewForm, setAgencyReviewForm] = useState({
    name: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "text",
          name: "name",
          placeholder: "Choose Name"
        },
      },
      value: "",
      validation: {
        required: true
      },
      disabled: false,
      touched: false,
      valid: false
    },
    job: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "text",
          name: "job",
          placeholder: "Your Job"
        },
      },
      value: "",
      validation: {
        required: true
      },
      disabled: false,
      touched: false,
      valid: false
    },
    travel1: {
      id: "travel1",
      elementType: "select",
      elementConfig: {
        label: {
          for: "travel1",
          name: "Choose top 3 destinations"
        },
        atributes: {
          name: "travel1"
        },
        options: states
      },
      value: "",
      defaultValue: "country",
      validation: {
        required: true
      },
      disabled: false,
      touched: false,
      valid: false
    },
    travel2: {
      id: "travel2",
      elementType: "select",
      elementConfig: {
        label: {
          for: "",
          name: ""
        },
        atributes: {
          name: "travel2"
        },
        options: states
      },
      value: "",
      defaultValue: "country",
      validation: {
        required: false
      },
      disabled: false,
      touched: false,
      valid: true
    },
    travel3: {
      id: "travel3",
      elementType: "select",
      elementConfig: {
        label: {
          for: "",
          name: ""
        },
        atributes: {
          name: "travel3"
        },
        options: states
      },
      value: "",
      defaultValue: "country",
      validation: {
        required: false
      },
      disabled: false,
      touched: false,
      valid: true
    },
    reviewText: {
      elementType: "textarea",
      elementConfig: {
        label: {
          for: "review",
          name: "Leave Your review here..."
        },
        atributes: {
          name: "review"
        }
      },
      value: "",
      validation: {
        required: true
      },
      disabled: false,
      touched: false,
      valid: false
    },
    rating: {
      elementType: "inputNumber",
      elementConfig: {
        label: {
          show: true,
          for: "rating",
          name: "Rate our agency (with numbers 1 - 5)"
        },
        atributes: {
          type: "number",
          name: "rating",
          placeholder: "",
          min: "1",
          max: "5"
        },
      },
      value: "",
      validation: {
        required: true,
        minValue: 1,
        maxValue: 5
      },
      disabled: false,
      touched: false,
      valid: false
    }
  });

  const [tourReviewForm, setTourReviewForm] = useState({
    name: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "text",
          name: "name",
          placeholder: "Choose Name"
        },
      },
      value: "",
      validation: {
        required: true
      },
      disabled: false,
      touched: false,
      valid: false
    },
    job: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "text",
          name: "job",
          placeholder: "Your Job"
        },
      },
      value: "",
      validation: {
        required: true
      },
      disabled: false,
      touched: false,
      valid: false
    },
    travel: {
      id: "travel",
      elementType: "select",
      elementConfig: {
        label: {
          for: "travel",
          name: "Choose tour"
        },
        atributes: {
          name: "travel"
        },
        options: states
      },
      value: "",
      defaultValue: "country",
      validation: {
        required: true
      },
      disabled: false,
      touched: false,
      valid: false
    },
    reviewText: {
      elementType: "textarea",
      elementConfig: {
        label: {
          for: "review",
          name: "Leave Your review here..."
        },
        atributes: {
          name: "review"
        }
      },
      value: "",
      validation: {
        required: true
      },
      disabled: false,
      touched: false,
      valid: false
    },
    rating: {
      elementType: "inputNumber",
      elementConfig: {
        label: {
          show: true,
          for: "rating",
          name: "Rate selected tour (with numbers 1 - 5)"
        },
        atributes: {
          type: "number",
          name: "rating",
          placeholder: "",
          min: "1",
          max: "5"
        },
      },
      value: "",
      validation: {
        required: true,
        minValue: 1,
        maxValue: 5
      },
      disabled: false,
      touched: false,
      valid: false
    }
  });

  // check inputs validity
  const checkInputValidity = (rules, value) => {
    let isValid = true;
    if(!rules) {
      return true;
    }
    if(rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if(rules.minValue && rules.maxValue) {
      isValid = parseInt(value) >= rules.minValue && parseInt(value) <= rules.maxValue && isValid;
    }
    return isValid;
  };

  // check valitidy when unfocused
  const checkValidityAfterFocus = (element) => {
    if(selectedForm === "agencyReview") {
      setAgencyReviewForm(prevState => {
        return {
          ...prevState,
          [element]: {
            ...prevState[element],
            touched: true
          }
        }
      });
    }
    if(selectedForm === "tourReview") {
      setTourReviewForm(prevState => {
        return {
          ...prevState,
          [element]: {
            ...prevState[element],
            touched: true
          }
        }
      });
    } 
  };

  // input changed handler
  const agencyReviewInputsChangedHandler = (event, element) => {
    setAgencyReviewForm(prevState => {
      return {
        ...prevState,
        [element]: {
          ...prevState[element],
          value: event.target.value,
          touched: true,
          valid: checkInputValidity(prevState[element].validation, event.target.value)
        }
      }
    });
  };
  const tourReviewInputsChangedHandler = (event, element) => {
    setTourReviewForm(prevState => {
      return {
        ...prevState,
        [element]: {
          ...prevState[element],
          value: event.target.value,
          touched: true,
          valid: checkInputValidity(prevState[element].validation, event.target.value)
        }
      }
    });
  };

  // forms valid ?
  const [agencyReviewFormIsValid, setAgencyReviewFormIsValid] = useState(false);
  const [tourReviewFormIsValid, setTourReviewFormIsValid] = useState(false);

  // check form validity method
  const checkFormValidity = (currentForm, setFormValidity) => {
    let inputsValid = [];
    for(const key in currentForm) {
      inputsValid.push(currentForm[key].valid);
    }
    if(!inputsValid.includes(false)) {
      setFormValidity(true)
    } else {
      setFormValidity(false)
    }
  };

  // check validities with effect
  useEffect(() => {
    checkFormValidity(agencyReviewForm, setAgencyReviewFormIsValid);
  }, [agencyReviewForm]);
  useEffect(() => {
    checkFormValidity(tourReviewForm, setTourReviewFormIsValid);
  }, [tourReviewForm]);

  // review form selected
  const [selectedForm, setSelectedForm] = useState("agencyReview");

  // change form handler
  const changeFormHandler = () => {
    if(selectedForm === "agencyReview") {
      setSelectedForm("tourReview");
    } else if(selectedForm === "tourReview") {
      setSelectedForm("agencyReview");
    }
  };

  // prepare both forms' data
  const agencyReviewFormData = [];
  for(const element in agencyReviewForm) {
    agencyReviewFormData.push({
      id: element,
      config: agencyReviewForm[element]
    });
  }

  const tourReviewFormData = [];
  for(const element in tourReviewForm) {
    tourReviewFormData.push({
      id: element,
      config: tourReviewForm[element]
    });
  }

  // display form depending on the selected form
  const displayFormByMethod = (formElements,changedHandler) => {
    let formDisplayed = formElements.map(el => {
      const {id, config: {elementType, elementConfig, value, defaultValue, disabled, touched, valid, validation}} = el;
      return <Input
        key={id}
        elementType={elementType}
        elementConfig={elementConfig}
        value={value}
        defaultValue={defaultValue}
        disabledInfo={disabled}
        shouldValidate={validation.required}
        inputTouched={touched}
        inputValid={valid}
        inputChanged={(event) => changedHandler(event, id)}
        inputUnfocused={() => checkValidityAfterFocus(id)} />
    })

    return formDisplayed;
  };

  let formDisplayed;
  let formValidity;
  let formTitle;
  if(selectedForm === "agencyReview") {
    formDisplayed = displayFormByMethod(agencyReviewFormData, agencyReviewInputsChangedHandler);
    formValidity = agencyReviewFormIsValid;
    formTitle = "Review agency";
  } else if(selectedForm === "tourReview") {
    formDisplayed = displayFormByMethod(tourReviewFormData, tourReviewInputsChangedHandler);
    formValidity = tourReviewFormIsValid;
    formTitle = "Review selected tour";
  }

  // clear input fields
  const clearInputFields = (form, setForm) => {
    let updatedForm = {...form};
    for(const key in updatedForm) {
      updatedForm[key].value = "";
      updatedForm[key].touched = false;
      if(key !== "travel2" && key !== "travel3") {
        updatedForm[key].valid = false;
      }
    }

    setForm(updatedForm);
  };

  // form submit
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if(selectedForm === "agencyReview" && !agencyReviewExists) {
      let formData = {
        name: agencyReviewForm.name.value,
        job: agencyReviewForm.job.value,
        tours: [agencyReviewForm.travel1.value, agencyReviewForm.travel2.value, agencyReviewForm.travel3.value],
        review: agencyReviewForm.reviewText.value,
        rating: agencyReviewForm.rating.value,
        userId: userID
      };
      onLeaveReview(formData, selectedForm, isAuth);
      clearInputFields(agencyReviewForm, setAgencyReviewForm);
    } else if(selectedForm === "agencyReview" && agencyReviewExists) {
      setAgencyReviewExistsError(true);
    } else {
      let formData = {
        name: tourReviewForm.name.value,
        job: tourReviewForm.job.value,
        tour: tourReviewForm.travel.value,
        review: tourReviewForm.reviewText.value,
        rating: tourReviewForm.rating.value,
        userId: userID
      }
      onLeaveReview(formData, selectedForm, isAuth);
      clearInputFields(tourReviewForm, setTourReviewForm);
    }
    showRedirectModal();
  };

  // fetch agency reviews again when hiding redirect modal, to get the newest state
  const hideRedirectModalAndFetchAgencyReview = () => {
    onFetchAgencyReview(isAuth, userID);
    hideRedirectModal();
  };

  useEffect(() => {
    if(isError !== null || agencyReviewExistsError) {
      hideRedirectModal();
    }
  }, [isError, agencyReviewExistsError, hideRedirectModal]);
  
  let actualForm = (
    <Form
      formClassname="leave-review"
      signUpButtonShown={null}
      formIsValid={formValidity}
      formBtnText="leave review"
      formSubmitHandler={formSubmitHandler}>
      {formDisplayed}
    </Form>
  );
  if(isAuth === null) {
    actualForm = (
      <>
        <p style={{textAlign: "center", fontSize:"2rem", marginTop: "2rem"}}>Sign up or Log in to leave review</p>
        <Link to="/signup" style={{fontSize: "1.9rem", textTransform: "uppercase", width: "10rem", margin: "2rem auto", padding: "0.7rem 0", backgroundColor: "orange", color: "white", textAlign: "center"}}>do it</Link>
      </>
    );
  }
  if(isLoading) {
    actualForm = <Spinner />;
  }
  
  return (
    <>
      <RedirectModal
        redirectModalShow={redirectModalShow}
        redirectModalTitle="Review sent succesfully"
        redirectModalClosed={hideRedirectModalAndFetchAgencyReview} />
      <ErrorModal
        errorModalShow={isError !== null || agencyReviewExistsError}
        errorModalClosed={isError !== null ? onLeaveReviewClearError : () => setAgencyReviewExistsError(false)}
        errorModalMsg={isError ? "Can't send review. Try again later, or try refreshing the page." : "You already reviewed our agency. To add new review, delete the existing one in Your Page."} />
      <SectionTitle
        titleClassname="leave-review"
        icon={<VscPreview />}
        titleText="add your review"
        titleAdditional="be gentle"  />
      <section className="leave-review__content">
        <p className="leave-review__text">
          Fill all the fields and leave your review. 
          <br />
          <span style={{color: "red"}}>NOTE: </span>
          You can only add one review about our tour agency, but you can, off course delete it and add new one, or edit the existing one.
          <br />
          For individual travels you can add one review for each.
        </p>
        <article className="leave-review__form">
          <h3 className="leave-review__form-title" style={{display: isAuth ? "block" : "none"}}>
            {formTitle}
          </h3>
          {actualForm}
          <button 
            className="leave-review__switch-btn"
            style={{display: isAuth ? "block" : "none"}}
            onClick={changeFormHandler}>
            {selectedForm === "agencyReview" ? "switch to review single tour" : "switch to review our agency"}
          </button>
        </article>
      </section>
    </>
  )
}

export default LeaveReview;
