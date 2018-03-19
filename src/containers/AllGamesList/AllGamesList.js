import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './allGamesList.css';

import { getGames, getUsers, sortBy, ratingIdRemove, ratingIdPush } from '../../store/actions/allGamesList';
import { getGame } from '../../store/actions/game';

import Aux from '../../hoc/Auxx/Auxx';
import Select from '../../components/UI/Select/Select';
import Radio from '../../components/UI/Radio/Radio';
import GameTileList from '../../components/GameTileList/GameTileList';
import Loader from '../../components/UI/Loader/Loader';

const propTypes = {
  allGames: PropTypes.array.isRequired,
  users: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  userId: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

class AllGamesList extends Component {
  state = {
    sorting: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: 'dateAsc', displayValue: 'By Date [asc]'},
          {value: 'dateDesc', displayValue: 'By Date [desc]'},
          {value: 'ratingAsc', displayValue: 'By Rating [asc]'},
          {value: 'ratingDesc', displayValue: 'By Rating [desc]'},
        ]
      },
      value: 'fastest',
      valid: true
    },
    radio: {
      elementType: 'radio',
      label: 'Answer',
      elementConfig: {
        name: 'test',
        options: [
          { value: 'Pognali' },
          { value: 'Pacani' },
          { value: 'Spinner' }
        ]
      },
      value: 'Pognali',
      valid: true
    }
  }

  componentDidMount() {
    this.props.onGetUsers();
    this.props.onGetGames(this.props.userId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.allGames.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  onSelectChange = event => {
    const sortingForm = this.state.sorting;
    sortingForm.value = event.target.value;
    switch(sortingForm.value) {
      case 'dateAsc' : return this.props.onSortByDateAsc();
      case 'dateDesc' : return this.props.onSortByDateDesc();
      case 'ratingAsc' : return this.props.onSortByRatingAsc();
      case 'ratingDesc' : return this.props.onSortByRatingDesc();
      default : return this.props.onSortByDateAsc();
    }
    this.setState({ sorting: sortingForm })
  }

  onRadioChange = event => {
    const radioForm = this.state.radio;
    radioForm.value = event.target.value;
    this.setState({ radio: radioForm })
  }

  render() {
    return (
      <Aux>
        <div className={classes.sortingWrapper}>
          <Select type="sortingSelect" elementConfig={this.state.sorting.elementConfig} changed={this.onSelectChange}></Select>
        </div>
        <div className={classes.itemWrapper}>
          { this.props.loading 
            ? <div className={classes.loaderContainer}><Loader /></div> 
            : <GameTileList 
                allGames={this.props.allGames} 
                users={this.props.users}
                userId={this.props.userId}
                gameInit={this.props.onGameInit}
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
    users: state.allGamesList.users,
    userId: state.auth.userId,
    loading: state.allGamesList.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSortByDateAsc: () => dispatch(sortBy('date', 'asc')),
    onSortByDateDesc: () => dispatch(sortBy('date', 'desc')),
    onSortByRatingAsc: () => dispatch(sortBy('rating', 'asc')),
    onSortByRatingDesc: () => dispatch(sortBy('rating', 'desc')),
    onGetUsers: () => dispatch(getUsers()),
    onGetGames: (userId) => dispatch(getGames(userId)),
    onDecreaseRating: (gameId, userId, index) => dispatch(ratingIdRemove(gameId, userId, index)),
    onIncreaseRating: (gameId, userId, index) => dispatch(ratingIdPush(gameId, userId, index))
  }
}

AllGamesList.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AllGamesList);