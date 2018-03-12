import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditIdeaForm from './EditIdeaForm';
import SideNav from '../common/SideNav';
import { editIdeas } from '../../actions/ideaActions';
import { editIdeaValidator } from '../../utils/validations';


/**
 *
*/
class EditIdea extends Component {
  constructor(props) {
    super(props);
    const current = this.props.ideas.filter(idea =>
      idea._id === this.props.params.id);
    this.state = {
      id: current[0]._id,
      title: current[0].title,
      description: current[0].description,
      reactMdeValue: { text: '' },
      category: current[0].category,
      disable: true,
      dueby: current[0].dueBy,
      status: current[0].status,
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

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   if (nextProps.ideas !== this.props.ideas) {
  //     const {
  //       title,
  //       description,
  //       category,
  //       dueBy,
  //       status
  //     } = nextProps.idea;

  //     this.setState({
  //       title,
  //       description,
  //       category,
  //       dueBy,
  //       status
  //     });
  //   }
  // }


  isValid(target) {
    const { errors, isValid } = editIdeaValidator(this.state);
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
    this.props.editIdeas(this.state, this.state.id);
  }

  render() {
    return (
      <div >
        <div className="Edit-page row">
          <div className="col m3 s12 l3">
            <SideNav className="black white-text" />
          </div>
          <div className="col m7 s12 l7 ideaDashboard">
            <h5>Post An Idea</h5>
            <div id="card-container" className="row">
              <EditIdeaForm
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

EditIdea.propTypes = {
  editIdeas: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ideas: state.userIdeasReducer
});

export default connect(mapStateToProps, { editIdeas })(EditIdea);
