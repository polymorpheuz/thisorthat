import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './AccountSpaceNav.css';

const propTypes = {
  avatarUrl: PropTypes.string,   
  clicked: PropTypes.func.isRequired,  
  showProfileMenu: PropTypes.bool.isRequired,
}

const accountSpaceNav = props => (
  <li className={classes.accountSpaceButton} onClick={props.clicked}>
    <img src={props.avatarUrl} alt="User Avatar" className={classes.avatar}/>
    <ul className={`${classes.accountSpaceList} ${!props.showProfileMenu ? classes.hidden : ''}`}>
      <li className={classes.accountSpaceItem}>
        <Link to="/profile" className={classes.accountSpaceLink}>Profile</Link>
      </li>
      <li className={classes.accountSpaceItem}>
        <Link to="/logout" onClick={props.logoutClick} className={classes.accountSpaceLink}>Logout</Link>
      </li>
    </ul>
  </li>
);

accountSpaceNav.propTypes = propTypes;

export default accountSpaceNav;