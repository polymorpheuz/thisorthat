import * as actionTypes from './actionTypes';

export const getGame = gameId => {
  return {
    type: actionTypes.GET_GAME,
    gameId
  }
}

export const getGameStart = () => {
  return {
    type: actionTypes.GET_GAME_START
  }
}

export const setGame = chosenGame => {
  return {
    type: actionTypes.SET_GAME,
    chosenGame
  }
}

export const getGameFail = error => {
  return {
    type: actionTypes.GET_GAME_FAIL,
    errorText: error
  }
}

export const addGame = gameInfo => {
  return {
    type: actionTypes.ADD_GAME,
    gameInfo
  }
}

export const addGameStart = () => {
  return {
    type: actionTypes.ADD_GAME_START
  }
}

export const addGameSuccess = () => {
  return {
    type: actionTypes.ADD_GAME_SUCCESS
  }
}

export const addGameFail = error => {
  return {
    type: actionTypes.ADD_GAME_FAIL,
    error
  }
}