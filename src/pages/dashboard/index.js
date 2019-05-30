import React from 'react'
import { navigate } from 'gatsby-link'

import Layout from '../../components/Layout'

import Sidenav from '../../components/dashboard/sidenav'
import DashboardBody from '../../components/dashboard/dashboardbody'

import '../../components/Styles/Custom.scss'
import '../../components/Styles/Dashboard.scss'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('username') === null) {
        navigate('/login')
      } else {
        navigate('/dashboard')
      }
    }
  }
  render() {
    return (
      <Layout location="dashboard">
        <Sidenav />
        <DashboardBody />
      </Layout>
    )
  }
}
