import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <div>
    <div className="home">
      <div className="row">
        <div
          className="
          home-banner
          col s12 m4 l4 offset-l4
          center-align
          white-text"
        >
          <h3>IdeaBox</h3>
          <p>share your innovative ideas here</p>
          <div className="col s12 m12 l12">
            <Link
              to="/signup"
              className="waves-effect
              home-buttons
              waves-light
              btn
              green"
            >
                  Get Started
            </Link>
          </div>
          <div className="col s12 m12 l12">
            <Link
              to="/signin"
              className="waves-effect
              waves-light
              home-buttons
              btn
              modal-trigger
              green"
            >
                  Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
