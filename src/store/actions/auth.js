import * as actionTypes from './actionTypes';

export const setUser = (userId, displayName, avatarUrl) => ({
    type: actionTypes.SET_USER,
    userId,
    displayName,
    avatarUrl
});

export const loginStart = () => ({ type: actionTypes.LOGIN_START });

export const loginFail = errorMessage => {
  let beautifiedErrorMessage = null;
  if(errorMessage === 'EMAIL_NOT_FOUND') {
    beautifiedErrorMessage = 'This email is not found';
  }
  if(errorMessage === 'INVALID_PASSWORD') {
    beautifiedErrorMessage = 'Invalid password';
  }
  return {
    type: actionTypes.LOGIN_FAIL,
    errorMessage: beautifiedErrorMessage
  }
}

export const signupStart = () => ({ type: actionTypes.SIGNUP_START })

export const signupFail = errorMessage => {
  let beautifiedErrorMessage = null;
  if (errorMessage === 'EMAIL_EXISTS') {
    beautifiedErrorMessage = 'This email is registered';
  }
  if (errorMessage === 'WEAK_PASSWORD : Password should be at least 6 characters') {
    beautifiedErrorMessage = 'Password should be at least 6 characters';
  }
  return {
    type: actionTypes.SIGNUP_FAIL,
    errorMessage: beautifiedErrorMessage
  }
}

export const login = (email, password) => ({
    type: actionTypes.LOGIN,
    email,
    password
});

export const signup = (email, password) => ({
  type: actionTypes.SIGNUP,
  email,
  password
});

export const logout = () => ({ type: actionTypes.LOGOUT });

export const checkAuthState = () => ({ type: actionTypes.CHECK_AUTH_STATE });

export const getNewToken = refreshToken => ({
    type: actionTypes.GET_NEW_TOKEN,
    refreshToken
});

export const getUserData = userId => ({
    type: actionTypes.GET_USER_DATA,
    userId
});

export const getUserDataStart = () => ({ type: actionTypes.GET_USER_DATA_START });

export const getUserDataFail = error => ({
    type: actionTypes.GET_USER_DATA_FAIL,
    error
});

export const getUserDataSuccess = userData => ({
    type: actionTypes.GET_USER_DATA_SUCCESS,
    userData
});

export const updateUserData = (userId, userData) => ({
    type: actionTypes.SET_USER_DATA,
    userId,
    userData
});

export const clearAuthError = () => ({ type: actionTypes.CLEAR_AUTH_ERROR });