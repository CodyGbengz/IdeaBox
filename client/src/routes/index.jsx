import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Home from '../components/Home';
import SignUp from '../components/Signup/SignUp';
import Signin from '../components/Signin';
import Dashboard from '../components/Dashboard';
import UserIdeas from '../components/UserIdeas';
<<<<<<< HEAD
import UserProfile from '../components/UserProfile';
import FilteredIdeas from '../components/FilteredIdeas';
import SearchResults from '../components/SearchResults';
import CreateIdea from '../components/CreateIdea';
import EditIdea from '../components/EditIdea';
import requireAuth from '../utils/requireAuth';
=======
import DeleteIdea from '../components/DeleteIdea';
>>>>>>> feat(delete-idea): implement delete single idea feature

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={Signin} />
<<<<<<< HEAD
    <Route path="/dashboard" component={requireAuth(Dashboard)} />
    <Route path="/myideas" component={requireAuth(UserIdeas)} />
    <Route path="/profile" component={requireAuth(UserProfile)} />
    <Route path="/filtered" component={requireAuth(FilteredIdeas)} />
    <Route path="/searchresults" component={requireAuth(SearchResults)} />
    <Route path="/create-idea" component={requireAuth(CreateIdea)} />
    <Route path="/idea/:id" component={requireAuth(EditIdea)} />
=======
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/myideas" component={UserIdeas} />
    <Route path="/idea/:id/delete" component={DeleteIdea} />
>>>>>>> feat(delete-idea): implement delete single idea feature
  </Route>
);
