import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

// import topicBg from '../img/bg-topics.jpg'
// import skynetlogo from '../img/skynet.png'

// import cam1 from '../img/s1.jpg'
// import cam2 from '../img/s2.jpg'
// import cam3 from '../img/s3.png'
// import cam4 from '../img/s4.png'
// import cam5 from '../img/s5.jpg'

import PreviewCompatibleImage from './PreviewCompatibleImage'

// import elasticsearch from 'elasticsearch'

// const connectionString = 'https://search-newelasticsearchexperts-6tvlnj63my2rl26aojjcpg7ri4.us-east-1.es.amazonaws.com'
// const _index = 'experts'
// const _type = '_doc'

// let client = new elasticsearch.Client({
// 	host: connectionString,
// 	log: "trace"
// })

const ServicesLists = ({ productsItems }) => (
  <>
    {productsItems.map((item, key) => {
      let link
      switch (item.text) {
        case 'VIDEO MANAGEMENT SYSTEM':
          link = '/services/video-management'
          break
        case 'EMAIL ALERTS':
          link = '/services/email-alerts'
          break
        case 'TRAINING':
          link = '/services/training'
          break
        case 'WEB STREAMING':
          link = '/services/web-streaming'
          break
        case 'WEBCASTING':
          link = '/services/webcasting'
          break
        default:
          link = '/camerasDetails/Cameras-sony-camera'
      }

      return (
        <div key={key}>
          <div className={`${key === 4 ? 'twelve columns' : 'three columns '}`}>
            <Link to={link} className="featured-section-links">
              <section className="featured-section">
                <div className="featured-container">
                  <div className="featured-image-container animated fadeIn">
                    {/* <img className="featured-profile-image" src={cam5} /> */}
                    <PreviewCompatibleImage imageInfo={item.image} />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        width: '100%',
                      }}
                    >
                      <h2
                        style={{
                          margin: '0',
                          padding: '20px 0',
                          color: '#fff',
                          background: 'rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        {item.text}
                      </h2>
                    </div>
                  </div>
                  {/* <p className="has-text-centered">{item.text}</p> */}
                </div>
              </section>
            </Link>
          </div>
        </div>
      )
    })}
  </>
)

ServicesLists.propTypes = {
  productsItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
}

export default ServicesLists
