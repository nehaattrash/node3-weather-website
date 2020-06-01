const request = require('request')
const geoCode = (address,callback)=>{
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2lraGEiLCJhIjoiY2thbm0xYTFtMGZuaDJxcW93b2FnMnpmdCJ9.Mh759xf3hCjcXYyqyF2M5w&limit=1'
    request({url:geoUrl,json:true},(error,{body})=>{
        if(error){
            callback("Could'nt connect to the network!!!",undefined)
        }else if(body.features.length === 0){
            callback("Could not find the matching results. ",undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geoCode