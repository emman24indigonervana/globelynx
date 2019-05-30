import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import logo from '../img/logo.png'

import elasticsearch from 'elasticsearch'
import _ from 'lodash'

import Slider from 'react-slick'

import './Styles/Navbar.scss'

import SearchResults from './SearchResults'

import VideoBackground from './VideoBackground'

import MainMenu from './MainMenu'

const connectionString =
  'https://search-experts-ayuwtxztr5pvnas52cxmrjbdkm.eu-west-1.es.amazonaws.com/'
const _index = 'experts'
const _type = '_doc'

let client = new elasticsearch.Client({
  host: connectionString,
})

let globalSearchQuery = 'Aberdeen Asset Management PLC'
let globalSearchSize = 12
let globalSearchFrom = 3

let languageArrStatic = [
  { lang: 'English', size: 1235 },
  { lang: 'German', size: 77 },
  { lang: 'French', size: 63 },
  { lang: 'Italian', size: 27 },
  { lang: 'Spanish', size: 25 },
  { lang: 'English, German', size: 18 },
  { lang: 'Chinese', size: 13 },
  { lang: 'Russian', size: 12 },
  { lang: 'Greek', size: 8 },
  { lang: 'Turkish', size: 7 },
  { lang: 'Arabic', size: 6 },
  { lang: 'Dutch', size: 5 },
  { lang: 'Swedish', size: 5 },
  { lang: 'Danish', size: 4 },
  { lang: 'Deutsch', size: 4 },
  { lang: 'English, Mandarin', size: 4 },
  { lang: 'English, Greek', size: 3 },
  { lang: 'Japanese', size: 3 },
  { lang: 'Portuguese', size: 3 },
  { lang: 'Cantonese', size: 2 },
  { lang: 'Cantonese, English, Mandarin', size: 2 },
  { lang: 'English, Arabic', size: 2 },
  { lang: 'English, Russian', size: 2 },
  { lang: 'English, Spanish', size: 2 },
  { lang: 'English, Welsh', size: 2 },
  { lang: 'Mandarin', size: 2 },
  { lang: 'Multiple', size: 2 },
  { lang: 'Norwegian', size: 2 },
  { lang: 'Polish', size: 2 },
  { lang: 'Armenian', size: 1 },
  { lang: 'Bulgarian', size: 1 },
  { lang: 'Cantonese, English, Mandarin', size: 1 },
  { lang: 'Czech', size: 1 },
  { lang: 'English, Bahasa Malaysia', size: 1 },
  { lang: 'English, Bengali, Hindi, Urdu', size: 1 },
  { lang: 'English, Cantonese Chinese', size: 1 },
  { lang: 'English, Danish', size: 1 },
  { lang: 'English, Dari', size: 1 },
  { lang: 'English, Farsi', size: 1 },
  { lang: 'English, French, Dutch', size: 1 },
  { lang: 'English, French, German, Spanish', size: 1 },
  { lang: 'English, French, Italian', size: 1 },
  { lang: 'English, German, Persian', size: 1 },
  { lang: 'English, Hungarian', size: 1 },
  { lang: 'English, Italian', size: 1 },
  { lang: 'English, Polish', size: 1 },
  { lang: 'English, Portuguese', size: 1 },
  { lang: 'English, Portuguese, Spanish', size: 1 },
]

let sectorArrStatic = [
  { sector: 'Education', size: 713 },
  { sector: 'Finance', size: 415 },
  { sector: 'Professional services', size: 60 },
  { sector: 'Media', size: 35 },
  { sector: 'Weather', size: 12 },
  { sector: 'News', size: 10 },
  { sector: 'Audit/professional services', size: 9 },
  { sector: 'Lawyers', size: 9 },
  { sector: 'Transport', size: 7 },
]

const newsTickSettings = {
  speed: 10000,
  autoplay: true,
  autoplaySpeed: 0,
  centerMode: true,
  cssEase: 'linear',
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: true,
  initialSlide: 1,
  arrows: false,
  buttons: false,
}

