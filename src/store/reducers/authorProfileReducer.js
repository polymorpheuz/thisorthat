import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  filteredGames: [],
  authorData: {},
  error: null,
  loading: false
}

const getAuthorDataStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const setGame = (state, action) => {
  return updateObject(state, { chosenGame: action.chosenGame, loading: false })
}

const getAuthorDataFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.errorText })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_AUTHOR_DATA_START : return getAuthorDataStart(state, action);
    case actionTypes.GET_AUTHOR_DATA_FAIL : return getAuthorDataFail(state, action);
    case actionTypes.SET_AUTHOR_DATA : return setAuthorData(state, action);
    default : return state;
  }
}

export default reducer;