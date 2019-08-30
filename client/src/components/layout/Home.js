import React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = ({ isAuthenticated }) => {
  if(isAuthenticated){
    return <Redirect to='/dashboard' />
  }

  return (
    <div>
      <h1>You are home</h1>
    </div>
  )
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Home);