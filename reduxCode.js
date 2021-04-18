import { createStore } from "redux";

const SUBMITBUTTON = "SUBMITBUTTON";
const INPUTCHANGE = "INPUTCHANGE";
const INPUTKEYDOWN = "INPUTKEYDOWN";

const handleSubmitButton= (e) => ({
  type: SUBMITBUTTON
  , e
})

const handleInputChange = (field, e) => ({
  type: INPUTCHANGE
  , field
  , value: e.target.value
})

const handleInputKeyDown = (field) => ({
  type: INPUTKEYDOWN
  , field
})

const initialState = {
  isValid : {
    firstName: true
    , lastName: true
    , email: true
    , password: true
  }
  , inputValue : {
    firstName: ""
    , lastName: ""
    , email: ""
    , password: ""
  }
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case INPUTCHANGE
    : {
      return {...state, inputValue: {...state.inputValue, [action.field]: action.value}}
    }
    case INPUTKEYDOWN
    : {
      return {...state, isValid: {...state.isValid, [action.field]: true}};
    }
    case SUBMITBUTTON
    : {
      action.e.preventDefault();

      let thereIsEmpty = false;
      for (let value in state.inputValue) {
        if (!state.inputValue[value].length) {
          thereIsEmpty = true;
          break;
        }
      }

      let inputValidTemp = {}
      if (thereIsEmpty) {
        for( let field in state.inputValue) {
          if (!state.inputValue[field].length) {
            inputValidTemp = {...inputValidTemp, [field]: false}
          } else {
            inputValidTemp = {...inputValidTemp, [field]: true}
          }
        }
      } else {
        for( let field in state.inputValue) {
          inputValidTemp = {...inputValidTemp, [field]: true}
        }
      }
      
      const emailRegex = /\w+@\w+\.\w+/i;
      inputValidTemp = emailRegex.test(state.inputValue["email"])
        ? {...inputValidTemp, email: true}
        : {...inputValidTemp, email: false}

      return {...state, isValid: {...state.isValid, ...inputValidTemp}};
    }
    default
    : return state;
  }
}

export const store = createStore(reducer);

export const mapStateToProps = (state) => ({
  isValid: state.isValid
  , inputValue: state.inputValue
})

export const mapDispatchToProps = (dispatch) => ({
  handleSubmitButton: (e) => dispatch(handleSubmitButton(e))
  , handleInputChange: (field, e) => dispatch(handleInputChange(field, e))
  , handleInputKeyDown: (field) => dispatch(handleInputKeyDown(field))
})