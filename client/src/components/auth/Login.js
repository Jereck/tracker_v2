import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if(isAuthenticated){
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <form className="form" onSubmit={e => onSubmit(e)}>
          <h1 className="form-title">Login</h1>

          <label for="email">Email</label>
          <input className="form-input" type="text" placeholder="Enter Email..." name="email" value={email} onChange={e => onChange(e)} id="email" />

          <label for="password">Password</label>
          <input className="form-input" type="password" placeholder="Enter Password..." name="password" value={password} onChange={e => onChange(e)} id="password" />

          <input type="submit" value="Login"  className="button" />
          Need an account? <Link to="/register">Register</Link>
        </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
