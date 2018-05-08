import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Auxx/Auxx';
import GameTile from '../GameTile/GameTile';
import Rating from '../GameTile/Rating/Rating';

const propTypes = {
  allGames: PropTypes.object.isRequired,  
  decreaseRating: PropTypes.func.isRequired,
  increaseRating: PropTypes.func.isRequired,
  userId: PropTypes.string,
  users: PropTypes.object.isRequired
}

export const gameTileList = props => {
  let renderedGames = {};
  renderedGames = props.allGames.allIds.map((game, index) => {
    const authorId = props.allGames.byId[game].authorId;
    return (
      <GameTile 
        key={props.allGames.byId[game].gameId} imgCover={props.allGames.byId[game].imgCover}
        gameId={props.allGames.byId[game].gameId} authorId={authorId}
        userData={props.users.byId[authorId]} date={props.allGames.byId[game].date}
        title={props.allGames.byId[game].questionTitle} rating={props.allGames.byId[game].rating}
      >
        <Rating 
          rating={props.allGames.byId[game].rating}
          ratingControlDisabled={props.allGames.byId[game].ratingControlDisabled} 
          decreaseClick={() => props.decreaseRating(props.allGames.byId[game].gameId, props.userId, index)} 
          increaseClick={() => props.increaseRating(props.allGames.byId[game].gameId, props.userId, index)}
        />
      </GameTile>
    )
  });
  return (
    <Aux>
      {renderedGames}
    </Aux>
  );
};

gameTileList.propTypes = propTypes;

export default gameTileList;