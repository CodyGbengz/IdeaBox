import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Idea from './common/Idea';
import SideNav from './common/SideNav';

export class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: this.props.ideas,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props.ideas) {
      this.setState({
        ideas: nextProps.ideas,
      });
    }
  }

  render() {
    const { ideas } = this.state;
    return (
      <div >
        <div className="row">
          <div className="col m3 s12 l3">
            <SideNav className="black white-text" />
          </div>
          <div className="col m7 s12 l7 ideaDashboard">
            <h5>Search Result(s)</h5>
            <div id="card-container" className="row">
              {typeof ideas === 'object' ?
                ideas.map(idea => (
                  <Idea
                    key={idea.id}
                    id={idea.id}
                    title={idea.title}
                    category={idea.category}
                    description={idea.description}
                    status={idea.status}
                    dueby={idea.dueby}
                    author={idea.author}
                    modified={idea.modified}
                  />
                )) : <span> No ideas founds</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchResults.propTypes = {
  ideas: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  ideas: state.searchResult
});

export default connect(mapStateToProps, {})(SearchResults);
