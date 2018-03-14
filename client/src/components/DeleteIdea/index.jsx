import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import SideNav from '../common/SideNav';
import { deleteIdea } from '../../actions/ideaActions';


/**
 *
*/
class DeleteIdea extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.deleteIdea(this.props.params.id);
  }

  render() {
    return (
      <div >
        <div className="Edit-page row">
          <div className="col m3 s12 l3">
            <SideNav className="black white-text" />
          </div>
          <div className="col m7 s12 l7 ideaDashboard">
            <h5>confirm delete</h5>
            <div id="card-container" className="row">
              <div className="col m12 s12 l12">
              Are you sure you want to delete this idea?
              </div>
              <button
                className="btn green"
                onClick={this.handleDelete}
              >Delete
              </button>
              <Link
                to="/myideas"
                className="btn red"
              >
              Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DeleteIdea.propTypes = {
  deleteIdea: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ideas: state.userIdeasReducer
});

export default connect(mapStateToProps, { deleteIdea })(DeleteIdea);
