import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SigninForm from './signinForm';
import { signinRequest } from '../../actions/userActions';
import { signInValidator } from '../../utils/validations';

/**
 *
*/
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      disable: true,
      error: {
        username: '',
        password: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  isValid(target) {
    const { errors, isValid } = signInValidator(this.state);
    if (!isValid) {
      this.setState({
        disable: true,
        error: {
          [target]: errors[target]
        }
      });
    } else {
      this.setState({
        disable: false,
        error: {
          [target]: ''
        }
      });
    }
    return isValid;
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.isValid(event.target.name);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      username: '',
      password: '',
      disable: true
    });
    this.props.signinRequest(this.state);
  }

  render() {
    return (
      <div className="signin">
        <div className="">
          <div className="row">
            <div className="
            home-banner
            col s12 m4 l4 offset-l4
            center-align
            white-text"
            >
              <h3>IdeaBox</h3>
              <p>share your innovative ideas here</p>
              <div className="col s12 l8 offset-l2">
                <SigninForm
                  username={this.state.username}
                  password={this.state.password}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  disable={this.state.disable}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  signinRequest: PropTypes.func.isRequired,
};

export default connect(null, { signinRequest })(Signin);
