import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UpdateProfileForm from './UpdateProfileForm';
import {
  fetchUserDetails,
  updateUserProfile
} from '../../actions/userActions';
import { updateUserProfileValidator } from '../../utils/validations';
import SideNav from '../common/SideNav';

/**
 *
*/
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      error: {
        username: '',
        email: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserDetails();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        username: nextProps.user.username,
        email: nextProps.user.email
      });
    }
  }

  isValid(target) {
    const { errors, isValid } = updateUserProfileValidator(this.state);
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
    this.props.updateUserProfile(this.state);
  }

  render() {
    return (
      <div >
        <div className="row">
          <div className="col m3 s12 l3">
            <SideNav className="black white-text" />
          </div>
          <div className="col m3 offset-m3">
            <div className="row update-profile">
              <h5>Edit Profile</h5>
              <UpdateProfileForm
                username={this.state.username}
                email={this.state.email}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                error={this.state.error}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  updateUserProfile: PropTypes.func.isRequired,
  fetchUserDetails: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(
  mapStateToProps,
  { fetchUserDetails, updateUserProfile }
)(UserProfile);
