import React from 'react'
import PropTypes from 'prop-types'
import { ContactPageTemplate } from '../../templates/contact-page'

const ContactPagePreview = ({ entry, widgetFor }) => {
  // const entryWorks = entry.getIn(['data', 'products_images', 'product'])
  // const product = entryWorks ? entryWorks.toJS() : []

  return (
    <ContactPageTemplate
      heading_one={entry.getIn(['data', 'heading_one'])}
      description_one={entry.getIn(['data', 'description_one'])}
      heading_two={entry.getIn(['data', 'heading_two'])}
      description_two={entry.getIn(['data', 'description_two'])}
      heading_three={entry.getIn(['data', 'heading_three'])}
			description_three={entry.getIn(['data', 'description_three'])}
			address={entry.getIn(['data', 'address'])}
			address_image={entry.getIn(['data', 'address_image'])}
    />
  )
}

ContactPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ContactPagePreview
