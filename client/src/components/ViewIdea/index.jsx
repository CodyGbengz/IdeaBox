import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import SideNav from '../common/SideNav';
import { fetchIdeaComments, postComment } from '../../actions/commentActions';
import { fetchIdeaRatings } from '../../actions/ratingActions';
import { fetchSingleIdea } from '../../actions/ideaActions';

class ViewIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idea: this.props.idea,
      comments: this.props.comments,
      content: '',
      ratings: this.props.ratings,
      averageRating: 0
    };
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    $('ul.tabs').tabs();
    this.props.fetchSingleIdea(this.props.params.id);
    this.props.fetchIdeaComments(this.props.params.id);
    this.props.fetchIdeaRatings(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const { ratings } = nextProps;
      let ratingTotal = 0;
      let averageRating = 0;
      if (ratings.length !== 0) {
        ratings.forEach((rating) => {
          ratingTotal += rating.stars;
        });
        averageRating = ratingTotal / (ratings.length);
      }

      this.setState({
        idea: nextProps.idea,
        comments: nextProps.comments,
        ratings: nextProps.ratings,
        averageRating
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  postComment() {
    this.props.postComment(this.props.params.id, this.state);
    this.setState({ content: '' });
  }

  renderComments(comments) {
    if (!comments || comments.length === 0) {
      return (
        <div className="col m12 l12">
          <h6 className="center-align black-text">
            No comments posted yet!
          </h6>
        </div>
      );
    }
    return comments.map(comment => (
      <div key={comment.id} className="col s12 m4 l12">
        <div className="card darken-1">
          <div className="card-content comments-box wrapper">
            <p>{comment.content}</p>
          </div>
          <div className="card-action">
            <span className="right">
              <p style={{ fontSize: '14px' }}>
                {moment(comment.createdAt).fromNow()}
              </p>
            </span>
            <span>
              <p style={{ fontSize: '14px' }}>
                <em>
                  {comment.author.username}
                </em>
              </p>
            </span>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const {
      idea, comments, ratings, averageRating
    } = this.state;
    return (
      <div >
        <div className="row">
          <div className="col m3 s12 l3">
            <SideNav className="black white-text" />
          </div>
          <div className="col m7 s12 l8 ideaDashboard">
            <h5>Idea Details</h5>
            <div id="card-container" className="row">
              <div className="col s12 m12 l12" key={idea.id}>
                <div className="card ">
                  <div className="card-content">
                    <div className="card-profile-header">
                      {idea.status === 'public' &&
                        <Link className="black-text">
                          <i className="material-icons right"> lock_open
                          </i>
                        </Link>
                      }
                      <div className="card-profile-name">
                        <span className="dateCreated">
                          {moment(idea.dueby).format('DD/MM/YY')}
                        </span>
                      </div>
                    </div>
                    <span className="card-title">{idea.title}</span>
                    <span
                      className="new badge black green-text"
                      data-badge-caption={idea.category}
                    />
                    <p>
                      {idea.description}
                      <span className="edited-card-text">
                        {idea.modified === true ? '[..edited]' : ' '}
                      </span>
                    </p>
                  </div>
                  <div className="card-tabs">
                    <ul className="tabs tabs-fixed-width">
                      <li className="tab">
                        <a href="#test4">Comments</a>
                      </li>
                      <li className="tab">
                        <a className="active" href="#test5">Ratings</a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-content grey lighten-4">
                    <div id="test4">
                      <div className="row">
                        {this.renderComments(comments)}
                      </div>
                    </div>
                    <div id="test5">
                      <div className="rating-container">
                        <h6>Average Rating</h6>
                        <div className="fa-stack rating-star-wrapper">
                          <span className="fa fa-star fa-5x fa-stack-4x star" />
                          <strong className="fa-stack-1x ratings">
                            {averageRating}
                          </strong>
                        </div>
                        <h6>{
                          `Total number of ratings: ${ratings.length} `}
                        </h6>
                        <div>
                          <div>
                            <Rater
                              total={5}
                              rating={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-action">
                    <input
                      id="comment"
                      type="text"
                      name="content"
                      value={this.state.content}
                      onChange={this.handleChange}
                    />
                    <button
                      type="button"
                      className="btn center-align"
                      onClick={this.postComment}
                    >
                        Comment
                    </button>
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
ViewIdea.propTypes = {
  postComment: PropTypes.func.isRequired,
  fetchSingleIdea: PropTypes.func.isRequired,
  fetchIdeaComments: PropTypes.func.isRequired,
  fetchIdeaRatings: PropTypes.func.isRequired,
  ratings: PropTypes.arrayOf(PropTypes.any).isRequired,
  idea: PropTypes.objectOf(PropTypes.any).isRequired,
  params: PropTypes.objectOf(PropTypes.any).isRequired,
  comments: PropTypes.arrayOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  idea: state.singleIdeaReducer,
  comments: state.commentsReducer,
  ratings: state.ratingsReducer
});

export default
connect(mapStateToProps, {
  fetchSingleIdea,
  fetchIdeaComments,
  postComment,
  fetchIdeaRatings
})(ViewIdea);
