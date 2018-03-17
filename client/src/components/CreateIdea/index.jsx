import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateIdeaForm from './CreateIdeaForm';
import { SideNav } from '../common/SideNav';
import { createIdeas } from '../../actions/ideaActions';
import { createIdeaValidator } from '../../utils/validations';


/**
 *
*/
export class CreateIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      reactMdeValue: { text: '' },
      category: '',
      disable: true,
      dueBy: '',
      status: '',
      error: {
        title: '',
        description: '',
        status: '',
        category: '',
        dueby: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  isValid(target) {
    const { errors, isValid } = createIdeaValidator(this.state);
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

  handleValueChange(value) {
    this.setState({ reactMdeValue: value });
    this.setState({ description: this.state.reactMdeValue.text });
    this.isValid(value);
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
    this.props.createIdeas(this.state);
  }

  render() {
    return (
      <div >
        <div className="create-page row">
          <div className="col l4 xl3">
            <SideNav className="black white-text" />
          </div>
          <div className="col l8 xl9 ideaDashboard">
            <h5>Post An Idea</h5>
            <div id="card-container" className="row">
              <CreateIdeaForm
                reactMdeValue={this.state.reactMdeValue}
                title={this.state.title}
                description={this.state.description}
                status={this.state.status}
                dueby={this.state.dueby}
                category={this.state.category}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                handleValueChange={this.handleValueChange}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateIdea.propTypes = {
  createIdeas: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ideas: state.IdeasReducer
});

export default connect(mapStateToProps, { createIdeas })(CreateIdea);
