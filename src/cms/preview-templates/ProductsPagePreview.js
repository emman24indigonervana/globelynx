import React from 'react'
import PropTypes from 'prop-types'
import { ProductsPageTemplate } from '../../templates/products-page'

const ProductsPagePreview = ({ entry, widgetFor }) => {
  const entryWorks = entry.getIn(['data', 'products_images', 'product'])
  const product = entryWorks ? entryWorks.toJS() : []

  return (
    <ProductsPageTemplate
      heading={entry.getIn(['data', 'heading'])}
      description={entry.getIn(['data', 'description'])}
      heading_one={entry.getIn(['data', 'heading_one'])}
      description_one={entry.getIn(['data', 'description_one'])}
      heading_two={entry.getIn(['data', 'heading_two'])}
      description_two={entry.getIn(['data', 'description_two'])}
      heading_three={entry.getIn(['data', 'heading_three'])}
      description_three={entry.getIn(['data', 'description_three'])}
      heading_four={entry.getIn(['data', 'heading_four'])}
      description_four={entry.getIn(['data', 'description_four'])}
      heading_five={entry.getIn(['data', 'heading_five'])}
      description_five={entry.getIn(['data', 'description_five'])}
      products_images={{
        heading: entry.getIn(['data', 'products_images', 'heading']),
        product,
      }}
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
