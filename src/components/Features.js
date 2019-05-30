import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

import testImage from '../img/Aberdeen-logo.png'

import skynetlogo from '../img/skynet.png'

const FeatureGrid = ({
  gridItems,
  hasActionContainer,
  pageLocation,
  columnSize,
}) => (
  <>
    {gridItems.map((item, key) => (
      <div
        key={key}
        className={`${
          columnSize === 'three' ? 'three columns' : 'four columns'
        }`}
      >
        <section className="featured-section">
          <div className="featured-container">
            <div className="featured-image-container">
              <PreviewCompatibleImage imageInfo={item} />
              <div
                className={`${
                  !hasActionContainer ? 'is-hidden' : 'contact-section'
                }`}
              >
                <span className="fa fa-phone"> </span>
                <span className="fa fa-at"> </span>
              </div>
            </div>
            <div
              className={`${
                !hasActionContainer ? 'is-hidden' : 'has-background-gray'
              }`}
              style={{ textAlign: 'left' }}
            >
              <div>
                <h3 style={{ marginBottom: 0, marginTop: 0 }}>
                  European Fixed Income
                </h3>
              </div>
              <div className="row">
                <div className="eight columns">
                  <p style={{ marginBottom: 0, fontSize: '15px' }}>
                    Luke Bartholomew
                  </p>
                  <p
                    style={{ marginTop: 0, marginBottom: 0, fontSize: '15px' }}
                  >
                    Investment Manager
                  </p>
                </div>
                <div className="four columns">
                  <img
                    style={{ marginTop: '53px' }}
                    alt="test"
                    src={testImage}
                  />
                </div>
              </div>
              <div className="row">
                <div className="twelve column">
                  <img
                    alt="test"
                    className={`${
                      !hasActionContainer || pageLocation === 'expert-page'
                        ? 'is-hidden'
                        : ''
                    }`}
                    src={skynetlogo}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <p className="has-text-centered">{item.text}</p> */}
        </section>
      </div>
    ))}
  </>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
  hasActionContainer: PropTypes.bool,
  pageLocation: PropTypes.string,
}

export default FeatureGrid
