import * as actionTypes from '../actions/actionTypes';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { 
  getAuthorData, getAuthorDataStart, getAuthorDataFail, setAuthorData,
  getGamesByAuthor, getGamesByAuthorStart, getGamesByAuthorFail, setGamesByAuthor
 } from '../actions/authorProfile';

export const getUserDataEpic = action$ =>
 action$.ofType(actionTypes.GET_AUTHOR_DATA)
   .flatMap(action => 
     Observable
       .ajax.get(`https://thisorthat-648f3.firebaseio.com/users/${action.userId}.json`)
       .map(data => {
         return setAuthorData(data.response.displayName, data.response.avatarUrl)
       })
       .catch(err => Observable.of(getAuthorDataFail(err.response)))
       .startWith(getAuthorDataStart())
   )

export const getGamesByAuthorEpic = action$ =>
 action$.ofType(actionTypes.GET_GAMES_BY_AUTHOR)
   .flatMap(action => 
     Observable
       .ajax.get(`https://thisorthat-648f3.firebaseio.com/users/${action.userId}.json`)
       .map(data => {
         return setAuthorData(data.response.displayName, data.response.avatarUrl)
       })
       .catch(err => Observable.of(getAuthorDataFail(err.response)))
       .startWith(getAuthorDataStart())
   )