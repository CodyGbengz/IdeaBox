import React from 'react';
import PropTypes from 'prop-types';

const UpdateProfileForm = ({
  handleChange,
  handleSubmit,
  username,
  email,
  error
}) => (
  <form onSubmit={handleSubmit}>
    <div className="row ">
      <div className="input-field col s12">
        <input
          id="username"
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
        />
        <label htmlFor="username">Username</label>
        { error.username ?
          <span className="red-text">{error.username}</span>
    : <span />
    }
      </div>
      <div className="input-field col s12">
        <input
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
        />
        <label htmlFor="email">Email Address</label>
        { error.email ?
          <span className="red-text">{error.email}</span>
    : <span />
    }
      </div>
      <div className="input-field col s12 l12">
        <button
          className="
          btn
          home-buttons
          waves-effect
          white-text
          green"
          type="submit"
        >Update
        </button>
      </div>
    </div>
  </form>
);

UpdateProfileForm.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.objectOf(PropTypes.any).isRequired
};

export default UpdateProfileForm;
