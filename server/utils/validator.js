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
  username: 'string|min:5|required',
  email: 'email'
};

const createIdeaRules = {
  title: 'required|string',
  description: 'required|string',
  category: [
    {
      in:
      ['science',
        'others',
        'engineering',
        'economics',
        'arts',
        'tech',
        'agriculture']
    }],
  dueBy: 'required|date',
  status: [{ in: ['private', 'public'] }],
};

const editIdeaRules = {
  title: 'string',
  description: 'string',
  category: [
    {
      in:
      ['science',
        'others',
        'engineering',
        'economics',
        'arts',
        'tech',
        'agriculture']
    }],
  dueBy: 'date',
  status: [{ in: ['private', 'public'] }]
};

const postCommentRules = {
  content: 'required|string'
};

const ratingsRules = {
  stars: 'required|numeric|min:1|max:5'
};

const validate = (request, response, next, rules) => {
  if (request.params.id) {
    if (!request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return response.status(400).json({
        status: 'Fail',
        message: 'Invalid parameter'
      });
    }
  }
  const validator = new Validator(request.body, rules);
  if (validator.passes()) {
    return next();
  }
  const errors = Object.values(validator.errors.errors).map(val => val[0]);
  return response.status(400).json({
    status: 'Fail',
    message: errors
  });
};

export const editIdeaValidator = (
  request,
  response,
  next
) => validate(request, response, next, editIdeaRules);

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

export const ratingValidator = (
  request,
  response,
  next
) => validate(request, response, next, ratingsRules);
export default validate;
