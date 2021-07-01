import React from 'react';
import './form.scss';

const Form = props => {
  return (
    <form className={`form form__${props.formClassname}`}>
      {props.children}
      <button 
        type="submit"
        className="form__submit-btn"
        style={{display: props.signUpButtonShown ? "none" : "block"}}
        disabled={!props.formIsValid}
        onClick={props.formSubmitHandler}>
        {props.formBtnText}
      </button>
    </form>
  );
}

export default Form;
