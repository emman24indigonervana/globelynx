const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              date
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(edge => {
      let component, pathName
      if (edge.node.frontmatter.templateKey === 'home-page') {
        pathName = '/'
        component = path.resolve(`src/pages/index.js`)
      } else {
        pathName = edge.node.frontmatter.path || edge.node.fields.slug
        component = path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        )
      }
      const id = edge.node.id
      createPage({
        path: pathName,
        component,
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  // Make the front page match everything client side.
  // Normally your paths should be a bit more judicious.
      //   if (page.path === `/expertsprofile`) {
      //        page.path = '/*'
      //       page.component = path.resolve(`src/pages/expertsprofile.js`)
      //       page.matchPath = `/*`
      //       createPage(page)
      // }



  if (page.path === `/expertsprofile/`) {
    page.matchPath = `/*`

    createPage({
       path: '/',
       component: path.resolve(`src/pages/expertsprofile.js`),
      ...page,
    })
  }
}

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage } = actions
//   // Make the front page match everything client side.
//   // Normally your paths should be a bit more judicious.
//   if (page.path === `/`) {
//     page.matchPath = `/*`
//     createPage(page)
//   }
// }

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}



exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scroll-to/,
            use: loaders.null(),
          },
          {
            test: /react-leaflet/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
