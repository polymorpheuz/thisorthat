import React from 'react';
import PropTypes from 'prop-types';
import classes from './Rating.css';

const propTypes = {
  decreaseClick: PropTypes.func.isRequired,
  increaseClick: PropTypes.func.isRequired,
  rating: PropTypes.array.isRequired,
  ratingControlDisabled: PropTypes.string.isRequired,
}

export const rating = props => (
  <div className={classes.itemRating}>
    <button 
      disabled={props.ratingControlDisabled === "decrease" || props.ratingControlDisabled === "both"} 
      className={classes.ratingButton} onClick={props.decreaseClick}
    >-</button> 
    <span>{props.rating.length}</span>
    <button 
      disabled={props.ratingControlDisabled === "increase" || props.ratingControlDisabled === "both"} 
      className={classes.ratingButton} onClick={props.increaseClick}
    >+</button> 
  </div>
);

rating.propTypes = propTypes;

export default rating;