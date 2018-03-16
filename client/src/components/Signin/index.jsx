import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import SigninForm from './signinForm';
import { signinRequest } from '../../actions/userActions';
import { signInValidator } from '../../utils/validations';

export class Signin extends Component {
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
      disable: true
    });
    this.props.signinRequest(this.state);
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
                      <h4><i className="fa fa-home" /> IdeaBox</h4>
                    </Link>
                  </div>
                </div>
                <div className="row titled-text white-text center-align">
                  <div className="col m4 offset-m4">
                    <h5>Signin</h5>
                    <p>
            Your center for innovative thinking, idea generation and management
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 m4 offset-m4">
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
        </div>
      </div>

    );
  }
}

Signin.propTypes = {
  signinRequest: PropTypes.func.isRequired,
};

export default connect(null, { signinRequest })(Signin);
