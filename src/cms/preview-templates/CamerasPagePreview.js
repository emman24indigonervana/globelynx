import React from 'react'
import PropTypes from 'prop-types'
import { CamerasPageTemplate } from '../../templates/cameras-page'

const CamerasPagePreview = ({ entry, getAsset }) => {
  // const entryCameras = entry.getIn(['data', 'featured_cameras', 'cameras'])
  // const cameras = entryCameras ? entryCameras.toJS() : []

  const entryWorks = entry.getIn(['data', 'camera_images', 'camera'])
  const camera = entryWorks ? entryWorks.toJS() : []

  const entryTestimonials = entry.getIn(['data', 'testimonials'])
  const testimonials = entryTestimonials ? entryTestimonials.toJS() : []

  return (
    <CamerasPageTemplate
      heading={entry.getIn(['data', 'heading'])}
      description={entry.getIn(['data', 'description'])}
      camera_images={{
        heading: entry.getIn(['data', 'camera_images', 'heading']),
        camera,
      }}
      testimonials={testimonials}
    />
  )
}

CamerasPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default CamerasPagePreview
