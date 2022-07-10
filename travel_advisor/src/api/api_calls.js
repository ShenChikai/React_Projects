import axios from 'axios'

const keys = require('../sensitive/keys.json')
const URL = ''

export async function getPlacesData(type, sw, ne) {
    try {
        const {data:{data}} = await axios.get(
          `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
          {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': keys.rapid_api_key,
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          })
        return data
    } catch (e) {
        console.log('Rapid API Error: ', e)
    }
}
