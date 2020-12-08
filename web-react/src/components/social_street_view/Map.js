import React, { useState, useRef,useEffect } from 'react'
import useSwr from 'swr'
import ReactMapGL, {GeolocateControl, Marker, FlyToInterpolator, Popup } from 'react-map-gl'
import useSuperCluster from 'use-supercluster'
import ImageRoundedIcon from '@material-ui/icons/ImageRounded'
import { Button, Container,Paper } from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const fetcher = (...args) => fetch(...args).then((response) => response.json())
const GET_DATA_QUERY = gql`
  query mapget {
    Post {
      id
      latitude
      longitude
      has_image {
        url
        id
      }
    }
  }
`

export default function Map() {
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_DATA_QUERY)
  const [Data,setData] = useState({
    Post:[{
      latitude:"",
      longitude:"",
      url:[]
    }]
  })
  useEffect(() => {
    if(loading == false && data) {
        setData(data);
    }
}, [loading, data]);

  const [viewport, setViewport] = useState({
    latitude: 19.05884593854442,
    longitude: 72.90418657347465,
    zoom: 12,
    transitionInterpolator: new FlyToInterpolator({
      speed: 2,
    }),
    transitionDuration: 'auto',
  })
  let crimes = Data.Post
  const points = crimes.map((crime) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      crimeId: crime.id,
      url: crime.has_image,
    },
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(crime.longitude), parseFloat(crime.latitude)],
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

  const [showPopup, setShowPopup] = useState(0)
  const [popupID, setPopupID] = useState(0)

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
        mapStyle='mapbox://styles/shekokar/ckgxa6j0f4vl319r1algxld2d'
      >
        <div style={{ position: 'absolute', top: 0, left: 0, padding: '10px' }}>
          <GeolocateControl  /* auto={true} */
          />
        </div>

        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates
          //let url=""
          console.log(cluster.properties.crimeid)
          //let url = cluster.geometry.url.length ? cluster.geometry.url[0].url : "";
            //console.log(url)
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

          
          function handleClick() {
            console.log(popupID)
            const id = popupID
            history.push({
              pathname: '/post',
              data: id,
            })
          }
          return (
            <React.Fragment>
              {showPopup === cluster.properties.crimeId && (
                <Popup
                  latitude={latitude}
                  longitude={longitude}
                  closeButton={false}
                  closeOnClick={false}
                  offsetLeft={30}

                  //onClose={() => this.setState({showPopup: false})}
                  //anchor="top"
                >
                  <Paper
                    children={
                      <img
                        style={{ width: '100px' }}
                        src={
                          cluster.properties.url.length
                            ? cluster.properties.url[0].url
                            : ''
                        } //"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                      />
                    }
                    square={true}
                  />
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
                    setShowPopup(cluster.properties.crimeId)
                    setPopupID(cluster.properties.url[0].id)
                  }}
                  onMouseLeave={() => {
                    setShowPopup(0)
                    setPopupID(0)
                    console.log(showPopup)
                  }}
                  onClick={handleClick}
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  <ImageRoundedIcon fontSize="medium" />
                </Button>
              </Marker>
            </React.Fragment>
          )
        })}
      </ReactMapGL>
    </Container>
  )
}
