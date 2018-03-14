import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterIdeas } from '../../actions/filterActions';
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
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(event) {
    this.props.filterIdeas(event.target.id);
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
                      className="material-icons  white-text"
                    >folder_shared
                    </i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-idea"
                    className="white-text"
                  >Share an Idea
                    <i className="material-icons  white-text">add_box</i>
                  </Link>
                </li>
                <div className="border" />
                <li>
                  <Link className="collapsible-header white-text">Categories
                    <i className="material-icons white-text">
                    arrow_drop_down
                    </i>
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
                          id="Technology"
                          onClick={this.handleFilter}
                        >
                        Technology
                        </a>
                      </li>
                      <li>
                        <a
                          className="collapsible-header"
                          type="btn"
                          role="button"
                          id="Engineering"
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
                          id="Economics"
                          onClick={this.handleFilter}
                        >
                        Economics
                        </a>
                      </li>
                      <li>
                        <a
                          className="collapsible-header"
                          type="btn"
                          id="Science"
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
                          id="Others"
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

SideNav.propTypes = {
  filterIdeas: PropTypes.func.isRequired,
  searchIdeas: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { filterIdeas, searchIdeas })(SideNav);
