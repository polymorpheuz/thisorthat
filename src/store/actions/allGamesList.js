import * as actionTypes from './actionTypes';

export const getGames = userId => {
  return {
    type: actionTypes.GET_GAMES,
    userId
  }
}

export const getGamesStart = () => {
  return {
    type: actionTypes.GET_GAMES_START
  }
}

export const getGamesFail = error => {
  return {
    type: actionTypes.GET_GAMES_FAIL,
    error
  }
}

export const setGames = games => {
  return {
    type: actionTypes.SET_GAMES,
    games
  }
}

export const getUsers = () => {
  return {
    type: actionTypes.GET_USERS
  }
}

export const setUsers = users => {
  return {
    type: actionTypes.SET_USERS,
    users
  }
}
export const getUsersFail = error => {
  return {
    type: actionTypes.GET_USERS_FAIL,
    error
  }
}

export const sortByRating = order => {
  return {
    type: actionTypes.SORT_BY_RATING,
    order
  }
}

export const sortByDate = order => {
  return {
    type: actionTypes.SORT_BY_DATE,
    order
  }
}

export const sortBy = (prop, order) => {
  return {
    type: actionTypes.SORT_BY,
    prop,
    order
  }
}

export const ratingIdRemove = (gameId, userId, index) => {
  return {
    type: actionTypes.RATING_ID_REMOVE,
    gameId,
    userId,
    index
  }
}

export const ratingIdPush = (gameId, userId, index) => {
  return {
    type: actionTypes.RATING_ID_PUSH,
    gameId,
    userId,
    index
  }
}

export const decreaseRating = (gameId, userId, index) => {
  return {
    type: actionTypes.DECREASE_RATING,
    gameId,
    userId,
    index
  }
}

export const increaseRating = (gameId, userId, index) => {
  return {
    type: actionTypes.INCREASE_RATING,
    gameId,
    userId,
    index
  }
}

export const testAction = () => {
  return {
    type: actionTypes.TEST_ACTION
  }
}

export const cancelAction = () => {
  return {
    type: actionTypes.CANCEL_ACTION
  }
}