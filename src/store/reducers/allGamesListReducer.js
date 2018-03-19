import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  allGames: [],
  userId: 'magnitola',
  users: [],
  loading: true,
  error: null
}

const setAllGamesStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const setAllGamesSuccess = (state, action) => {
  return updateObject(state, { allGames: action.games, loading: false })
}

const setAllGamesFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error })
}

const setUsers = (state, action) => {
  return updateObject(state, { loading: false, users: action.users })
}

const getUsersFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error })
}

const sortByRating = (state, action) => {
  const allGamesCopy = [...state.allGames];
  allGamesCopy.sort((a, b) => {
    if(a.rating.length < b.rating.length) {
      return 1;
    }
    if(a.rating.length > b.rating.length) {
      return -1;
    }
    return 0;
  })
  return updateObject(state, { allGames: allGamesCopy })
}

const sortByDate = (state, action) => {
  const allGamesCopy = [...state.allGames];
  allGamesCopy.sort((a, b) => {
    if(new Date(a.date) < new Date(b.date)) {
      return 1;
    }
    if(new Date(a.date) > new Date(b.date)) {
      return -1;
    }
    return 0;
  })
  return updateObject(state, { allGames: allGamesCopy })
}

const sortBy = (state, action) => {
  const allGamesCopy = [...state.allGames];

  if(action.prop === 'date' && action.order === 'asc') {
    allGamesCopy.sort((a, b) => {
      if(new Date(a.date) < new Date(b.date)) {
        return 1;
      }
      if(new Date(a.date) > new Date(b.date)) {
        return -1;
      }
      return 0;
    })
  }

  if(action.prop === 'date' && action.order === 'desc') {
    allGamesCopy.sort((a, b) => {
      if(new Date(a.date) > new Date(b.date)) {
        return 1;
      }
      if(new Date(a.date) < new Date(b.date)) {
        return -1;
      }
      return 0;
    })
  }

  if(action.prop === 'rating' && action.order === 'asc') {
    allGamesCopy.sort((a, b) => {
      if(a.rating.length < b.rating.length) {
        return 1;
      }
      if(a.rating.length > b.rating.length) {
        return -1;
      }
      return 0;
    })
  }

  if(action.prop === 'rating' && action.order === 'desc') {
    allGamesCopy.sort((a, b) => {
      if(a.rating.length > b.rating.length) {
        return 1;
      }
      if(a.rating.length < b.rating.length) {
        return -1;
      }
      return 0;
    })
  }
  return updateObject(state, { allGames: allGamesCopy })
}

const decreaseRating = (state, action) => {
  const userIdIndex = state.allGames[action.index].rating.indexOf(action.userId);
  const updatedRating = [...state.allGames[action.index].rating];
  if (userIdIndex !== -1) {
    updatedRating.splice(userIdIndex, 1);
  }
  const updatedGameKeys = { ...state.allGames[action.index], rating: updatedRating, ratingControlDisabled: 'decrease' };
  const updatedGames = [ ...state.allGames ];
  updatedGames[action.index] = updatedGameKeys; 
  return updateObject(state, { allGames: updatedGames});
}

const increaseRating = (state, action) => {
  const userIdIndex = state.allGames[action.index].rating.indexOf(action.userId);
  const updatedRating = [...state.allGames[action.index].rating];
  if (userIdIndex === -1) {
    updatedRating.push(action.userId);
  }
  const updatedGameKeys = { ...state.allGames[action.index], rating: updatedRating, ratingControlDisabled: 'increase' };
  const updatedGames = [ ...state.allGames ];
  updatedGames[action.index] = updatedGameKeys; 
  return updateObject(state, { allGames: updatedGames});
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