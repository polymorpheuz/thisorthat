import React from 'react';
import PropTypes from 'prop-types';
import classes from './SideDrawer.css';

import Aux from '../../../hoc/Auxx/Auxx';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItem from '../Header/NavItems/NavItem/NavItem';

const propTypes = {
  avatarUrl: PropTypes.string,   
  closed: PropTypes.func.isRequired,    
  displayName: PropTypes.string, 
  isAuth: PropTypes.string,    
  open: PropTypes.bool.isRequired,
}

const sideDrawer = props => (
  <Aux>
    <Backdrop show={props.open} clicked={props.closed} />
    <div className={`${classes.sideDrawer} ${props.open ? classes.open : classes.close}`}>      
      { props.isAuth &&
        <div className={classes.sideDrawerHeader}>
          <img src={props.avatarUrl} className={classes.sideDrawerAvatar} />
          <h4 className={classes.userNickname}>{props.displayName}</h4>
        </div>        
      }
      <div className={classes.sideDrawerBody}>
        { props.isAuth 
          ? <Aux>
              <div className={classes.linkContainer}>
              <i className={`material-icons ${classes.sideDrawerIcon}`}>note_add</i>
              <NavigationItem link="/addgame" clicked={props.closed}>Add game</NavigationItem>
              </div>
              <div className={classes.linkContainer}>
                <i className={`material-icons ${classes.sideDrawerIcon}`}>person</i>
                <NavigationItem link="/profile" clicked={props.closed}>Profile</NavigationItem>
              </div>
              <div className={classes.linkContainer}>
                <i className={`material-icons ${classes.sideDrawerIcon}`}>power_settings_new</i>
                <NavigationItem link="/logout" clicked={props.closed}>Logout</NavigationItem>
              </div>
            </Aux>
          : <Aux>
              <div className={classes.linkContainer}>
                <i className={`material-icons ${classes.sideDrawerIcon}`}>person_add</i>
                <NavigationItem link="/signup" clicked={props.closed}>Sign Up</NavigationItem>
              </div>
              <div className={classes.linkContainer}>
              <i className={`material-icons ${classes.sideDrawerIcon}`}>exit_to_app</i>
              <NavigationItem link="/login" clicked={props.closed}>Log In</NavigationItem>
              </div>
            </Aux>
        }
      </div>
    </div>
  </Aux>  
);

sideDrawer.propTypes = propTypes;

export default sideDrawer;