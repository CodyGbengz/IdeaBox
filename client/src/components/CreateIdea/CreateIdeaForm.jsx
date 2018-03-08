import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactMde from 'react-mde';

const CreateIdeaForm = ({
  handleChange,
  handleSubmit,
  handleValueChange,
  handleToggleStatus,
  title,
  reactMdeValue,
  status,
  dueby,
  category,
  error,
}) => (
  <form>
    <div className="row ">
      <div className="input-field col s12">
        <input
          id="title"
          value={title}
          onChange={handleChange}
          name="title"
          type="text"
        />
        <label htmlFor="username">title</label>
        { error.username ?
          <span className="red-text">{error.username}</span>
    : <span />
    }
      </div>
      <div className="input-field col s12">
        <div className="container-mde col s12">
          <ReactMde
            textAreaProps={{
                  id: 'description',
                  name: 'description',
                }}
            name="description"
            value={reactMdeValue}
            onChange={handleValueChange}
          />
        </div>
        <label htmlFor="description">description</label>
        { error.description ?
          <span className="red-text">{error.description}</span>
    : <span />
    }
      </div>
      <div className="input-field col s12">
        <select name={category}>
          <option
            value={category}
            name="category"
            onChange={handleChange}
            disabled
            selected
          >select a category
          </option>
          <option value="arts">arts</option>
          <option value="science">science</option>
          <option value="tech">tech</option>
          <option value="engineering">engineering</option>
          <option value="economics">economics</option>
          <option value="others">others</option>
        </select>
        <label>Select a category</label>
      </div>
      <div className="input-field col s12">
        <input type="date" name="dueby" value={dueby} className="datepicker" />
        <label>Execution Date</label>
      </div>
      <div className="switch">
        <label>
          Public
          <input type="checkbox" name="status" onClick={handleToggleStatus} />
          <span className="lever" />
          Private
        </label>
      </div>
      <div className="input-field col s12 l12">
        <Link
          className="
          right
          waves-effect
          waves-light
          btn
          green"
          onClick={handleSubmit}
        >Submit
        </Link>
      </div>
    </div>
  </form>
);

CreateIdeaForm.propTypes = {
  title: PropTypes.string.isRequired,
  dueby: PropTypes.number.isRequired,
  reactMdeValue: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  handleToggleStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.any).isRequired
};

export default CreateIdeaForm;
