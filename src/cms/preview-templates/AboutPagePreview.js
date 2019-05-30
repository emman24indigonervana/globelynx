import React from 'react'
import PropTypes from 'prop-types'
import { AboutPageTemplate } from '../../templates/about-page'

const AboutPagePreview = ({ entry, widgetFor }) => (
  <AboutPageTemplate
    heading={entry.getIn(['data', 'heading'])}
    description={entry.getIn(['data', 'description'])}
    heading_one={entry.getIn(['data', 'heading_one'])}
    description_one={entry.getIn(['data', 'description_one'])}
    heading_two={entry.getIn(['data', 'heading_two'])}
    description_two={entry.getIn(['data', 'description_two'])}
  />
)

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default AboutPagePreview
