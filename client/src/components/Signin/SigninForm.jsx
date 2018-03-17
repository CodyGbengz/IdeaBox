import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Loader from '../Loader';

const SignupForm = ({
  handleChange,
  handleSubmit,
  username,
  password,
  disable,
  error,
  loader
}) => (
  <form onSubmit={handleSubmit}>
    <div className="row ">
      <div className="input-field input-field-auth col s12 m12">
        <input
          id="username"
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          autoComplete="off"
        />
        <label htmlFor="username">Username</label>
        { error.username ?
          <span className="red-text">{error.username}</span>
        : <span />
        }
      </div>

      <div className="input-field input-field-auth col s12 m12">
        <input
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          autoComplete="off"
        />
        <label htmlFor="password">Password</label>
        { error.password ?
          <span className="red-text">{error.password}</span>
    : <span />
    }
      </div>

      {
        loader
        ?
          <div className="center"><Loader /></div>
          :
        null
      }

      <div className="input-field col s12 m12 l12">
        <button
          className="
          btn
          home-buttons
          waves-effect
          white-text
          green"
          type="submit"
          disabled={disable}
        >Login
        </button>
        <h6><span>Or</span></h6>
        <Link
          to="/signup"
          className="waves-effect
              home-buttons
              waves-light
              btn
              green
              white-text"
        >Signup
        </Link>
      </div>
    </div>
  </form>
);

SignupForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  loader: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SignupForm;
