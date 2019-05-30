import React, { Component } from 'react'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import companyData from './company.json'

import L from 'leaflet'
import Link from 'gatsby-link'

import defaultPicture from '../../img/default-profile.png'

//Custom Markers
import markershadow from 'leaflet/dist/images/marker-shadow.png'
import markerDefault from '../../img/marker-default.png'
import markerAudit from '../../img/marker-audit.png'
import markerEducation from '../../img/marker-education.png'
import markerFinance from '../../img/marker-finance.png'
import markerLawyers from '../../img/marker-lawyers.png'
import markerMedia from '../../img/marker-media.png'
import markerNews from '../../img/marker-news.png'
import markerServices from '../../img/marker-services.png'
import markerTransport from '../../img/marker-transport.png'
import markerWeather from '../../img/marker-weather.png'
import markerEnergy from '../../img/marker-energy.png'
import markerMaterial from '../../img/marker-material.png'
import markerScience from '../../img/marker-science.png'

// import { OpenStreetMapProvider } from 'leaflet-geosearch';

// const provider = new OpenStreetMapProvider();

// const results = provider.search({ query: 'davao' });

// const provider = new OpenStreetMapProvider();

// const results = await provider.search({ query: 'davao' });

// import Search from './MapSearch'

// import CustomMarker from './CustomMarker'

import elasticsearch from 'elasticsearch'
const connectionString =
  'https://search-experts-ayuwtxztr5pvnas52cxmrjbdkm.eu-west-1.es.amazonaws.com/'
const _index = 'experts'
const _type = '_doc'

let client = new elasticsearch.Client({
  host: connectionString,
})

// let markersampledata = [
// 	{key: "marker19", position: ["51.5149285", "-0.0778751"], company: "Aberdeen Asset Management PLC", name: "Jasper Lawler", image: "expertsimage/CMC Markets/rsz_1jasper_lawler.jpg"},
// 	{key: "marker18", position: ["51.5184894", "-0.0856571"], company: "Aberdeen Asset Management PLC", name: "Kathleen Brooks", image: "expertsimage/City Index Ltd/KATHLEEN-BROOKS.jpg"},
// 	{key: "marker3", position: ["51.5164694", "-0.03353241642167"], company: "Aberdeen Asset Management PLC", name: "Tariq Alhomayed", image: "expertsimage/Asharq Alawsat Newspaper/Tariq_Alhumayed_Asharq_Al_Awsat.gif"},
// 	{key: "marker12", position:["51.5143849", "-0.0864373"], company: "Aberdeen Asset Management PLC", name: "Holger Schmieding", image: "expertsimage/Berenberg (London)/Holger_Schmieding_Berenberg.png"},
// 	{key: "marker0", position: ["51.5136252", "-0.0945430655631519"], company: "Aberdeen Asset Management PLC", name: "Edwin Gutierrez", image: "expertsimage/Aberdeen Asset Management PLC/Edwin Gutierrez.jpg"},
// 	{key: "marker14", position: ["51.5168688", "-0.086035"], company: "Aberdeen Asset Management PLC", name: "Alex Hoctor-Duncan", image: "expertsimage/Blackrock/Alex Hoctor Duncan.jpg"},
// 	{key: "marker17", position: ["51.52303355", "-0.163792348945195"], company: "Aberdeen Asset Management PLC", name: "BNP Paribas camera", image: "expertsimage/Camera Lense.jpg"},
// 	{key: "marker11", position: ["51.518704", "-0.0799487"], company: "Aberdeen Asset Management PLC", name: "Christopher Mahon", image: "expertsimage/Baring Asset Management/Christopher Mahon.jpg"},
// 	{key: "marker8", position:["51.5155155", "-0.0989174171196441"], company: "Aberdeen Asset Management PLC", name: "Sabine Schels", image: "expertsimage/Bank of America Merrill Lynch/SABINE E. SCHELS.png"},
// 	{key: "marker4", position:["51.5164694", "-0.053241642167"], company: "Aberdeen Asset Management PLC", name: "Ali Ibrahim", image: "expertsimage/Asharq Alawsat Newspaper/Ali Ibrahim.png"},
// 	{key: "marker13", position: ["51.5143849", "-0.0864373"], company: "Aberdeen Asset Management PLC", name: "Berenberg camera", image: "expertsimage/Camera Lense.jpg"},
// 	{key: "marker1", position:  ["51.5136252", "-0.0945430655631519"], company: "Aberdeen Asset Management PLC", name: "Ben Ritchie", image: "expertsimage/Aberdeen Asset Management PLC/Ben Ritchie.jpg"},
// 	{key: "marker15", position:["51.5168688", "-0.086035"], company: "Aberdeen Asset Management PLC", name: "Stuart E. Reeve", image: "expertsimage/Blackrock/stuart_reeve_blackrock.jpg"},
// 	{key: "marker5", position: ["51.5164694", "-0.3353167"], company: "Aberdeen Asset Management PLC", name: "Asharq Alawsat camera", image: "expertsimage/Camera Lense.jpg"},
// 	{key: "marker9", position: ["51.5155155", "-0.0989174171196441"], company: "Aberdeen Asset Management PLC", name: "Ruben Segura-Cayuela", image: "expertsimage/Bank of America Merrill Lynch/RUBEN SEGURA-CAYUELA.png"},
// 	{key: "marker2", position: ["51.5136252", "-0.074543519"], company: "Aberdeen Asset Management PLC", name: "Brett Diment", image: "expertsimage/Aberdeen Asset Management PLC/Brett Diment.jpg"},
// 	{key: "marker16", position: ["51.5168688", "-0.056035"], company: "Aberdeen Asset Management PLC", name: "Nigel Bolton", image: "expertsimage/Blackrock/nigel_bolton_blackrock.jpg"},
// 	{key: "marker6", position: ["51.5164694", "-0.123353241642167"], company: "Aberdeen Asset Management PLC", name: "Salman Aldossary", image: "expertsimage/Asharq Alawsat Newspaper/Salman_Aldossary_Asharq_Al_Awsat.jpg"},
// 	{key: "marker10", position:["51.5155155", "-0.0989174171196441"], company: "Aberdeen Asset Management PLC", name: "Vadim Khramov", image: "expertsimage/Bank of America Merrill Lynch/VADIM KHRAMOV.png"},
// 	{key: "marker7", position: ["51.5164694", "-0.123353241642167"], company: "Aberdeen Asset Management PLC", name: "Adhwan Alahmari", image: "expertsimage/Asharq Alawsat Newspaper/adhwan alamari.jpg"},
// ];

