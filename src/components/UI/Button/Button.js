import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

import Aux from '../../../hoc/Auxx/Auxx';

const propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func
}

const button = props => {
  let buttonElement = null;
  switch (props.btnType) {
    case ('squareBlue'):
      buttonElement = 
        <button 
          className={`${classes.buttonSquare} ${classes.blue}`} 
          disabled={props.disabled} 
          onClick={props.clicked}
        >
          {props.children}
        </button>
      break;
    case ('squareRed'):   
      buttonElement = 
        <button 
          className={`${classes.buttonSquare} ${classes.red}`} 
          disabled={props.disabled} 
          onClick={props.clicked}
        >
          {props.children}
        </button>
      break;
    case ('smallRoundNext'):  
      buttonElement = 
        <button 
        className={`${classes.buttonRoundSmall} ${classes.next}`} 
        disabled={props.disabled} 
        onClick={props.clicked}
        >
          {props.children}
        </button>
      break;  
    default : 
      buttonElement = 
        <button 
        className={`${classes.buttonSquare} ${classes.blue}`} 
        disabled={props.disabled} 
        onClick={props.clicked}
        >
          {props.children}
        </button>  
  }
  return (
    <Aux>
      {buttonElement} 
    </Aux>
  );
}

button.propTypes = propTypes;

export default button;