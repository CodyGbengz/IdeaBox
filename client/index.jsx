import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';
import 'react-mde/lib/styles/css/react-mde-all.css';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers/rootReducer';
import routes from './src/routes';
import './src/scss/index.scss';
import { setCurrentUser } from './src/actions/userActions';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

export default store;
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

