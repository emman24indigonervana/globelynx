import React from 'react'
import Layout from '../../components/Layout'
import { navigate } from 'gatsby-link'

import qs from 'qs'

import axios from 'axios'

// import Sidenav from './sidenav'
// import DashboardBody from './dashboardbody'

// import '../../components/Styles/Custom.scss'
import '../../components/Styles/Login.scss'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('username') === null) {
        navigate('/login')
      } else {
        navigate('/dashboard')
      }
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state)
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    // axios.post('https://globelynx-api.herokuapp.com/api/user/login',
    //   qs.stringify(this.state),
    //   {
    //   headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': 'application/json',
    //   },
    //   withCredentials: true,
    // }).then(function (res) {
    //   console.log(res)
    //  // var url_string = res.url
    //   // var url = new URL(url_string);
    //   // var userId = url.searchParams.get("id");
    //   // if (typeof window !== 'undefined') {
    //   //   localStorage.setItem("username", userId);
    //   // }
    //   // window.location.href = '/dashboard'
    // }).catch(function (error) {
    //   console.log(error);
    // });

    if (this.state.username === 'globelynx' && this.state.password === 'gL0b3lYnx1!') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('username', this.state.username)
        window.location.href = '/dashboard'
      }
    }

    // fetch('https://globelynx-api.herokuapp.com/api/user/login', {
    //   method: 'POST',
    //   mode:'cors',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Accept': '*',
    //      },
    //   body: encode(this.state),
    // })
    //   .then((res) => {
    //     console.log(res)
    //     // var url_string = res.url
    //     // var url = new URL(url_string);
    //     // var userId = url.searchParams.get("id");
    //     // if (typeof window !== 'undefined') {
    //     //   localStorage.setItem("username", userId);
    //     // }
    //     // window.location.href = '/dashboard'
    //   })
    //   .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="login-form-container">
        <h2>Login</h2>
        <form method="post" onSubmit={this.handleSubmit}>
          <div className="login-form-input">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
            />
          </div>
          <div className="login-form-input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <div className="login-form-input">
            <input type="submit" value="Login" />
          </div>
        </form>
        <span>Forgot Password?</span>
        {/*<p onClick={this.gotoSignup}>Create new Account</p>*/}
      </div>
    )
  }
}
