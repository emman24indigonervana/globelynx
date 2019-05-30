import React, { Component } from 'react'
// import Link from 'gatsby-link'

// import sampleprofile from '../img/sampleprofile.jpg'
// import testImage from '../img/Aberdeen-logo.png'
// import skynetlogo from '../img/skynet.png'

import defaultProfile from '../img/default-profile.png'

import companyDefaultLogo from '../img/company-default.jpg'

import elasticsearch from 'elasticsearch'

import _ from 'lodash'

const connectionString =
  'https://search-experts-ayuwtxztr5pvnas52cxmrjbdkm.eu-west-1.es.amazonaws.com/'
const _index = 'experts'
const _type = '_doc'

let client = new elasticsearch.Client({
  host: connectionString,
})

let counter = 0

class RecentBookings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [],
      filteredExpert: '',
    }
  }

  componentDidMount() {
    counter = 0
    let customquery

    if (
      this.props.companyName === undefined ||
      this.props.expertName === undefined
    ) {
      customquery = {
        query: {
          function_score: {
            query: { match_all: {} },
            random_score: {},
          },
        },
      }
    } else {
      customquery = {
        query: {
          multi_match: {
            query: this.props.companyName,
            fields: [
              'Name',
              'Expert Email',
              'Company',
              'Country',
              'Subjects',
              'Languages',
            ],
          },
        },
      }

      // client
      // .search({
      //   index: _index,
      //   type: _type,
      //   size: 4,
      //   body: {
      // 		query: {
      // 			multi_match: {
      // 				query: this.props.companyName,
      // 				fields: [
      // 					'Name',
      // 					'Email',
      // 					'Company',
      // 					'Country',
      // 					'Subjects',
      // 					'Languages',
      // 				],
      // 			},
      // 		},
      //   },
      // })
      // .then(
      //   function(body) {
      //     this.setState({
      // 			searchResults: body.hits.hits,
      // 			filteredExpert: this.props.expertName
      // 		 })
      //   }.bind(this),
      //   function(error) {
      //     //console.trace(error.message);
      //   }
      // )
    }

    client
      .search({
        index: _index,
        type: _type,
        size: 4,
        body: customquery,
      })
      .then(
        function(body) {
          this.setState({
            searchResults: body.hits.hits,
            filteredExpert:
              this.props.expertName === undefined ? '' : this.props.expertName,
            filteredCompanyName:
              this.props.companyName === undefined
                ? ''
                : this.props.companyName,
          })
        }.bind(this),
        function(error) {
          //console.trace(error.message);
        }
      )
  }

  render() {

    console.log('---')
    console.log(this.state.searchResults)

    return (
      <>
        {this.state.searchResults.map((val, key) => {
          if (val._source.Name !== this.state.filteredExpert) {
            counter++
            if (counter <= 3) {
              if (_.isEmpty(this.props)) {
                return (
                  <div className="four columns" key={key}>
                    <a
                     href={`/${val._source.Path}`}
                      className="featured-section-links"
                      state={{ expertsData: val._source }}
                    >
                      <section className="featured-section">
                        <div className="featured-container">
                          <div className="featured-image-container">
                            <img
                              className="featured-profile-image"
                              src={`https://s3-eu-west-1.amazonaws.com/globelynx-experts-images/public/${
                                val._source['Profile Image']
                              }`}
                              alt={val._source['Profile Image']}
                              onError={e => {
                                e.target.onerror = null
                                e.target.src = defaultProfile
                              }}
                            />
                            <div className="contact-section">
                              <span className="fa fa-phone"> </span>
                              <span className="fa fa-at"> </span>
                            </div>
                          </div>
                          <div
                            className="has-background-gray"
                            style={{ textAlign: 'left' }}
                          >
                            <h3 className="featured-subjects has-text-ellipsis">
                              {val._source.Subjects}
                            </h3>
                            <div
                              className="row"
                              style={{ position: 'relative' }}
                            >
                              <div className="eight columns">
                                <div className="featured-details-container">
                                  <p className="featured-name has-text-ellipsis">
                                    {val._source.Name}
                                  </p>
                                  <p className="featured-title has-text-ellipsis">
                                    {val._source.Title}
                                  </p>
                                </div>
                              </div>
                              <div className="four columns">
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
                              </div>
                            </div>
                            {/* <div className="row">
																<img alt="test" src={skynetlogo} style={{ width: '100%' }} />
															</div> */}
                          </div>
                          {/* <p className="has-text-centered">{item.text}</p> */}
                        </div>
                      </section>
                    </a>
                  </div>
                )
              } else {
                if (this.state.filteredCompanyName === val._source.Company) {
                  return (
                    <div className="four columns" key={key}>
                      <a
                       href={`/${val._source.Path}`}
                        className="featured-section-links"
                        state={{ expertsData: val._source }}
                      >
                        <section className="featured-section">
                          <div className="featured-container">
                            <div className="featured-image-container">
                              <img
                                className="featured-profile-image"
                                src={`https://s3-eu-west-1.amazonaws.com/globelynx-experts-images/public/${
                                  val._source['Profile Image']
                                }`}
                                alt={val._source['Profile Image']}
                                onError={e => {
                                  e.target.onerror = null
                                  e.target.src = defaultProfile
                                }}
                              />
                              <div className="contact-section">
                                <span className="fa fa-phone"> </span>
                                <span className="fa fa-at"> </span>
                              </div>
                            </div>
                            <div
                              className="has-background-gray"
                              style={{ textAlign: 'left' }}
                            >
                              <h3 className="featured-subjects has-text-ellipsis">
                                {val._source.Subjects}
                              </h3>
                              <div
                                className="row"
                                style={{ position: 'relative' }}
                              >
                                <div className="eight columns">
                                  <div className="featured-details-container">
                                    <p className="featured-name has-text-ellipsis">
                                      {val._source.Name}
                                    </p>
                                    <p className="featured-title has-text-ellipsis">
                                      {val._source.Title}
                                    </p>
                                  </div>
                                </div>
                                <div className="four columns">
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
                                </div>
                              </div>
                              {/* <div className="row">
																<img alt="test" src={skynetlogo} style={{ width: '100%' }} />
															</div> */}
                            </div>
                            {/* <p className="has-text-centered">{item.text}</p> */}
                          </div>
                        </section>
                      </a>
                    </div>
                  )
                }
              }
            }
          }
        })}
      </>
    )
  }
}

export default RecentBookings
