import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import logo from '../img/logo.png'

import 'leaflet/dist/leaflet.css'
import './Styles/Custom.scss'

import favicon from '../img/favicon.ico'
//import './all.sass'

const TemplateWrapper = ({ children, location }) => (
          <StaticQuery
            query={graphql`
              query HeadingQuery {
                site {
                  siteMetadata {
                    title
                    description
                  }
                }
              }
            `}
            render={data => (
              <div>
                <Helmet>
                  <html lang="en" />
                  <title>{data.site.siteMetadata.title}</title>
                  <meta
                    name="description"
                    content={data.site.siteMetadata.description}
                  />
                  <meta name="theme-color" content="#fff" />
                  <meta property="og:type" content="business.business" />
                  <meta property="og:title" content={data.site.siteMetadata.title} />
                  <meta property="og:url" content="/" />
                  <meta property="og:image" content="/img/maxresdefault.jpg" />

                  <link rel="icon" href={favicon} type="image/x-icon" />

                  <link rel="shortcut icon" href={favicon} type="image/x-icon" />

                  <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
                    integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP"
                    crossorigin="anonymous"
                  />

                  <link
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400"
                    rel="stylesheet"
                  />

                  <link
                    rel="stylesheet"
                    type="text/css"
                    charset="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                  />
                  <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                  />

                  <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css"
                  />

                  <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
                    integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
                    crossorigin=""
                  />

                </Helmet>

                <Link
                  id="made-by"
                  to="/contact"
                  className={`${location === 'dashboard' ? 'is-display-none' : ''}`}
                >
                  JOIN THE COMMUNITY
                </Link>
                <Navbar location={location} />
                <div>{children}</div>
                <Footer location={location} />
              </div>
            )}
          />
)

export default TemplateWrapper
