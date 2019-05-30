import React from 'react'
import PropTypes from 'prop-types'
import { CamearasDetailsTemplate } from '../../templates/cameras-details'

const CamerasDetailsPreview = ({ entry, widgetFor }) => {
  const entryCameras = entry.getIn(['data', 'camera_images', 'camera'])
  const camera = entryCameras ? entryCameras.toJS() : []

  const entryTestimonials = entry.getIn(['data', 'testimonials'])
  const testimonials = entryTestimonials ? entryTestimonials.toJS() : []

  return (
    <CamearasDetailsTemplate
      content={widgetFor('body')}
      camerasimage={entry.getIn(['data', 'camerasimage'])}
      name={entry.getIn(['data', 'name'])}
      details={entry.getIn(['data', 'details'])}
      recorder={entry.getIn(['data', 'recorder'])}
      frame={entry.getIn(['data', 'frame'])}
      weight={entry.getIn(['data', 'weight'])}
      portable={entry.getIn(['data', 'portable'])}
      camera_images={{
        heading: entry.getIn(['data', 'camera_images', 'heading']),
        camera,
      }}
      testimonials={testimonials}
    />
  )
}
CamerasDetailsPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default CamerasDetailsPreview
