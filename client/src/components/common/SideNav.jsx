import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutAction } from '../../actions/userActions';
import { filterIdeas } from '../../actions/filterActions';
import { searchIdeas } from '../../actions/searchActions';
import Alert from '../../utils/Alert';

export class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    $('.collapsible').collapsible();
    $('.button-collapse').sideNav();
  }

  handleFilter(event) {
    this.props.filterIdeas(event.target.id);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleLogOut() {
    this.props.logoutAction();
  }

  handleSearch(event) {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (!searchTerm || searchTerm.length < 3) {
      Alert('Enter atleast 3 characters', 3000, 'red');
    }
    if (searchTerm.length > 2) {
      this.props.searchIdeas(searchTerm)
        .then(() => {
          browserHistory.push('/searchresults');
        })
        .catch(() => {});
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
                <div className="row search-row">
                  <div className="col l10 xl10">
                    <input
                      onChange={this.handleChange}
                      type="text"
                      name="searchTerm"
                      value={this.state.searchTerm}
                      placeholder="Enter search keyword"
                      id="search"
                    />
                  </div>
                  <div
                    className="col l2 xl2 search-icon"
                    onClick={this.handleSearch}
                    role="presentation"
                  >
                    <i className="material-icons">search</i>
                  </div>
                </div>
              </div>
            </li>
            <li className="no-padding white-text">
              <ul className="collapsible popout" data-collapsible="accordion">
                <li>
                  <h6 className="white-text collapsible-header no-padding">
                    <i className="material-icons center">
                  person_outline
                    </i>
                    My Account
                  </h6>

                  <div className="collapsible-body">
                    <ul>
                      <li><Link to="/profile">Edit Profile</Link></li>
                      <li>
                        <Link
                          type="btn"
                          role="button"
                          onClick={this.handleLogOut}
                        >Signout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link
                    to="/myideas"
                    className="no-padding white-text"
                  ><b>My Ideas</b>
                    <i className="material-icons white-text">folder</i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="no-padding white-text"
                  ><b>Public Ideas</b>
                    <i
                      className="material-icons  white-text"
                    >folder_shared
                    </i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-idea"
                    className="no-padding white-text"
                  ><b>Post an Idea</b>
                    <i className="material-icons  white-text">add_box</i>
                  </Link>
                </li>
                <div className="border" />
                <li>
                  <Link
                    className="
                    collapsible-header
                    category-row
                    white-text
                    no-padding"
                  >
                    <h6>
                      <i
                        className="material-icons white-text"
                      >class
                      </i>Categories
                    </h6>
                  </Link>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a
                          className="collapsible-header"
                          type="button"
                          role="button"
                          id="arts"
                          onClick={this.handleFilter}
                        >
                        Arts
                        </a>
                      </li>
                      <li>
                        <a
                          className="collapsible-header"
                          type="btn"
                          role="button"
                          id="tech"
                          onClick={this.handleFilter}
                        >
                        Tech
                        </a>
                      </li>
                      <li>
                        <a
                          className="collapsible-header"
                          type="btn"
                          role="button"
                          id="engineering"
                          onClick={this.handleFilter}
                        >
                        Engineering
                        </a>
                      </li>
                      <li>
                        <a
                          className="collapsible-header"
                          type="btn"
                          role="button"
                          id="economics"
                          onClick={this.handleFilter}
                        >
                        Economics
                        </a>
                      </li>
                      <li>
                        <a
                          className="collapsible-header"
                          type="btn"
                          id="science"
                          role="button"
                          onClick={this.handleFilter}
                        >
                        Science
                        </a>
                      </li>
                      <li>
                        <a
                          className="collapsible-header"
                          type="btn"
                          id="others"
                          role="button"
                          onClick={this.handleFilter}
                        >
                        Others
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <Link
            data-activates="slide-out"
            className="button-collapse show-on-large"
          >
            <i className="material-icons green-text">menu</i>
          </Link>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  filterIdeas: PropTypes.func.isRequired,
  searchIdeas: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired
};

export default connect(null, {
  logoutAction,
  filterIdeas,
  searchIdeas
})(SideNav);
