import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './AuthorProfile.css';

import { ratingIdRemove, ratingIdPush } from '../../store/actions/allGamesList';
import { getFilteredGames } from '../../store/selectors';

import Aux from '../../hoc/Auxx/Auxx';
import GameTileList from '../../components/GameTileList/GameTileList';

const propTypes = {
  allGames: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.object.isRequired
};

class AuthorProfile extends Component {
  render() {  
    const userData = this.props.users.byId[this.props.match.params.id];
    return (
      <Aux>
        <div className={classes.authorInfoWrapper}>
          <img className={classes.avatar} src={userData.avatarUrl} alt="Author avatar" />
          <div className={classes.textWrapper}>
            <span className={classes.displayName}>{userData.displayName}</span>
            <span className={classes.bio}>{userData.bio}</span>
            <span className={classes.bio}>
              <span className={classes.infoCounter}>{this.props.filteredGames.games.allIds.length} </span>
              games
            </span>
            <span className={classes.bio}>
            <span className={classes.infoCounter}>{this.props.filteredGames.overallRating} </span>
            overall rating
            </span>
          </div>
        </div>
        <div className={classes.itemWrapper}>
            { this.props.loading
              ? <div className={classes.loaderContainer}><Loader /></div> 
              : <GameTileList 
                  allGames={this.props.filteredGames.games} 
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

const mapStateToProps = (state, props) => {
  return {
    allGames: state.allGamesList.allGames,
    filteredGames: getFilteredGames(state, props),
    loading: state.allGamesList.loading,
    users: state.allGamesList.users,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDecreaseRating: (gameId, userId, index) => dispatch(ratingIdRemove(gameId, userId, index)),
    onIncreaseRating: (gameId, userId, index) => dispatch(ratingIdPush(gameId, userId, index))
  }
}

AuthorProfile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AuthorProfile);