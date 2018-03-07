import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { signupRequest } from '../../actions/userActions';
import { signUpValidator } from '../../utils/validations';

/**
 *
*/
class SignUp extends Component {
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
      username: '',
      password: '',
      email: '',
      disable: true
    });
    this.props.signupRequest(this.state);
  }

  render() {
    return (
      <div className="signup">
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
    );
  }
}

SignUp.propTypes = {
  signupRequest: PropTypes.func.isRequired,
};

export default connect(null, { signupRequest })(SignUp);
