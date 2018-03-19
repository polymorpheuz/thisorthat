import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }  from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import 'rxjs';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import gameReducer from './store/reducers/gameReducer';
import allGamesListReducer from './store/reducers/allGamesListReducer';
import authReducer from './store/reducers/authReducer';

import { loginEpic, signupEpic, logoutEpic, checkAuthStateEpic, getRefreshTokenEpic, getUserDataEpic, setUserDataEpic } from './store/epics/authEpic';
import { getGames, getUsersEpic, ratingIdPush, ratingIdRemove, testEpic } from './store/epics/allGamesListEpic';
import { getGame, addGame } from './store/epics/gameEpic';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootEpic = combineEpics(
  loginEpic, signupEpic, logoutEpic, checkAuthStateEpic, getRefreshTokenEpic, getUserDataEpic, setUserDataEpic,
  getGames, getUsersEpic, ratingIdPush, ratingIdRemove,
  getGame, addGame
);

const rootReducer = combineReducers({
  game: gameReducer,
  allGamesList: allGamesListReducer,
  auth: authReducer
});

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(epicMiddleware)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
