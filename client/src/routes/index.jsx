import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Home from '../components/Home';
import SignUp from '../components/Signup';
import Signin from '../components/Signin';
import Dashboard from '../components/Dashboard';
import UserIdeas from '../components/UserIdeas';
import UserProfile from '../components/UserProfile';
import FilteredIdeas from '../components/FilteredIdeas';
import SearchResults from '../components/SearchResults';
import CreateIdea from '../components/CreateIdea';
import EditIdea from '../components/EditIdea';
import requireAuth from '../utils/requireAuth';
import DeleteIdea from '../components/DeleteIdea';
import ViewIdea from '../components/ViewIdea';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={Signin} />
    <Route path="/dashboard" component={requireAuth(Dashboard)} />
    <Route path="/myideas" component={requireAuth(UserIdeas)} />
    <Route path="/profile" component={requireAuth(UserProfile)} />
    <Route path="/filtered" component={requireAuth(FilteredIdeas)} />
    <Route path="/searchresults" component={requireAuth(SearchResults)} />
    <Route path="/create-idea" component={requireAuth(CreateIdea)} />
    <Route path="/idea/:id/edit" component={requireAuth(EditIdea)} />
    <Route path="/idea/:id/delete" component={requireAuth(DeleteIdea)} />
    <Route path="/idea/:id" component={requireAuth(ViewIdea)} />
  </Route>
);
