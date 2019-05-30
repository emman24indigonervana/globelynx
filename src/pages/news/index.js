import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class NewsIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              backgroundColor: '#4e5863',
              color: '#fff',
              padding: '1rem',
            }}
          >
            Latest News
          </h1>
        </div>
        <section className="section">
          <div className="container-fluid">
            <BlogRoll />
          </div>
        </section>
      </Layout>
    )
  }
}
