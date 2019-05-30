import React from 'react'

export default class Sidenav extends React.Component {
  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout() {
    window.location.href = '/login'
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }
  }
  render() {
    return (
      <div className="sidenav">
        {/*  <a href="#">Dashboard</a>
      <a href="#">Experts</a>
      <a href="#">Settings</a>*/}
        <a href="#" onClick={this.logout}>
          Logout
        </a>
      </div>
    )
  }
}
