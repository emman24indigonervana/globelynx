import React from 'react'
import PropTypes from 'prop-types'
import { ExpertsPageTemplate } from '../../templates/experts-page'

const ExpertsPagePreview = ({ entry, getAsset }) => {
  const entryExperts = entry.getIn(['data', 'featured_experts', 'experts'])
  const experts = entryExperts ? entryExperts.toJS() : []

  const entryTopics = entry.getIn(['data', 'current_topics', 'topics'])
  const topics = entryTopics ? entryTopics.toJS() : []

  return (
    <ExpertsPageTemplate
      featuredExperts={{
        heading: entry.getIn(['data', 'featured_experts', 'heading']),
        experts,
      }}
      currentTopics={{
        heading: entry.getIn(['data', 'current_topics', 'heading']),
        topics,
      }}
    />
  )
}

ExpertsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ExpertsPagePreview
