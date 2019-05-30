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
	heading_two,
	description_two,
	heading_three,
	description_three,
	heading_four,
	description_four,
	heading_five,
	description_five,
  cam1,
  cam2,
	cam3,
  image_two,
  image_three,
  image_four,
}) => (
  <>
    <div className="is-fullwidth">
      <div className="container-fluid ">
        <div className="row has-text-centered has-padding">
          <div className="hero1">
            <h1>{heading}</h1>
            <p>
             {description}
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
              <div className="camera-animation-camera left"  />
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
            <h1>{heading_two}</h1>
            <p>
             {description_two}
            </p>
						{image_two.childImageSharp ?  <Img fixed={image_two.childImageSharp.fixed} /> : <img src={image_two} style={{width:'500px'}} />} 
          </div>
        </div>
      </div>
    </div>
    <div className="is-fullwidth">
      <div className="container-fluid ">
        <div className="row has-text-centered has-padding">
          <div className="cam-2">
            <h1>{heading_three}</h1>
            <p>
              {description_three}
            </p>
						{image_three.childImageSharp ?  <Img fixed={image_three.childImageSharp.fixed} /> : <img src={image_three} style={{width:'500px'}} />} 
            {/* <Img fixed={cam2.childImageSharp.fixed} /> */}
            {/*<img alt={cam2} src={cam2} />*/}
          </div>
        </div>
      </div>
    </div>
    <div className="is-fullwidth has-background-gray">
      <div className="container-fluid ">
        <div className="row has-text-centered has-padding">
          <div className="cam-1">
            <h1>{heading_four}</h1>
            <p>
							{description_four}
            </p>
						{image_four.childImageSharp ?  <Img fixed={image_four.childImageSharp.fixed} /> : <img src={image_four} style={{width:'500px'}} />} 
            {/* <Img fixed={cam3.childImageSharp.fixed} /> */}
            {/*<img alt={cam3} src={cam3} />*/}
          </div>
        </div>
      </div>
    </div>
    <div className="is-fullwidth">
      <div className="container-fluid ">
        <div className="row has-text-centered has-padding">
          <div className="cam-2">
            <h1>{heading_five}</h1>
            <p>
              {description_five}
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
	heading_two: PropTypes.string,
	description_two: PropTypes.string,
	heading_three: PropTypes.string,
	description_three: PropTypes.string,
	heading_four: PropTypes.string,
	description_four: PropTypes.string,
	heading_five: PropTypes.string,
	description_five: PropTypes.string,
  cam1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  cam2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	cam3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  image_two: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  image_three: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  image_four: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const CamerasPage = ({ data }) => {
  const { camerasPageData: home, tesimonialsData: testimonials } = data

  const cam1 = data.imageOne
  const cam2 = data.imageTwo
	const cam3 = data.imageThree
	
	console.log(data)

  return (
    <Layout>
      <CamerasPageTemplate
        heading={home.frontmatter.heading}
				description={home.frontmatter.description}
				heading_two={home.frontmatter.heading_two}
				description_two={home.frontmatter.description_two}
				heading_three={home.frontmatter.heading_three}
				description_three={home.frontmatter.description_three}
				heading_four={home.frontmatter.heading_four}
				description_four={home.frontmatter.description_four}
				heading_five={home.frontmatter.heading_five}
				description_five={home.frontmatter.description_five}
        cam1={cam1}
        cam2={cam2}
				cam3={cam3}
        image_two={home.frontmatter.image_two}
        image_three={home.frontmatter.image_three}
        image_four={home.frontmatter.image_four}
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
        heading_two
				description_two
				image_two {
					childImageSharp {
					  fixed(width: 500) {
							...GatsbyImageSharpFixed
						}
					}
				}
        heading_three
				description_three
				image_three {
					childImageSharp {
					  fixed(width: 500) {
							...GatsbyImageSharpFixed
						}
					}
				}
				heading_four
				description_four
				image_four {
					childImageSharp {
					  fixed(width: 500) {
							...GatsbyImageSharpFixed
						}
					}
				}
				heading_five
        description_five
      }
    }
  }
`
