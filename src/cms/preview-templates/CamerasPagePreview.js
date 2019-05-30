import React from 'react'
import PropTypes from 'prop-types'
import { CamerasPageTemplate } from '../../templates/cameras-page'

const CamerasPagePreview = ({ entry, getAsset }) => {
  // const entryCameras = entry.getIn(['data', 'featured_cameras', 'cameras'])
  // const cameras = entryCameras ? entryCameras.toJS() : []


  return (
    <CamerasPageTemplate
      heading={entry.getIn(['data', 'heading'])}
			description={entry.getIn(['data', 'description'])}
			heading_two={entry.getIn(['data', 'heading_two'])}
			description_two={entry.getIn(['data', 'description_two'])}
			image_two={entry.getIn(['data', 'image_two'])}
      heading_three={entry.getIn(['data', 'heading_three'])}
			description_three={entry.getIn(['data', 'description_three'])}
			image_three={entry.getIn(['data', 'image_three'])}
			heading_four={entry.getIn(['data', 'heading_four'])}
			description_four={entry.getIn(['data', 'description_four'])}
			image_four={entry.getIn(['data', 'image_four'])}
			heading_five={entry.getIn(['data', 'heading_five'])}
      description_five={entry.getIn(['data', 'description_five'])}
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
