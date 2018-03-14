import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactMde, { ReactMdeCommands } from 'react-mde';

const EditIdeaForm = ({
  handleChange,
  handleSubmit,
  handleValueChange,
  title,
  reactMdeValue,
  status,
  dueBy,
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
        <label htmlFor="title">title</label>
        { error.title ?
          <span className="red-text">{error.title}</span>
    : <span />
    }
      </div>
      <div className="input-field black-text col s12">
        <div className="container-mde col s12">
          <ReactMde
            textAreaProps={{
                  id: 'description',
                  name: 'description',
                }}
            value={reactMdeValue}
            onChange={handleValueChange}
            commands={ReactMdeCommands.getDefaultCommands()}
          />
        </div>
        <label htmlFor="description">description</label>
        { error.description ?
          <span className="red-text">{error.description}</span>
    : <span />
    }
      </div>
      <div className="col s12 l6">
        <select
          className="browser-default"
          value={category}
          name="category"
          onChange={handleChange}
        >
          <option value="" disabled>select a category
          </option>
          <option value="arts">arts</option>
          <option value="science">science</option>
          <option value="tech">tech</option>
          <option value="engineering">engineering</option>
          <option value="economics">economics</option>
          <option value="others">others</option>
        </select>
      </div>
      <div className="col s12 m6 l6">
        <select
          className="browser-default"
          value={status}
          name="status"
          onChange={handleChange}
        >
          <option value="" disabled>Choose your idea type
          </option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div className=" col s12">
        <label>Execution Date</label>
        <input type="date" name="dueBy" onChange={handleChange} value={dueBy} />
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

EditIdeaForm.propTypes = {
  title: PropTypes.string.isRequired,
  dueBy: PropTypes.number.isRequired,
  reactMdeValue: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.any).isRequired
};

export default EditIdeaForm;
