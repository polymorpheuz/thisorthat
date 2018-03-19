export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  let msg = '';
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;

    if (!isValid) {
      msg = 'This input is required';
      return {
        isValid,
        msg
      };
    }

  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    !isValid ? msg = 'Your text is longer than possible' : null;
  }

  if (rules.isImgUrl) {
    const regexp = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/;
    isValid = regexp.exec(value) && isValid;
    !isValid ? msg = 'Link must end on .jpg or .png' : null;
  }
  
  return {
    isValid,
    msg
  };
}

export const genericInputHandler = (event, inputId, form, formValidity) => {
  const updatedForm = {
    ...form
  }
  const updatedFormElement = {
    ...updatedForm[inputId]
  }
  updatedFormElement.value = event.target.value;
  let formIsValid = formValidity;
  if(event.target.tagName !== 'SELECT') {
    const validationAnswer = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = validationAnswer.isValid;
    updatedFormElement.validationMsg = validationAnswer.msg;
    updatedFormElement.touched = true;
    updatedForm[inputId] = updatedFormElement;
    
    formIsValid = true;
    for (let inputId in updatedForm) {
      formIsValid = updatedForm[inputId].valid && formIsValid;
    }
  }
  updatedForm[inputId] = updatedFormElement;
  return {
    updatedForm,
    formIsValid
  }
}