import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

export default class ContactMap extends Component {
  render() {
    const { options } = this.props
    const position = [51.505, -0.09]

    if (typeof window !== 'undefined') {
      return (
        <Map center={position} zoom={13}>
          <TileLayer
            url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFycmVudCIsImEiOiJjanJtdXhmcWcwbmlhNDVsOW9pbDQzZ3VnIn0.7NjjKk1wicILSJZbW8J62g"
            id="mapbox.streets"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup.
              <br />
              Easily customizable.
            </Popup>
          </Marker>
        </Map>
      )
    }
    return null
  }
}
