import React from 'react'
import {Box, Typography, Button, Card, CardMedia, 
    CardContent, CardActions, Chip} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/LocationOn'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'

export default function Detail({place, selected, refProp}) {
    const classes = useStyles()

    if(selected) {
        console.log("scrolling to the selected", {refProp})
        refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start"})
    }

    return (
        <Card elevation={6}>
            <CardMedia 
                style={{height: 350}}
                image={place.photo ? place.photo.images.large.url : 'https://cdn.shopify.com/s/files/1/0065/4917/6438/products/inside-a-fast-food-chain-restaurant-background_998a490f-0590-423e-b12e-84885a3c8b96_1024x1024@2x.jpg?v=1549230979'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant='h5'>
                    {place.name}
                </Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Rating value={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant='subtitle1'>
                        Out of {place.num_reviews} reviews
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>
                        Price
                    </Typography>
                    <Typography gutterBottom variant='subtitle1'>
                        {place.price_level}
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>
                        Ranking
                    </Typography>
                    <Typography gutterBottom variant='subtitle1'>
                        {place.ranking}
                    </Typography>
                </Box>
                {place?.cuisine?.map((cuisine) => (
                    <Chip key={cuisine.key} size="small" label={cuisine.name} className={classes.chip} />
                ))}
                {place?.address && (
                    <Typography gutterBottom variant='body2' color='textSecondary' className='classes.subtitle'>
                        <LocationOnIcon/> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography gutterBottom variant='body2' color='textSecondary' className='classes.spacing'>
                        <PhoneIcon/> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>
                        See on Trip Advisor
                    </Button>
                    <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
                        See Their Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}
