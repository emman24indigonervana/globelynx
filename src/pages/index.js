import React from 'react'

import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

// import Features from '../components/Features'
import '../components/Styles/Homepage.scss'

import Layout from '../components/Layout'
import Testimonials from '../components/Testimonials'
import RegisterSection from '../components/Register'
import RecentBookings from '../components/RecentBookings'
// import CurrentTopics from '../components/CurrentTopics';

import ExpertsMap from '../components/Maps/ExpertsMap'

import arrowdown from '../img/arrow-down.png'

const scrollToComponent = require('react-scroll-to-component')

export const HomePageTemplate = ({
  heading,
  description,
  midBanner,
  lowBanner,
  basicInfo,
  basicDescription,
  workProcess,
  testimonials,
  scrollHere,
}) => (
  <div>
    <section
      style={{ padding: '25px', textAlign: 'center', overflow: 'hidden' }}
    >
      <img
        className="animated infinite bounce2 slower animated-arrow"
        style={{ cursor: 'pointer' }}
        alt={arrowdown}
        src={arrowdown}
        onClick={() =>
          scrollToComponent(scrollHere, {
            offset: 0,
            align: 'top',
            duration: 1500,
          })
        }
      />
    </section>

    <div
      className="container-fluid"
      ref={section => {
        scrollHere = section
      }}
    >
      <div className="row">
        <div className="has-text-centered has-padding">
         <h1>{heading}</h1>
					<p>{description}</p> 
         {/* <h1>What is Globelynx</h1>
          <p>
            We are a club of experts; an extensive ecosystem of trusted experts
            – available for analysis and interview on an array of subjects, and
            in several languages, to broadcasters around the world on a reliable
            video network. You can find the specialist you’re looking for here
            via a keyword search or by looking for specific individuals or
            organisations. Every expert is framed, lit and focused
            professionally and delivered in broadcast-quality HD.
          </p>*/}
          {/* <Link to="/about" className="button">Discover More</Link> */}
        </div>
      </div>
    </div>
    <div className="is-fullwidth ">
      <ExpertsMap />
    </div>
    <div
      className="full-width-image-container"
      style={{
        backgroundImage: `url(${
          midBanner.childImageSharp
            ? midBanner.childImageSharp.fluid.src
            : midBanner
        })`,
      }}
    />
    {/* <div className=" is-fullwidth">
				<div className="container-fluid">
					<div className="row has-padding has-text-centered">
					<h1>RECENT TOPICS</h1>
					<CurrentTopics />
					</div>
				</div>
			</div> */}
    <div className="is-fullwidth has-background-gray">
      <div className="container-fluid">
        <div className="row">
          <div className="has-text-centered has-padding">
            <h1>EXPERTS</h1>
            <RecentBookings />
          </div>
        </div>
      </div>
    </div>
    <div
      className="full-width-image-container"
      style={{
        backgroundImage: `url(${
          lowBanner.childImageSharp
            ? lowBanner.childImageSharp.fluid.src
            : lowBanner
        })`,
      }}
    />
    <div className="container-fluid">
      <div className="row">
        <div
          className="has-text-centered has-padding"
          style={{ paddingBottom: 0 }}
        >
          <h1>{basicInfo}</h1>
          <p>{basicDescription}</p>
          <Link
            to="/contact"
            className="button is-dark"
            style={{ marginBottom: '20px' }}
          >
            Discover More
          </Link>
        </div>
      </div>
    </div>
    <RegisterSection />
   <Testimonials testimonials={testimonials} />
  </div>
)

HomePageTemplate.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  midBanner: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  lowBanner: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  basicInfo: PropTypes.string,
  basicDescription: PropTypes.string,
  testimonials: PropTypes.array,
  scrollHere: PropTypes.string,
}

const HomePage = ({ data }) => {
  const { frontmatter: home } = data.homePageData.edges[0].node

  console.log(home);

  return (
    <Layout location="homepage">
      <HomePageTemplate
        heading={home.heading}
        description={home.description}
        midBanner={home.mid_banner}
        lowBanner={home.low_banner}
        basicInfo={home.basic_info}
        basicDescription={home.basic_description}
        testimonials={home.testimonials}
        scrollHere="scrollhere"
      />
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.object,
    }),
  }),
}

export default HomePage

export const HomePageQuery = graphql`
  query {
    homePageData: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "home-page" } } }
    ) {
      edges {
        node {
          html
          id
          frontmatter {
            heading
            description
            mid_banner {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            low_banner {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            basic_info
            basic_description
            testimonials {
              author
              quote
            }
          }
        }
      }
    }
  }
`
