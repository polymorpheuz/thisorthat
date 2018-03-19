import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  userId: null,
  displayName: null,
  avatarUrl: 'https://innmind.com/assets/placeholders/no_avatar-3d6725770296b6a1cce653a203d8f85dcc5298945b71fa7360e3d9aa4a3fc054.svg',
  loading: null,
  error: null
}

const loginStart = state => {
  return updateObject(state, { loading: true });
}

const loginFail = (state, action) => {
  let errorMessage = null;
  if(action.errorMessage === 'EMAIL_NOT_FOUND') {
    errorMessage = 'This email is not found';
  }
  if(action.errorMessage === 'INVALID_PASSWORD') {
    errorMessage = 'Invalid password';
  }
  return updateObject(state, { loading: false, error: errorMessage });
}

const signupStart = state => {
  return updateObject(state, { loading: true });
}

const signupFail = (state, action) => {
  let errorMessage = null;
  if(action.errorMessage === 'EMAIL_EXISTS') {
    errorMessage = 'This email is registered';
  }
  if(action.errorMessage === 'WEAK_PASSWORD : Password should be at least 6 characters') {
    errorMessage = 'Password should be at least 6 characters';
  }
  return updateObject(state, { loading: false, error: errorMessage });
}

const setUser = (state, action) => {
  return updateObject(state, { loading: false, userId: action.userId, displayName: action.displayName, avatarUrl: action.avatarUrl })
}

const setUserData = (state, action) => {
  return updateObject(state, { loading: false })
}

const getUserDataFail = (state, action) => {
  return updateObject(state, { loading: false })
}

const clearAuthError = (state, action) => {
  return updateObject(state, { error: null })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_START : return loginStart(state);
    case actionTypes.LOGIN_FAIL : return loginFail(state, action);
    case actionTypes.SIGNUP_START : return signupStart(state);
    case actionTypes.SIGNUP_FAIL : return signupFail(state, action);
    case actionTypes.SET_USER : return setUser(state, action);
    case actionTypes.GET_USER_DATA_SUCCESS : return setUserData(state, action);
    case actionTypes.GET_USER_DATA_FAIL : return getUserDataFail(state, action);
    case actionTypes.CLEAR_AUTH_ERROR : return clearAuthError(state, action);
    default : return state;
  }
}

export default reducer;