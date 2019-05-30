import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout'
import Login from '../components/Login'
import Profile from '../components/Profile'
import PrivateRoute from '../components/PrivateRoute'

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default App
