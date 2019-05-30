import React from 'react'
import PropTypes from 'prop-types'
import { ProductsPageTemplate } from '../../templates/products-page'

const ProductsPagePreview = ({ entry, widgetFor }) => {
  // const entryWorks = entry.getIn(['data', 'products_images', 'product'])
  // const product = entryWorks ? entryWorks.toJS() : []

  return (
    <ProductsPageTemplate
      heading={entry.getIn(['data', 'heading'])}
      description={entry.getIn(['data', 'description'])}
      image_one={entry.getIn(['data', 'image_one'])}
      heading_one={entry.getIn(['data', 'heading_one'])}
      description_one={entry.getIn(['data', 'description_one'])}
      image_two={entry.getIn(['data', 'image_two'])}
      heading_two={entry.getIn(['data', 'heading_two'])}
      description_two={entry.getIn(['data', 'description_two'])}
      image_three={entry.getIn(['data', 'image_three'])}
      heading_three={entry.getIn(['data', 'heading_three'])}
      description_three={entry.getIn(['data', 'description_three'])}
      image_four={entry.getIn(['data', 'image_four'])}
      heading_four={entry.getIn(['data', 'heading_four'])}
      description_four={entry.getIn(['data', 'description_four'])}
      image_five={entry.getIn(['data', 'image_five'])}
      heading_five={entry.getIn(['data', 'heading_five'])}
      description_five={entry.getIn(['data', 'description_five'])}
    
    />
  )
}

ProductsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ProductsPagePreview
