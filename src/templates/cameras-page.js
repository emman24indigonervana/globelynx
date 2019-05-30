import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'

import '../components/Styles/CamerasPage.scss'
// import cam1 from '../img/camerapage1.png'
// import cam2 from '../img/camerapage2.png'
// import cam3 from '../img/camerapage3.png'
import logoicon from '../img/logo-icon.png'

export const CamerasPageTemplate = ({
  heading,
  description,
  testimonials,
  camera_images,
  cam1,
  cam2,
  cam3,
}) => (
  <>
    <div className="is-fullwidth">
      <div className="container-fluid ">
        <div className="row has-text-centered has-padding">
          <div className="hero1">
            <h1>Our Cameras</h1>
            <p>
              Simple. Unique. Our cameras are sleek, with an all-in-one design,
              a brilliant HD camera, low-latency encoder and in-built SIP sound
              and lighting. It’s the total package for any TV ready broadcast
              live. They range from the ultra-portable to the ultra-powerful.
            </p>
            {/* <Link
className="button is-dark register-submit"
href="/camerasDetails/Cameras-sony-camera"
>*/}
            {/* <a
className="button is-dark register-submit"
href="#" >
Port a cam G2
</a> */}
            {/*<a href="/camerasDetails/Cameras-sony-camera">Office cam G2 ></a>*/}
            <div className="camera-animation">
              <div className="camera-animation-camera left" />
              <div className="camera-animation-camera right" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="is-fullwidth has-background-gray">
      <div className="container-fluid ">
        <div className="row has-text-centered has-padding">
          <div className="cam-1">
            <h1>The world's smallest TV studio in a box</h1>
            <p>
              Fully portal broadcast high quality HD camera system – in-built
              lights,microphone, camera & encoder.
            </p>
            <Img fixed={cam1.childImageSharp.fixed} />
          </div>
        </div>
      </div>
    </div>
    <div className="is-fullwidth">
      <div className="container-fluid ">
        <div className="row has-text-centered has-padding">
          <div className="cam-2">
            <h1>Connecting experts to broadcasters</h1>
            <p>
              Globelynx LITE is more capable, more versatile and more portable
              than anything that has ever come before.
            </p>
            <Img fixed={cam2.childImageSharp.fixed} />
            {/*<img alt={cam2} src={cam2} />*/}
          </div>
        </div>
      </div>
    </div>
    <div className="is-fullwidth has-background-gray">
      <div className="container-fluid ">
        <div className="row has-text-centered has-padding">
          <div className="cam-1">
            <h1>Self-operated, broadcast quality HD camera</h1>
            <p>
              Office Cam provides everything you need to turn your workplace
              into a TV studio-ready.
            </p>
            <Img fixed={cam3.childImageSharp.fixed} />
            {/*<img alt={cam3} src={cam3} />*/}
          </div>
        </div>
      </div>
    </div>
    <div className="is-fullwidth">
      <div className="container-fluid ">
        <div className="row has-text-centered has-padding">
          <div className="cam-2">
            <h1>Designed for trading floors, offices, studios and homes</h1>
            <p>
              Permanent connection straight to our Master Control via the
              Globelynx network.
            </p>
            <div className="network">
              <i className="fas fa-video">
                <i className="fas fa-circle-notch" />
              </i>
              <div className="line">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
              </div>
              <i className="fas fa-cloud">
                <img alt={logoicon} src={logoicon} />
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

CamerasPageTemplate.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  testimonials: PropTypes.array,
  camera_images: PropTypes.shape({
    heading: PropTypes.string,
    camera: PropTypes.array,
  }),
  cam1: PropTypes.object,
  cam2: PropTypes.object,
  cam3: PropTypes.object,
}

const CamerasPage = ({ data }) => {
  const { camerasPageData: home, tesimonialsData: testimonials } = data

  const cam1 = data.imageOne
  const cam2 = data.imageTwo
  const cam3 = data.imageThree

  return (
    <Layout>
      <CamerasPageTemplate
        heading={home.frontmatter.heading}
        description={home.frontmatter.description}
        testimonials={testimonials.edges[0].node.frontmatter.testimonials}
        camera_images={home.frontmatter.camera_images}
        cam1={cam1}
        cam2={cam2}
        cam3={cam3}
      />
    </Layout>
  )
}

CamerasPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default CamerasPage

export const CamerasPageQuery = graphql`
  query CamerasPage($id: String!) {
    imageOne: file(relativePath: { eq: "camerapage1.png" }) {
      childImageSharp {
        fixed(width: 500) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    imageTwo: file(relativePath: { eq: "camerapage2.png" }) {
      childImageSharp {
        fixed(width: 500) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    imageThree: file(relativePath: { eq: "camerapage3.png" }) {
      childImageSharp {
        fixed(width: 500) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    camerasPageData: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        heading
        description
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
