import * as actionTypes from '../actions/actionTypes';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { getGameStart, getGameFail, setGame, addGameSuccess, addGameFail } from '../actions/game';

export const getGame = action$ =>
  action$.ofType(actionTypes.GET_GAME)
    .flatMap(action => 
      Observable
        .ajax.get(`https://thisorthat-648f3.firebaseio.com/games/${action.gameId}.json`)
        .map(data => setGame(data.response))
        .catch(err => Observable.of(getGameFail(err.response)))
        .startWith(getGameStart())
    )

export const addGame = action$ =>
  action$.ofType(actionTypes.ADD_GAME)
    .flatMap(action => 
      Observable
        .ajax.post('https://thisorthat-648f3.firebaseio.com/games/.json', JSON.stringify(action.gameInfo))
        .map(data => addGameSuccess())
        .catch(err => Observable.of(addGameFail(err.response)))
    )