import request from 'request';
export const geocode = (address, callback) => {
    const url = 'https://geocode.maps.co/search?q=' + encodeURIComponent(address) + '&api_key=675a27ae07e9a555689475wghe63717&limit=1&language=en'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather api', undefined)
        } else if (body.length === 0) {
            callback('Input must be valid, try with another location', undefined)
        } else {
            //console.log(response.body.current.weather_descriptions[0] + '. It is currrently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out')
            
            //destructure 
            const {lat:latitude, lon:longitude, display_name:location} = body[0]
            callback(undefined, {
                latitude, //property shorthand
                longitude,
                location
            })
        }
    })    

}