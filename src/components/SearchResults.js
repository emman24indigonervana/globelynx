import React from 'react'
import Link from 'gatsby-link'

// import sampleprofile from '../img/sampleprofile.jpg'
// import testImage from '../img/Aberdeen-logo.png'
// import skynetlogo from '../img/skynet.png'

import defaultProfile from '../img/default-profile.png'

import companyDefaultLogo from '../img/company-default.jpg'

const SearchResults = class extends React.Component {
  render() {
    return (
      <div>
        {this.props.results.map((val, key) => {
          return (
            <div className="four columns animated zoomIn" key={key}>
              <Link
                to={`/${val._source.Path}`}
                state={{
                  expertsData: val._source,
                  lastSearch: this.props.lastSearch,
                }}
                className="featured-section-links"
              >
                <section className="featured-section">
                  <div className="featured-container">
                    <div className="featured-image-container">
                      {val._source['Profile Image'] ===
                      'do not want experts pictures published' ? (
                        <img
                          className="featured-profile-image"
                          alt={defaultProfile}
                          src={defaultProfile}
                        />
                      ) : (
                        <img
                          className="featured-profile-image"
                          src={
                            val._source.Name.includes('camera')
                              ? `https://s3-eu-west-1.amazonaws.com/globelynx-experts-images/public/${
                                  val._source.Logo
                                }`
                              : `https://s3-eu-west-1.amazonaws.com/globelynx-experts-images/public/${
                                  val._source['Profile Image']
                                }`
                          }
                          alt={val._source['Profile Image']}
                          onError={e => {
                            e.target.onerror = null
                            e.target.src = defaultProfile
                          }}
                        />
                      )}

                      <div className="contact-section">
                        <span className="fa fa-phone"> </span>
                        <span className="fa fa-at"> </span>
                      </div>
                    </div>
                    <div
                      className="has-background-gray"
                      style={{ textAlign: 'left', padding: '8px' }}
                    >
                      <h3 className="featured-subjects has-text-ellipsis">
                        {val._source['Job Title']}
                      </h3>
                      <div className="row" style={{ position: 'relative' }}>
                        <div
                          className={`${
                            val._source.Name.includes('camera') ||
                            val._source.Name.includes('Camera')
                              ? 'twelve columns'
                              : 'eight columns'
                          }`}
                          style={{ height: '80px' }}
                        >
                          <div className="featured-details-container">
                            <p className="featured-name has-text-ellipsis">
                              {val._source.Name}
                            </p>
                            <p className="featured-title has-text-ellipsis">
                              {val._source.Subjects}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`${
                            val._source.Name.includes('camera') ||
                            val._source.Name.includes('Camera')
                              ? 'is-hidden'
                              : 'four columns has-text-centered'
                          }`}
                          style={{ margin: '0' }}
                        >
                          {val._source.Logo === 'no data' ? (
                            <img
                              className="featured-company-logo"
                              alt="test"
                              src={companyDefaultLogo}
                            />
                          ) : (
                            <img
                              className="featured-company-logo"
                              alt="test"
                              src={`https://s3-eu-west-1.amazonaws.com/globelynx-experts-images/public/${
                                val._source.Logo
                              }`}
                              onError={e => {
                                e.target.onerror = null
                                e.target.src = companyDefaultLogo
                              }}
                            />
                          )}
                        </div>
                      </div>
                      {/* <div className="row">
														<img alt="test" src={skynetlogo} style={{ width: '100%' }} />
													</div> */}
                    </div>
                  </div>
                  {/* <p className="has-text-centered">{item.text}</p> */}
                </section>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

export default SearchResults
