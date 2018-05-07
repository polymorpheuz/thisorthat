import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  chosenGame: [],
  loading: false,
  error: null
}

const getGameStart = (state, action) => updateObject(state, { loading: true });

const setGame = (state, action) => updateObject(state, { chosenGame: action.chosenGame, loading: false });

const getGameFail = (state, action) => updateObject(state, { loading: false, error: action.errorText });

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_GAME_START : return getGameStart(state, action);
    case actionTypes.SET_GAME : return setGame(state, action);
    case actionTypes.GET_GAME_FAIL : return getGameFail(state, action);
    default : return state;
  }
}

export default reducer;