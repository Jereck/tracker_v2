import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: { user: { _id, name, position }, capacity, daysOff } }) => {
  return (
    <div className="profile">
      <h2>{name}</h2>
      <p>{position}</p>
      <p>Capacity: { capacity } hr/day</p>
      <p>Days Off: { daysOff}</p>
      <Link to={`/profile/${_id}`}>View Profile</Link>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
