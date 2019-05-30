import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

import RegisterSection from '../components/Register'

import CurrentTopics from '../components/CurrentTopics'

export const ExpertsPageTemplate = ({
  currentTopics,
  imageOne,
  imageTwo,
  imageThree,
}) => (
  <>
    <div className="is-fullwidth has-background-gray">
      <div className="container-fluid">
        <div className="row has-padding">
          <div className="twelve columns">
            <h1 className="has-text-centered">CURRENT TOPICS</h1>
            <CurrentTopics
              imageOne={imageOne}
              imageTwo={imageTwo}
              imageThree={imageThree}
            />
          </div>
        </div>
      </div>
    </div>
    <RegisterSection />
  </>
)

ExpertsPageTemplate.propTypes = {
  workProcess: PropTypes.shape({
    heading: PropTypes.string,
    works: PropTypes.array,
  }),
  imageOne: PropTypes.object,
  imageTwo: PropTypes.object,
  imageThree: PropTypes.object,
}

const ExpertsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout location="expertspage">
      <ExpertsPageTemplate
        featuredExperts={frontmatter.featured_experts}
        currentTopics={frontmatter.current_topics}
        imageOne={data.imageOne}
        imageTwo={data.imageTwo}
        imageThree={data.imageThree}
      />
    </Layout>
  )
}

ExpertsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ExpertsPage

export const ExpertsPageQuery = graphql`
  query ExpertsPage($id: String!) {
    imageOne: file(relativePath: { eq: "currenttopics-1.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    imageTwo: file(relativePath: { eq: "currenttopics-2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    imageThree: file(relativePath: { eq: "currenttopics-3.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        current_topics {
          topics {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
        }
      }
    }
  }
`
