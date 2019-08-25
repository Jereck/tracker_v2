import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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
      console.log('Passwords do not match');
    } else {
      console.log("Success");
    }
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
                  alue={name} onChange={e => onChange(e)} 
                  id="name" />

          <label for="email">Email</label>
          <input className="form-input" type="text" placeholder="Enter Email..." name="email" value={email} onChange={e => onChange(e)} id="email" />

          <label for="password">Password</label>
          <input className="form-input" type="password" placeholder="Enter Password..." name="password" value={password} onChange={e => onChange(e)} id="password" />

          <label for="password">Re-enter Password</label>
          <input className="form-input" type="password" placeholder="Enter Password..." name="password2" value={password2} onChange={e => onChange(e)} id="password2" />

          <label for="email">Position</label>
          <input className="form-input" type="text" placeholder="URC/URA" name="position" value={position} onChange={e => onChange(e)} id="position" />

          <input type="submit" value="Register"  className="button" />
          Already registered? <Link to="/login">Log In</Link>
        </form>
    </Fragment>
  )
}

export default Register
