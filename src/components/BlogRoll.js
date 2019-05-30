import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

import Img from 'gatsby-image'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="row">
        {posts &&
          posts.map(({ node: post }) => (
            <Link to={post.fields.slug} key={post.id}>
              <div
                className="six columns"
                style={{ padding: '25px', background: '#f7f5f6' }}
              >
                <article>
                  <header>
                    {post.frontmatter.featuredimage ? (
                      <div className="featured-thumbnail">
                        <PreviewCompatibleImage
                          style={{ objectFit: 'contain' }}
                          imageInfo={{
                            image: post.frontmatter.featuredimage,
                            alt: `featured image thumbnail for post ${
                              post.title
                            }`,
                          }}
                        />
                      </div>
                    ) : null}
                    <h2>
                      <Link
                        className=""
                        style={{ textDecoration: 'none', color: '#4e5863' }}
                        to={post.fields.slug}
                      >
                        {post.frontmatter.title}
                      </Link>
                      <span> &bull; </span>
                    </h2>
                  </header>
                  <p>
                    {post.excerpt}
                    <br />
                    <br />
                    <Link
                      to={post.fields.slug}
                      style={{ textDecoration: 'none', color: '#4e5863' }}
                    >
                      Keep Reading →
                    </Link>
                  </p>
                </article>
              </div>
            </Link>
          ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "news-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 250, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
