import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import CreateProfile from '../profile-forms/CreateProfile';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const [displayCapacity, toggleCapacity] = useState(false);

  return loading && profile === null ? <Spinner /> : <Fragment>
    <h1>Dashboard</h1>
    <p>Welcome, { user && user.name }</p>
    { profile !== null ? <Fragment>
      <button onClick={() => toggleCapacity(!displayCapacity)}>Days off/Capacity</button>
      {displayCapacity && <Fragment><CreateProfile/></Fragment>}
    </Fragment> : <Fragment>has not</Fragment>}
  </Fragment>;
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
