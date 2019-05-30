import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'

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
  products_images,
  cam1,
  cam2,
  cam3,
  cam4,
  cam5,
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
            <Img fluid={cam1.childImageSharp.fluid} />
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
          <Img fluid={cam2.childImageSharp.fluid} />
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
            <Img fluid={cam3.childImageSharp.fluid} />
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
          <Img fluid={cam4.childImageSharp.fluid} />
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
            <Img fluid={cam5.childImageSharp.fluid} />
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
  products_images: PropTypes.shape({
    heading: PropTypes.string,
    product: PropTypes.array,
  }),
  cam1: PropTypes.object,
  cam2: PropTypes.object,
  cam3: PropTypes.object,
  cam4: PropTypes.object,
  cam5: PropTypes.object,
}

const ProductsPage = ({ data }) => {
  const { frontmatter: products } = data.productsPageData.edges[0].node
  const cam1 = data.imageOne
  const cam2 = data.imageTwo
  const cam3 = data.imageThree
  const cam4 = data.imageFour
  const cam5 = data.imageFive

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
        products_images={products.products_images}
        cam1={cam1}
        cam2={cam2}
        cam3={cam3}
        cam4={cam4}
        cam5={cam5}
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
    imageOne: file(relativePath: { eq: "services_4.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    imageTwo: file(relativePath: { eq: "services_2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    imageThree: file(relativePath: { eq: "services_7.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    imageFour: file(relativePath: { eq: "services_6.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    imageFive: file(relativePath: { eq: "services_5.png" }) {
      childImageSharp {
        fluid(maxWidth: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    productsPageData: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "products-page" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            heading
            description
            heading_one
            description_one
            heading_two
            description_two
            basic_description
            heading_three
            description_three
            heading_four
            description_four
            heading_five
            description_five
            products_images {
              product {
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
  }
`
