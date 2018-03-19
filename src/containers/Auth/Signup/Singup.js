import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from '../Auth.css';
import helperClasses from '../../../base/helpers.css';

import { signup, clearAuthError } from '../../../store/actions/auth';
import { genericInputHandler } from '../../../shared/utility';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

const propTypes = {
  error: PropTypes.string
};

class Signup extends Component {
  state = {
    form: {
      email: {
        elementType: 'input',
        label: 'Email',
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
      password: {
        elementType: 'input',
        label: 'Password',
        elementConfig: {
          type: 'password'
        },
        validation: {
          required: true
        },
        value: '',
        valid: false,
        validationMsg: '',
        touched: false
      }
    },
    formIsValid: false
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.form.email.value, this.state.form.password.value);
  }

  inputChangedHandler = (event, inputId) => {
    const inputCheckResult = genericInputHandler(event, inputId, this.state.form, this.state.formIsValid);
    this.setState({form: inputCheckResult.updatedForm, formIsValid: inputCheckResult.formIsValid}); 
  }

  componentWillUnmount() {
    this.props.onClearError()
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
          <h1 className={classes.formTitle}>Sign up</h1>
          { this.props.error && <p className={classes.errorMessage}>{this.props.error}</p> }
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
          <Button btnType="squareBlue" disabled={!this.state.formIsValid}>Sign up</Button>
      </form>
    ); 
    return (
      <div className={helperClasses.formWrapper}>
        {/* {this.props.isAuthenticated && <Redirect to="/" />} */}
          {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (email, password) => dispatch(signup(email, password)),
    onClearError: () => dispatch(clearAuthError())
  }
}

Signup.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Signup);