import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './Header.css';
import helperClasses from '../../../base/helpers.css';
import logo from '../../../assets/logo.png';

import NavItems from './NavItems/NavItems';
import SideDrawer from '../SideDrawer/SideDrawer';

const propTypes = {
  avatarUrl: PropTypes.string,    
  isAuth: PropTypes.string,    
  menuClicked: PropTypes.func.isRequired,    
  profileMenuClicked: PropTypes.func.isRequired,    
  showProfileMenu: PropTypes.bool.isRequired,    
}

const header = props => (
  <header className={classes.header}>
    <div className={`${helperClasses.wrapper} ${classes.wrapper}`}>
        <div className={classes.drawerToggle} onClick={props.menuClicked}>
            <div className={classes.drawerLine}></div>
            <div className={classes.drawerLine}></div>
            <div className={classes.drawerLine}></div>
        </div>
        <Link to="/">
          <img src={logo} alt="logo" className={classes.logo} />
        </Link>
        <NavItems 
          isAuth={props.isAuth} clicked={props.profileMenuClicked} 
          showProfileMenu={props.showProfileMenu} avatarUrl={props.avatarUrl}
        />
    </div>
  </header>
)

header.propTypes = propTypes;

export default header;