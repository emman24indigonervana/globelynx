import React from 'react'
import Layout from '../../components/Layout'

import RecentBookings from '../../components/RecentBookings'
import { Link } from 'gatsby'

import defaultPicture from '../../img/s4.png'

import '../../components/Styles/ExpertsProfile.scss'

const WebCasting = class extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container-fluid" style={{ marginTop: '25px' }}>
          <div className="row has-padding">
            <Link
              to="/products"
              style={{
                textDecoration: 'none',
                color: '#4e5863',
                position: 'absolute',
                top: '0',
              }}
            >
              <i className="fa fa-arrow-left" /> Back
            </Link>
            <div className="three columns">
              <img
                alt={defaultPicture}
                src={defaultPicture}
                className="experts-profile-image"
              />
            </div>
            <div className="nine columns" style={{ padding: '0 35px' }}>
              <h1>Webcasting</h1>
              Webcasting is one of the go-to communications tool to engage,
              educate and entertain with every type of audience. It is a quick
              and cost effective way to stream live in-house meetings, corporate
              events and employee events such as on-boarding, product training
              and compliance. We are experts in connecting experts and CEOs to
              remote audiences.
            </div>
          </div>
        </div>

        <div className=" is-fullwidth has-background-gray">
          <div className="container-fluid">
            <div className="row has-padding has-text-centered">
              <h1>OTHER EXPERTS</h1>
              <RecentBookings />
              {/* <h1>{currentTopics.heading}</h1> */}
              {/* <Features gridItems={currentTopics.topics} columnSize="four" /> */}
            </div>
          </div>
        </div>
        {/* <div className=" is-fullwidth">
							<div className="container-fluid">
								<div className="row has-padding has-text-centered">
								 <h1 className="has-text-centered">{recentBookings.heading}</h1> 
									 <Features gridItems={recentBookings.bookings} columnSize="four" hasActionContainer={true} /> 
								</div>
							</div>
						</div> */}
      </Layout>
    )
  }
}

export default WebCasting
