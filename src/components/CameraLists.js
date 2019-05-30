import React, { Component } from 'react'
import Link from 'gatsby-link'

import topicBg from '../img/bg-topics.jpg'
import skynetlogo from '../img/skynet.png'

import cam1 from '../img/kam1.png'
import cam2 from '../img/kam2.png'
import cam3 from '../img/kam3.png'
import cam4 from '../img/kam4.png'

// import elasticsearch from 'elasticsearch'

// const connectionString = 'https://search-newelasticsearchexperts-6tvlnj63my2rl26aojjcpg7ri4.us-east-1.es.amazonaws.com'
// const _index = 'experts'
// const _type = '_doc'

// let client = new elasticsearch.Client({
// 	host: connectionString,
// 	log: "trace"
// })

class CameraLists extends Component {
  render() {
    return (
      // ========== NEED TO REMOVE INLINE STYLES IN THE FUTURE.(JUST FOR THE MEANTIME TO MEET THE DEADLINE)
      <div>
        <div className="three columns">
          <a href="#" className="featured-section-links">
            <section className="featured-section">
              <div className="featured-container">
                <div className="featured-image-container">
                  <img className="featured-profile-image" src={cam1} />
                  <div
                    style={{ position: 'absolute', bottom: '0', width: '100%' }}
                  >
                    <h2
                      style={{
                        margin: '0',
                        padding: '20px 0',
                        color: '#fff',
                        background: 'rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      PORT A CAM G2
                    </h2>
                  </div>
                </div>
              </div>
            </section>
          </a>
        </div>
        <div className="three columns">
          <a href="#" className="featured-section-links">
            <section className="featured-section">
              <div className="featured-container">
                <div className="featured-image-container">
                  <img className="featured-profile-image" src={cam2} />
                  <div
                    style={{ position: 'absolute', bottom: '0', width: '100%' }}
                  >
                    <h2
                      style={{
                        margin: '0',
                        padding: '20px 0',
                        color: '#fff',
                        background: 'rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      PORT A CAM G1
                    </h2>
                  </div>
                </div>
              </div>
            </section>
          </a>
        </div>
        <div className="three columns">
          <a href="#" className="featured-section-links">
            <section className="featured-section">
              <div className="featured-container">
                <div className="featured-image-container">
                  <img className="featured-profile-image" src={cam3} />
                  <div
                    style={{ position: 'absolute', bottom: '0', width: '100%' }}
                  >
                    <h2
                      style={{
                        margin: '0',
                        padding: '20px 0',
                        color: '#fff',
                        background: 'rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      OFFICE CAM 2
                    </h2>
                  </div>
                </div>
              </div>
            </section>
          </a>
        </div>
        <div className="three columns">
          <a href="#" className="featured-section-links">
            <section className="featured-section">
              <div className="featured-container">
                <div className="featured-image-container">
                  <img className="featured-profile-image" src={cam4} />
                  <div
                    style={{ position: 'absolute', bottom: '0', width: '100%' }}
                  >
                    <h2
                      style={{
                        margin: '0',
                        padding: '20px 0',
                        color: '#fff',
                        background: 'rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      NETWORK CONNECTION
                    </h2>
                  </div>
                </div>
              </div>
            </section>
          </a>
        </div>
      </div>
    )
  }
}

export default CameraLists
