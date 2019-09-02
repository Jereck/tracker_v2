import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR
} from './types';

// GET CURRENT USERS PROFILE
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
}

// Create or Update Capacity/Time off
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

    if(!edit) {
      history.push('/dashboard');
    }

    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.errors;

    if(errors){
        errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
} 