// let forbounds = [
// 	["51.5149285", "-0.0778751"],
// 	["51.5184894", "-0.0856571"],
// 	["51.5164694", "-0.03353241642167"],
// 	["51.5143849", "-0.0864373"],
// 	["51.5136252", "-0.0945430655631519"],
// 	["51.5168688", "-0.086035"],
// 	["51.52303355", "-0.163792348945195"],
// 	["51.518704", "-0.0799487"],
// 	["51.5155155", "-0.0989174171196441"],
// 	["51.5164694", "-0.053241642167"],
// 	["51.5143849", "-0.0864373"],
// 	["51.5136252", "-0.0945430655631519"],
// 	["51.5168688", "-0.086035"],
// 	["51.5164694", "-0.12353167"],
// 	["51.5155155", "-0.0989174171196441"],
// 	["51.5136252", "-0.074543519"],
// 	["51.5168688", "-0.056035"],
// 	["51.5164694", "-0.123353241642167"],
// 	["51.5155155", "-0.0989174171196441"],
// 	["51.5164694", "-0.123353241642167"],
// ]

let boundsData = []

let maxBounds = [[-85.0, -180.0], [85.0, 180.0]]
export default class ExpertsMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expertsData: [],
      markers: [],
      googleBounds: [],
    }
  }

  componentDidMount() {
    // const map = this.leafletMap.leafletElement;
    // const geocoder = LCG.L.Control.Geocoder.nominatim();
    // 	map.on('click', e => {
    // 		console.log(e.latlng);
    // 		geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), results => {
    // 				var r = results[0];
    // 				if (r) {
    // 						if (marker) {
    // 								marker.
    // 										setLatLng(r.center).
    // 										setPopupContent(r.html || r.name).
    // 										openPopup();
    // 						} else {
    // 								marker = L.marker(r.center)
    // 										.bindPopup(r.name)
    // 										.addTo(map)
    // 										.openPopup();
    // 						}
    // 				}
    // 		})
    // })

    companyData.companyData.map((val, key) => {
      boundsData.push(val.position)
    })

    this.setState({
      googleBounds: boundsData,
    })

    client
      .search({
        index: _index,
        type: _type,
        size: 15,
        body: {
          query: {
            function_score: {
              query: { match_all: {} },
              random_score: {},
            },
          },
        },
      })
      .then(
        function(body) {
          this.setState({
            expertsData: body.hits.hits,
          })

          // body.hits.hits.map((val, key) => {
          // 	let streetAddress1 = val._source['Address 1'] === 'no data' ? '' : val._source['Address 1'],
          // 	 streetAddress2 = val._source['Address 2'] === 'no data' ? '' : val._source['Address 2'],
          // 	 country =  val._source.Country === 'no data' ? '' : val._source.Country,
          // 	 town = val._source.Town === 'no data' ? '' : val._source.Town,
          // 	 fullAddress = `${streetAddress1} ${streetAddress2} ${town} ${country}`;

          // 	 fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=AIzaSyA6Z-_4cy4-LlltkXzy3jztRvN4bMJYNHg`)
          // 	.then(response => {
          // 		return response.json()
          // 	})
          // 	.then(addressResponse=>{

          // 		boundsData.push([addressResponse.results[0].geometry.location.lat.toString(), addressResponse.results[0].geometry.location.lng.toString()]);
          // 		this.setState({
          // 			markers: this.state.markers.concat([
          // 				{ key: `marker${key}`, position: [addressResponse.results[0].geometry.location.lat, addressResponse.results[0].geometry.location.lng ], name: val._source.Name, image: val._source.ProfileImage, company: val._source.Company, sector: val._source.Sector}
          // 			]),
          // 			googleBounds: boundsData
          // 		})

          // 			// if((typeof  addressResponse[0].lat != undefined) || (typeof addressResponse[0].lon != undefined)) {
          // 			// 	this.setState({
          // 			// 		markers: this.state.markers.concat([
          // 			// 			{ key: `marker${key}`, position: [	addressResponse[0].lat, addressResponse[0].lon ], name: val._source.Name, image: val._source.ProfileImage}
          // 			// 		])
          // 			// 	})
          // 			// }

          // 	});

          // });

          // console.log(body.hits.hits)
        }.bind(this),
        function(error) {
          //console.trace(error.message);
        }
      )
  }
  render() {
    if (typeof window !== 'undefined') {
      const DefaultMarker = new L.Icon({
        iconRetinaUrl: markerDefault,
        iconUrl: markerDefault,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const AuditMarker = new L.Icon({
        iconRetinaUrl: markerAudit,
        iconUrl: markerAudit,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const EducationMarker = new L.Icon({
        iconRetinaUrl: markerEducation,
        iconUrl: markerEducation,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const FinanceMarker = new L.Icon({
        iconRetinaUrl: markerFinance,
        iconUrl: markerFinance,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const LawyerMarker = new L.Icon({
        iconRetinaUrl: markerLawyers,
        iconUrl: markerLawyers,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const MediaMarker = new L.Icon({
        iconRetinaUrl: markerMedia,
        iconUrl: markerMedia,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const NewsMarker = new L.Icon({
        iconRetinaUrl: markerNews,
        iconUrl: markerNews,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const ServicesMarker = new L.Icon({
        iconRetinaUrl: markerServices,
        iconUrl: markerServices,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const TransportMarker = new L.Icon({
        iconRetinaUrl: markerTransport,
        iconUrl: markerTransport,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const WeatherMarker = new L.Icon({
        iconRetinaUrl: markerWeather,
        iconUrl: markerWeather,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const EnergyMarker = new L.Icon({
        iconRetinaUrl: markerEnergy,
        iconUrl: markerEnergy,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const MaterialMarker = new L.Icon({
        iconRetinaUrl: markerMaterial,
        iconUrl: markerMaterial,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const ScienceMarker = new L.Icon({
        iconRetinaUrl: markerScience,
        iconUrl: markerScience,
        iconAnchor: [19, 53], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -53],
        shadowUrl: markershadow,
        iconSize: new L.Point(35, 40),
      })

      const position = [51.505, -0.09]

      // const bounds = L.latLngBounds(forbounds);
      if (this.state.googleBounds.length >= 15) {
        return (
          <div>
            <div
              className="leaflet-popup-content"
              style={{ display: 'none' }}
            />
            <Map
              center={position}
              bounds={this.state.googleBounds}
              zoom={8}
              minZoom={3}
              maxBounds={maxBounds}
              scrollWheelZoom={false}
              style={{ height: '650px' }}
              id="maptest"
              ref={m => {
                this.leafletMap = m
              }}
              attributionControl={false}
            >
              <TileLayer
                url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZW1tYW4yNCIsImEiOiJjam90OHJlcW4weXY1M29wdHM5ajh5bmY0In0.PJUjy7Gx91Vf8HPZfYMBZQ"
                id="mapbox.emerald"
              />
              {companyData.companyData.map((val, key) => {
                switch (val.sector) {
                  case 'Transport':
                    return (
                      <Marker
                        key={key}
                        position={val.position}
                        icon={TransportMarker}
                      >
                        <Popup>
                          {/* <img 
                                      alt={val.image}
                                      style={{
                                        height:'70px',
                                        width: '70px',
                                        borderRadius: '100%'
                                        }}
                                      src={`https://s3-ap-southeast-1.amazonaws.com/${val.image}`}
                                      onError={e => {
                                        e.target.onerror = null
                                        e.target.src = defaultPicture
                                      }}
                                      /> */}
                          <h3>{val.company}</h3>
                          {/* <span style={{fontSize: '10px'}}>{val.company}</span> */}
                        </Popup>
                      </Marker>
                    )
                    break
                  case 'Lawyers':
                    return (
                      <Marker
                        key={key}
                        position={val.position}
                        icon={LawyerMarker}
                      >
                        <Popup>
                          {/* <img 
                                      alt={val.image}
                                      style={{
                                        height:'70px',
                                        width: '70px',
                                        borderRadius: '100%'
                                        }}
                                      src={`https://s3-ap-southeast-1.amazonaws.com/${val.image}`}
                                      onError={e => {
                                        e.target.onerror = null
                                        e.target.src = defaultPicture
                                      }}
                                      /> */}
                          <h3>{val.company}</h3>
                          {/* <span style={{fontSize: '10px'}}>{val.company}</span> */}
                        </Popup>
                      </Marker>
                    )
                    break
                  case 'Audit/Professional Services':
                    return (
                      <Marker
                        key={key}
                        position={val.position}
                        icon={ServicesMarker}
                      >
                        <Popup>
                          {/* <img 
                                    alt={val.image}
                                    style={{
                                      height:'70px',
                                      width: '70px',
                                      borderRadius: '100%'
                                      }}
                                    src={`https://s3-ap-southeast-1.amazonaws.com/${val.image}`}
                                    onError={e => {
                                      e.target.onerror = null
                                      e.target.src = defaultPicture
                                    }}
                                    /> */}
                          <h3>{val.company}</h3>
                          {/* <span style={{fontSize: '10px'}}>{val.company}</span> */}
                        </Popup>
                      </Marker>
                    )
                    break
                  case 'News':
                    return (
                      <Marker
                        key={key}
                        position={val.position}
                        icon={NewsMarker}
                      >
                        <Popup>
                          {/* <img 
                                      alt={val.image}
                                      style={{
                                        height:'70px',
                                        width: '70px',
                                        borderRadius: '100%'
                                        }}
                                      src={`https://s3-ap-southeast-1.amazonaws.com/${val.image}`}
                                      onError={e => {
                                        e.target.onerror = null
                                        e.target.src = defaultPicture
                                      }}
                                      /> */}
                          <h3>{val.company}</h3>
                          {/* <span style={{fontSize: '10px'}}>{val.company}</span> */}
                        </Popup>
                      </Marker>
                    )
                    break
                  case 'Finance':
                    return (
                      <Marker
                        key={key}
                        position={val.position}
                        icon={FinanceMarker}
                      >
                        <Popup>
                          {/* <img 
                                      alt={val.image}
                                      style={{
                                        height:'70px',
                                        width: '70px',
                                        borderRadius: '100%'
                                        }}
                                      src={`https://s3-ap-southeast-1.amazonaws.com/${val.image}`}
                                      onError={e => {
                                        e.target.onerror = null
                                        e.target.src = defaultPicture
                                      }}
                                      /> */}
                          <h3>{val.company}</h3>
                          {/* <span style={{fontSize: '10px'}}>{val.company}</span> */}
                        </Popup>
                      </Marker>
                    )
                    break
                  case 'Media':
                    return (
                      <Marker
                        key={key}
                        position={val.position}
                        icon={MediaMarker}
                      >
                        <Popup>
                          {/* <img 
                                        alt={val.image}
                                        style={{
                                          height:'70px',
                                          width: '70px',
                                          borderRadius: '100%'
                                          }}
                                        src={`https://s3-ap-southeast-1.amazonaws.com/${val.image}`}
                                        onError={e => {
                                          e.target.onerror = null
                                          e.target.src = defaultPicture
                                        }}
                                        /> */}
                          <h3>{val.company}</h3>
                          {/* <span style={{fontSize: '10px'}}>{val.company}</span> */}
                        </Popup>
                      </Marker>
                    )
                    break
                  case 'Education':
                    return (
                      <Marker
                        key={key}
                        position={val.position}
                        icon={EducationMarker}
                      >
                        <Popup>
                          {/* <img 
                                        alt={val.image}
                                        style={{
                                          height:'70px',
                                          width: '70px',
                                          borderRadius: '100%'
                                          }}
                                        src={`https://s3-ap-southeast-1.amazonaws.com/${val.image}`}
                                        onError={e => {
                                          e.target.onerror = null
                                          e.target.src = defaultPicture
                                        }}
                                        /> */}
                          <h3>{val.company}</h3>
                          {/* <span style={{fontSize: '10px'}}>{val.company}</span> */}
                        </Popup>
                      </Marker>
                    )
                    break
                  case 'Professional Services':
                    return (
                      <Marker
                        key={key}
                        position={val.position}
                        icon={ServicesMarker}
                      >
                        <Popup>
                          {/* <img 
                                        alt={val.image}
                                        style={{
                                          height:'70px',
                                          width: '70px',
                                          borderRadius: '100%'
                                          }}
                                        src={`https://s3-ap-southeast-1.amazonaws.com/${val.image}`}
                                        onError={e => {
                                          e.target.onerror = null
                                          e.target.src = defaultPicture
                                        }}
                                        /> */}
                          <h3>{val.company}</h3>
                          {/* <span style={{fontSize: '10px'}}>{val.company}</span> */}
                        </Popup>
                      </Marker>
                    )
                    break
                  case 'Weather':
                    return (
                      <Marker
                        key={key}
                        position={val.position}
                        icon={WeatherMarker}
                      >
                        <Popup>
                          {/* <img 
                                        alt={val.image}
                                        style={{
                                          height:'70px',
                                          width: '70px',
                                          borderRadius: '100%'
                                          }}
                                        src={`https://s3-ap-southeast-1.amazonaws.com/${val.image}`}
                                        onError={e => {
                                          e.target.onerror = null
                                          e.target.src = defaultPicture
                                        }}
                                        /> */}
                          <h3>{val.company}</h3>
                          {/* <span style={{fontSize: '10px'}}>{val.company}</span> */}
                        </Popup>
                      </Marker>
                    )
                    break
                  case 'Energy':
                    return (
                      <Marker
                        key={key}
                        ref={key === 0 ? this.openPopup : ''}
                        position={val.position}
                        icon={EnergyMarker}
                      >
                        <Popup>
                          <h3>{val.company}</h3>
                        </Popup>
                      </Marker>
                    )
                    break
                  case 'Material Technology':
                    return (
                      <Marker
                        key={key}
                        ref={key === 0 ? this.openPopup : ''}
                        position={val.position}
                        icon={MaterialMarker}
                      >
                        <Popup>
                          <h3>{val.company}</h3>
                        </Popup>
                      </Marker>
                    )
                    break
                  case 'Scientific Research':
                    return (
                      <Marker
                        key={key}
                        ref={key === 0 ? this.openPopup : ''}
                        position={val.position}
                        icon={ScienceMarker}
                      >
                        <Popup>
                          <h3>{val.company}</h3>
                        </Popup>
                      </Marker>
                    )
                    break
                  default:
                    return (
                      <Marker
                        key={key}
                        position={val.position}
                        icon={DefaultMarker}
                      >
                        <Popup>
                          {/* <img 
                                        alt={val.image}
                                        style={{
                                          height:'70px',
                                          width: '70px',
                                          borderRadius: '100%'
                                          }}
                                        src={`https://s3-ap-southeast-1.amazonaws.com/${val.image}`}
                                        onError={e => {
                                          e.target.onerror = null
                                          e.target.src = defaultPicture
                                        }}
                                        /> */}
                          <h3>{val.company}</h3>
                          {/* <span style={{fontSize: '10px'}}>{val.company}</span> */}
                        </Popup>
                      </Marker>
                    )
                }
              })}
            </Map>
          </div>
        )
      } else {
        return null
      }
    }
    return null
  }
}
