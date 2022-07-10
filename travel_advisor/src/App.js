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
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [childClicked, setChildClicked] = useState(null)

  const [coordinates, setCoordinates] =  useState({})
  const [bounds, setBounds] =  useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const [type, setType] = useState(['restaurants'])
  const [rating, setRating] = useState('')

  // get user location when starts
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      console.log('init user loc:', latitude, longitude)
      setCoordinates({lat: latitude, lng: longitude})
    })
  }, [])

  // change user location when map changes
  useEffect(()=> {
    if (bounds) {

      setIsLoading(true)

      console.log('user loc changed: ', coordinates, bounds)

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data)=> {
          setPlaces(data?.filter(place => place.name && place.num_reviews > 0))
          setFilteredPlaces([])
          setIsLoading(false)
        })

    }
    
  }, [type, bounds])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
  }, [rating])

  return (
    // returning multiple elements, so we wrap them in an empty <></>
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List 
            places = {filteredPlaces.length? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCoordinates ={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length? filteredPlaces : places}
            setChildClicked = {setChildClicked}
            childClicked={childClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

// export App component
export default App;
