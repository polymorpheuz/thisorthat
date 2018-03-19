import * as actionTypes from './actionTypes';

export const setUser = (userId, displayName, avatarUrl) => {
  return {
    type: actionTypes.SET_USER,
    userId,
    displayName,
    avatarUrl
  }
}

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  }
}

export const loginFail = errorMessage => {
  return {
    type: actionTypes.LOGIN_FAIL,
    errorMessage
  }
}

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  }
}

export const signupFail = errorMessage => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    errorMessage
  }
}

export const login = (email, password) => {
  return {
    type: actionTypes.LOGIN,
    email,
    password
  }
}

export const signup = (email, password) => {
  return {
    type: actionTypes.SIGNUP,
    email,
    password
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}

export const checkAuthState = () => {
  return {
    type: actionTypes.CHECK_AUTH_STATE
  }
}

export const getNewToken = refreshToken => {
  return {
    type: actionTypes.GET_NEW_TOKEN,
    refreshToken
  }
}

export const getUserData = userId => {
  return {
    type: actionTypes.GET_USER_DATA,
    userId
  }
}

export const getUserDataStart = () => {
  return {
    type: actionTypes.GET_USER_DATA_START
  }
}

export const getUserDataFail = error => {
  return {
    type: actionTypes.GET_USER_DATA_FAIL,
    error
  }
}

export const getUserDataSuccess = userData => {
  return {
    type: actionTypes.GET_USER_DATA_SUCCESS,
    userData
  }
}

export const updateUserData = (userId, userData) => {
  return {
    type: actionTypes.SET_USER_DATA,
    userId,
    userData
  }
}

export const clearAuthError = () => {
  return {
    type: actionTypes.CLEAR_AUTH_ERROR
  }
}