const request = require('request')
const getLatLong = (searchTerm, callback) =>{
    const url  = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=pk.eyJ1IjoiYWJoaW5hdmF2IiwiYSI6ImNrNmQ4NTA4dTAxbWkzanFweXQxcG8xa2wifQ.B-wBEdm_6emtlVynwVCTew`
    //shorthand syntax used in url
    //destructuring used as body in place of response object 
    request({url, json:true}, (error, {body}) => {
        if (error){
           callback('unable to contact the API', undefined)
        } else if(body.message){
            callback(body.message, undefined)
        }else if(body.features.length===0){
            callback('Unable to find the search results please try again with diffrent search terms', undefined)
        }else {
            //console.log(`Hi you have searched for ${response.body.query} and the latitude is ${response.body.features[0].center[1]} and the longitude is ${response.body.features[0].center[0]}`)
          callback (undefined, {
             lattitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             place: body.features[0].place_name
            })
        }
    })
}
module.exports = getLatLong