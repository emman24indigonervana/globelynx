import React from 'react'
import PropTypes from 'prop-types'
//import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import ServicesList from '../components/ServicesList'
import RegisterSection from '../components/Register'
import Testimonials from '../components/Testimonials'

export const CamearasDetailsTemplate = ({
  content,
  contentComponent,
  camerasimage,
  name,
  details,
  recorder,
  frame,
  weight,
  portable,
  helmet,
  camera_images,
  testimonials,
}) => {
  const PostContent = contentComponent || Content

  return (
    <>
      {helmet || ''}
      <div className="container-fluid">
        <div className="row has-padding">
          <div className="tweleve column">
            <h1 className="has-text-centered">PRODUCTS</h1>
          </div>
          <div className="three columns">
            <h2 style={{ textAlign: 'center' }}>{name.toUpperCase()}</h2>
            <a
              href="/home"
              className="button is-fullwidth 	experts-profile-enquire-btn"
              style={{ marginBottom: '15px' }}
            >
              ENQUIRE NOW
            </a>
            <PreviewCompatibleImage imageInfo={camerasimage} />
            <a
              href="/home"
              className="button is-fullwidth experts-profile-enquire-btn"
              style={{
                marginTop: '15px',
                background: '#f7f5f5',
                color: '#000',
              }}
            >
              STATS
            </a>
            <div className="experts-details-container has-background-gray">
              <p>{details}</p>
              <p>{recorder}</p>
              <p>{frame}</p>
              <p>{weight}</p>
              <p>{portable}</p>
            </div>
          </div>
          <div className="nine columns">
            <PostContent content={content} />
          </div>
        </div>
      </div>
      <div className=" is-fullwidth has-background-gray">
        <div className="container-fluid">
          <div className="row has-padding has-text-centered">
            <ServicesList productsItems={camera_images.camera} />
          </div>
        </div>
      </div>
      <div className=" is-fullwidth">
        <RegisterSection />
      </div>
      <Testimonials testimonials={testimonials} />
    </>
  )
}

CamearasDetailsTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  camerasimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  helmet: PropTypes.object,
  name: PropTypes.string,
  details: PropTypes.string,
  recorder: PropTypes.string,
  frame: PropTypes.string,
  weight: PropTypes.string,
  portable: PropTypes.string,
  camera_images: PropTypes.shape({
    heading: PropTypes.string,
    camera: PropTypes.array,
  }),
  testimonials: PropTypes.array,
}

const CamerasDetails = ({ data }) => {
  const {
    cameraDetailsData: post,
    cameraData: camera,
    tesimonialsData: testimonials,
  } = data

  return (
    <Layout location="cameraDetails">
      <CamearasDetailsTemplate
        content={post.html}
        contentComponent={HTMLContent}
        camerasimage={post.frontmatter.camerasimage}
        name={post.frontmatter.name}
        details={post.frontmatter.details}
        recorder={post.frontmatter.recorder}
        frame={post.frontmatter.frame}
        weight={post.frontmatter.weight}
        portable={post.frontmatter.portable}
        testimonials={testimonials.edges[0].node.frontmatter.testimonials}
        camera_images={camera.edges[0].node.frontmatter.camera_images}
        helmet={
          <Helmet titleTemplate="%s | Cameras">
            <title>{`${post.frontmatter.name}`}</title>
            {/* <meta name="description" content={`${post.frontmatter.description}`} /> */}
          </Helmet>
        }
      />
    </Layout>
  )
}

CamerasDetails.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default CamerasDetails

export const pageQuery = graphql`
  query CamerasDetailsByID($id: String!) {
    cameraDetailsData: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        camerasimage {
          childImageSharp {
            fluid(maxWidth: 240, quality: 64) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        name
        details
        recorder
        frame
        portable
        weight
      }
    }
    cameraData: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "cameras-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            camera_images {
              camera {
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
    }
    tesimonialsData: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "home-page" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
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
