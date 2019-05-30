import React from 'react'
import { navigate } from 'gatsby'
import { handleLogin, isLoggedIn } from '../services/auth'

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/profile`)
    }

    return (
      <>
        {/* <h1>Log in</h1> */}
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(`/profile`)
          }}
        >
          <div className="field">
            <label className="label" htmlFor={'name'} />
            <div className="form-group">
              <input
                type="text"
                name="username"
                className="form-control"
                onChange={this.handleUpdate}
                required={true}
              />
              <label className="form-control-placeholder">Username</label>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor={'name'} />
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                required={true}
                name="password"
                onChange={this.handleUpdate}
              />
              <label className="form-control-placeholder">Password</label>
            </div>
          </div>
          <div className="field">
            <input
              className="button register-submit"
              type="submit"
              value="Log In"
            />
          </div>
        </form>
      </>
    )
  }
}

export default Login
