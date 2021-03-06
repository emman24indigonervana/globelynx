import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ProductsPageTemplate = ({
  heading,
  description,
  heading_one,
  description_one,
  heading_two,
  description_two,
  heading_three,
  description_three,
  heading_four,
  description_four,
  heading_five,
  description_five,
  image_one,
  image_two,
  image_three,
  image_four,
  image_five,
}) => (
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
        <div className="row has-padding">
          <div className="three columns">
            {/* <img 
							style={{
								height: '250px',
								objectFit: 'contain',
							}}
						src={pic4} /> */}


					{image_one.childImageSharp ?  <Img fluid={image_one.childImageSharp.fluid} /> : <img src={image_one} style={{maxWidth:'250px'}} />} 
           
          </div>
          <div className="nine columns">
            <h1>{heading_one}</h1>
            <p>{description_one}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="container-fluid">
      <div className="row has-padding">
        <div className="three columns">
				{image_two.childImageSharp ?  <Img fluid={image_two.childImageSharp.fluid} /> : <img src={image_two} style={{maxWidth:'250px'}} />} 
          {/* <Img fluid={image_two.childImageSharp.fluid} /> */}
        </div>
        <div className="nine columns">
          <h1>{heading_two}</h1>
          <p>{description_two}</p>
        </div>
      </div>
    </div>

    <div className="is-fullwidth has-background-gray">
      <div className="container-fluid">
        <div className="row has-padding">
          <div className="three columns">
					{image_three.childImageSharp ?  <Img fluid={image_three.childImageSharp.fluid} /> : <img src={image_three} style={{maxWidth:'250px'}} />} 
            {/* <Img fluid={image_three.childImageSharp.fluid} /> */}
          </div>
          <div className="nine columns">
            <h1>{heading_three}</h1>
            <p>{description_three}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="container-fluid">
      <div className="row has-padding">
        <div className="three columns">
				{image_four.childImageSharp ?  <Img fluid={image_four.childImageSharp.fluid} /> : <img src={image_four} style={{maxWidth:'250px'}} />} 
          {/* <Img fluid={image_four.childImageSharp.fluid} /> */}
        </div>
        <div className="nine columns">
          <h1>{heading_four}</h1>
          <p>{description_four}</p>
        </div>
      </div>
    </div>

    <div className="is-fullwidth has-background-gray">
      <div className="container-fluid">
        <div className="row has-padding">
          <div className="three columns">
					{image_five.childImageSharp ?  <Img fluid={image_five.childImageSharp.fluid} /> : <img src={image_five} style={{maxWidth:'250px'}} />} 
            {/* <Img fluid={image_five.childImageSharp.fluid} /> */}
          </div>
          <div className="nine columns">
            <h1>{heading_five}</h1>
            <p>{description_five}</p>
          </div>
        </div>
      </div>
    </div>

    {/* <div className=" is-fullwidth">
				<div className="container-fluid">
					<div className="row has-padding has-text-centered"> */}
    {/* <h1>{featuredCameras.heading}</h1> */}
    {/* <ServicesList productsItems={products_images.product} />  */}
    {/* <Link to="camerasDetails/Cameras-sony-camera">
							<Features gridItems={featuredCameras.cameras} columnSize="three" />
						</Link> */}
    {/* </div>
				</div>
			</div> */}

    {/* <div style={{display:'hidden'}}>
				<span>{PageContent}</span>
			</div> */}
  </>
)

ProductsPageTemplate.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  heading_one: PropTypes.string,
  description_one: PropTypes.string,
  heading_two: PropTypes.string,
  description_two: PropTypes.string,
  heading_three: PropTypes.string,
  description_three: PropTypes.string,
  heading_four: PropTypes.string,
  description_four: PropTypes.string,
  heading_five: PropTypes.string,
  description_five: PropTypes.string,
  image_one: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  image_two: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  image_three: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  image_four: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  image_five: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

const ProductsPage = ({ data }) => {
  const { frontmatter: products } = data.productsPageData.edges[0].node
  // const image_one = data.imageOne
  // const image_two = data.imageTwo
  // const image_three = data.imageThree
  // const image_four = data.imageFour
  // const image_five = data.imageFive

	console.log(products)

  return (
    <Layout>
      <ProductsPageTemplate
        heading={products.heading}
        description={products.description}
        heading_one={products.heading_one}
        description_one={products.description_one}
        heading_two={products.heading_two}
        description_two={products.description_two}
        heading_three={products.heading_three}
        description_three={products.description_three}
        heading_four={products.heading_four}
        description_four={products.description_four}
        heading_five={products.heading_five}
        description_five={products.description_five}
        image_one={products.image_one}
        image_two={products.image_two}
        image_three={products.image_three}
        image_four={products.image_four}
        image_five={products.image_five}
      />
    </Layout>
  )
}

ProductsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ProductsPage

export const ProductsPageQuery = graphql`
  query {
    productsPageData: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "products-page" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            heading
            description
             image_one {
              childImageSharp {
                fluid(maxWidth: 250) {
                ...GatsbyImageSharpFluid
                }
              }
            }
            heading_one
            description_one
            image_two {
              childImageSharp {
                fluid(maxWidth: 250) {
                ...GatsbyImageSharpFluid
                }
              }
            }
            heading_two
            description_two
            image_three {
              childImageSharp {
                fluid(maxWidth: 250) {
                ...GatsbyImageSharpFluid
                }
							}
						}
            heading_three
            description_three
            image_four {
              childImageSharp {
                fluid(maxWidth: 250) {
                ...GatsbyImageSharpFluid
                }
							}
						}
            heading_four
            description_four
             image_five {
              childImageSharp {
                fluid(maxWidth: 250) {
                ...GatsbyImageSharpFluid
                }
							}
						}
            heading_five
            description_five
          }
        }
      }
    }
  }
`
