import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'

const MainMenu = props => {
  return (
    <div id="mobilenav" className="overlay">
      <Link to="/" className="navbar-login-btn-sm">
        <i
          className="fa fa-user icon-round"
          style={{ border: '0', margin: '0', padding: '5px' }}
        />
        Login
      </Link>
      <span className="closebtn" onClick={props.closeNav}>
        &times;
      </span>
      <div className="overlay-content">
       {/* <a
          style={{ color: props.location === 'homepage' ? '#13a7da' : '' }}
          href="/"
        >
          Home
        </a>*/}
         <Link activeStyle={{ color: '#13a7da' }} to="/">
          Home
        </Link>
        <Link activeStyle={{ color: '#13a7da' }} to="/about">
          About
        </Link>
        <Link activeStyle={{ color: '#13a7da' }} to="/experts">
          Experts
        </Link>
        <Link activeStyle={{ color: '#13a7da' }} to="/products">
          Services
        </Link>
        <Link activeStyle={{ color: '#13a7da' }} to="/cameras">
          Cameras
        </Link>
        <Link activeStyle={{ color: '#13a7da' }} to="/news">
          News
        </Link>
        <Link activeStyle={{ color: '#13a7da' }} to="/contact">
          Contact
        </Link>
      </div>
    </div>
  )
}

MainMenu.propTypes = {
  closeNav: PropTypes.func,
}

export default MainMenu
