import * as actionTypes from '../actions/actionTypes';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';
import { getGamesStart, getGamesFail, setGames, decreaseRating, increaseRating, setUsers, getUsersFail } from '../actions/allGamesList';

export const getGames = (action$, store) =>
  action$.ofType(actionTypes.GET_GAMES)
    .flatMap(action => 
      Observable
        .ajax.get('https://thisorthat-648f3.firebaseio.com/games.json')
        .delay(300)
        .map(data => {
            const userId = store.getState().auth.userId;
            const normalizedState = { byId: {}, allIds: []};
            for (let key in data.response) {
              // Disable rating for unauthorized users
              let ratingControlDisabled = 'both';
              // If rating entry in game exists
              if(data.response[key].rating) {
                // If user is authorized, check for presence of his ID in rating array
                if(userId !== null) {
                  ratingControlDisabled = data.response[key].rating[userId] ? 'increase' : 'decrease';
                }
              } else {
                // If rating entry doesn't exist, enable rating increase
                ratingControlDisabled = 'decrease'
              }
              let rating = []
              if(data.response[key].rating) {
                rating = Object.keys(data.response[key].rating);
              }
              // Normalize data
              normalizedState.byId[key] = {
                gameId: key,
                authorId: data.response[key].authorId,
                questionTitle: data.response[key].questionTitle,
                date: data.response[key].date,
                imgCover: data.response[key].imgCover,
                rating,
                ratingControlDisabled
              }
              normalizedState.allIds.push(key);
            }
            return setGames(normalizedState);
        })
        .catch(err => Observable.of(console.log(err)))
        .startWith(getGamesStart())
    )

export const getUsersEpic = (action$, store) =>
  action$.ofType(actionTypes.GET_USERS)
    .flatMap(action => 
      Observable
        .ajax.get('https://thisorthat-648f3.firebaseio.com/users.json')
        .map(data => setUsers(data.response))
        .catch(err => Observable.of(getUsersFail(err.response)))
    )

export const ratingIdRemove = action$ =>
  action$.ofType(actionTypes.RATING_ID_REMOVE)
    .flatMap(action => 
      Observable
        .ajax.delete(`https://thisorthat-648f3.firebaseio.com/games/${action.gameId}/rating/${action.userId}.json`)
        .map(data => decreaseRating(action.gameId, action.userId, action.index))
        .catch(err => console.log(err))
    )

export const ratingIdPush = action$ =>
  action$.ofType(actionTypes.RATING_ID_PUSH)
    .flatMap(action => 
      Observable
        .ajax.patch(`https://thisorthat-648f3.firebaseio.com/games/${action.gameId}/rating/.json`, JSON.stringify({ [action.userId]: action.userId }))
        .map(data => increaseRating(action.gameId, action.userId, action.index))
        .catch(err => console.log(err))
    )