let firstChange = 0

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [],
      searchLanguages: [],
      langCount: 5,
      searchSectionViewClass: 'is-display-none',
      loading: 'is-loading',
      navHeader: 'header',
      loadingHide: true,
      showSlider: 'is-visibility-hidden',
      searchResultsSection: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.showMenu = this.showMenu.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.tagSearch = this.tagSearch.bind(this)
    this.selectCheckBoxLanguage = this.selectCheckBoxLanguage.bind(this)
    this.selectCheckBoxSector = this.selectCheckBoxSector.bind(this)
    this.showMoreLang = this.showMoreLang.bind(this)
    this.openNav = this.openNav.bind(this)
    this.closeNav = this.closeNav.bind(this)
    this.openloginModal = this.openloginModal.bind(this)
    this.closeloginModal = this.closeloginModal.bind(this)
    this.loginExperts = this.loginExperts.bind(this)
  }

  componentDidMount() {
    var url_string = window.location.href
    var url = new URL(url_string)
    var expertsSearchFromOtherPage = url.searchParams.get('search')

    document.querySelector('#search-input').value = expertsSearchFromOtherPage

    this.timeoutId = setTimeout(() => {
      if (this.props.location === 'expertspage') {
        if (expertsSearchFromOtherPage !== null) {
          globalSearchQuery = expertsSearchFromOtherPage
        } else {
          globalSearchQuery = ''
        }
        this.elasticSearchRandomCustomQuery()
      } else {
        client
          .search({
            index: _index,
            type: _type,
            size: globalSearchSize,
            body: {
              query: {
                query_string: {
                  query: globalSearchQuery + '*',
                  fields: [
                    'Name',
                    'Email',
                    'Company',
                    'Country',
                    'Subjects',
                    'Languages',
                  ],
                },
              },
            },
          })
          .then(
            function(body) {
              this.setState({ searchResults: body.hits.hits, loading: '' })
            }.bind(this),
            function(error) {
              //console.trace(error.message);
            }
          )
      }
    }, 100)
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    window.removeEventListener('scroll', this.handleScroll)
  }

  loginExperts() {
    document.querySelector('.experts-login').style.display = 'block'
    document.querySelector('.logins-btn').style.display = 'none'
    document.querySelector('.modal-content ').style.height = '40%'
  }

  openloginModal() {
    document.querySelector('#loginModalContainer').style.display = 'block'
  }

  closeloginModal() {
    document.querySelector('#loginModalContainer').style.display = 'none'
    document.querySelector('.experts-login').style.display = 'none'
    document.querySelector('.logins-btn').style.display = 'block'
    document.querySelector('.modal-content ').style.height = '20%'
  }

  handleChange(event) {
    firstChange = 1

    if (firstChange === 1) {
      this.setState({ loadingHide: true })
      window.addEventListener('scroll', this.handleScroll)
    }

    if (this.props.location === 'homepage') {
      globalSearchSize = 12
    } else {
      globalSearchSize = 10
    }

    if (event.target.value === '') {
      globalSearchQuery = ''
      this.elasticSearchRandomCustomQuery()
    } else {
      globalSearchQuery = event.target.value
      this.elasticSearchCustomQuery()
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (this.props.location !== 'expertspage') {
        window.location.href = `/experts?search=${event.target.value}`
      }
    }
  }

  handleScroll() {
    const windowpos = window.pageYOffset
    const bottom_of_search = document
      .querySelector('#experts-search-container')
      .getBoundingClientRect()

    if (this.props.location === 'expertspage') {
      if (windowpos > bottom_of_search.bottom) {
        globalSearchSize += 1
        globalSearchFrom = globalSearchSize + 1
        client
          .search({
            index: _index,
            type: _type,
            size: 1,
            from: globalSearchFrom,
            body: {
              query: {
               multi_match: {
                 query: globalSearchQuery,
                 fields: ["Name", "Email", "Company", "Country", "Subjects"],
               },
             },
            },
          })
          .then(
            function(body) {
              if (globalSearchSize < body.hits.total) {
                var joined = this.state.searchResults.concat(body.hits.hits[0])
                this.setState({ searchResults: joined })
              } else {
                this.setState({ loadingHide: true })
              }
            }.bind(this),
            function(error) {
              //console.trace(error.message);
            }
          )
      }
    }
  }

  elasticSearchRandomCustomQuery() {
    let customquery
    if (globalSearchQuery === '') {
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
          query_string: {
            query: globalSearchQuery + '*',
            fields: ['Name', 'Email', 'Company', 'Country', 'Subjects'],
          },
        },
      }
    }

    client
      .search({
        index: _index,
        type: _type,
        size: globalSearchSize,
        body: customquery,
      })
      .then(
        function(body) {
          if (body.hits.hits.length === 0 || body.hits.hits === undefined) {
            if (this.props.location === 'expertspage') {
              document.querySelector('#no-search-results').innerHTML =
                'Sorry - none of our experts are listed under that term. Why not try searching using a different word or call us for help finding the right interviewee +44 (0)207 963 7021'

              this.setState({
                searchSectionViewClass: 'is-display-none',
                // loadingHide: false,
              })
            }
          } else {
            if (this.props.location === 'expertspage') {
              this.setState({
                searchResults: body.hits.hits,
                searchSectionViewClass: '',
                // loadingHide: false,
              })
            }
          }
        }.bind(this),
        function(error) {
          //console.trace(error.message);
        }
      )
  }

  elasticSearchCustomQuery() {
    client
      .search({
        index: _index,
        type: _type,
        size: globalSearchSize,
        body: {
          query: {
            query_string: {
              query: globalSearchQuery + '*',
              fields: ['Name', 'Email', 'Company', 'Country', 'Subjects'],
            },
          },
        },
      })
      .then(
        function(body) {
          if (body.hits.hits.length === 0 || body.hits.hits === undefined) {
            if (this.props.location === 'expertspage') {
              document.querySelector('#no-search-results').innerHTML =
                'Sorry - none of our experts are listed under that term. Why not try searching using a different word or call us for help finding the right interviewee +44 (0)207 963 7021'
              this.setState({
                searchSectionViewClass: 'is-display-none',
                loadingHide: false,
              })
            }
          } else {
            if (this.props.location === 'expertspage') {
              this.setState({
                searchResults: body.hits.hits,
                searchSectionViewClass: '',
                loadingHide: false,
              })
            }
          }
        }.bind(this),
        function(error) {
          //console.trace(error.message);
        }
      )
  }

  showMenu() {
    if (this.state.navHeader === 'header') {
      this.setState({ navHeader: 'header responsive' })
    } else {
      this.setState({ navHeader: 'header' })
    }
  }

  openNav() {
    document.getElementById('mobilenav').style.height = '100%'
  }

  closeNav() {
    document.getElementById('mobilenav').style.height = '0%'
  }

  tagSearch(e) {
    let tagBtnText = e.target.innerHTML
    globalSearchQuery = tagBtnText
    document.querySelector('#search-input').value = tagBtnText

    this.elasticSearchCustomQuery()
  }

  selectCheckBoxLanguage(e) {
    let targetValue = e.target.value

      var array = []
      var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

      for (var i = 0; i < checkboxes.length; i++) {
      array.push(checkboxes[i].value)
      }

      console.log(array.join())

    this.setState({
      searchResultsSection: 'is-display-none',
      loadingHide: false,
    })

    client
      .search({
        index: _index,
        type: _type,
        size: globalSearchSize,
        body: {
          query: {
            match: {
              Languages: targetValue,
            },
          },
        },
      })
      .then(
        function(body) {
          this.setState({
            searchResults: body.hits.hits,
            searchResultsSection: '',
            loadingHide: false,
          })
        }.bind(this),
        function(error) {
          //console.trace(error.message);
        }
      )
  }

  selectCheckBoxSector(e) {
    let targetValue = e.target.value

    this.setState({
      searchResultsSection: 'is-display-none',
      loadingHide: false,
    })

    client
      .search({
        index: _index,
        type: _type,
        size: globalSearchSize,
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
          this.setState({
            searchResults: body.hits.hits,
            searchResultsSection: '',
            loadingHide: false,
          })
        }.bind(this),
        function(error) {
          //console.trace(error.message);
        }
      )
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

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allFeednewsUpdates {
              edges {
                node {
                  title
                  link
                  content
                }
              }
            }
          }
        `}
        render={data => (
          <>
            <MainMenu closeNav={this.closeNav} location={this.props.location} />
            {/* <div id="mobilenav" className="overlay">
						<a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
						<div className="overlay-content">
							<Link activeStyle={{ color: '#13a7da' }} to="/">
								Home
							</Link>
							<Link activeStyle={{ color: '#13a7da' }} to="/about">
								About
							</Link>
							<Link activeStyle={{ color: '#13a7da' }} to="/experts">
								Experts
							</Link>
							<Link activeStyle={{ color: '#13a7da' }} to="/products">
								Services
							</Link>
							<Link activeStyle={{ color: '#13a7da' }} to="/cameras">
								Cameras
							</Link>
							<Link activeStyle={{ color: '#13a7da' }} to="/contact">
								Contact
							</Link>
						</div>
					</div> */}
            <div
              className={
                this.props.location === 'homepage'
                  ? 'hero-section-home video-background'
                  : 'hero-section-not-home'
              }
              style={
                this.props.location === 'dashboard' ? { display: 'none' } : {}
              }
            >
              <div className={this.state.navHeader}>
                <div className="header-wrapper">
                  <a href="/" style={{ padding: 0, display: 'inline' }}>
                    <img src={logo} className="logo" alt="test" />
                  </a>
                  {/* <div className="header-left">
                    <Link activeStyle={{ color: '#13a7da' }} to="/">
                      Home
                    </Link>
                    <Link activeStyle={{ color: '#13a7da' }} to="/about">
                      About
                    </Link>
                    <Link activeStyle={{ color: '#13a7da' }} to="/experts">
                      Experts
                    </Link>
                    <Link activeStyle={{ color: '#13a7da' }} to="/products">
                      Services
                    </Link>
                    <Link activeStyle={{ color: '#13a7da' }} to="/cameras">
                      Cameras
                    </Link>
                    <Link activeStyle={{ color: '#13a7da' }} to="/contact">
                      Contact
                    </Link>
                  </div> */}
                  <div className="header-right">
                    <a href="http://bookings.globelynx.com/">
                      <div className="navbar-login-btn-md">
                        <i className="fa fa-user icon-round" />Login
                      </div>
                    </a>
                    {/*  <span
                      id="loginModalId"  
                      onClick={this.openloginModal} 
                      style={{cursor: 'pointer'}} >
                        <i className="fa fa-sign-out-alt icon-round" />
                    </span> */}
                    <span
                      className="icon"
                      onClick={this.openNav}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fa fa-bars" />
                    </span>
                  </div>
                </div>
              </div>
              <VideoBackground location={this.props.location} />
              {/* <div
                className={
                  this.props.location === 'homepage'
                    ? 'video-foreground'
                    : 'is-display-none'
                }
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/5HDuNU8l5NY?modestbranding=1&mute=1&autoplay=1&controls=0&fs=0&loop=1&rel=0&showinfo=0&disablekb=1&playlist=5HDuNU8l5NY"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div> */}
              <section className="is-fullwidth">
                <div className="container-fluid">
                  <div className="row">
                    <div className="twelve columns">
                      <div
                        className={
                          this.props.location === 'homepage'
                            ? 'hero-container'
                            : 'hero-container-not-homepage'
                        }
                      >
                        <h1 style={{ textTransform: 'initial' }}>
                          The Home Of The Expert
                        </h1>
                        <h2 style={{ textTransform: 'initial' }}>
                          A community connecting experts to global broadcasters
                        </h2>
                        {/* <h1>CONNECTING EXPERTS TO BROADCASTERS GLOBALLY</h1> */}
                        <div className="inner-addon left-addon">
                          <i className="fa fa-search left-fa" />
                          <input
                            type="text"
                            placeholder="Search"
                            className="is-fullwidth"
                            id="search-input"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                          />
                           {/*  <div  style={{color:'#4e5863', cursor:'pointer'}}>
                         <i className="fa fa-angle-right right-fa"/>
                         </div> */}
                        </div>
                        <div className="hero-popular-btn">
                          {/* 
													popular search bar removed on the new feedback :) 

													<span style={{color: '#fff'}}> Popular : </span>
												{
													tagsButton.map((val, key) => {
														return(
															<a
															className="button tags-button"
															key={key}
															onClick={this.tagSearch}
														>
															{val.sector}
														</a>
														)
													})
												} */}

                          {/* {this.state.searchResults.length !== 0
                            ? this.state.searchResults
                                .slice(0, 5)
                                .map((val, key) => {
                                  return (
                                    <a
                                      className="button tags-button"
                                      key={key}
                                      onClick={this.tagSearch}
                                    >
                                      {val._source.Title}
                                    </a>
                                  )
                                })
                            : this.state.searchResults
                                .slice(0, 5)
                                .map((val, key) => {
                                  return (
                                    <a
                                      className="button tags-button"
                                      key={key}
                                      onClick={this.tagSearch}
                                    >
                                      {val._source.Title}
                                    </a>
                                  )
                                })} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div
              className={`info-box animated fadeIn delay-2s`}
              style={
                this.props.location === 'dashboard' ? { display: 'none' } : {}
              }
            >
              <div className="info-box-icon">
                <h4>NEWS</h4>
              </div>
              <div
                className="info-box-content"
                style={{ background: '#4e5863' }}
              >
                <Slider
                  {...newsTickSettings}
                  className=" animated fadeIn delay-2s"
                >
                  {_.map(data.allFeednewsUpdates.edges, (val, key) => {
                    return (
                      <span
                        key={key}
                        className="animated fadeIn delay-2s info-box-text has-text-ellipsis"
                        dangerouslySetInnerHTML={{ __html: val.node.content }}
                      />
                    )
                  })}
                </Slider>
              </div>
            </div>

            <div
              className={`is-fullwidth ${this.state.searchSectionViewClass}`}
              id="experts-search-container"
            >
              <div className="container-fluid">
                <div className="row has-padding has-text-centered">
                  <div className="three columns">
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
                                name="check_lang"
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
                      </p>
                      <hr />
                      <h2>Topics</h2>
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
                  <div
                    className={`nine columns ${
                      this.state.searchResultsSection
                    }`}
                  >
                    <SearchResults
                      results={this.state.searchResults}
                      lastSearch={globalSearchQuery}
                    />
                  </div>
                  <div className="three columns" />
                  <div className="nine columns">
                    <div
                      className={`${
                        this.state.loadingHide ? 'is-display-none' : ''
                      }`}
                    >
                      <div className={`lds-ellipsis `}>
                        <div />
                        <div />
                        <div />
                        <div />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`is-fullwidth  ${
                this.state.searchSectionViewClass === '' ||
                this.props.location !== 'expertspage'
                  ? 'is-display-none'
                  : ''
              }`}
            >
              <div className="container-fluid">
                <div className="row has-padding has-text-centered">
                  <div className="twelve column">
                    <h2 id="no-search-results">
                      <div className={`lds-ellipsis `}>
                        <div />
                        <div />
                        <div />
                        <div />
                      </div>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div id="loginModalContainer" className="modal">
              <div className="modal-content has-text-centered">
                <span className="close" onClick={this.closeloginModal}>
                  &times;
                </span>
                <h2 className="has-text-centered">LOGIN</h2>

                <div className="logins-btn">
                  <a
                    href="/admin"
                    className="has-text-centered button register-submit"
                  >
                    ADMIN
                  </a>
                  or
                  <span
                    className="has-text-centered button register-submit"
                    onClick={this.loginExperts}
                  >
                    EXPERTS
                  </span>
                </div>

                <div className="experts-login" style={{ display: 'none' }}>
                  <div className="field">
                    <label className="label" htmlFor={'name'} />
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        required={true}
                      />
                      <label className="form-control-placeholder">
                        Username
                      </label>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor={'name'} />
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="password"
                        required={true}
                      />
                      <label className="form-control-placeholder">
                        Password
                      </label>
                    </div>
                  </div>

                  <div className="field">
                    <button className="butto register-submit" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      />
    )
  }
}

export default Navbar
