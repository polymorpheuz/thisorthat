import { createSelector } from 'reselect';

export const getFilteredGames = (state, props) => {
  const filteredGamesAllIds = { byId: state.allGamesList.allGames.byId, allIds: [] };
  let overallRating = 0;
  for (let game in state.allGamesList.allGames.byId) {
    if (state.allGamesList.allGames.byId[game].authorId === props.match.params.id) {
      filteredGamesAllIds.allIds.push(game);
      overallRating += state.allGamesList.allGames.byId[game].rating.length;
    }
  }
  return { games: filteredGamesAllIds, overallRating: overallRating };
};

const getFilterProps = state => state.allGamesList.filter;

const getGames = state => state.allGamesList.allGames;

export const getSortedGames = createSelector(
  [getFilterProps, getGames],
  (sortingFilter, games) => {
    let gamesArrayCopy = null;
    const byIdSortedObj = {};
    if (games.byId !== undefined) {
      gamesArrayCopy = Object.values(games.byId);
      console.log('very-veridfied', gamesArrayCopy)   
      
      if(sortingFilter[0] === 'date' && sortingFilter[1] === 'asc') {
        gamesArrayCopy.sort((a, b) => {
          if(new Date(a.date) > new Date(b.date)) {
            return 1;
          }
          if(new Date(a.date) < new Date(b.date)) {
            return -1;
          }
          return 0;
        })
      }
  
      if(sortingFilter[0] === 'date' && sortingFilter[1] === 'desc') {
        gamesArrayCopy.sort((a, b) => {
          if(new Date(a.date) < new Date(b.date)) {
            return 1;
          }
          if(new Date(a.date) > new Date(b.date)) {
            return -1;
          }
          return 0;
        })
      }
  
      if(sortingFilter[0] === 'rating' && sortingFilter[1] === 'asc') {
        gamesArrayCopy.sort((a, b) => {
          if(a.rating.length < b.rating.length) {
            return 1;
          }
          if(a.rating.length > b.rating.length) {
            return -1;
          }
          return 0;
        })
      }
  
      if(sortingFilter[0] === 'rating' && sortingFilter[1] === 'desc') {
        gamesArrayCopy.sort((a, b) => {
          if(a.rating.length > b.rating.length) {
            return 1;
          }
          if(a.rating.length < b.rating.length) {
            return -1;
          }
          return 0;
        })
      }

      // Back in normalized object
      gamesArrayCopy.forEach(game => {
        byIdSortedObj[game.gameId] = game;
      });
    }
    return { byId: byIdSortedObj, allIds: Object.keys(byIdSortedObj) };
  }
);