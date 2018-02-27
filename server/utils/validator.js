import Validator from 'validatorjs';

const signupRules = {
  username: 'required|string|min:5',
  email: 'required|email',
  password: 'required|min:6',
};

const loginRules = {
  username: 'required|string',
  password: 'required|string|min:5'
};

const editProfileRules = {
  username: 'required|string',
  email: 'required|string'
};

const createIdeaRules = {
  title: 'required|string',
  description: 'required|string',
  categories: 'required|string',
  dueBy: 'required|date'
};

const postCommentRules = {
  content: 'required|string'
};

const validate = (request, response, next, rules) => {
  const validator = new Validator(request.body, rules);
  if (validator.passes()) {
    return next();
  }
  const errors = Object.values(validator.errors.errors).map(val => val[0]);
  return response.status(400).json({
    status: 'failed',
    message: errors
  });
};
export const commentValidator = (
  request,
  response,
  next
) => validate(request, response, next, postCommentRules);
export const editValidator = (
  request,
  response,
  next
) => validate(request, response, next, editProfileRules);

export const signupValidator = (
  request,
  response,
  next
) => validate(request, response, next, signupRules);

export const loginValidator = (
  request,
  response,
  next
) => validate(request, response, next, loginRules);

export const createIdeaValidator = (
  request,
  response,
  next
) => validate(request, response, next, createIdeaRules);

export default validate;
