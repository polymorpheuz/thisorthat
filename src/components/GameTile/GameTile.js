import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './GameTile.css';

const propTypes = {
  authorId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  imgCover: PropTypes.string.isRequired,
  rating: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  userData: PropTypes.object.isRequired,
}

export const gameTile = props => {
  // date formatting
  const currentDate = new Date(props.date);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}`;

  return (
    <div className={classes.item} key={props.gameId}>
      <Link to={`/game/${props.gameId}`} className={classes.itemLink}>
        <div className={classes.itemCoverContainer}>
          <img className={classes.itemCover} src={props.imgCover} alt={`"${props.title}" game image cover`} />
        </div>
        <h1 className={classes.itemTitle}>{props.title}</h1>
      </Link>
      <div className={classes.itemInfo}>
        <div className={classes.itemMeta}>
          <img className={classes.itemAvatar} src={props.userData.avatarUrl} alt={`${props.userData.displayName} avatar`} />
          <div className={classes.itemCreatorAndDate}>
            <Link to={`/user/${props.authorId}`} className={classes.itemLink}>
              <p className={classes.profileLink}>{props.userData.displayName}</p>
            </Link>
            <p className={classes.dateLink}>{date}</p>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
};

gameTile.propTypes = propTypes;

export default gameTile;