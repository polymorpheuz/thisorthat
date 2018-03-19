import * as actionTypes from './actionTypes';

export const getAuthorData = () => {
  return {
    type: actionTypes.GET_AUTHOR_DATA
  }
}

export const getAuthorDataStart = () => {
  return {
    type: actionTypes.GET_AUTHOR_DATA_START
  }
}

export const getAuthorDataFail = error => {
  return {
    type: actionTypes.GET_AUTHOR_DATA_FAIL,
    error
  }
}

export const setAuthorData = data => {
  return {
    type: actionTypes.SET_AUTHOR_DATA,
    data
  }
}

export const getGamesByAuthor = authorId => {
  return {
    type: actionTypes.GET_GAMES_BY_AUTHOR
  }
}

export const getGamesByAuthorStart = () => {
  return {
    type: actionTypes.GET_GAMES_BY_AUTHOR_START
  }
}

export const getGamesByAuthorFail = error => {
  return {
    type: actionTypes.GET_GAMES_BY_AUTHOR_FAIL,
    error
  }
}

export const setGamesByAuthor = games => {
  return {
    type: actionTypes.SET_GAMES_BY_AUTHOR,
    games
  }
}