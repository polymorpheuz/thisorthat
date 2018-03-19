import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './AddGame.css';
import helperClasses from '../../base/helpers.css';

import { addGame } from '../../store/actions/game';
import { genericInputHandler } from '../../shared/utility';

import Aux from '../../hoc/Auxx/Auxx';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import Radio from '../../components/UI/Radio/Radio';
import Button from '../../components/UI/Button/Button';

const propTypes = {
  displayName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

class AddGame extends Component {
  state = {
    step: 1,
    gameInfo: {},
    form: {
      questionTitle: {
        elementType: 'input',
        label: 'Question',
        elementConfig: {
          type: 'text'
        },
        validation: {
          required: true,
          maxLength: 52
        },
        value: '',
        valid: false,
        validationMsg: '',
        touched: false
      },
      description: {
        elementType: 'input',
        label: 'Description',
        elementConfig: {
          type: 'text'
        },
        validation: {
          required: true
        },
        value: '',
        valid: false,
        validationMsg: '',
        touched: false
      },
      imgCover: {
        elementType: 'input',
        label: 'Image Cover',
        elementConfig: {
          type: 'text'
        },
        validation: {
          required: true,
          isImgUrl: true
        },
        value: '',
        valid: false,
        validationMsg: '',
        touched: false
      },
      questionQuantity: {
        elementType: 'select',
        label: 'How many questions?',
        elementConfig: {
          options: [
            {value: 3, displayValue: 'Three'},
            {value: 4, displayValue: 'Four'},
            {value: 5, displayValue: 'Five'},
            {value: 6, displayValue: 'Six'},
            {value: 7, displayValue: 'Seven'},
            {value: 8, displayValue: 'Eight'},
            {value: 9, displayValue: 'Nine'},
            {value: 10, displayValue: 'Ten'},
            {value: 11, displayValue: 'Eleven'},
            {value: 12, displayValue: 'Twelve'}
          ]
        },
        validation: {
          required: true
        },
        value: 3,
        valid: true
      },
      gameType: {
        elementType: 'radio',
        elementConfig: {
          options: [
            {value: '1 image for q&a'},
            {value: 'Two images'}
          ]
        },
        label: 'Game Type',
        validation: {
          required: true
        },
        value: '1 image for q&a',
        valid: true
      },
      firstAnswer: {
        elementType: 'input',
        label: 'What first answer is?',
        elementConfig: {
          type: 'text'
        },
        validation: {
          required: true,
          maxLength: 16
        },
        value: '',
        valid: false,
        validationMsg: '',
        touched: false
      },
      secondAnswer: {
        elementType: 'input',
        label: 'What second answer is?',
        elementConfig: {
          type: 'text'
        },
        validation: {
          required: true,
          maxLength: 16
        },
        value: '',
        valid: false,
        validationMsg: '',
        touched: false
      }
    },
    formIsValid: false,  
    secondForm: [],
  }

  inputChangedHandler = (event, inputId) => {
    const inputCheckResult = genericInputHandler(event, inputId, this.state.form, this.state.formIsValid);
    this.setState({form: inputCheckResult.updatedForm, formIsValid: inputCheckResult.formIsValid}); 
  }

  collectFormData = () => {
    if(this.state.step === 1) {
      const date = new Date().toISOString();
      const gameInfo = {
        authorId: this.props.userId,
        questionTitle: this.state.form.questionTitle.value,
        date: date,
        description: this.state.form.description.value,
        imgCover: this.state.form.imgCover.value,
        questionAmmount: this.state.form.questionQuantity.value,
        rating: {
          [this.props.userId]: this.props.userId
        },
        answers: {
          firstAnswer: this.state.form.firstAnswer.value,
          secondAnswer: this.state.form.secondAnswer.value,
        },
        gameType: this.state.form.gameType.value
      };
      return gameInfo;
    } else {
      const gameInfo = {
        ...this.state.gameInfo,
        questions: {}
      };
      const form = null;
      for (let key in this.state.form) {
        const keyArr = key.split('-');
        gameInfo.questions[keyArr[1]] = {
          ...gameInfo.questions[keyArr[1]],
          [keyArr[0]]: this.state.form[key].value
        };
      }
      return gameInfo;
    }
  }

  secondStepFormInit = (firstAnswer, secondAnswer, gameType) => {
    let secondForm = {};
    for (let i = 0; i < this.state.form.questionQuantity.value; i++) {
      secondForm[`answer-${i}`] = {
          elementType: 'radio',
          elementConfig: {
            options: [
              {value: firstAnswer},
              {value: secondAnswer}
            ]
          },
          label: 'Answer',
          validation: {
            required: true
          },
          value: firstAnswer,
          valid: true
      };
      if (gameType === 'Two images') {
        secondForm[`questionImgUrl-${i}`] = {
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          label: 'Question Image URL',
          validation: {
            required: true,
            isImgUrl: true
          },
          value: '',
          valid: false,
          validationMsg: '',
          touched: false
        }
      };
      secondForm[`answerImgUrl-${i}`] = {
        elementType: 'input',
        elementConfig: {
          type: 'text'
        },
        label: 'Answer Image URL',
        validation: {
          required: true,
          isImgUrl: true
        },
        value: '',
        valid: false,
        validationMsg: '',
        touched: false
      }
    }
    return secondForm;
  }

  nextStep = event => {
    event.preventDefault();
    if(this.state.step === 1) {
      const firstFormData = this.collectFormData();
      const secondStepForm = this.secondStepFormInit(firstFormData.answers.firstAnswer, firstFormData.answers.secondAnswer, firstFormData.gameType);
      this.setState({ step: 2, formIsValid: false, form: secondStepForm, gameInfo: firstFormData });
    } else {
      const allFormsData = this.collectFormData();
      this.props.onPost(allFormsData);
      this.props.history.push('/');
    }
  }

  render() {
    let formArr = [];
    for (let key in this.state.form) {
      formArr.push({
        id: key,
        config: this.state.form[key]
      })
    }
    let form = (
      <form className={helperClasses.formContainer} onSubmit={this.nextStep}>
          {formArr.map(formElement => {
            if(formElement.config.elementType === 'input') {
              return (
                <Aux key={`${formElement.id} wrapper`}>
                  <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    label={formElement.config.label}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    validationMsg={formElement.config.validationMsg}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                  /> 
                  { 
                    ((formElement.config.label === 'Answer Image URL' || formElement.config.label === 'Question Image URL')
                    && <img className={classes.questionImagePreview} src={formElement.config.value}/>) 
                  }   
                  {
                    (formElement.config.label === 'Image Cover' 
                    && <img className={classes.coverPreview} src={formElement.config.value}/>) 
                  }                
                </Aux>    
              )
            }
            if(formElement.config.elementType === 'select') {
              return (
                <Select 
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  label={formElement.config.label}
                  value={formElement.config.value}
                  shouldValidate={formElement.config.validation}
                  type="formSelect"
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}
                /> 
              )
            }  
            if(formElement.config.elementType === 'radio') {
              return (
                <Radio 
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  label={formElement.config.label}
                  value={formElement.config.value}
                  shouldValidate={formElement.config.validation}
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}
                /> 
              )
            } 
          })}
          <Button btnType="squareBlue" disabled={!this.state.formIsValid}>
            { this.state.step === 1 ? 'Next' : 'Send' }
          </Button>
        </form>
    );
    if (!this.props.displayName) {
      form = <p className={classes.warning}>
      You should set your prefered display name on 
      <Link to="/profile" className={classes.link}>Profile Page</Link> 
      to have permission to add game.</p>
    }      
    return (
      <div className={helperClasses.formWrapper}>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    displayName: state.auth.displayName,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onPost: (gameInfo) => dispatch(addGame(gameInfo))
  }
}

AddGame.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AddGame);