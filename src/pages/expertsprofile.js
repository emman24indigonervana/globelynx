import React from 'react'
import Layout from '../components/Layout'

import elasticsearch from 'elasticsearch'
// import Features from '../components/Features'
// import Testimonials from '../components/Testimonials'
import RegisterSection from '../components/Register'
import RecentBookings from '../components/RecentBookings'
import { Link } from 'gatsby'

import defaultPicture from '../img/default-profile.png'

import '../components/Styles/ExpertsProfile.scss'

import ExpertsProfileMap from '../components/Maps/ExpertsProfileMap'

const connectionString =
  'https://search-experts-ayuwtxztr5pvnas52cxmrjbdkm.eu-west-1.es.amazonaws.com/'
const _index = 'experts'
const _type = '_doc'

let client = new elasticsearch.Client({
  host: connectionString,
})

let boundsData = []
let myChunk
const ExpertsProfile = class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      profileData: [],
      loading: 'is-loading',
      cameraName: 'loading',
      langCount: 5,
      markers: [],
      googleBounds: [],
      lastSearch: '',
    }

    this.showMoreLang = this.showMoreLang.bind(this)
    this.selectCheckBoxLanguage = this.selectCheckBoxLanguage.bind(this)
    this.selectCheckBoxSector = this.selectCheckBoxSector.bind(this)
  }

  componentDidMount() {
    let expertsId = this.props.location.search.substring(4)
    let expertUID = parseInt(expertsId)

    let expertsName = this.props.location.pathname;

    if (this.props.location.state === null) {
      client
        .search({
          index: _index,
          type: _type,
          body: {
            query: {
              match: {
                Path: expertsName,
              },
            },
          },
        })
        .then(
          function(body) {
            this.setState({
              profileData: body.hits.hits[0]._source,
              cameraName: '',
            })
            this.getMarkers(body.hits.hits[0]._source)
          }.bind(this),
          function(error) {
            //console.trace(error.message);
          }
        )
    } else {
      const data = this.props.location.state.expertsData
      this.setState({
        profileData: data,
        cameraName: '',
        lastSearch: this.props.location.state.lastSearch,
      })
      this.getMarkers(data)
    }
  }

  getMarkers(data) {
    let streetAddress1 =
        data['Address 1'] === 'no data' ? '' : data['Address 1'],
      streetAddress2 = data['Address 2'] === 'no data' ? '' : data['Address 2'],
      country = data.Country === 'no data' ? '' : data.Country,
      town = data.Town === 'no data' ? '' : data.Town,
      fullAddress = `${streetAddress1} ${streetAddress2} ${town} ${country}`

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=AIzaSyA6Z-_4cy4-LlltkXzy3jztRvN4bMJYNHg`
    )
      .then(response => {
        return response.json()
      })
      .then(addressResponse => {
        let lat = addressResponse.results[0].geometry.location.lat - 0.1
        let lng = addressResponse.results[0].geometry.location.lng - 0.1
        boundsData.push(
          [lat.toString(), lng.toString()],
          [
            addressResponse.results[0].geometry.location.lat.toString(),
            addressResponse.results[0].geometry.location.lng.toString(),
          ]
        )

        this.setState({
          markers: this.state.markers.concat([
            {
              key: `marker0`,
              position: [
                addressResponse.results[0].geometry.location.lat,
                addressResponse.results[0].geometry.location.lng,
              ],
              name: data.Name,
              image: data['Profile Image'],
              company: data.Company,
              sector: data.Sector,
            },
          ]),
          googleBounds: boundsData,
          loading: 'is-loading',
        })
      })
      .then(() => {
        this.setState({ loading: '' })
      })
  }

  showMoreLang() {
    let btnHtml = document.querySelector('#show-more-lang').innerHTML

    if (btnHtml === '+ Show more..') {
      let val = (this.state.langCount = 48)
      this.setState({ langCount: val })
      document.querySelector('#show-more-lang').innerHTML = '- Show fewer'
    } else {
      let val = this.state.langCount - 43
      this.setState({ langCount: val })
      document.querySelector('#show-more-lang').innerHTML = '+ Show more..'
    }
  }

  selectCheckBoxSector(e) {
    let targetValue = e.target.value
    client
      .search({
        index: _index,
        type: _type,
        size: 5,
        body: {
          query: {
            match: {
              Sector: targetValue,
            },
          },
        },
      })
      .then(
        function(body) {
          // this.setState({ searchResults: body.hits.hits })
          body.hits.hits.map((val, key) => {
            let streetAddress1 =
                val._source['Address 1'] === 'no data'
                  ? ''
                  : val._source['Address 1'],
              streetAddress2 =
                val._source['Address 2'] === 'no data'
                  ? ''
                  : val._source['Address 2'],
              country =
                val._source.Country === 'no data' ? '' : val._source.Country,
              town = val._source.Town === 'no data' ? '' : val._source.Town,
              fullAddress = `${streetAddress1} ${streetAddress2} ${town} ${country}`

            fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=AIzaSyA6Z-_4cy4-LlltkXzy3jztRvN4bMJYNHg`
            )
              .then(response => {
                return response.json()
              })
              .then(addressResponse => {
                boundsData.push([
                  addressResponse.results[0].geometry.location.lat.toString(),
                  addressResponse.results[0].geometry.location.lng.toString(),
                ])

                this.setState({
                  markers: this.state.markers.concat([
                    {
                      key: `marker${key + 1}`,
                      position: [
                        addressResponse.results[0].geometry.location.lat,
                        addressResponse.results[0].geometry.location.lng,
                      ],
                      name: val._source.Name,
                      image: val._source['Profile Image'],
                      company: val._source.Company,
                      sector: val._source.Sector,
                    },
                  ]),
                  googleBounds: boundsData,
                  loading: 'is-loading',
                })
              })
              .then(() => {
                this.setState({ loading: '' })
              })
          })
        }.bind(this),
        function(error) {
          //console.trace(error.message);
        }
      )
  }

  selectCheckBoxLanguage(e) {
    let targetValue = e.target.value
    client
      .search({
        index: _index,
        type: _type,
        size: 5,
        body: {
          query: {
            function_score: {
              query: { match_all: {} },
              random_score: {},
            },
          },
        },
      })
      .then(
        function(body) {
          // this.setState({ searchResults: body.hits.hits })
          body.hits.hits.map((val, key) => {
            let streetAddress1 =
                val._source['Address 1'] === 'no data'
                  ? ''
                  : val._source['Address 1'],
              streetAddress2 =
                val._source['Address 2'] === 'no data'
                  ? ''
                  : val._source['Address 2'],
              country =
                val._source.Country === 'no data' ? '' : val._source.Country,
              town = val._source.Town === 'no data' ? '' : val._source.Town,
              fullAddress = `${streetAddress1} ${streetAddress2} ${town} ${country}`

            fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=AIzaSyA6Z-_4cy4-LlltkXzy3jztRvN4bMJYNHg`
            )
              .then(response => {
                return response.json()
              })
              .then(addressResponse => {
                boundsData.push([
                  addressResponse.results[0].geometry.location.lat.toString(),
                  addressResponse.results[0].geometry.location.lng.toString(),
                ])

                this.setState({
                  markers: this.state.markers.concat([
                    {
                      key: `marker${key + 1}`,
                      position: [
                        addressResponse.results[0].geometry.location.lat,
                        addressResponse.results[0].geometry.location.lng,
                      ],
                      name: val._source.Name,
                      image: val._source['Profile Image'],
                      company: val._source.Company,
                      sector: val._source.Sector,
                    },
                  ]),
                  googleBounds: boundsData,
                  loading: 'is-loading',
                })
              })
              .then(() => {
                this.setState({ loading: '' })
              })
          })
        }.bind(this),
        function(error) {
          //console.trace(error.message);
        }
      )
  }

  chunkArray(myArray, chunk_size) {
    var index = 0
    var arrayLength = myArray.length
    var tempArray = []

    for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index + chunk_size)
      // Do something if you want with the group
      tempArray.push(myChunk)
    }

    return tempArray
  }

  render() {
    let Expertmap
    let OtherExperts
    // let dataTEst
    let specialisms1
    let specialisms2
    let specialisms3
    if (this.state.loading === '') {
      // dataTEst = this.state.profileData.Subjects.split(',').join('</br>  <i class="fa fa-circle" style="color:#3dbdd6;font-size:16px"></i> ');
      // dataTEst = '</br>  <i class="fa fa-circle" style="color:#3dbdd6; font-size:16px"></i> ' + dataTEst
      let count =  Math.ceil( this.state.profileData.Subjects.split(',').length  / 3)

        console.log(count)

      let SpecialismsChunk = this.chunkArray(
        this.state.profileData.Subjects.split(','), count
      ) 

      // console.log( Math.ceil( this.state.profileData.Subjects.split(',').length / 3))

   

      if (SpecialismsChunk.length === 1) {
        specialisms1 = SpecialismsChunk[0].join(
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6;font-size:16px"></i> '
        )
        specialisms1 =
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6; font-size:16px"></i> ' +
          specialisms1
      }

      if (SpecialismsChunk.length === 2) {
        specialisms1 = SpecialismsChunk[0].join(
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6;font-size:16px"></i> '
        )
        specialisms1 =
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6; font-size:16px"></i> ' +
          specialisms1
        specialisms2 = SpecialismsChunk[1].join(
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6;font-size:16px"></i> '
        )
        specialisms2 =
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6; font-size:16px"></i> ' +
          specialisms2
      }

      if (SpecialismsChunk.length === 3) {
        specialisms1 = SpecialismsChunk[0].join(
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6;font-size:16px"></i> '
        )
        specialisms1 =
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6; font-size:16px"></i> ' +
          specialisms1
        specialisms2 = SpecialismsChunk[1].join(
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6;font-size:16px"></i> '
        )
        specialisms2 =
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6; font-size:16px"></i> ' +
          specialisms2
        specialisms3 = SpecialismsChunk[2].join(
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6;font-size:16px"></i> '
        )
        specialisms3 =
          '</br>  <i class="fa fa-circle" style="color:#3dbdd6; font-size:16px"></i> ' +
          specialisms3
      }

      Expertmap = (
        <ExpertsProfileMap
          googleBounds={this.state.googleBounds}
          markers={this.state.markers}
        />
      )

      OtherExperts = (
        <RecentBookings
          expertName={this.state.profileData.Name}
          companyName={this.state.profileData.Company}
        />
      )
    }

    if (this.state.cameraName === '') {
      return (
        <Layout>
          <div
            className="is-fullwidth experts-profile-container"
            style={{ height: '350px' }}
          >
            <div className="container-fluid">
              <div
                className="row"
                style={{ background: '#3cbed6', height: '300px' }}
              >
                <div
                  className="three columns"
                  style={{ margin: '0', background: '#fff' }}
                >
                  {this.state.profileData['Profile Image'] ===
                  'do not want experts pictures published' ? (
                    <img
                      src={defaultPicture}
                      alt={defaultPicture}
                      className="experts-profile-image"
                    />
                  ) : (
                    <img
                      src={
                        this.state.profileData.Name.includes('camera')
                          ? `https://s3-eu-west-1.amazonaws.com/globelynx-experts-images/public/${
                              this.state.profileData.Logo
                            }`
                          : `https://s3-eu-west-1.amazonaws.com/globelynx-experts-images/public/${
                              this.state.profileData['Profile Image']
                            }`
                      }
                      alt={this.state.profileData['Profile Image']}
                      className="experts-profile-image"
                      style={{
                        height: '298px',
                        marginTop: '2px',
                      }}
                      onError={e => {
                        e.target.onerror = null
                        e.target.src = defaultPicture
                      }}
                    />
                  )}
                </div>
                <div className="nine columns has-text-centered">
                  <div className=" profile-banner">
                    {/* <div className=" profile-banner animated lightSpeedIn"> */}
                    <div className="profile-details">
                      <h1 style={{ marginTop: 0 }}>
                        {this.state.profileData.Name}
                      </h1>
                      <h2>{this.state.profileData.Company}</h2>
                      <h2>{this.state.profileData['Job Title']}</h2>
                      <h2>{this.state.profileData.Country}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="container-fluid"
            style={{ marginTop: '25px', marginBottom: '25px' }}
          >
            <div className="row">
              {/* <Link to="/experts" style={{ textDecoration: 'none', color: '#4e5863', position: 'absolute', top: '0' }}>
							<i className="fa fa-arrow-left" /> Back to search results
              </Link> */}
              <div className="three columns">
                {/* <h2 className="experts-profile-name" >
								{this.state.profileData.Name}
							</h2> */}
                <a
                  href={`tel:${this.state.profileData['Telephone 1']}`}
                  className="button is-fullwidth experts-profile-enquire-btn"
                >
                  ENQUIRE NOW
                </a>
                {/* {this.state.profileData['Profile Image'] ===
								'do not want experts pictures published' ? (
									<img src={defaultPicture} className="experts-profile-image" />
								) : (
									<img
										src={`https://s3-ap-southeast-1.amazonaws.com/${
											this.state.profileData['Profile Image']
											}`}
										className="experts-profile-image"
										onError={e => {
											e.target.onerror = null
											e.target.src = defaultPicture
										}}
									/>
								)} */}
                <div className="experts-details-container has-background-gray has-text-centered">
                  <h3>CONTACT</h3>
                  <div className="has-text-left experts-details-icon-container has-text-ellipsis">
                    <i className="fa fa-at experts-details-icon" />
                    <span style={{ fontWeight: '300' }}>
                      {this.state.profileData['Press Office Email'] == "no data" ? this.state.profileData['Expert Email'] : this.state.profileData['Press Office Email']}
                    </span>
                    <br />
                    <i
                      className="fa fa-phone experts-details-icon"
                      style={{ transform: 'rotate(90deg)' }}
                    />
                    <span style={{ fontWeight: '300' }}>
                      {this.state.profileData['Telephone 1']}
                    </span>
                  </div>

                  {/* <h3>SUBJECTS</h3>
                <p>{this.state.profileData.Subjects}</p> */}
                  {this.state.profileData.Languages === 'English' ? (
                    ''
                  ) : (
                    <>
                      <hr
                        style={{
                          backgroundColor: 'gray',
                          width: '80%',
                          margin: '10px auto',
                        }}
                      />
                      <h3>LANGUAGE</h3>
                      <p>{this.state.profileData.Languages}</p>
                    </>
                  )}
                </div>
                <a
                  href={`experts${
                    this.state.lastSearch === '' ? '' : '?search='
                  }${this.state.lastSearch}`}
                  className="button is-fullwidth experts-profile-enquire-btn"
                  state={{ expertsProfile: 'from_expertsprofile' }}
                  style={{ marginTop: '20px' }}
                >
                  RETURN TO RESULTS
                </a>
              </div>

              <div
                className="nine columns"
                style={{ padding: '0 0 0 35px', marginTop: 0 }}
              >
                {/* <h1>{this.state.profileData.Subjects}</h1> */}
                <h1>Biography</h1>
                <div
                  style={{
                    fontSize: '19px',
                    lineHeight: '2',
                    fontWeight: '300',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: this.state.profileData.Bio,
                  }}
                />
                <div
                  className="row specialism-container"
                  style={{ background: '#f7f5f6', padding: '20px' }}
                >
                  <h1 style={{ margin: '0' }}>Topics</h1>
                  <div className="four columns">
                    <div
                      style={{
                        fontSize: '18px',
                        lineHeight: '30px',
                      }}
                      dangerouslySetInnerHTML={{ __html: specialisms1 }}
                    />
                  </div>
                  <div className="four columns">
                    <div
                      style={{
                        fontSize: '18px',
                        lineHeight: '30px',
                      }}
                      dangerouslySetInnerHTML={{ __html: specialisms2 }}
                    />
                  </div>
                  <div className="four columns">
                    <div
                      style={{
                        fontSize: '18px',
                        lineHeight: '30px',
                      }}
                      dangerouslySetInnerHTML={{ __html: specialisms3 }}
                    />
                  </div>
                </div>
                {/* <iframe
									width="300"
									height="300"
									src="https://www.youtube.com/embed/5HDuNU8l5NY?modestbranding=1&mute=1&controls=0&fs=0&loop=1&rel=0&showinfo=0&disablekb=1&playlist=5HDuNU8l5NY"
									frameBorder="0"
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/> */}
              </div>
            </div>
          </div>
          <div className="is-fullwidth ">{Expertmap}</div>
          {/* <div className="container-fluid">
            <div className="row">
              <div className="twelve columns" style={{width: '98%'}}>{Expertmap}</div>
              <div className="two columns">
                <div
                  className="container"
                  style={{
                    border: '1px solid #e8e8e8',
                    background: '#f7f5f6',
                    borderRadius: '5px',
                    textAlign: 'left',
                    width: '100%',
                    padding: '20px',
                  }}
                >
                  <h2>LANGUAGES</h2>
                  {_.map(
                    languageArrStatic.slice(0, this.state.langCount),
                    (val, key) => {
                      return (
                        <label className="checkbox" key={key}>
                          <input
                            type="checkbox"
                            className="checklist-language"
                            onChange={this.selectCheckBoxLanguage}
                            value={val.lang}
                          />
                          <span> {val.lang}</span>
                        </label>
                      )
                    }
                  )}
                  <p
                        onClick={this.showMoreLang}
                        style={{ cursor: 'pointer' }}
                        id="show-more-lang"
                      >
                        + Show more..
                      </p>*
                  <hr />
                  <h2>Sectors</h2>
                  {_.map(sectorArrStatic, (val, key) => {
                    return (
                      <label className="checkbox" key={key}>
                        <input
                          type="checkbox"
                          onChange={this.selectCheckBoxSector}
                          value={val.sector}
                        />
                        <span> {val.sector}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          </div> */}

          <div className=" is-fullwidth has-background-gray">
            <div className="container-fluid">
              <div className="row has-padding has-text-centered">
                <h1>OTHER EXPERTS</h1>
                {OtherExperts}
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
          <div className=" is-fullwidth">
            <RegisterSection />
          </div>
        </Layout>
      )
    } else {
      return null
    }
  }
}

export default ExpertsProfile
