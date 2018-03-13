import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchIdeas } from '../../actions/searchActions';
import Alert from '../../utils/Alert';

/**
 * @className SideNav
 * @extends {Component}
 */
class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  handleSearch(event) {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (!searchTerm || searchTerm.length < 3) {
      Alert('Enter atleast 3 characters', 3000, 'red');
    }
    if (searchTerm.length > 2) {
      this.props.searchIdeas(searchTerm);
    }
  }
  render() {
    return (
      <div>
        <div>
          <ul id="slide-out" className="side-nav black white-text fixed">
            <li><h3 className="head">IdeaBox</h3></li>
            <li>
              <div className="nav-wrapper">
                <form onSubmit={this.handleSearch}>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    name="searchTerm"
                    value={this.state.searchTerm}
                    placeholder="Enter search keyword"
                    id="search"
                  />
                </form>
              </div>
            </li>
            <li className="no-padding white-text">
              <ul className="collapsible collapsible-accordion">
                <li>
                  <Link className="collapsible-header white-text">Username
                    <i className="material-icons right white-text">
                    arrow_drop_down
                    </i>
                  </Link>
                  <div className="collapsible-body">
                    <ul>
                      <li><Link href="#!">My Profile</Link></li>
                      <li><Link href="#!">Signout</Link></li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link
                    to="/myideas"
                    className="green-text"
                  >My Ideas
                    <i className="material-icons right green-text">folder</i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="white-text"
                  >Public Ideas
                    <i
                      className="material-icons right white-text"
                    >folder_shared
                    </i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-idea"
                    className="white-text"
                  >Share an Idea
                    <i className="material-icons right white-text">add_box</i>
                  </Link>
                </li>
                <div className="border" />
                <li>
                  <div className="filterIdeas">
                    <p>
                      <b>Filter
                      </b>
                    </p>
                    <ul>
                      <li>
                        <input
                          type="checkbox"
                          name="arts"
                          className="filled-in"
                          id="arts"
                          value="arts"

                        />
                        <label htmlFor="arts">Arts</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name="technology"
                          className="filled-in"
                          id="Technology"
                          value="technology"

                        />
                        <label htmlFor="Technology">Technology</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name="engineering"
                          className="filled-in"
                          id="Engineering"
                          value="engineering"
                        />
                        <label htmlFor="Engineering">Engineering</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name="economics"
                          className="filled-in"
                          id="Economics"
                          value="Econonmics"

                        />
                        <label htmlFor="Economics">Economics</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name="science"
                          className="filled-in"
                          id="Science"
                          value="science"
                        />
                        <label htmlFor="Science">Science</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          name="others"
                          className="filled-in"
                          id="Others"
                          value="others"
                        />
                        <label htmlFor="others">Others</label>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <Link
            href="#"
            data-activates="slide-out"
            className="button-collapse show-on-large"
          >
            <i className="material-icons">menu</i>
          </Link>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { searchIdeas })(SideNav);
