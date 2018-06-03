import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import SideNav from '../common/SideNav';
import { fetchIdeaComments, postComment } from '../../actions/commentActions';
<<<<<<< HEAD
import { fetchIdeaRatings, postRating } from '../../actions/ratingActions';
=======
>>>>>>> feat(post-comment): implement post idea comment feature
import { fetchSingleIdea } from '../../actions/ideaActions';

export class ViewIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idea: this.props.idea,
      comments: this.props.comments,
      content: '',
<<<<<<< HEAD
      ratings: this.props.ratings,
      averageRating: 0,
      userRating: 0
    };
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postRating = this.postRating.bind(this);
=======
    };
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
>>>>>>> feat(post-comment): implement post idea comment feature
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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  postComment() {
    this.props.postComment(this.props.params.id, this.state);
    this.setState({ content: '' });
  }

  postRating(event) {
    if (event.type === 'click') {
      this.setState({ userRating: event.rating });
      this.props.postRating(this.props.params.id, event.rating);
    }
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
    const currentPage = window.location.href;
    const {
      idea, comments, ratings, averageRating
    } = this.state;
    return (
      <div >
        <div className="row">
          <div className="col l4 xl3">
            <SideNav className="black white-text" />
          </div>
          <div className="col l8 xl9 ideaDashboard">
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
                      <div className="socials">
                        <Link
                          className="twitter-share-button fab fa-twitter"
                          target="_blank"
                          href={
                            `https://twitter.com/intent/tweet?text=
                            ${currentPage}
                            `}
                        />
                        <Link
                          className="fab fa-facebook-f"
                          href={
                            `https://www.facebook.com/sharer/sharer.php?url=
                            ${currentPage}`
                          }
                          target="_blank"
                          data-size="large"
                        />
                        <div className="g-plus" data-action="share" />
                      </div>
                      <div className="card-profile-name">
                        <span className="dateCreated">
                          {moment(idea.dueby).format('DD/MM/YY')}
                        </span>
                      </div>
                    </div>
                    <span className="card-title string-wrapper">
                      {idea.title}
                    </span>
                    <span
                      className="new badge black green-text"
                      data-badge-caption={idea.category}
                    />
                    <p className="string-wrapper">
                      {idea.description}
                      <span className="edited-card-text">
                        {idea.modified === true ? '[..edited]' : ' '}
                      </span>
                    </p>
                  </div>
                  <div className="card-tabs">
                    <ul className="tabs tabs-fixed-width">
                      <li className="tab">
                        <a href="#test4" className="active">Comments</a>
                      </li>
                      <li className="tab">
                        <a href="#test5">Ratings</a>
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
                          <span className="fas fa-star star" />
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
                              rating={this.state.userRating}
                              onRate={this.postRating}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  { Date.now() > idea.dueBy ?
                    <span>You cannot post comments after execution date</span> :
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
                  }
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
  postRating: PropTypes.func.isRequired,
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
  fetchIdeaRatings,
  postRating
})(ViewIdea);
