import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <div>
    <div className="container-fluid home">
      <div className="heading-wrapper">
        <div className="overlay">
          <div className="row titled-text white-text center-align">
            <div className="col s12 m4 offset-m4">
              <h4>IdeaBox</h4>
              <p>Make your inspired thought more than just that.
                Post and get feedback on your ideas</p>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m4 offset-m4">
              <Link
                to="/signup"
                className="waves-effect
                get-started-btn
                home-buttons
                waves-light
                btn
                green">
                Get Started
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m4 offset-m4">
              <Link
                to="/signin"
                className="waves-effect
                login-btn
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
  </div>
);

export default Home;
