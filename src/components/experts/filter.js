import React, { Component } from 'react'

import _ from 'lodash'

let langArr = {}
class FilterSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      language: [],
    }
  }

  componentWillMount() {
    this.setState({ language: this.props.languages })
  }

  render() {
    return <div />
  }
}

export default FilterSection
