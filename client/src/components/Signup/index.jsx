import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { signupRequest } from '../../actions/userActions';
import { signUpValidator } from '../../utils/validations';

/**
 *
*/
export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      disable: true,
      error: {
        email: '',
        username: '',
        password: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  isValid(target) {
    const { errors, isValid } = signUpValidator(this.state);
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
      disable: true
    });
    this.props.signupRequest(this.state);
  }

  render() {
    return (
      <div>
        <div className="container-fluid home">
          <div className="heading-wrapper">
            <div className="overlay-authentication">
              <div className="container">
                <div className="row auth-header">
                  <div className="col m4">
                    <Link to="/">
                      <h5>
                        <i className="fa fa-home" />
                        IdeaBox
                      </h5>
                    </Link>
                  </div>
                </div>
                <div className="row titled-text white-text center-align">
                  <div className="col m4 offset-m4">
                    <h5>Signup</h5>
                    <p>
            Your center for innovative thinking, idea generation and management
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 m4 offset-m4">
                    <SignupForm
                      username={this.state.username}
                      password={this.state.password}
                      email={this.state.email}
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
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  signupRequest: PropTypes.func.isRequired,
};

export default connect(null, { signupRequest })(SignUp);
