import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './NavItems.css'

import Aux from '../../../../hoc/Auxx/Auxx'
import NavItem from './NavItem/NavItem';
import AccountSpaceNav from './AccountSpaceNav/AccountSpaceNav';

const propTypes = {
  avatarUrl: PropTypes.string,   
  clicked: PropTypes.func.isRequired,     
  isAuth: PropTypes.string,    
  showProfileMenu: PropTypes.bool.isRequired,
}

const navItems = props => (
  <nav className={classes.nav}>
    <ul className={classes.navList}>
      { props.isAuth 
        ? <Aux>
            <NavItem link="/addgame">Add Game</NavItem>
            <AccountSpaceNav 
              clicked={props.clicked} 
              logoutClicked={props.logoutClicked} 
              avatarUrl={props.avatarUrl}
              showProfileMenu={props.showProfileMenu}
            />
          </Aux>
        : <Aux>
            <NavItem link="/signup">Sign Up</NavItem>
            <NavItem link="/login">Log In</NavItem>
          </Aux>
      }
    </ul>
  </nav>
);

navItems.propTypes = propTypes;

export default navItems;