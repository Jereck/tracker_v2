import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
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

// GET ALL PROFILES
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
}

// GET PROFILE BY ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
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
    dispatch(setAlert('Updated'));

    if(!edit) {
      history.push('/dashboard');
    }
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

export const deleteAccount = () => async dispatch => {
  if(window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanantly delted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { message: err.response.satustText, status: err.response.status }
      })
    }
  }
}