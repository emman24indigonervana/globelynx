import React from 'react'
import PropTypes from 'prop-types'
import { HomePageTemplate } from '../../pages/index'

const HomePagePreview = ({ entry, getAsset }) => {
  const entryExperts = entry.getIn(['data', 'featured_experts', 'experts'])
  const experts = entryExperts ? entryExperts.toJS() : []

  const entryBookings = entry.getIn(['data', 'recent_bookings', 'bookings'])
  const bookings = entryBookings ? entryBookings.toJS() : []

  const entryTopics = entry.getIn(['data', 'current_topics', 'topics'])
  const topics = entryTopics ? entryTopics.toJS() : []

  const entryWorks = entry.getIn(['data', 'work_process', 'works'])
  const works = entryWorks ? entryWorks.toJS() : []

  const entryTestimonials = entry.getIn(['data', 'testimonials'])
  const testimonials = entryTestimonials ? entryTestimonials.toJS() : []

  return (
    <HomePageTemplate
      heading={entry.getIn(['data', 'heading'])}
      description={entry.getIn(['data', 'description'])}
      midBanner={entry.getIn(['data', 'mid_banner'])}
      featuredExperts={{
        heading: entry.getIn(['data', 'featured_experts', 'heading']),
        experts,
      }}
      recentBookings={{
        heading: entry.getIn(['data', 'recent_bookings', 'heading']),
        bookings,
      }}
      currentTopics={{
        heading: entry.getIn(['data', 'current_topics', 'heading']),
        topics,
      }}
      lowBanner={entry.getIn(['data', 'low_banner'])}
      basicInfo={entry.getIn(['data', 'basic_info'])}
      basicDescription={entry.getIn(['data', 'basic_description'])}
      workProcess={{
        heading: entry.getIn(['data', 'work_process', 'heading']),
        works,
      }}
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
