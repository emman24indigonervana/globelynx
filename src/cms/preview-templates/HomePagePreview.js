import React from 'react'
import PropTypes from 'prop-types'
import { HomePageTemplate } from '../../pages/index'

const HomePagePreview = ({ entry, getAsset }) => {
  const entryTestimonials = entry.getIn(['data', 'testimonials'])
  const testimonials = entryTestimonials ? entryTestimonials.toJS() : []

  return (
    <HomePageTemplate
      heading={entry.getIn(['data', 'heading'])}
      description={entry.getIn(['data', 'description'])}
      midBanner={entry.getIn(['data', 'mid_banner'])}
      lowBanner={entry.getIn(['data', 'low_banner'])}
      basicInfo={entry.getIn(['data', 'basic_info'])}
      basicDescription={entry.getIn(['data', 'basic_description'])}
      testimonials={testimonials}
    />
  )
}

HomePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default HomePagePreview
