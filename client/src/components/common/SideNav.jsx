import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterIdeas } from '../../actions/filterActions';

/**
 * @className SideNav
 * @extends {Component}
 */
class SideNav extends Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(event) {
    this.props.filterIdeas(event.target.id);
  }

  render() {
    return (
      <div>
        <div>
          <ul id="slide-out" className="side-nav black white-text fixed">
            <li><h3 className="head">IdeaBox</h3></li>
            <li>
              <div className="nav-wrapper">
                <form id="searchForm">
                  <input
                    type="text"
                    name="searchParams"
                    placeholder="Search for Ideas"
                    id="searchBar"
                  />
                </form>
              </div>
            </li>
            <li className="no-padding white-text">
              <ul className="collapsible collapsible-accordion">
                <li>
                  <Link className="collapsible-header white-text">Username
                    <i className="material-icons  white-text">
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
                    className="white-text"
                  >My Ideas
                    <i className="material-icons  white-text">folder</i>
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
            aclassName="button-collapse show-on-large"
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
export default connect(mapStateToProps, { filterIdeas })(SideNav);
