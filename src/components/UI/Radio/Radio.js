import React from 'react';
import PropTypes from 'prop-types';
import classes from './Radio.css';

import Aux from '../../../hoc/Auxx/Auxx';

const propTypes = {
  changed: PropTypes.func.isRequired,
  elementConfig: PropTypes.object.isRequired,
  elementType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

const radio = props => {
  let radioGroup = (
    <Aux>
      {props.elementConfig.options.map(option => (
        <label className={classes.container} key={option.value}>{option.value}
          <input 
            type="radio" 
            name={props.elementConfig.name} 
            value={option.value} 
            onChange={props.changed} 
            checked={props.value === option.value ? true : false}
          />
          <span className={classes.checkmark}></span>
        </label>
      ))}
    </Aux>
  )
  return (
    <div className={classes.radioGroup}>
      <span className={classes.label}>{props.label}</span>
      {radioGroup}
    </div>
  )
}

radio.propTypes = propTypes;

export default radio;