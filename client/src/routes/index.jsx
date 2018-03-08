import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Home from '../components/Home';
import SignUp from '../components/Signup/SignUp';
import Signin from '../components/Signin';
import Dashboard from '../components/Dashboard';
import UserIdeas from '../components/UserIdeas';
import CreateIdea from '../components/CreateIdea';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={Signin} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/myideas" component={UserIdeas} />
    <Route path="/create-idea" component={CreateIdea} />
  </Route>
);
