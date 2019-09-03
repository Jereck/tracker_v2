import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const CreateProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
  const [formData, setFormData] = useState({
    capacity: '0',
    daysOff: '0',
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      capacity: loading || !profile.capacity ? '0' : profile.capacity,
      daysOff: loading || !profile.daysOff ? '0' : profile.daysOff
    })
  }, [loading])

  const {
    capacity,
    daysOff
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true)
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
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
})


export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile));
