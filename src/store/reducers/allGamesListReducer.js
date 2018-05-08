import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  allGames: {},
  filter: ['date', 'asc'],
  userId: null,
  users: [],
  loading: true,
  error: null
}

const setAllGamesStart = (state, action) => updateObject(state,
  { loading: true }
);

const setAllGamesSuccess = (state, action) => updateObject(state,
  { allGames: action.games, loading: false }
);

const setAllGamesFail = (state, action) => updateObject(state,
  { loading: false, error: action.error }
);

const setUsers = (state, action) => updateObject(state,
  { loading: false, users: action.users }
);

const getUsersFail = (state, action) => updateObject(state, 
  { loading: false, error: action.error }
);

const sortBy = (state, action) => updateObject(state, { filter: [ action.prop, action.order ] });

const decreaseRating = (state, action) => {
  const userIdIndex = state.allGames.byId[action.gameId].rating.indexOf(action.userId);
  const updatedRating = [...state.allGames.byId[action.gameId].rating];
  if (userIdIndex !== -1) {
    updatedRating.splice(userIdIndex, 1);
  }
  const updatedGameKeys = { ...state.allGames.byId[action.gameId], rating: updatedRating, ratingControlDisabled: 'decrease' };
  const updatedGames = { ...state.allGames.byId };
  updatedGames[action.gameId] = updatedGameKeys; 
  const allGamesCopy = { ...state.allGames };
  allGamesCopy.byId = updatedGames;
  return updateObject(state, { allGames: allGamesCopy});
}

const increaseRating = (state, action) => {
  const userIdIndex = state.allGames.byId[action.gameId].rating.indexOf(action.userId);
  const updatedRating = [...state.allGames.byId[action.gameId].rating];
  if (userIdIndex === -1) {
    updatedRating.push(action.userId);
  }
  const updatedGameKeys = { ...state.allGames.byId[action.gameId], rating: updatedRating, ratingControlDisabled: 'increase' };
  const updatedGames = { ...state.allGames.byId };
  updatedGames[action.gameId] = updatedGameKeys; 
  const allGamesCopy = { ...state.allGames };
  allGamesCopy.byId = updatedGames;
  return updateObject(state, { allGames: allGamesCopy});
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_GAMES_START : return setAllGamesStart(state, action);
    case actionTypes.SET_GAMES : return setAllGamesSuccess(state, action);
    case actionTypes.GET_GAMES_FAIL : return setAllGamesFail(state, action);
    case actionTypes.SET_USERS : return setUsers(state, action);
    case actionTypes.GET_USERS_FAIL : return getUsersFail(state, action);
    case actionTypes.DECREASE_RATING : return decreaseRating(state, action);
    case actionTypes.INCREASE_RATING : return increaseRating(state, action);
    case actionTypes.SORT_BY : return sortBy(state, action);
    default : return state;
  }
}

export default reducer;