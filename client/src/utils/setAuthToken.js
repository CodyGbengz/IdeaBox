import axios from 'axios';

export default function setAuthToken(token) { // eslint-disable-line
  if (token) {
    axios.defaults.headers.common['x-access-token'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
}
