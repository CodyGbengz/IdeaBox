

const setAuthToken = () => {
  // return authorization header with jwt token
  const token = localStorage.getItem('jwtToken');

  if (token) {
    return { 'x-access-token': `${token}` };
  }
  return {};
};

export default setAuthToken;

