import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthState } from './store/actions/auth';

import Layout from './hoc/Layout/Layout';
import Signup from './containers/Auth/Signup/Singup';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import allGamesList from './containers/allGamesList/allGamesList';
import Game from './containers/Game/Game';
import AddGame from './containers/AddGame/AddGame';
import UserProfile from './containers/UserProfile/UserProfile';
import AuthorProfile from './containers/AuthorProfile/AuthorProfile';


class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }
    state = {
        isAuthenticated: false
    }
    render () {
        let routes = (
            <Switch>
                <Route path="/game/:id" component={Game}></Route>
                <Route path="/user/:id" component={AuthorProfile}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/" exact component={allGamesList}></Route>
                <Redirect to="/"/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/profile" component={UserProfile}></Route>
                    <Route path="/user/:id" component={AuthorProfile}></Route>
                    <Route path="/addgame" component={AddGame}></Route>
                    <Route path="/game/:id" component={Game}></Route>
                    <Route path="/logout" component={Logout}></Route>
                    <Route path="/" exact component={allGamesList}></Route>
                    <Redirect to="/"/>
                </Switch>
            );
        }
        return (
            <Layout isAuth={this.props.isAuthenticated}>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(checkAuthState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));