import React, { useState } from 'react'
import ReactMapGL, { Source, Layer } from 'react-map-gl'
import data from '../maharashtra_districts.json'
import { Container } from '@material-ui/core'

function Sentiment() {
  const [viewport, setViewport] = useState({
    longitude: 74.781153,
    latitude: 19.496864,
    zoom: 5,
  })

  const [hover, setHover] = useState({
    hoveredFeature: null,
  })

  const _onHover = (event) => {
    const {
      features,
      srcEvent: { offsetX, offsetY },
    } = event
    const hoveredFeature =
      features && features.find((f) => f.layer.id === 'test')
    setHover({ hoveredFeature, x: offsetX, y: offsetY })
  }

  return (
    <Container maxWidth="lg">
      <ReactMapGL
        {...viewport}
        maxZoom={20}
        mapboxApiAccessToken="pk.eyJ1Ijoic2hla29rYXIiLCJhIjoiY2s5OGh4dGZyMDJsYjN0bW5mbXI1dDZzaCJ9.AZdJdf6-5pmlbVzpfbIAVw"
        onViewportChange={setViewport}
        width="100%"
        height="90vh"
        onHover={_onHover}
        mapStyle="mapbox://styles/shekokar/ckgxa6j0f4vl319r1algxld2d"
      >
        <Source id="oregonjson" type="geojson" data={data}>
          <Layer
            id="test"
            type="fill"
            source="oregonjson"
            paint={{
              'fill-color': {
                property: 'pop_prop_2011',
                stops: [
                  [0, '#3288bd'],
                  [1, '#66c2a5'],
                  [2, '#abdda4'],
                  [3, '#e6f598'],
                  [4, '#ffffbf'],
                  [5, '#fee08b'],
                  [6, '#fdae61'],
                  [7, '#f46d43'],
                  [8, '#d53e4f'],
                ],
              },
              'fill-opacity': 0.4,
            }}
          />
        </Source>
        {hover.hoveredFeature && (
          <div
            className="tooltip"
            style={{
              left: hover.x,
              top: hover.y,
              position: 'absolute',
              margin: '8px',
              padding: '4px',
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              maxWidth: '300px',
              fontSize: '10px',
              zIndex: 9,
              pointerEvents: 'none',
            }}
          >
            <div>State: {hover.hoveredFeature.properties.name_1}</div>
            <div>District: {hover.hoveredFeature.properties.name_2}</div>
            <div>Population: {hover.hoveredFeature.properties.pop}</div>
          </div>
        )}
      </ReactMapGL>
    </Container>
  )
}

export default Sentiment
