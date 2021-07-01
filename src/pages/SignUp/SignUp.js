import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './sign-up.scss';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import QuestionModal from '../../components/UI/QuestionModal/QuestionModal';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';
import RedirectModal from '../../components/UI/RedirectModal/RedirectModal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useRedirectModal } from '../../custom-hooks/useRedirectModal';
import { useQuestionModal } from '../../custom-hooks/useQuestionModal';
import { GoSignIn } from 'react-icons/go';
import { signUpInfo } from '../../data/Signup/signUpInfo';
import csc from 'country-state-city';
import * as actions from '../../store/actions/index';

const SignUp = () => {
  const dispatch = useDispatch();
  // is Auth state
  const isAuth = useSelector(state => state.auth.token);
  // error state
  const isError = useSelector(state => state.auth.error);
  // loading state
  const isLoading = useSelector(state => state.auth.loading);
  // auth success state
  const authSuccessState = useSelector(state => state.auth.authSuccess);

  // set error message
  const returnErrorMsg = () => {
    let errorMsg = "Something went wrong. Try different email or password."

    if(isError && isError.message === "EMAIL_NOT_FOUND") {
      errorMsg = "Email doesn't exist in out database. Try again of try signing up.";
    } 
    if(isError && isError.message === "INVALID_PASSWORD") {
      errorMsg = "Wrong password entered.";
    }
    if(isError && isError.message === "EMAIL_EXISTS") {
      errorMsg = "Email that you entered is already registered in our database. Try with another one, or simply log in."
    }

    return errorMsg;
  };
  // auth action
  const onAuth = (userData, formMethod) => dispatch(actions.auth(userData, formMethod));
  // logout action
  const onLogout = () => dispatch(actions.logout());
  // clear error action
  const onClearError = () => dispatch(actions.clearError());
  // clear auth succes state
  const onClearAuthSuccessState = () => dispatch(actions.clearAuthSuccessState());
  // use question modal
  const { questionModalData, showQuestionModal, closeQuestionModal } = useQuestionModal();
  
  // redirect modal
  const {redirectModalShow, showRedirectModal, hideRedirectModal} = useRedirectModal();
  // hide redirect modal while clearing auth suc.state
  const rediredctModalClosed = () => {
    onClearAuthSuccessState();
    hideRedirectModal()
  };
  // check auth succes state for opening redirect modal
  useEffect(() => {
    if(isError === null && authSuccessState) {
      showRedirectModal();
    }
  }, [isError, authSuccessState]);
  // logout
  const confirmLogout = () => {
    onLogout();
    closeQuestionModal();
  };
  // get cities of Serbia
  const serbiaCities = csc.getCitiesOfCountry("RS");
  // form method (signup or log in)
  const [formMethod, setFormMethod] = useState("signup");
  // sign up form
  const [signUpForm, setSignUpForm] = useState({
    firstName: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "text",
          name: "firstName",
          placeholder: "First Name"
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
    lastName: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "text",
          name: "lastName",
          placeholder: "Last Name"
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
    country: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "text",
          name: "country",
          placeholder: "Country"
        }
      },
      value: "Serbia",
      validation: {
        required: true
      },
      disabled: false,
      readOnly: true,
      touched: true,
      valid: true,
      warningText: "We only operate from Serbia, for now",
      warningTextShown: false
    },
    city: {
      elementType: "select",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          name: "city",
          placeholder: "City"
        },
        options: serbiaCities
      },
      value: "",
      defaultValue: "Choose city",
      validation: {
        required: true
      },
      disabled: false,
      touched: false,
      valid: false
    },
    phone: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "tel",
          name: "phone",
          placeholder: "Phone"
        }
      },
      value: "00381",
      validation: {
        required: true,
        initialValue: "00381",
        minLength: "00381".length + 8,
        isPhone: true
      },
      disabled: false,
      touched: false,
      valid: false,
      warningText: "Must start with serbian code - 00381",
      warningTextShown: false
    },
    email: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "email",
          name: "email",
          placeholder: "Email"
        }
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      disabled: false,
      touched: false,
      valid: false
    },
    password: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "password",
          name: "password",
          placeholder: "Password"
        }
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      disabled: false,
      touched: false,
      valid: false
    },
    confirmPassword: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "password",
          name: "confirmPassword",
          placeholder: "Confirm Password"
        }
      },
      value: "",
      validation: {
        required: true,
        passwordRequired: true
      },
      disabled: true,
      touched: false,
      valid: false
    },
  });
  // log in form
  const [logInForm, setLogInForm] = useState({
    email: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "email",
          name: "email",
          placeholder: "Email"
        }
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      disabled: false,
      touched: false,
      valid: false
    },
    password: {
      elementType: "inputText",
      elementConfig: {
        label: {
          for: null
        },
        atributes: {
          type: "password",
          name: "password",
          placeholder: "Password"
        }
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      disabled: false,
      touched: false,
      valid: false
    }
  });
  // state for checking form validity
  const [signUpFormIsValid, setSignUpFormIsValid] = useState(false);
  const [logInFormIsValid, setLogInFormIsValid] = useState(false);

  // check input validity
  const checkInputValidity = (rules, value) => {
    let isValid = true;
    if(!rules) {
      return true;
    }
    if(rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if(rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && value.trim() !== "" && isValid;
    }
    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.initialValue) {
      isValid = value.includes(rules.initialValue) && isValid;
    }
    if(rules.isPhone) {
      isValid = !isNaN(value.slice(5)) && isValid;
    }
    if(rules.passwordRequired) {
      isValid = signUpForm.password.value.trim() !== "" && value === signUpForm.password.value && isValid;
    }
    return isValid;
  };

  // show warning texts where it's required (sign up for only)
  const showWarningTextsHandler = (element) => {
    if(element === "country" || element === "phone") {
      setSignUpForm(prevState => {
        return {
          ...prevState,
          [element]: {
            ...prevState[element],
            warningTextShown: true
          }
        }
      });

      setTimeout(() => {
        setSignUpForm(prevState => {
        return {
          ...prevState,
          [element]: {
            ...prevState[element],
            warningTextShown: false
          }
        }
      });
      }, 2000);
    }
  };

  // check valitidy when unfocused
  const checkValidityAfterFocus = (element) => {
    if(formMethod === "signup") {
      setSignUpForm(prevState => {
        return {
          ...prevState,
          [element]: {
            ...prevState[element],
            touched: true
          }
        }
      });
    }
    if(formMethod === "login") {
      setLogInForm(prevState => {
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

  // input changed handlers
  const signUpInputsChangedHandler = (event, element) => {
    setSignUpForm(prevState => {
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

  const logInInputsChangedHandler = (event, element) => {
    setLogInForm(prevState => {
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

  // manage enability of confirmPassword field
  useEffect(() => {
    let confirmPasswordEnabled;
    if(signUpForm.password.valid) {
      confirmPasswordEnabled = false;
    } else {
      confirmPasswordEnabled = true;
    }
    setSignUpForm(prevState => {
      return {
        ...prevState,
        confirmPassword: {
          ...prevState.confirmPassword,
          disabled: confirmPasswordEnabled
        }
      }
    })
  }, [signUpForm.password.valid]);

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

  // check signup form's validity
  useEffect(() => {
    checkFormValidity(signUpForm, setSignUpFormIsValid);
  }, [signUpForm]);

  // check login form's validity
  useEffect(() => {
    checkFormValidity(logInForm, setLogInFormIsValid);
  }, [logInForm]);

  // store sign up elements
  const signUpFormElements = [];
  for(const key in signUpForm) {
    signUpFormElements.push({
      id: key,
      config: signUpForm[key]
    })
  }
  // store log in elements
  const logInFormElements = [];
  for(const key in logInForm) {
    logInFormElements.push({
      id: key,
      config: logInForm[key]
    })
  }

  // change form method
  const changeFormMethod = () => {
    if(formMethod === "signup") {
      setFormMethod("login");
    }
    if(formMethod === "login") {
      setFormMethod("signup");
    }
  };

  // form submit handler
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if(formMethod === "signup") {
      onAuth(signUpForm, formMethod);

    } else {
      onAuth(logInForm, formMethod);
    }
    // showRedirectModal();
  };

  const displayFormByMethod = (formElements, changedHandler) => {
    let formDisplayed = formElements.map(element => {
      const {id, config: {elementType, elementConfig, value, defaultValue, disabled, readOnly, touched, valid, validation, warningText, warningTextShown}} = element;

      return <Input
          key={id}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          defaultValue={defaultValue}
          disabledInfo={disabled}
          readOnly={readOnly}
          shouldValidate={validation.required}
          inputTouched={touched}
          inputValid={valid}
          inputWarning={warningText}
          inputWarningShown={warningTextShown}
          inputWarningShowHandler={() => showWarningTextsHandler(element.id)}
          inputChanged={(event) => changedHandler(event, element.id)}
          inputUnfocused={() => checkValidityAfterFocus(element.id)} />
    })

    return formDisplayed;
  }

  let formDisplayed;
  let authMethodName;
  let authQuestion;
  let authMethodSwitch;
  let formValidity;
  if(formMethod === "signup" && !isAuth) {
    formDisplayed = displayFormByMethod(signUpFormElements, signUpInputsChangedHandler);
    authMethodName = "sign up";
    authQuestion = "Already have an account?";
    authMethodSwitch = "log in";
    formValidity = signUpFormIsValid;
  } else if(formMethod === "login" && !isAuth) {
    formDisplayed = displayFormByMethod(logInFormElements, logInInputsChangedHandler);
    authMethodName = "log in";
    authQuestion = "Don't have an account?";
    authMethodSwitch = "sign up";
    formValidity = logInFormIsValid;
  } else if(isAuth) {
    formDisplayed = (
      <div style={{
        width: "90%",
        margin: "0 auto",
        textAlign: "center"
      }}>
        <p style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          marginBottom: "2rem"
        }}>You are logged in</p>
        <button 
          type="button"
          style={{
            fontSize: "1.9rem",
            fontWeight: "bold",
            padding: "1rem 0",
            width: "15rem",
            outline: "none",
            border: "none",
            backgroundColor: "salmon",
            color: "white",
            cursor: "pointer"
          }}
          onClick={() => showQuestionModal("logging out", "Are you sure you want to log out?")}>Log out</button>
      </div>
    );
  }

  let actualForm = (
    <Form
      formClassname="signup"
      formIsValid={formValidity}
      formBtnText={formMethod === "signup" ? "sign up" : "log in"}
      signUpButtonShown={isAuth}
      formSubmitHandler={formSubmitHandler}>
        {formDisplayed}
    </Form>
  );

  if(isLoading) {
    actualForm = <Spinner />
  }

  return (
    <>
      <RedirectModal
        redirectModalShow={redirectModalShow}
        redirectModalClosed={rediredctModalClosed}
        redirectModalTitle="you are logged in" />
      <QuestionModal 
        questionModalShow={questionModalData.show}
        questionModalTitle={questionModalData.title}
        questionModalText={questionModalData.text}
        questionModalCancel={closeQuestionModal}
        questionModalConfirm={confirmLogout} />
      <ErrorModal
        errorModalShow={isError !== null}
        errorModalMsg={returnErrorMsg()}
        errorModalClosed={onClearError} />
      <SectionTitle
        titleClassname="signup"
        icon={<GoSignIn />}
        titleText="sign up"
        titleAdditional="...or log in" />
      <section className="signup__content">
        <article className="signup__info">
          <h3 className="signup__info-title">
            after you become our member you can:
          </h3>
          <ul className="signup__info-list">
            {signUpInfo.map(info => {
              const {id, title, titleIcon, image, text, link, linkName} = info;
              return (
                <li
                  key={id}
                  className="signup__info-item">
                  <div className="signup__info-item__title">
                    <div className="signup__info-item__icon">
                      {titleIcon}
                    </div>
                    <p className="signup__info-item__title-text">
                      {title}
                    </p>
                  </div>
                  <div className="signup__info-item__main">
                    <div className="signup__info-item__main-info">
                      <p className="signup__info-item__main-text">
                        {text}
                      </p>
                      <Link className="signup__info-item__link" to={link}>
                        {linkName}
                      </Link>
                    </div>
                    <img className="signup__info-item__main-img" src={image} alt={id} />
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
        <article className="signup__form">
          <h3 
            className="signup__form-title"
            style={{display: isAuth ? "none" : "block"}}>
            enter your info to {authMethodName}
          </h3>
          {actualForm}
          <p 
            className="signup__form-check"
            style={{display: isAuth ? "none" : "block"}}>
            {authQuestion}
          </p>
          <button 
            type="button"
            className="signup__form-switch"
            style={{display: isAuth ? "none" : "block"}}
            onClick={changeFormMethod}>
            switch to {authMethodSwitch}
          </button>
        </article>
      </section>
    </>
  );
}

export default SignUp;
