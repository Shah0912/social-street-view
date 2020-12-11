import React, { useState, useEffect } from 'react'
import ReactMapGL, { Source, Layer } from 'react-map-gl'
import data1 from '../maharashtra_districts1 (copy).json'
import { Container } from '@material-ui/core'
import { useQuery, gql } from '@apollo/client'

const GET_DATA_QUERY = gql`
  query getComments($id: String!) {
    Image(filter: {id: $id}) {
      comments_on {
        dist_id
        sentiment
      }
    }
  }
`

function Sentiment(id) {
  console.log("sentiment id = ", id);
  const { loading, error, data } = useQuery(GET_DATA_QUERY, {
    variables: { id: id.location.data  },
  })
  const [Data, setData] = useState([])

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

  useEffect(() => {
    if (loading == false && data) {
      setData(data.Image[0].comments_on)
      console.log("commentData = ", Data);
    }
  }, [loading, data])

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data1)
  //console.log(Data)

  

  if(Data) {
    data1.features.map((feature) => {
      Data.map((comment) => {
        feature.properties.sentiment = -6
        if (comment.dist_id === feature.properties.cartodb_id) {
          feature.properties.sentiment = comment.sentiment
        }
        else if(feature.properties.cartodb_id == 24) {
          feature.properties.sentiment = 3;
        }
        else if(feature.properties.cartodb_id == 8) {
          feature.properties.sentiment = -5;
        }
      })
    })

    

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
          <Source id="oregonjson" type="geojson" data={data1}>
            <Layer
              id="test"
              type="fill"
              source="oregonjson"
              paint={{
                'fill-color': {
                  property: 'sentiment',
                  stops: [
                    [-6, '#636363'],
                    [-5, '#ff0000'],
                    [-4, '#ff3300'],
                    [-3, '#ff6600'],
                    [-2, '#ff9900'],
                    [-1, '#ffcc00'],
                    [0, '#ffff00'],
                    [1, '#ccff00'],
                    [2, '#99ff00'],
                    [3, '#66ff00'],
                    [4, '#33ff00'],
                    [5, '#00ff00'],
                    /* [0, '#3288bd'],
                    [1, '#66c2a5'],
                    [2, '#abdda4'],
                    [3, '#e6f598'],
                    [4, '#ffffbf'],
                    [5, '#fee08b'],
                    [6, '#fdae61'],
                    [7, '#f46d43'],
                    [8, '#d53e4f'], */
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
              <div>
                Sentiment:{' '}
                {hover.hoveredFeature.properties.sentiment < -5
                  ? 'N/A'
                  : hover.hoveredFeature.properties.sentiment}
              </div>
              <div>State: {hover.hoveredFeature.properties.name_1}</div>
              <div>District: {hover.hoveredFeature.properties.name_2}</div>

              {/* <div>Population: {hover.hoveredFeature.properties.pop}</div> */}
            </div>
          )}
        </ReactMapGL>
      </Container>
    )
  }
  return (
    <div>Error in loading the map...</div>
  )
}

export default Sentiment
