import React, { useState, useRef } from 'react'
import useSwr from 'swr'
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from 'react-map-gl'
import useSuperCluster from 'use-supercluster'
import ImageRoundedIcon from '@material-ui/icons/ImageRounded'
import { Button, Container } from '@material-ui/core'

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function Map() {
  const url =
    'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10'

  const { data, error } = useSwr(url, fetcher)
  const crimes = data && !error ? data.slice(0, 2000) : []
  const [viewport, setViewport] = useState({
    latitude: 52.6376,
    longitude: -1.135171,
    zoom: 12,
  })
  const points = crimes.map((crime) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      crimeId: crime.id,
      category: crime.category,
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(crime.location.longitude),
        parseFloat(crime.location.latitude),
      ],
    },
  }))
  const mapRef = useRef()
  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null
  const { clusters, supercluster } = useSuperCluster({
    points,
    zoom: viewport.zoom,
    bounds: bounds,
    options: { radius: 75, maxZoom: 20 },
  })

  const [showPopup, setShowPopup] = useState(false)

  return (
    <Container maxWidth="lg">
      <ReactMapGL
        {...viewport}
        maxZoom={20}
        mapboxApiAccessToken="pk.eyJ1Ijoic2hla29rYXIiLCJhIjoiY2s5OGh4dGZyMDJsYjN0bW5mbXI1dDZzaCJ9.AZdJdf6-5pmlbVzpfbIAVw"
        onViewportChange={setViewport}
        ref={mapRef}
        width="100%"
        height="90vh"
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties

          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    color: '#303030',
                    background: '#d1ff33',
                    borderRadius: '25%',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    )

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2,
                      }),
                      transitionDuration: 'auto',
                    })
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            )
          }

          return (
            <React.Fragment>
              {showPopup && (
                <Popup
                  latitude={latitude}
                  longitude={longitude}
                  closeButton={false}
                  closeOnClick={false}
                  //onClose={() => this.setState({showPopup: false})}
                  //anchor="top"
                >
                  <div>You are here</div>
                </Popup>
              )}
              <Marker
                key={cluster.properties.crimeid}
                latitude={latitude}
                longitude={longitude}
              >
                <Button
                  color="primary"
                  onMouseEnter={() => {
                    setShowPopup(true)
                    console.log(showPopup)
                  }}
                  onMouseLeave={() => {
                    setShowPopup(false)
                    console.log(showPopup)
                  }}
                >
                  <ImageRoundedIcon />
                </Button>
              </Marker>
            </React.Fragment>
          )
        })}
      </ReactMapGL>
    </Container>
  )
}
