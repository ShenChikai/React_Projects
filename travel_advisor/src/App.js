import React, {useState, useEffect} from 'react';
import { CssBaseline, Grid} from '@material-ui/core'


// import components
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import {getPlacesData} from './api/api_calls'

function App() {
  // Set up places, cords, bounds, map child
  const [places, setPlaces] = useState([])
  const [childClicked, setChildClicked] = useState(null)

  const [coordinates, setCoordinates] =  useState({})
  const [bounds, setBounds] =  useState(null)

  const [isLoading, setIsLoading] = useState(false)

  // get user location when starts
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      console.log('init user loc:', latitude, longitude)
      setCoordinates({lat: latitude, lng: longitude})
    })
  }, [])

  // change user location when map changes
  useEffect(()=> {
    setIsLoading(true)
    if (bounds) {
      console.log('user loc changed: ', coordinates, bounds)
      getPlacesData(bounds.sw, bounds.ne)
        .then((data)=> {
          setPlaces(data)
        })
    }
    setIsLoading(false)
  }, [coordinates, bounds])

  return (
    // returning multiple elements, so we wrap them in an empty <></>
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List 
            places = {places}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCoordinates ={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked = {setChildClicked}
            childClicked= {childClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

// export App component
export default App;
