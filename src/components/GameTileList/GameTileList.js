import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Auxx/Auxx';
import GameTile from '../GameTile/GameTile';
import Rating from '../GameTile/Rating/Rating';

const propTypes = {
  allGames: PropTypes.array.isRequired,  
  decreaseRating: PropTypes.func.isRequired,
  increaseRating: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired
}

export const gameTileList = props => {
  let renderedGames = {};
  renderedGames = props.allGames.map((game, index) => (
    <GameTile 
      key={game.gameId} imgCover={game.imgCover} gameId={game.gameId} authorId={game.authorId}
      userData={props.users[game.authorId]} date={game.date} title={game.questionTitle} rating={game.rating}
    >
      <Rating 
        rating={game.rating}
        ratingControlDisabled={game.ratingControlDisabled} 
        decreaseClick={() => props.decreaseRating(game.gameId, props.userId, index)} 
        increaseClick={() => props.increaseRating(game.gameId, props.userId, index)}
      />
    </GameTile>
  ));
  return (
    <Aux>
      {renderedGames}
    </Aux>
  );
};

gameTileList.propTypes = propTypes;

export default gameTileList;