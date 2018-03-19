import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import helperClasses from '../../base/helpers.css';

import Header from '../../components/Navigation/Header/Header';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Aux from '../Auxx/Auxx';


class Layout extends Component {
  state = {
    showSideDrawer: false,
    showProfileMenu: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  profileMenuToggle = event => {
    this.setState(prevState => {
      return { showProfileMenu: !prevState.showProfileMenu}
    })
  }

  outerClickHandler = event => {
    const classChunks = event.target.className.split('__');
    if(classChunks[1] !== 'avatar') {
      this.setState({showProfileMenu: false});
    }
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer};
    });
  }
  render () {
    return (
      <div onClick={this.outerClickHandler}>
        <SideDrawer 
          isAuth={this.props.isAuth} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}
          avatarUrl={this.props.avatarUrl} displayName={this.props.displayName}
        />
        <Header 
          isAuth={this.props.isAuth} menuClicked={this.sideDrawerToggleHandler} avatarUrl={this.props.avatarUrl}
          profileMenuClicked={this.profileMenuToggle} showProfileMenu={this.state.showProfileMenu}
        />
        <main className={classes.bodyWrapper} >
          <div className={helperClasses.wrapper} >
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    avatarUrl: state.auth.avatarUrl,
    displayName: state.auth.displayName
  }
}

export default connect(mapStateToProps, null)(Layout);