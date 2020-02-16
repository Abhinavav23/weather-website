const request = require('request')
const getWeatherInfo = (lattitude, longitude, place, callback) =>{
    const url = `https://api.darksky.net/forecast/355cf0fee1022c7bc37e71a1de0a01fe/${lattitude},${longitude}?units=si`
    //shorthand syntax used in url
    //destructuring used as body in place of response object
    request({url, json: true}, (error, {body}) => {
            if(error){
                callback('Unable to connect to the api', undefined)
            } else if(body.error){
                callback(body.error, undefined)
            }
            else {
                callback(undefined, {
                    TimeZone: body.timezone,
                    Temp: body.currently.temperature,
                    Rain: body.currently.precipProbability,
                    summary: body.hourly.summary,
                    highest: body.daily.data[0].temperatureHigh,
                    lowest: body.daily.data[0].temperatureLow
                })
                //console.log(`This is ${place} belongs to TimeZone '${response.body.timezone}'.It is currently ${response.body.currently.temperature} degrees out there and there is ${response.body.currently.precipProbability} % chance of rain.`)
            }
    })
}
module.exports = getWeatherInfo
