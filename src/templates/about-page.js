import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const AboutPageTemplate = ({
  heading,
  description,
  heading_one,
  description_one,
  heading_two,
  description_two,
}) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="has-text-centered has-padding">
            <h1>{heading}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>

      <div className="is-fullwidth has-background-gray">
        <div className="container-fluid">
          <div className="row">
            <div className="has-text-centered has-padding">
              <h1>{heading_one}</h1>
              <p>{description_one}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="has-text-centered has-padding">
            <h1>{heading_two}</h1>
            <p>{description_two}</p>
          </div>
        </div>
      </div>
    </>
  )
}

AboutPageTemplate.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  heading_one: PropTypes.string,
  description_one: PropTypes.string,
  heading_two: PropTypes.string,
  description_two: PropTypes.string,
}

const AboutPage = ({ data }) => {
  const { frontmatter: about } = data.aboutPageData.edges[0].node
  return (
    <Layout>
      <AboutPageTemplate
        heading={about.heading}
        description={about.description}
        heading_one={about.heading_one}
        description_one={about.description_one}
        heading_two={about.heading_two}
        description_two={about.description_two}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query {
    aboutPageData: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "about-page" } } }
    ) {
      edges {
        node {
          html
          id
          frontmatter {
            heading
            description
            heading_one
            description_one
            heading_two
            description_two
          }
        }
      }
    }
  }
`
