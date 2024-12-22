import request from 'request';



export const forecast = (lat, lon, callback) => {
     const url = 'https://api.weatherstack.com/current?access_key=df25c64249338687066183b764358037&query=' + lat + ',' + lon 
     //url - property shorthand
     request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather api', undefined)
        }else if(body.error){
            callback(body.error.info, undefined)    
        }else{
            //destructure
            const {temperature, feelslike, weather_descriptions} = body.current
            callback(undefined, {
                weather_description : weather_descriptions[0],
                temperature, //property shorthand
                feelslike //property shorthand
            })
        }   
     })
} 