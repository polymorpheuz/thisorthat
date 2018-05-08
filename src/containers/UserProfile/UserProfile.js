import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import helperClasses from '../../base/helpers.css';

import { getUserData, updateUserData } from '../../store/actions/auth';
import { genericInputHandler } from '../../shared/utility';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const propTypes = {
  avatarUrl: PropTypes.string.isRequired,  
  displayName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

class UserProfile extends Component {
  state = {
    form: {
      displayName: {
        elementType: 'input',
        label: 'Display Name',
        elementConfig: {
          type: 'text'
        },
        validation: {
          required: true,
          minLength: 4
        },
        value: '',
        valid: true,
        validationMsg: '',
        touched: true
      },
      avatarUrl: {
        elementType: 'input',
        label: 'Avatar Image Link',
        elementConfig: {
          type: 'text'
        },
        validation: {
          required: true,
          isImgUrl: true
        },
        value: '',
        valid: true,
        validationMsg: '',
        touched: true
      }
    },
    formIsValid: false
  }

  componentDidMount() {
    this.inputValuesInit();
  }

  inputValuesInit = () => {
    const updatedForm = { ...this.state.form };
    updatedForm.displayName.value = this.props.displayName;
    updatedForm.avatarUrl.value = this.props.avatarUrl;
    this.setState({form: updatedForm})
  }

  inputChangedHandler = (event, inputId) => {
    const inputCheckResult = genericInputHandler(event, inputId, this.state.form, this.state.formIsValid);
    this.setState({form: inputCheckResult.updatedForm, formIsValid: inputCheckResult.formIsValid}); 
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onSubmit( this.props.userId, { displayName: this.state.form.displayName.value, avatarUrl: this.state.form.avatarUrl.value });
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
      <form className={helperClasses.formContainer} onSubmit={this.submitHandler}>
          {formArr.map(formElement => {
            return (
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
            )
          })}
          <Button btnType="primary" disabled={!this.state.formIsValid}>Save changes</Button>
        </form>
    ); 
    return (
      <div className={helperClasses.formWrapper}>
        {form}
      </div>
      
    );    
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    displayName: state.auth.displayName,
    avatarUrl: state.auth.avatarUrl
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onSubmit: (userId, userData) => dispatch(updateUserData(userId, userData)),
      onLoad: () => dispatch(getUserData(this.props.userId))
  }
}

UserProfile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);