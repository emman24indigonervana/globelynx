import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

import Slider from 'react-slick'

import './Styles/Testimonials.scss'

class Testimonials extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToScroll: 1,
      fade: true,
      arrow: true,
    }

    return (
      <div className="is-fullwidth has-background-gray">
        <div className="container-fluid">
          <div className="row">
            <div className="has-text-centered has-padding">
              <h1>Testimonials</h1>
              <Slider {...settings}>
                {this.props.testimonials.map(testimonial => (
                  <article key={v4()} className="message">
                    <div className="message-body">
                      {testimonial.quote}
                      <br />
                      <span
                        className="message-span"
                        dangerouslySetInnerHTML={{ __html: testimonial.author }}
                      />
                      <span className="message-span is-display-none">
                        <p className="message-author">asdfasdf </p>
                        <p className="message-author-position">asdfasf</p>
                      </span>
                    </div>
                  </article>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
      position: PropTypes.string,
    })
  ),
}

export default Testimonials
