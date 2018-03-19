import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.css';

const propTypes = {
  changed: PropTypes.func.isRequired,
  elementConfig: PropTypes.object.isRequired,
  elementType: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  shouldValidate: PropTypes.object,
  touched: PropTypes.bool.isRequired,
  validationMsg: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.inputClass];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Error)
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = 
        <input 
          type={props.inputType} 
          value={props.value} 
          {...props.elementConfig} 
          className={inputClasses.join(' ')} 
          onChange={props.changed}
        />
      break;
    case ('textarea'):
      inputElement = <textarea/>
      break;
    default : inputElement = <input className={classes.inputClass}/>      
  }
  return (
    <div className={classes.inputContainer}>
      {inputElement}
      <label className={classes.Label}>{props.label}</label>
      {(props.validationMsg.length > 0 && props.invalid) && <span className={classes.validationError}>{props.validationMsg}</span>}
    </div>
  );
};

input.propTypes = propTypes;

export default input;