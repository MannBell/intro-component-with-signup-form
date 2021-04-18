import React from "react";
import formInputFields from "./formInput.json";
import "./style.css";

export const Presentational = (props) => {
  return (
    <App propies={props}/>
  );
}


const App = (props) => {
  props = props.propies;

  return (
    <div className="flex-container">
      <div className="flex-item">
        <H1Text/>
      </div>
      <div className="flex-item">
        <div className="banner">
          <b>Try it free 7 days</b> then $20/mo. thereafter
        </div>
        <Form 
          isValid={props.isValid}
          inputValue={props.inputValue}
          handleInputKeyDown={props.handleInputKeyDown}
          handleInputChange={props.handleInputChange}
          handleSubmitButton={props.handleSubmitButton}
        />
      </div>
    </div>
  );
}

const Form = (props) => {

  const formControls = formInputFields.map((inputField, i) => (
    <InputBar
        key={i}
        type={inputField.type}
        field={inputField.field}
        fieldName={inputField.fieldName}
        inputValue={props.inputValue[inputField.field]}
        handleInputKeyDown={props.handleInputKeyDown}
        handleInputChange={props.handleInputChange}
        isValid={props.isValid[inputField.field]}
    />
  ))

  return (
    <form className="form">
      {formControls}
      <button
        type="submit"
        className="form__submit-button"
        onClick={props.handleSubmitButton.bind(this)}
      >
        Claim your free trial
      </button>
      <div className="terms">
        By clicking the button, you are agreeing to our&nbsp;
        <a href="#" target="_blank">Terms and Services</a>
      </div>
    </form>
  );
}

const InputBar = (props) => {
  return (
    <div className={`form__input-bar-wrapper${props.isValid ? "" : " invalid"}`}>
      <div className="input-bar-wrapper__input-bar">
        <input 
          type={props.type}
          value={props.inputValue} 
          placeholder={props.fieldName}
          onKeyDown={props.handleInputKeyDown.bind(this, props.field)}
          onChange={props.handleInputChange.bind(this, props.field)}
        />
      </div>
      <div className="form__input-bar-wrapper__error-message">
        {
        props.fieldName.includes("Email")
          ? `Looks like this is not an email` 
          : `${props.fieldName} cannot be empty`
        }
      </div>
    </div>
  );
}

const H1Text = () => {
  return (
    <div className="h1-text">
      <h1>Learn to code by watching others</h1>
      <p>
        See how experienced developers solve problems in real-time. Watching scripted tutorials is great, 
        but understanding how developers think is invaluable.
      </p>
    </div>
  );
}