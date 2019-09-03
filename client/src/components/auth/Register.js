import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert'; 
import { register } from '../../actions/auth'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    position: '',
  });

  const { name, email, password, password2, position } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2){
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password, position });
    }
  }

  if(isAuthenticated){
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <form className="form" onSubmit={e => onSubmit(e)}>
          <h1 className="form-title">Register</h1>

          <label for="name">Name</label>
          <input  className="form-input" 
                  type="text" 
                  placeholder="Enter your name" 
                  name="name" 
                  value={name} onChange={e => onChange(e)} 
                  id="name" />

          <label for="email">Email</label>
          <input className="form-input" type="text" placeholder="Enter Email..." name="email" value={email} onChange={e => onChange(e)} id="email" />

          <label for="password">Password</label>
          <input className="form-input" type="password" placeholder="Enter Password..." name="password" value={password} onChange={e => onChange(e)} id="password" />

          <label for="password">Re-enter Password</label>
          <input className="form-input" type="password" placeholder="Enter Password..." name="password2" value={password2} onChange={e => onChange(e)} id="password2" />

          <label for="position">Position</label>
          <input className="form-input" type="text" placeholder="URC/URA" name="position" value={position} onChange={e => onChange(e)} id="position" />

          <input type="submit" value="Register"  className="button" />
          Already registered? <Link to="/login">Log In</Link>
        </form>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
