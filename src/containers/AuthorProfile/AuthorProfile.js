import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './AuthorProfile.css';

import { getAuthorData } from '../../store/actions/authorProfile';
import { ratingIdRemove, ratingIdPush } from '../../store/actions/allGamesList';
import { getGame } from '../../store/actions/game';

import Aux from '../../hoc/Auxx/Auxx';
import GameTileList from '../../components/GameTileList/GameTileList';

const propTypes = {
  allGames: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.object.isRequired
};

class AuthorProfile extends Component {
  render() {
    const userData = this.props.users[this.props.match.params.id];
    const filteredGames = this.props.allGames.filter((game) => {
      return game.authorId === this.props.match.params.id
    });
    let overallRating = 0;
    for (let game of filteredGames) {
      overallRating += game.rating.length;
    }
    return (
      <Aux>
        <div className={classes.authorInfoWrapper}>
          <img className={classes.avatar} src={userData.avatarUrl} alt="Author avatar" />
          <div className={classes.textWrapper}>
            <span className={classes.displayName}>{userData.displayName}</span>
            <span className={classes.bio}>{userData.bio}</span>
            <span className={classes.bio}>{filteredGames.length} games</span>
            <span className={classes.bio}>{overallRating} overall rating</span>
          </div>
        </div>
        <div className={classes.itemWrapper}>
            { this.props.loading
              ? <div className={classes.loaderContainer}><Loader /></div> 
              : <GameTileList 
                  allGames={filteredGames} 
                  users={this.props.users}
                  userId={this.props.userId}
                  gameInit={this.props.onGameInit}
                  filterId={this.props.match.params.id}
                  increaseRating={this.props.onIncreaseRating}
                  decreaseRating={this.props.onDecreaseRating}
                />
            }
        </div>
      </Aux>
    );    
  }
}

const mapStateToProps = state => {
  return {
    allGames: state.allGamesList.allGames,
    loading: state.allGamesList.loading,
    users: state.allGamesList.users,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetAuthorData: () => dispatch(getAuthorData()),
    onGameInit: (gameId) => dispatch(getGame(gameId)),
    onDecreaseRating: (gameId, userId, index) => dispatch(ratingIdRemove(gameId, userId, index)),
    onIncreaseRating: (gameId, userId, index) => dispatch(ratingIdPush(gameId, userId, index))
  }
}

AuthorProfile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AuthorProfile);