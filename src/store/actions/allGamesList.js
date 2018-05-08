import * as actionTypes from './actionTypes';

export const getGames = userId => ({
  type: actionTypes.GET_GAMES,
  userId
});

export const getGamesStart = () => ({ type: actionTypes.GET_GAMES_START });

export const getGamesFail = error => ({
  type: actionTypes.GET_GAMES_FAIL,
  error
})

export const setGames = games => ({
  type: actionTypes.SET_GAMES,
  games
});

export const getUsers = () => ({ type: actionTypes.GET_USERS });

export const setUsers = users => {
  let normalizedUsers = { byId: {}, allIds: [] };
  for(let user in users) {
    normalizedUsers.byId[user] = users[user];
    normalizedUsers.allIds.push(user);
  }
  return {
    type: actionTypes.SET_USERS,
    users: normalizedUsers
  }
};

export const getUsersFail = error => ({
  type: actionTypes.GET_USERS_FAIL,
  error
});

export const sortBy = (prop, order) => ({
    type: actionTypes.SORT_BY,
    prop,
    order
});

export const ratingIdRemove = (gameId, userId, index) => ({
  type: actionTypes.RATING_ID_REMOVE,
  gameId,
  userId,
  index
});

export const ratingIdPush = (gameId, userId, index) => ({
  type: actionTypes.RATING_ID_PUSH,
  gameId,
  userId,
  index
});

export const decreaseRating = (gameId, userId, index) => ({
  type: actionTypes.DECREASE_RATING,
  gameId,
  userId
});

export const increaseRating = (gameId, userId, index) => ({
  type: actionTypes.INCREASE_RATING,
  gameId,
  userId,
  index
});