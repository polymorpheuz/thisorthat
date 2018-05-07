import * as actionTypes from './actionTypes';

export const getGame = gameId => ({
  type: actionTypes.GET_GAME,
  gameId
});

export const getGameStart = () => ({ type: actionTypes.GET_GAME_START });

export const setGame = chosenGame => ({
  type: actionTypes.SET_GAME,
  chosenGame
});

export const getGameFail = error => ({
  type: actionTypes.GET_GAME_FAIL,
  errorText: error
});

export const addGame = gameInfo => ({
  type: actionTypes.ADD_GAME,
  gameInfo
});

export const addGameStart = () => ({ type: actionTypes.ADD_GAME_START });

export const addGameSuccess = () => ({ type: actionTypes.ADD_GAME_SUCCESS });

export const addGameFail = error => ({
  type: actionTypes.ADD_GAME_FAIL,
  error
});