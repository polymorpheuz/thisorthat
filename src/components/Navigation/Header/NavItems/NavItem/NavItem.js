import React from 'react';
import { NavLink} from 'react-router-dom';
import classes from './NavItem.css';

const navigationItem = props => (
  <li className={classes.navItem}>
    <NavLink 
      to={props.link}
      exact={props.exact}
      onClick={props.clicked}
      className={classes.navLink}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;