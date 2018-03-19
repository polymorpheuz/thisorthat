import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.css';

const propTypes = {
  clicked: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

const backdrop = props => (
  props.show && <div className={classes.backdrop} onClick={props.clicked}></div>
);

backdrop.propTypes = propTypes;

export default backdrop;