import React from 'react';
import classes from './Loader.css';

export const loader = () => (
  <span className={classes.loader}>
    <span className={classes.loaderInner}></span>
  </span>
);

export default loader;