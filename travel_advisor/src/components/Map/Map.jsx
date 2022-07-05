import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import {Paper, Typography, useMediaQuery} from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'

const keys = require('../../sensitive/keys.json')

export default function Map({setCoordinates, setBounds, coordinates, places, setChildClicked, childClicked}) {
    const classes = useStyles()
    const isDesktop = useMediaQuery('(min-width:600px');
    

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: keys.google_map_api_key}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange = {(e)=>{
                    console.log(e)
                    setCoordinates({lat: e.center.lat, lng: e.center.lng})    
                    setBounds({
                        ne: e.marginBounds.ne,
                        sw: e.marginBounds.sw,
                    })
                }}
                onChildClick={(child) => {
                    setChildClicked(child)
                    console.log('now clicking',childClicked)
                }}
            >
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key = {i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color='primary' fontSize='large' />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} wariant='subtitle2' gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://cdn.shopify.com/s/files/1/0065/4917/6438/products/inside-a-fast-food-chain-restaurant-background_998a490f-0590-423e-b12e-84885a3c8b96_1024x1024@2x.jpg?v=1549230979'}
                                        alt={place.name}
                                    />
                                    <Rating size='small' value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}
