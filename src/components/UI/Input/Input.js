import React from 'react';
import './input.scss';
import { v4 as uuid} from 'uuid';
import { RiErrorWarningLine } from 'react-icons/ri';

const Input = ({elementType, elementConfig, inputChanged, inputUnfocused, value, disabledInfo, defaultValue, readOnly, shouldValidate, inputTouched, inputValid, inputWarning, inputWarningShown, inputWarningShowHandler}) => {
  let inputFieldClasses = ["generic-input__field"];

  if(shouldValidate && inputTouched && inputValid) {
    inputFieldClasses.push("field-valid");
  }
  if(shouldValidate && inputTouched && !inputValid) {
    inputFieldClasses.push("field-invalid");
  }
  let input = null;

  let warningMessageClasses = ["generic-input__message"];

  if(inputWarningShown) {
    warningMessageClasses.push("warning-shown");
  }

  switch(elementType) {
    case "inputText":
      input = (
        <div className="generic-input">
          <div className={warningMessageClasses.join(" ")}>
            <div className="generic-input__message-icon">
              <RiErrorWarningLine />
            </div>
            <p className="generic-input__message-text">
              {inputWarning}
            </p>
          </div>
          <input 
            className={inputFieldClasses.join(" ")} 
            {...elementConfig.atributes} 
            value={value} 
            readOnly={readOnly} 
            onChange={inputChanged} 
            disabled={disabledInfo}
            onBlur={inputUnfocused}
            onClick={inputWarningShowHandler} />
        </div>
      );
      break;
    case "inputNumber":
      input = (
        <div className="generic-input">
          <label htmlFor={elementConfig.label.for} style={{display: elementConfig.label.show ? "block" : "none"}}>
            {elementConfig.label.name}
          </label>
          <input 
            className={inputFieldClasses.join(" ")} 
            {...elementConfig.atributes} 
            value={value} 
            readOnly={readOnly} 
            onChange={inputChanged} 
            disabled={disabledInfo}
            onBlur={inputUnfocused}
            onClick={inputWarningShowHandler} />
        </div>
      );
      break;
    case "textarea":
      input = (
        <div className="generic-input">
          <label htmlFor={elementConfig.label.for}>
            {elementConfig.label.name}
          </label>
          <textarea id={elementConfig.label.for} {...elementConfig.atributes} value={value} className={inputFieldClasses.join(" ")} onChange={inputChanged} onBlur={inputUnfocused}></textarea>
        </div>
      );
      break;
    case "select":
      input = (
        <div className={`generic-input ${disabledInfo && "field-disabled"}`}>
          <label 
            htmlFor={elementConfig.label.for}>
            {elementConfig.label.name}
          </label>
          <select
            className="generic-input__field"
            id={elementConfig.label.for}
            name={elementConfig.atributes.name}
            value={value || "default"}
            onChange={inputChanged}
            disabled={disabledInfo}>
              <option 
                value="choose" 
                hidden>
                {defaultValue}
              </option>
            {elementConfig.options.map(option => (
              <option
                key={uuid()}
                value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    default:
      input = <input />;
  }
  return input;
}

export default Input;
