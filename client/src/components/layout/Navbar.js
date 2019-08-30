import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
    <ul className="nav" role="navigation">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>Logout</a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav" role="navigation">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );

  return (
    <nav>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);