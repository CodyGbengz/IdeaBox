import Validator from 'validatorjs';

const signupRules = {
  email: 'required|email',
  password: 'required|min:6',
  username: 'required|min:5',
};

const signinRules = {
  username: 'required|string',
  password: 'required'
};

const validator = rules => (data) => {
  const validate = new Validator(data, rules);
  const errors = {};
  const isValid = false;

  if (validate.passes()) {
    return {
      isValid: true,
      errors
    };
  }
  return {
    isValid,
    errors: validate.errors.errors
  };
};

export const signUpValidator = validator(signupRules); // eslint-disable-line
export const signInValidator = validator(signinRules);
