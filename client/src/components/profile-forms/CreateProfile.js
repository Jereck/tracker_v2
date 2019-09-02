import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    capacity: '0',
    daysOff: '0'
  });

  const {
    capacity,
    daysOff
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history)
  }

  return (
    <Fragment>
      <form className="capForm" onSubmit={e => onSubmit(e)}>
        <label>Capacity</label>
        <input className="form-input" type="text" placeholder="0" name="capacity" value={capacity} onChange={e => onChange(e)} id="capacity" />


        <label>Days Off</label>
        <input className="form-input" type="text" placeholder="0" name="daysOff" value={daysOff} onChange={e => onChange(e)} id="daysOff" />

        <input type="submit" value="Update"  className="button" />
      </form>
    </Fragment>
  )
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};


export default connect(null, { createProfile })(withRouter(CreateProfile));
