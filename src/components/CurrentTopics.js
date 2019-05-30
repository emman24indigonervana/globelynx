import React, { Component } from 'react'
// import Link from 'gatsby-link'

import topicBg from '../img/bg-topics.jpg'
// import skynetlogo from '../img/skynet.png'
import Img from 'gatsby-image'

import elasticsearch from 'elasticsearch'

const connectionString =
  'https://search-experts-ayuwtxztr5pvnas52cxmrjbdkm.eu-west-1.es.amazonaws.com/'
const _index = 'experts'
const _type = '_doc'

let client = new elasticsearch.Client({
  host: connectionString,
})

class CurrentTopics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [],
    }

    this.topicsClick = this.topicsClick.bind(this)
  }

  componentDidMount() {
    // client
    //   .search({
    //     index: _index,
    //     type: _type,
    //     size: 3,
    //     body: {
    //       query: {
    //         match_all: {},
    //         // function_score : {
    //         // 	query : { match_all: {} },
    //         // 	random_score : {}
    //         // 	}
    //       },
    //     },
    //   })
    //   .then(
    //     function(body) {
    //       this.setState({ searchResults: body.hits.hits })
    //     }.bind(this),
    //     function(error) {
    //       //console.trace(error.message);
    //     }
    //   )
  }

  topicsClick(val) {
    window.scrollTo(0, 0)
    setTimeout(function() {
      window.location.href = `/experts?search=${val}`
    }, 10)
  }

  render() {
    // return (
    //   <div>
    //     {this.state.searchResults.map((val, key) => {
    //       return (
    //         <div className="four columns" key={key}>
    //           <div
    //             onClick={() => this.topicsClick(val)}
    //             className="featured-section-links"
    //           >
    //             <section className="featured-section">
    //               <div className="featured-container">
    //                 <div className="featured-image-container">
    //                   <img
    //                     alt={topicBg}
    //                     className="featured-profile-image"
    //                     src={topicBg}
    //                   />
    //                   <div className="current-topic-section">
    //                     <h2>
    //                       {val._source.Subjects.slice(-1) === ','
    //                         ? val._source.Subjects.slice(0, -1)
    //                         : val._source.Subjects}
    //                     </h2>
    //                   </div>
    //                 </div>
    //                 {/* <p className="has-text-centered">{item.text}</p> */}
    //               </div>
    //             </section>
    //           </div>
    //         </div>
    //       )
    //     })}
    //   </div>
    // )
    return (
      <>
        <div className="four columns">
          <div
            onClick={() => this.topicsClick('Brexit')}
            className="featured-section-links"
            style={{
              cursor: 'pointer',
            }}
          >
            <section className="featured-section">
              <div className="featured-container">
                <div className="featured-image-container">
                  <Img
                    className="featured-profile-image"
                    fluid={this.props.imageOne.childImageSharp.fluid}
                  />
                  <div className="current-topic-section">
                    <h2>Brexit</h2>
                  </div>
                </div>
                {/* <p className="has-text-centered">{item.text}</p> */}
              </div>
            </section>
          </div>
        </div>
        <div className="four columns">
          <div
            onClick={() => this.topicsClick('Markets')}
            className="featured-section-links"
            style={{
              cursor: 'pointer',
            }}
          >
            <section className="featured-section">
              <div className="featured-container">
                <div className="featured-image-container">
                  <Img
                    className="featured-profile-image"
                    fluid={this.props.imageTwo.childImageSharp.fluid}
                  />
                  <div className="current-topic-section">
                    <h2>Markets </h2>
                  </div>
                </div>
                {/* <p className="has-text-centered">{item.text}</p> */}
              </div>
            </section>
          </div>
        </div>
        <div className="four columns">
          <div
            onClick={() => this.topicsClick('Geopolitics')}
            className="featured-section-links"
            style={{
              cursor: 'pointer',
            }}
          >
            <section className="featured-section">
              <div className="featured-container">
                <div className="featured-image-container">
                  <Img
                    className="featured-profile-image"
                    fluid={this.props.imageThree.childImageSharp.fluid}
                  />
                  <div className="current-topic-section">
                    <h2>Geopolitics</h2>
                  </div>
                </div>
                {/* <p className="has-text-centered">{item.text}</p> */}
              </div>
            </section>
          </div>
        </div>
      </>
    )
  }
}

export default CurrentTopics
