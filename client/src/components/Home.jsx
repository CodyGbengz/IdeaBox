import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <div>
    <div className="container-fluid home">
      <div className="heading-wrapper">
        <div className="overlay">
          <div className="row titled-text white-text center-align">
            <div className="col m4 offset-m4">
              <h3>IdeaBox</h3>
              <p>
            Your center for innovative thinking, idea generation and management
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col m3 offset-m3">
              <Link
                to="/signup"
                className="waves-effect
                get-started-btn
              home-buttons
              waves-light
              btn
              btn-large
              green"
              >Get Started
              </Link>
            </div>
            <div className="col m3">
              <Link
                to="/signin"
                className="waves-effect
                login-btn
              waves-light
              home-buttons
              btn
              btn-large
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
  </div>
);

export default Home;
