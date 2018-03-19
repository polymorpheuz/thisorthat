import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './Game.css';

import { getGame } from '../../store/actions/game';

import Aux from '../../hoc/Auxx/Auxx';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';

const propTypes = {
  chosenGame: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  loading: PropTypes.bool.isRequired
};

class Game extends Component {
  state = { 
    isFinished: false,
    isRunning: false,
    isAnswered: false,
    actualQuestion: 0,
    rightAnswers: 0,
    rightAnswerArray: [],
    resultOptions: [
      {
        title: "Stupido!",
        description: "Your parents are ashamed of you! Your parents are ashamed of you! Your parents are ashamed of you!"
      },
      {
        title: "Average Johny",
        description: "Just normal. Not the reason to be dissapointed, not the reason to be proud of. Not the reason to be dissapointed, not the reason to be proud of. Not the reason to be proud of."
      },
      {
        title: "Here's the expert!",
        description: "This is how it sound when hood go bang! This is how it sound when hood go bang! This is how it sound when hood go bang!"
      }
    ],
    resultText: {}
  }

  componentWillMount() {
    this.props.onGameInit(this.props.match.params.id);
  }

  startGame = () => {
    this.setState({isRunning: true});
  }

  finishGame = () => {
    this.setState({ isRunning: false, isFinished: true });
    this.calculateResults();
  }

  calculateResults = () => {
    let winPercent =  (this.state.rightAnswerArray.length / (this.props.chosenGame.questionAmmount / 100)).toFixed(2);
    if (winPercent <= 33.33) {
      this.setState({ resultText: this.state.resultOptions[0]})
    } else if (winPercent > 33.33 && winPercent <= 66.67) {
      this.setState({ resultText: this.state.resultOptions[1]})
    } else {
      this.setState({ resultText: this.state.resultOptions[2]})
    }
  }

  checkAnswer = (questionAnswer, userAnswer) => {
    if (questionAnswer === userAnswer) {
      this.state.rightAnswerArray.push("that's right!");
      this.setState({ isAnswered: "right"});
    } else { this.setState({ isAnswered: "wrong"}); }
  }

  nextQuestion = (questionAnswer, userAnswer) => {
    // go to the next question and if there is no next question - end the game
    this.state.actualQuestion === this.props.chosenGame.questionAmmount - 1 ? 
    this.finishGame() : this.setState({ actualQuestion: this.state.actualQuestion + 1});
    // hide the answer
    this.setState({ isAnswered: false });
  }

  render() {
    let renderedBlock = {};
    let renderedGames = {};

    if (this.state.isRunning) {
      renderedGames = this.props.chosenGame.questions.map((question, index) => (
        <div className={this.state.actualQuestion === index ? classes.gameContainer : classes.Hidden} key={`question ${index + 1}`}>
          <span className={classes.progressCounter}>{index + 1} / {this.props.chosenGame.questionAmmount}</span>
          <h3 className={classes.gameQuestionTitle}>{this.props.chosenGame.questionTitle}</h3>
          <div className={classes.gameImageContainer}>
            { this.props.chosenGame.gameType === 'Two images' 
              ? <Aux>
                  { this.state.isAnswered 
                    ? <img className={classes.gameImage} src={question.answerImgUrl} alt={`Answer Image ${index + 1}`} />
                    : <img className={classes.gameImage} src={question.questionImgUrl} alt={`Question Image ${index + 1}`} />
                  }                  
                </Aux>
              : <img className={classes.gameImage} src={question.answerImgUrl} alt={`Question Image ${index + 1}`} />
            }
          </div>
          {this.state.isAnswered === "right" && <span className={`${classes.answerTitle} ${classes.right}`}>YEP!</span>} 
          {this.state.isAnswered === "wrong" && <span className={`${classes.answerTitle} ${classes.wrong}`}>NOPE!</span> }
          <div className={classes.ButtonWrapper}>
            { this.state.isAnswered
              ? <Button btnType="smallRoundNext" clicked={this.nextQuestion}>
                  <i className="material-icons icon">navigate_next</i>
                </Button> 
              : <Aux>
                  <Button btnType="squareBlue" clicked={() => this.checkAnswer(question.answer, this.props.chosenGame.answers.firstAnswer)}>
                    {this.props.chosenGame.answers.firstAnswer}
                  </Button>
                  <Button btnType="squareBlue" clicked={() => this.checkAnswer(question.answer, this.props.chosenGame.answers.secondAnswer)}>
                  {this.props.chosenGame.answers.secondAnswer}
                  </Button>
                </Aux>
            }
          </div>
        </div>
      ));
      renderedBlock = (
        <Aux>
          {renderedGames}
        </Aux>   
      );

    } else if (this.state.isFinished) {
      renderedBlock = (
        <div className={classes.resultsContainer}>
          <h1 className={classes.resultsTitle}>{this.state.rightAnswerArray.length}/{this.props.chosenGame.questionAmmount}</h1>
          <div className={classes.pipe}></div>
          <div className={classes.resultsTextContainer}>
            <h1 className={classes.resultsTitle}>{this.state.resultText.title}</h1>
            <p className={classes.resultsDescription}>{this.state.resultText.description}</p>          
          </div>
        </div> 
      );   
    } else {
      renderedBlock = (
      <div className={classes.introContainer}>
        <span className={classes.questionAmmount}>{this.props.chosenGame.questionAmmount} questions</span>
        <h1 className={classes.introTitle}>{this.props.chosenGame.questionTitle}</h1>
        <p className={classes.introDescription}>
          {this.props.chosenGame.description}
        </p>
        <Button btnType="squareRed" clicked={this.startGame}>START</Button>
      </div>
      );
    }

    if (this.props.loading) {
      renderedBlock = null
    }

    return (
      <Aux>
        { this.props.loading && <div className={classes.loaderContainer}><Loader /></div> }
        <div className={classes.gameWrapper}>
          {renderedBlock}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    chosenGame: state.game.chosenGame,
    loading: state.game.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGameInit: (gameId) => dispatch(getGame(gameId))
  }
}

Game.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Game);