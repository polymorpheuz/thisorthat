import React from 'react';
import PropTypes from 'prop-types';
import classes from './Select.css';

import Aux from '../../../hoc/Auxx/Auxx';

const propTypes = {
  changed: PropTypes.func,
  elementConfig: PropTypes.object.isRequired,
  elementType: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

const select = props => {
  let selectElement = (
    <select 
      className={classes.select} 
      value={props.value}
      onChange={props.changed}
    >
      {props.elementConfig.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ))}
    </select>
  )
  let selectGroup = (
    <div className={classes.selectWrapper}>
      {props.label !== undefined && <label className={classes.Label}>{props.label}</label>}
      {selectElement}
    </div>
  );
  if (props.type === 'sortingSelect') {
    selectGroup = (
      <Aux>
        {props.label !== undefined && <label className={classes.Label}>{props.label}</label>}
        {selectElement}
      </Aux>
    );
  }
  return (
    <Aux>
      {selectGroup}
    </Aux>
  )
}

select.propTypes = propTypes;

export default select;