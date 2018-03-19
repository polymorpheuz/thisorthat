import * as actionTypes from '../actions/actionTypes';
import { ajax } from 'rxjs/observable/dom/ajax';
import { 
  loginStart, loginFail, signupStart, signupFail, setUser, checkAuthState, getNewToken,
  getUserData, getUserDataStart, getUserDataSuccess, getUserDataFail, setUserDataSuccess, setUserDataFail, clearAuthError
} from '../actions/auth';
import { Observable } from 'rxjs/Observable';

export const loginEpic = action$ =>
  action$.ofType(actionTypes.LOGIN)
    .flatMap(action => 
      Observable
        .ajax.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDFY0PhXd8qsIBSQPPilI9M_AKOZQHwL7Q', { 
          email: action.email,
          password: action.password,
          returnSecureToken: true,
        }, { ['Content-Type']: "application/json", })
        .map(data => {
          const expirationDate = new Date(new Date().getTime() + data.response.expiresIn * 1000);
          let accountInfo = {
            token: data.response.idToken,
            refreshToken: data.response.refreshToken,
            uid: data.response.localId,
            expiresIn: expirationDate
          }
          localStorage.setItem('thisorthat-userinfo', JSON.stringify(accountInfo));
          return checkAuthState();
        }) 
        .catch((err) => Observable.of(loginFail(err.response.error.message)))
        .startWith(loginStart())
    )

export const signupEpic = action$ =>
  action$.ofType(actionTypes.SIGNUP)
    .flatMap(action => 
      Observable
        .ajax.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDFY0PhXd8qsIBSQPPilI9M_AKOZQHwL7Q', {
          email: action.email,
          password: action.password,
          returnSecureToken: true
        },
        {
          ['Content-Type']: "application/json",
        })
        .map(data => {
          const expirationDate = new Date(new Date().getTime() + data.response.expiresIn * 1000);
          const accountInfo = {
            token: data.response.idToken,
            refreshToken: data.response.refreshToken,
            uid: data.response.localId,
            expiresIn: expirationDate
          }
          localStorage.setItem('thisorthat-userinfo', JSON.stringify(accountInfo));
          history.push('/profile');
          return setUser(accountInfo.uid);
        })
        .catch((err) => Observable.of(signupFail(err.response.error.message)))
    )  

export const logoutEpic = action$ =>
action$.ofType(actionTypes.LOGOUT) 
    .map(action => {
      localStorage.removeItem('thisorthat-userinfo');
      return setUser(null);
    })

export const checkAuthStateEpic = (action$) => {
  return action$.ofType(actionTypes.CHECK_AUTH_STATE)
      .map(action => {
        const userInfo = JSON.parse(localStorage.getItem('thisorthat-userinfo'));
        if(userInfo) {
          if(new Date(userInfo.expiresIn) <= new Date()) {
            return getNewToken(userInfo.refreshToken)
          } else {
            return getUserData(userInfo.uid);
          }
        }
        return setUser(null);
      })
};

export const getUserDataEpic = action$ =>
  action$.ofType(actionTypes.GET_USER_DATA)
    .flatMap(action => 
      Observable
        .ajax.get(`https://thisorthat-648f3.firebaseio.com/users/${action.userId}.json`)
        .map(data => {
          return setUser(action.userId, data.response.displayName, data.response.avatarUrl)
        })
        .catch(err => Observable.of(getUserDataFail(err.response)))
    )

export const setUserDataEpic = action$ =>
  action$.ofType(actionTypes.SET_USER_DATA)
    .flatMap(action => 
      Observable
        .ajax.patch(`https://thisorthat-648f3.firebaseio.com/users/${action.userId}/.json`, JSON.stringify(action.userData))
        .map(data => setUser(action.userId, action.userData.displayName, action.userData.avatarUrl))
        .catch(err => Observable.of(setUserDataFail(err.response)))
    )

export const getRefreshTokenEpic = action$ =>
  action$.ofType(actionTypes.GET_NEW_TOKEN)
    .flatMap(action => 
      Observable
        .ajax.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyDFY0PhXd8qsIBSQPPilI9M_AKOZQHwL7Q', {
          grant_type: 'refresh_token',
          refresh_token: action.refreshToken
        })
        .map(data => {
          const userInfo = JSON.parse(localStorage.getItem('thisorthat-userinfo'));
          const expirationDate = new Date(new Date().getTime() + data.response.expires_in * 1000);
          const actualUserInfo = {
            ...userInfo,
            token: data.response.id_token,
            expiresIn: expirationDate
          }
          localStorage.setItem('thisorthat-userinfo', JSON.stringify(actualUserInfo));
          return checkAuthState();
        }) 
        .catch(err => console.log(err))
    )